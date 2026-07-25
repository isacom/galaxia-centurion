/*
 * LÓGICA PRINCIPAL DEL MAPA INTERACTIVO
 * --------------------------------------
 * No deberías necesitar tocar mucho este archivo para añadir contenido:
 * para eso están js/config.js (mapas/iconos) y js/locations.js (marcadores).
 * Tócalo solo si quieres cambiar EL COMPORTAMIENTO (animaciones, tamaños
 * de icono, cómo se abre el panel, etc.)
 */

(function () {
  const state = {
    map: null,
    currentMapId: null,
    imageLayer: null,
    markersLayer: null,
    images: [],
    imageIndex: 0,
    audio: document.getElementById("location-audio"),
  };

  const panel = document.getElementById("info-panel");
  const panelName = document.getElementById("panel-name");
  const panelDesc = document.getElementById("panel-description");
  const panelImg = document.getElementById("panel-image");
  const panelDots = document.getElementById("panel-dots");
  const panelDescend = document.getElementById("panel-descend");
  const panelLinks = document.getElementById("panel-links");
  const breadcrumb = document.getElementById("breadcrumb");
  const legendList = document.getElementById("legend-list");
  const backButton = document.getElementById("back-button");

  // ---------- Jugadores sobre los iconos ----------

  const MAX_PLAYER_BADGES = 10;
  const PLAYER_COLORS = [
    "#e24b4a", "#378ade", "#63a922", "#ba7517", "#7f77dd",
    "#d4537e", "#1d9e75", "#c9401a", "#5cc9e8", "#a8792e",
  ];

  function getPlayerColor(player, index) {
    return player.color || PLAYER_COLORS[index % PLAYER_COLORS.length];
  }

  function getInitial(name) {
    return (name || "?").trim().charAt(0).toUpperCase() || "?";
  }

  // Para cada ubicación, calcula qué jugadores "cuentan" ahí: los que están
  // directamente en ella, más los de cualquier ubicación a la que se llegue
  // descendiendo desde ella (loc.descendsTo), y así recursivamente. Así, un
  // jugador en una mazmorra también aparece en la ciudad y el planeta que
  // llevan hasta esa mazmorra.
  function buildEffectivePlayersIndex() {
    const directByLocation = new Map();
    (typeof PLAYERS !== "undefined" ? PLAYERS : []).forEach((player) => {
      if (!directByLocation.has(player.locationId)) {
        directByLocation.set(player.locationId, []);
      }
      directByLocation.get(player.locationId).push(player);
    });

    const locationsByMap = new Map();
    LOCATIONS.forEach((loc) => {
      if (!locationsByMap.has(loc.map)) locationsByMap.set(loc.map, []);
      locationsByMap.get(loc.map).push(loc);
    });

    const cache = new Map();
    function resolve(loc) {
      if (cache.has(loc.id)) return cache.get(loc.id);
      let players = (directByLocation.get(loc.id) || []).slice();
      if (loc.descendsTo) {
        const children = locationsByMap.get(loc.descendsTo) || [];
        children.forEach((child) => {
          players = players.concat(resolve(child));
        });
      }
      cache.set(loc.id, players);
      return players;
    }

    LOCATIONS.forEach(resolve);
    return cache;
  }

  const effectivePlayersByLocation = buildEffectivePlayersIndex();

  function buildPlayerBadgesHtml(players) {
    if (!players || !players.length) return "";

    const shown = players.slice(0, MAX_PLAYER_BADGES);
    const overflow = players.length - shown.length;
    // Si sobra alguno, el último hueco se convierte en una chapa "+N".
    if (overflow > 0) shown.splice(MAX_PLAYER_BADGES - 1, 1);

    let html = '<div class="player-badges">';
    shown.forEach((player, i) => {
      const color = getPlayerColor(player, i);
      const name = (player.name || "").replace(/"/g, "&quot;");
      const avatar = (player.avatar || "").replace(/"/g, "&quot;");
      const inner = player.avatar
        ? '<img src="' + player.avatar + '" alt="" />'
        : getInitial(player.name);
      html +=
        '<span class="player-badge" style="background:' +
        color +
        '" title="' +
        name +
        '" data-player-name="' +
        name +
        '" data-player-avatar="' +
        avatar +
        '" data-player-color="' +
        color +
        '">' +
        inner +
        "</span>";
    });
    if (overflow > 0) {
      html +=
        '<span class="player-badge player-badge-more" title="' +
        (overflow + 1) +
        ' jugadores más">+' +
        (overflow + 1) +
        "</span>";
    }
    html += "</div>";
    return html;
  }

  // ---------- Ficha de personaje al pulsar la chapa de un jugador ----------

  const playerLightbox = document.getElementById("player-lightbox");
  const playerSheetIcon = document.getElementById("player-sheet-icon");
  const playerSheetImageWrap = document.getElementById("player-sheet-image");
  const playerSheetName = document.getElementById("player-sheet-name");
  const playerSheetStats = document.getElementById("player-sheet-stats");

  // Imagen que se usa en el recuadro grande 9:16 cuando el jugador no
  // tiene "sheetImage" puesta todavía. Sustituye este archivo, o cambia
  // esta ruta, si quieres tu propio placeholder.
  const PLAYER_SHEET_PLACEHOLDER = "assets/images/players/sheet-placeholder.svg";

  // Campos fijos de la ficha, en el orden en que se muestran. "key" es el
  // nombre del campo en el objeto del jugador (js/players.js).
  const PLAYER_SHEET_FIELDS = [
    { key: "height", label: "Estatura" },
    { key: "race", label: "Raza" },
    { key: "gender", label: "Género" },
    { key: "traits", label: "Rasgos" },
  ];

  function openPlayerLightbox(player) {
    playerSheetName.textContent = player.name || "";

    // Icono pequeño de arriba: el mismo avatar (o inicial) que ya se ve
    // en la chapa del mapa. Es independiente de la imagen grande.
    if (player.avatar) {
      playerSheetIcon.innerHTML = '<img src="' + player.avatar + '" alt="" />';
    } else {
      const color = getPlayerColor(player, 0);
      playerSheetIcon.innerHTML =
        '<div class="player-lightbox-initial" style="background:' +
        color +
        '">' +
        getInitial(player.name) +
        "</div>";
    }

    // Imagen grande de cuerpo completo (9:16): usa "sheetImage" si existe,
    // y si no, un placeholder — NUNCA el icono pequeño de arriba.
    const sheetImage = player.sheetImage || PLAYER_SHEET_PLACEHOLDER;
    playerSheetImageWrap.innerHTML = '<img src="' + sheetImage + '" alt="" />';

    playerSheetStats.innerHTML = "";
    PLAYER_SHEET_FIELDS.forEach((field) => {
      const value = player[field.key];
      if (!value) return;
      playerSheetStats.appendChild(buildPlayerStatRow(field.label, value));
    });
    // Campos "opcionales": cualquier extra que el jugador quiera añadir,
    // ej. extra: [{ label: "Ocupación", value: "Cazador de bóvedas" }]
    (player.extra || []).forEach((item) => {
      if (!item || !item.value) return;
      playerSheetStats.appendChild(buildPlayerStatRow(item.label, item.value));
    });

    playerLightbox.classList.add("open");
    playerLightbox.setAttribute("aria-hidden", "false");
  }

  function buildPlayerStatRow(label, value) {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    const fragment = document.createDocumentFragment();
    fragment.appendChild(dt);
    fragment.appendChild(dd);
    return fragment;
  }

  function closePlayerLightbox() {
    playerLightbox.classList.remove("open");
    playerLightbox.setAttribute("aria-hidden", "true");
  }

  document.getElementById("player-lightbox-close").addEventListener("click", closePlayerLightbox);
  playerLightbox.addEventListener("click", (e) => {
    if (e.target === playerLightbox) closePlayerLightbox();
  });

  // Escucha en fase de "captura" sobre el mapa: así se adelanta al click
  // del propio marcador (que abriría el panel de la ubicación) cuando lo
  // que se pulsa es una chapa de jugador.
  document.getElementById("map").addEventListener(
    "click",
    (e) => {
      const badge = e.target.closest(".player-badge");
      if (!badge || badge.classList.contains("player-badge-more")) return;
      e.stopPropagation();
      const player = (typeof PLAYERS !== "undefined" ? PLAYERS : []).find(
        (p) => p.name === badge.dataset.playerName
      );
      if (player) openPlayerLightbox(player);
    },
    true
  );

  // ---------- Carga de una capa/mapa ----------

  function loadMap(mapId) {
    const mapConfig = MAPS[mapId];
    if (!mapConfig) {
      console.error('No existe ningún mapa con id "' + mapId + '" en config.js');
      return;
    }

    const img = new Image();
    img.onload = function () {
      setupLeafletMap(mapConfig, img.naturalWidth, img.naturalHeight);
    };
    img.onerror = function () {
      console.error("No se pudo cargar la imagen del mapa: " + mapConfig.image);
    };
    img.src = mapConfig.image;
  }

  function setupLeafletMap(mapConfig, width, height) {
    const bounds = [
      [0, 0],
      [height, width],
    ];

    if (!state.map) {
      state.map = L.map("map", {
        crs: L.CRS.Simple,
        minZoom: -5,
        maxZoom: 4,
        zoomSnap: 0.1,
        attributionControl: false,
        zoomControl: false,
      });

      state.map.on("click", closePanel);
    } else {
      if (state.imageLayer) state.map.removeLayer(state.imageLayer);
      if (state.markersLayer) state.map.removeLayer(state.markersLayer);
    }

    state.imageLayer = L.imageOverlay(mapConfig.image, bounds).addTo(state.map);
    state.map.fitBounds(bounds);

    const mapEl = document.getElementById("map");
    mapEl.classList.remove("bg-starfield", "bg-desert", "bg-alien");
    if (mapConfig.background) {
      mapEl.classList.add("bg-" + mapConfig.background);
    }
    // Deja algo de margen alrededor de la imagen para poder desplazarse un poco.
    const padding = Math.max(width, height) * 0.25;
    state.map.setMaxBounds([
      [-padding, -padding],
      [height + padding, width + padding],
    ]);

    state.markersLayer = L.layerGroup().addTo(state.map);
    state.currentMapId = mapConfig.id;
    state.imgHeight = height;

    renderMarkers(mapConfig.id, height);
    renderBreadcrumb(mapConfig.id);
    updateBackButton(mapConfig);
    closePanel();
  }

  // Botón "Atrás" bajo la leyenda: lleva directamente al mapa padre
  // (ej. desde Sanctuary vuelve a Pandora). Se oculta en la capa más alta,
  // que no tiene padre (la Galaxia Centurión).
  function updateBackButton(mapConfig) {
    const parentConfig = mapConfig.parent ? MAPS[mapConfig.parent] : null;
    if (!parentConfig) {
      backButton.style.display = "none";
      backButton.onclick = null;
      return;
    }
    backButton.textContent = "← Volver a " + parentConfig.name;
    backButton.style.display = "block";
    backButton.onclick = () => loadMap(parentConfig.id);
  }

  // ---------- Marcadores ----------

  function renderMarkers(mapId, imgHeight) {
    const locations = LOCATIONS.filter((loc) => loc.map === mapId);

    locations.forEach((loc) => {
      const iconDef = ICONS[loc.icon] || ICONS.poi;
      const players = effectivePlayersByLocation.get(loc.id);
      const leafletIcon = L.divIcon({
        html:
          buildPlayerBadgesHtml(players) +
          '<img class="marker-icon-img" src="' +
          iconDef.file +
          '" alt="" />',
        className: "player-marker-icon",
        iconSize: [36, 48],
        iconAnchor: [18, 48],
        popupAnchor: [0, -44],
      });

      // loc.x / loc.y están en píxeles "de imagen" (origen arriba-izquierda).
      // Leaflet con CRS.Simple espera lat/lng con origen abajo-izquierda,
      // así que invertimos la coordenada Y usando la altura de la imagen.
      const latLng = [imgHeight - loc.y, loc.x];

      const marker = L.marker(latLng, { icon: leafletIcon, title: loc.name });
      marker.on("click", function (e) {
        L.DomEvent.stopPropagation(e);
        openPanel(loc);
      });
      marker.addTo(state.markersLayer);
    });
  }

  // ---------- Breadcrumb (navegación entre capas) ----------

  function renderBreadcrumb(mapId) {
    const chain = [];
    let current = MAPS[mapId];
    while (current) {
      chain.unshift(current);
      current = current.parent ? MAPS[current.parent] : null;
    }

    breadcrumb.innerHTML = "";
    chain.forEach((mapConfig, index) => {
      const crumb = document.createElement("button");
      crumb.className = "crumb";
      crumb.textContent = mapConfig.name;
      crumb.disabled = index === chain.length - 1;
      crumb.addEventListener("click", () => loadMap(mapConfig.id));
      breadcrumb.appendChild(crumb);

      if (index < chain.length - 1) {
        const sep = document.createElement("span");
        sep.className = "crumb-sep";
        sep.textContent = "›";
        breadcrumb.appendChild(sep);
      }
    });
  }

  // ---------- Panel de información (la "pestañita") ----------

  function openPanel(loc) {
    state.images = loc.images && loc.images.length ? loc.images : [];
    state.imageIndex = 0;

    panelName.textContent = loc.name;
    panelDesc.textContent = loc.shortDescription || "";

    renderImage();
    renderDots();
    renderLinks(loc);

    if (loc.descendsTo && MAPS[loc.descendsTo]) {
      panelDescend.style.display = "inline-block";
      panelDescend.onclick = () => loadMap(loc.descendsTo);
    } else {
      panelDescend.style.display = "none";
      panelDescend.onclick = null;
    }

    playAudio(loc.audio);

    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
  }

  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    stopAudio();
  }

  function renderImage() {
    if (!state.images.length) {
      panelImg.removeAttribute("src");
      panelImg.style.display = "none";
      return;
    }
    panelImg.style.display = "block";
    panelImg.src = state.images[state.imageIndex];
  }

  function renderDots() {
    panelDots.innerHTML = "";
    if (state.images.length <= 1) return;
    state.images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === state.imageIndex ? " active" : "");
      panelDots.appendChild(dot);
    });
  }

  function showNextImage(delta) {
    if (!state.images.length) return;
    state.imageIndex =
      (state.imageIndex + delta + state.images.length) % state.images.length;
    renderImage();
    renderDots();
  }

  // ---------- Botones de enlaces (Discord, etc.) ----------

  function renderLinks(loc) {
    panelLinks.innerHTML = "";
    if (!loc.links || !loc.links.length) return;

    loc.links.forEach((link) => {
      const btn = document.createElement("a");
      btn.className = "panel-link-btn";
      btn.textContent = link.label || "Abrir enlace";
      // Si es un enlace de Discord, apunta directamente al esquema de la
      // app (discord://...). Con target="_blank" el navegador abre ESO en
      // una pestaña/contexto nuevo y aparte, así que la pestaña del mapa
      // nunca se toca ni se navega, haga lo que haga ese enlace.
      btn.href = toDiscordAppLink(link.url) || link.url;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      panelLinks.appendChild(btn);
    });
  }

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  // Convierte un enlace https://discord.com/channels/... en el enlace
  // discord://-/channels/... que abre directamente la app de escritorio.
  // Devuelve null si la URL no es de Discord, o si estamos en el móvil
  // (esos enlaces se abren tal cual, con el comportamiento normal del
  // navegador).
  //
  // Por qué en móvil no usamos "discord://": ese esquema solo lo entiende
  // la app de ESCRITORIO. La app de Discord para Android/iOS no lo
  // registra igual, así que intentar abrirlo ahí no hace nada o da error.
  // En cambio, en móvil basta con dejar el enlace https normal: si la app
  // de Discord está instalada, el propio sistema operativo (Universal
  // Links en iOS / App Links en Android) lo abre directamente en la app
  // sin que tengamos que hacer nada especial.
  function toDiscordAppLink(url) {
    if (isMobileDevice()) return null;
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "");
      if (host !== "discord.com" && host !== "discordapp.com") return null;
      return "discord://-" + parsed.pathname + parsed.search;
    } catch (err) {
      return null;
    }
  }

  // ---------- Audio ----------

  function playAudio(src) {
    stopAudio();
    if (!src) return;
    state.audio.src = src;
    const playPromise = state.audio.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch((err) => {
        console.warn("No se pudo reproducir el audio (" + src + "):", err.message);
      });
    }
  }

  function stopAudio() {
    if (!state.audio.paused) state.audio.pause();
    state.audio.currentTime = 0;
    state.audio.removeAttribute("src");
    state.audio.load();
  }

  // ---------- Leyenda de iconos ----------

  function renderLegend() {
    legendList.innerHTML = "";
    Object.keys(ICONS).forEach((key) => {
      const def = ICONS[key];
      const item = document.createElement("li");
      item.innerHTML =
        '<img src="' + def.file + '" alt="" /><span>' + def.label + "</span>";
      legendList.appendChild(item);
    });
  }

  // ---------- Eventos de UI ----------

  document.getElementById("panel-close").addEventListener("click", closePanel);
  document.getElementById("panel-prev").addEventListener("click", () => showNextImage(-1));
  document.getElementById("panel-next").addEventListener("click", () => showNextImage(1));

  document.getElementById("legend-toggle").addEventListener("click", () => {
    document.getElementById("legend").classList.toggle("open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePanel();
      closePlayerLightbox();
    }
    if (e.key === "ArrowLeft" && panel.classList.contains("open")) showNextImage(-1);
    if (e.key === "ArrowRight" && panel.classList.contains("open")) showNextImage(1);
  });

  // ---------- Arranque ----------

  renderLegend();
  loadMap(DEFAULT_MAP);
})();
