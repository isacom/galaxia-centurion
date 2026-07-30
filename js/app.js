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
  const npcLegendList = document.getElementById("npc-legend-list");
  const backButton = document.getElementById("back-button");
  const playerAudio = document.getElementById("player-sound");
  const npcAudio = document.getElementById("npc-sound");
  const uiAudio = document.getElementById("ui-sound");

  // Efectos de sonido genéricos de interfaz (no dependen de una ubicación,
  // jugador o NPC en concreto). Cambia estas rutas si quieres otros sonidos.
  const UI_OPEN_SOUND = "assets/audio/player.mp3";
  const UI_CLOSE_SOUND = "assets/audio/close.mp3";

  const npcPanel = document.getElementById("npc-panel");
  const npcPanelName = document.getElementById("npc-panel-name");
  const npcPanelStats = document.getElementById("npc-panel-stats");
  const npcPanelDesc = document.getElementById("npc-panel-description");
  const npcPanelImg = document.getElementById("npc-panel-image");

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

    playAudioOn(playerAudio, player.sound);

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
    const wasOpen = playerLightbox.classList.contains("open");
    playerLightbox.classList.remove("open");
    playerLightbox.setAttribute("aria-hidden", "true");
    stopAudioOn(playerAudio);
    if (wasOpen) playAudioOn(uiAudio, UI_CLOSE_SOUND);
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

      state.map.on("click", () => {
        closePanel();
        closeNpcPanel();
      });
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
      panelDescend.onclick = () => {
        playAudioOn(uiAudio, UI_OPEN_SOUND);
        loadMap(loc.descendsTo);
      };
    } else {
      panelDescend.style.display = "none";
      panelDescend.onclick = null;
    }

    playAudio(loc.audio);

    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
  }

  function closePanel() {
    const wasOpen = panel.classList.contains("open");
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    stopAudio();
    if (wasOpen) playAudioOn(uiAudio, UI_CLOSE_SOUND);
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
      const discordHref = toDiscordAppLink(link.url);
      btn.href = discordHref || link.url;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      // Solo se reproduce este sonido para enlaces de Discord de verdad
      // (discordHref no es null); otros enlaces se abren en silencio.
      if (discordHref || isDiscordUrl(link.url)) {
        btn.addEventListener("click", () => playAudioOn(uiAudio, UI_OPEN_SOUND));
      }
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
  // Comprueba si una URL es de Discord (discord.com/discordapp.com), sea cual
  // sea el dispositivo. Se usa para decidir si suena el efecto de sonido al
  // pulsar un enlace, incluso en móvil (donde toDiscordAppLink siempre
  // devuelve null porque ahí no usamos el esquema "discord://").
  function isDiscordUrl(url) {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "");
      return host === "discord.com" || host === "discordapp.com";
    } catch (err) {
      return false;
    }
  }

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

  function playAudioOn(el, src) {
    stopAudioOn(el);
    if (!src) return;
    el.src = src;
    const playPromise = el.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch((err) => {
        console.warn("No se pudo reproducir el audio (" + src + "):", err.message);
      });
    }
  }

  function stopAudioOn(el) {
    if (!el.paused) el.pause();
    el.currentTime = 0;
    el.removeAttribute("src");
    el.load();
  }

  // En cuanto un audio termina de sonar solo, se suelta del todo (en vez de
  // dejarlo "pausado al final" cargado en el elemento). Esto evita que
  // algunos navegadores/móviles, al recuperar el foco de la pestaña pasado
  // un rato, intenten "reanudar" ese audio y suene otra vez sin que hayas
  // pulsado nada.
  function armAutoReset(el) {
    el.addEventListener("ended", () => stopAudioOn(el));
  }
  [state.audio, playerAudio, npcAudio, uiAudio].forEach(armAutoReset);

  function playAudio(src) {
    playAudioOn(state.audio, src);
  }

  function stopAudio() {
    stopAudioOn(state.audio);
  }

  // ---------- Listado de personajes (NPCs) ----------

  function renderNpcList() {
    npcLegendList.innerHTML = "";
    (typeof NPCS !== "undefined" ? NPCS : []).forEach((npc) => {
      const item = document.createElement("li");
      item.className = "npc-legend-item";
      item.tabIndex = 0;

      const iconHtml = npc.avatar
        ? '<img src="' + npc.avatar + '" alt="" />'
        : '<span class="npc-legend-initial">' + getInitial(npc.name) + "</span>";
      item.innerHTML =
        '<span class="npc-legend-icon">' + iconHtml + "</span><span>" + npc.name + "</span>";

      item.addEventListener("click", () => openNpcPanel(npc));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openNpcPanel(npc);
        }
      });
      npcLegendList.appendChild(item);
    });
  }

  // ---------- Panel de un NPC (a la izquierda) ----------

  function openNpcPanel(npc) {
    npcPanelName.textContent = npc.name || "";

    if (npc.image) {
      npcPanelImg.style.display = "block";
      npcPanelImg.src = npc.image;
    } else {
      npcPanelImg.removeAttribute("src");
      npcPanelImg.style.display = "none";
    }

    // Especialización y facción van encima, la descripción se queda
    // siempre al final del todo.
    npcPanelStats.innerHTML = "";
    if (npc.specialization) {
      npcPanelStats.appendChild(buildPlayerStatRow("Especialización", npc.specialization));
    }
    if (npc.faction) {
      npcPanelStats.appendChild(buildFactionStatRow(npc));
    }

    npcPanelDesc.textContent = npc.shortDescription || "";

    playAudioOn(npcAudio, npc.sound);

    npcPanel.classList.add("open");
    npcPanel.setAttribute("aria-hidden", "false");
  }

  // Fila "Facción" de la ficha de un NPC: el nombre de la facción con el
  // icono de su símbolo al lado. El icono sale de (en este orden):
  //   1. npc.factionIcon, si lo has puesto en ese NPC en concreto.
  //   2. El registro FACTIONS de js/config.js, buscando por el nombre
  //      exacto de npc.faction (útil si varios NPCs comparten facción).
  //   3. Un icono genérico de marcador de posición, si no hay ninguno.
  function buildFactionStatRow(npc) {
    const dt = document.createElement("dt");
    dt.textContent = "Facción";

    const dd = document.createElement("dd");
    dd.className = "npc-faction-value";

    const icon = document.createElement("img");
    icon.className = "npc-faction-icon";
    icon.alt = "";
    icon.src = getFactionIcon(npc);
    dd.appendChild(icon);

    const label = document.createElement("span");
    label.textContent = npc.faction;
    dd.appendChild(label);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(dt);
    fragment.appendChild(dd);
    return fragment;
  }

  function getFactionIcon(npc) {
    if (npc.factionIcon) return npc.factionIcon;
    const factions = typeof FACTIONS !== "undefined" ? FACTIONS : {};
    const def = factions[npc.faction];
    if (def && def.icon) return def.icon;
    return typeof FACTION_ICON_PLACEHOLDER !== "undefined"
      ? FACTION_ICON_PLACEHOLDER
      : "assets/icons/factions/placeholder.svg";
  }

  function closeNpcPanel() {
    const wasOpen = npcPanel.classList.contains("open");
    npcPanel.classList.remove("open");
    npcPanel.setAttribute("aria-hidden", "true");
    stopAudioOn(npcAudio);
    if (wasOpen) playAudioOn(uiAudio, UI_CLOSE_SOUND);
  }

  // ---------- Eventos de UI ----------

  document.getElementById("panel-close").addEventListener("click", closePanel);
  document.getElementById("panel-prev").addEventListener("click", () => showNextImage(-1));
  document.getElementById("panel-next").addEventListener("click", () => showNextImage(1));

  document.getElementById("npc-toggle").addEventListener("click", () => {
    const nowOpen = document.getElementById("npc-legend").classList.toggle("open");
    if (nowOpen) playAudioOn(uiAudio, UI_OPEN_SOUND);
  });

  document.getElementById("npc-panel-close").addEventListener("click", closeNpcPanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePanel();
      closePlayerLightbox();
      closeNpcPanel();
    }
    if (e.key === "ArrowLeft" && panel.classList.contains("open")) showNextImage(-1);
    if (e.key === "ArrowRight" && panel.classList.contains("open")) showNextImage(1);
  });

  // ---------- Arranque ----------

  renderNpcList();
  loadMap(DEFAULT_MAP);
})();
