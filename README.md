# Mapa Interactivo de la Campaña

Base funcional de un mapa interactivo por capas para tu partida de rol, hecho
con **Leaflet.js** (una librería para mapas interactivos con zoom/paneo,
muy usada precisamente para mapas de fantasía) en HTML/CSS/JS puro, sin
frameworks ni instalación de dependencias. Todo funciona abriendo
`index.html`, sin necesidad de programar nada más (aunque más abajo tienes
opciones para servirlo si prefieres).

## Cómo probarlo

Puedes abrir `index.html` haciendo doble clic (funciona directamente desde
el disco). Si en algún momento el navegador te bloquea algo por seguridad
de "archivo local", la alternativa más simple es servir la carpeta con:

```
npx serve .
```

(ejecutado dentro de la carpeta del proyecto, requiere tener Node.js
instalado, que ya tienes) y abrir la URL que te indique (normalmente
`http://localhost:3000`).

## Qué hay ya construido

- **Tres capas de ejemplo** (`planeta` → `mundo` → `catacumbas`), con
  navegación tipo "migas de pan" (breadcrumb) arriba para moverte entre
  ellas y un botón "Explorar interior ↓" en las ubicaciones que llevan a
  una capa más profunda.
- **8 categorías de icono** distintas (ciudad, aldea, mazmorra, ruinas,
  puerto, cueva, punto de interés, otro) con su propio SVG en
  `assets/icons/`, y una leyenda desplegable que las explica.
- **Panel lateral ("la pestañita")** que se abre al pulsar un icono, con:
  nombre, descripción corta, galería de imágenes con flechas ← → (y
  también funciona con las flechas del teclado), puntitos indicadores, y
  reproducción de un audio en bucle que se detiene y resetea al cerrar el
  panel (con la X, con Escape, o haciendo clic en cualquier otro punto del
  mapa).
- **6 ubicaciones de ejemplo** ya colocadas y funcionando, para que veas el
  patrón antes de sustituirlas por las tuyas.

Todos los mapas y assets de ejemplo son marcadores de posición (SVGs con
texto "placeholder") — la idea es que sustituyas esos archivos por tu
contenido real.

## Estructura del proyecto

```
index.html            La página (normalmente no necesitas tocarla)
css/style.css         Colores y estilos (variables arriba del archivo)
js/config.js          Define las CAPAS (mapas) y las CATEGORÍAS DE ICONO
js/locations.js        <- AQUÍ es donde añadirás casi todo tu contenido
js/app.js              Lógica (Leaflet, panel, audio...). No hace falta tocarlo.
vendor/leaflet/        Copia local de Leaflet (funciona sin internet)
assets/maps/           Imágenes de fondo de cada mapa/capa
assets/icons/          Los 8 iconos SVG de categorías
assets/images/         Imágenes para las galerías de las ubicaciones
assets/audio/          Aquí pondrás tus archivos de música/sonido cortos
```

## Cómo trabajar a partir de aquí

### 1. Sustituir las imágenes de los dos mapas por las tuyas

- Guarda tu **primera imagen** (el mapa de regiones coloreado) como
  `assets/maps/world-map.jpg` (o `.png`), y en `js/config.js` cambia la
  línea `image: "assets/maps/world-map.svg"` del mapa `world` para que
  apunte a tu archivo nuevo.
- Guarda tu **segunda imagen** (el planeta) como
  `assets/maps/planet-map.jpg`, y actualiza igual la entrada `planet` en
  `js/config.js`.
- Cuanta más resolución tenga la imagen, más se podrá hacer zoom sin que
  se pixele. El sistema detecta el tamaño real de la imagen solo, no hace
  falta indicar el ancho/alto en ningún sitio.

### 2. Añadir tus propias ubicaciones

Edita `js/locations.js`. Cada ubicación es un objeto como este:

```js
{
  id: "torre-del-mago",
  map: "world",              // en qué capa aparece (debe existir en config.js)
  x: 512, y: 340,             // posición en píxeles de la imagen (ver más abajo)
  icon: "landmark",           // una de las categorías de config.js
  name: "Torre del Mago Gris",
  shortDescription: "Una torre solitaria en lo alto de un acantilado.",
  images: ["assets/images/locations/torre-del-mago/1.jpg"],
  audio: "assets/audio/locations/torre-del-mago.mp3",
  // descendsTo: "torre-del-mago-interior", // opcional, si tiene su propia capa
}
```

**Cómo averiguar `x` e `y`:** son las coordenadas en píxeles de tu imagen,
igual que en cualquier editor de imágenes (origen arriba-izquierda). Abre tu
imagen del mapa en GIMP, Photoshop, paint.net, o incluso Visor de fotos de
Windows con la regla activada, sitúa el cursor sobre el punto exacto y lee
la posición. También puedes ir colocando marcadores aproximados, recargar
la página y ajustar el número hasta que caigan en el sitio exacto — es un
proceso iterativo normal en este tipo de mapas.

### 3. Añadir imágenes y audio de cada ubicación

- Crea una carpeta por ubicación en `assets/images/locations/<id>/` con
  las fotos/ilustraciones que quieras (tantas como quieras, el carrusel se
  adapta automáticamente al número de imágenes del array).
- Añade un archivo de audio corto (mp3 u ogg) en `assets/audio/locations/`
  y referéncialo en el campo `audio`. Si una ubicación no debe tener
  música, pon `audio: null`.
- Los audios se reproducen en bucle mientras el panel está abierto y se
  detienen del todo al cerrarlo (no se acumulan ni se solapan si abres
  varias ubicaciones seguidas).

### 4. Añadir una nueva capa (por ejemplo, una mazmorra nueva)

1. Pon la imagen de esa capa en `assets/maps/`.
2. En `js/config.js`, añade una entrada nueva dentro de `MAPS`:
   ```js
   "cripta-real": {
     id: "cripta-real",
     name: "Cripta Real",
     image: "assets/maps/cripta-real.jpg",
     parent: "world", // a qué capa se vuelve al pulsar "atrás"
   },
   ```
3. En la ubicación de `js/locations.js` que da acceso a esa cripta, añade
   `descendsTo: "cripta-real"`.
4. Añade en `js/locations.js` las ubicaciones que quieras dentro de esa
   nueva capa, con `map: "cripta-real"`.

Así puedes anidar tantas capas de profundidad como quieras: planeta →
mundo → región → ciudad → mazmorra → sala secreta...

### 5. Añadir una nueva categoría de icono

1. Crea un SVG nuevo en `assets/icons/` (usa cualquiera de los existentes
   como plantilla: son 48×64, con la punta del marcador abajo).
2. Añade una línea en el objeto `ICONS` de `js/config.js`.
3. Úsalo en cualquier ubicación con `icon: "tu-nueva-clave"`.

### 6. Personalizar colores y estilo

Las variables de color están arriba del todo en `css/style.css` (sección
`:root`). Cambiando esos valores cambia toda la paleta (barra superior,
panel lateral, bordes dorados, etc.) sin tocar el resto del archivo.

## Ideas para ampliar más adelante

- Un buscador de ubicaciones por nombre (filtro de texto sobre `LOCATIONS`).
- Marcar ubicaciones como "no descubiertas todavía" (ocultas hasta que el
  DJ las active) guardando un flag `revealed: false` y filtrando en
  `renderMarkers`.
- Distintos "modos" de mapa (político / físico / rutas comerciales) como
  capas superpuestas en el mismo mapa en vez de imágenes distintas,
  usando varios `L.imageOverlay` con control de capas de Leaflet
  (`L.control.layers`).
- Guardar notas privadas del DJ por ubicación en `localStorage`.
