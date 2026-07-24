/*
 * CONFIGURACIÓN DE MAPAS (CAPAS POR PROFUNDIDAD)
 * ------------------------------------------------
 * Cada entrada de MAPS es una "capa" del mundo. Puedes tener tantas como
 * quieras: el planeta entero, el mapa de superficie, y un mapa distinto
 * por cada mazmorra/cueva/ciudad subterránea.
 *
 * Campos de cada mapa:
 *   id         -> identificador único (se usa en locations.js como "map")
 *   name       -> nombre que se muestra en la barra de navegación (breadcrumb)
 *   image      -> ruta a la imagen de fondo. Sustituye el .svg de ejemplo por
 *                 tu imagen real (.jpg/.png) y cambia solo esta ruta.
 *   parent     -> id del mapa "padre" (al que se vuelve con el botón Atrás).
 *                 null si es la capa más alta (el planeta).
 *   background -> (opcional) pinta un fondo detrás de la imagen del mapa
 *                 (se ve en los bordes y al alejar el zoom). Valores
 *                 disponibles: "starfield" (cielo estrellado, para capas
 *                 espaciales), "desert" (arena/dunas, para capas
 *                 desérticas) o "alien" (gris con líneas moradas, para
 *                 capas de tecnología alienígena/subterráneas). Omite el
 *                 campo para el fondo oscuro liso por defecto. Para añadir
 *                 un estilo nuevo, mira el comentario junto a
 *                 ".bg-starfield" en css/style.css.
 *
 * PARA AÑADIR UNA NUEVA CAPA (ej. una mazmorra nueva):
 *   1. Copia una imagen del mapa de esa mazmorra a assets/maps/
 *   2. Añade aquí una entrada nueva con un id único y parent: 'world'
 *      (o el id del mapa desde el que se entra)
 *   3. En locations.js, en la ubicación que da acceso a esa mazmorra,
 *      añade la propiedad "descendsTo: 'tu-nuevo-id'"
 */

const MAPS = {
  planet: {
    id: "planet",
    name: "Galaxia Centurión",
    image: "assets/maps/MapaExterior.png",
    parent: null,
    background: "starfield",
  },
  world: {
    id: "world",
    name: "Pandora (Sector Norte-Este)",
    image: "assets/maps/MapaPandora.png",
    parent: "planet",
    background: "desert",
  },
  subsuelo: {
    id: "subsuelo",
    name: "El subsuelo",
    image: "assets/maps/MapaSubsuelo.png",
    parent: "planet",
    background: "alien",
  },
  elpis: {
    id: "elpis",
    name: "Luna Elpis",
    image: "assets/maps/ObraMaestra.png",
    parent: "planet",
    background: "starfield",
  },
  helios: {
    id: "helios",
    name: "Estación Helios",
    image: "assets/maps/MapaHelios.png",
    parent: "planet",
    background: "starfield",
  },
  "sanctuary": {
    id: "sanctuary",
    name: "Sanctuary",
    image: "assets/maps/MapaSanctuary.png",
    parent: "world",
    background: "desert",
  },
};

// Capa que se muestra al abrir la página.
const DEFAULT_MAP = "planet";

/*
 * CATEGORÍAS DE ICONOS
 * --------------------
 * Cada ubicación en locations.js usa un "icon" de esta lista. Puedes
 * añadir tus propias categorías: crea un SVG nuevo en assets/icons/
 * (usa los existentes como plantilla, son 48x64 con la punta abajo)
 * y añade una línea aquí.
 */
const ICONS = {
  city: { file: "assets/icons/city.svg", label: "Ciudad" },
  village: { file: "assets/icons/village.svg", label: "Aldea" },
  dungeon: { file: "assets/icons/dungeon.svg", label: "Mazmorra" },
  ruins: { file: "assets/icons/ruins.svg", label: "Ruinas" },
  landmark: { file: "assets/icons/landmark.svg", label: "Punto de interés" },
  poi: { file: "assets/icons/poi.svg", label: "Otro" },
  infirmary: { file: "assets/icons/infirmary.svg", label: "Enfermería" },
  gunshop: { file: "assets/icons/gunshop.svg", label: "Armería" },
  bar: { file: "assets/icons/bar.svg", label: "Bar" },
  garage: { file: "assets/icons/garage.svg", label: "Taller mecánico" },
  wolf: { file: "assets/icons/wolf.svg", label: "¿?" },
  vault: { file: "assets/icons/vault.png", label: "Cámara" },
};
