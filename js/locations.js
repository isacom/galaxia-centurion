/*
 * UBICACIONES
 * -----------
 * Aquí es donde pasarás la mayor parte del tiempo editando a mano.
 * Cada objeto es un marcador (icono) en el mapa.
 *
 * Campos:
 *   id               -> identificador único, sin espacios (ej. "puerto-gris")
 *   map              -> a qué capa pertenece (debe existir en js/config.js -> MAPS)
 *   x, y             -> posición en PÍXELES de la imagen del mapa, medidos
 *                       igual que en cualquier editor de imágenes (GIMP,
 *                       Photoshop, Paint...): x crece hacia la derecha,
 *                       y crece hacia ABAJO, con (0,0) en la esquina
 *                       superior izquierda de la imagen.
 *                       -> Truco para averiguarlos: abre tu imagen del mapa
 *                          con la página ya funcionando, haz click derecho
 *                          en el mapa (ver consola del navegador) o usa
 *                          cualquier editor de imágenes y lee la posición
 *                          del cursor.
 *   icon             -> una de las claves definidas en ICONS (config.js)
 *   name             -> nombre que aparece en la pestaña de información
 *   shortDescription -> descripción corta (1-3 frases)
 *   images           -> array de rutas a imágenes (la galería). Puedes
 *                       poner las que quieras, el carrusel se adapta solo.
 *   audio            -> ruta a un mp3/ogg corto que suena al abrir la
 *                       pestaña, o null si no quieres música en esa ubicación
 *   descendsTo       -> (opcional) id de otro mapa de MAPS al que se viaja
 *                       al pulsar "Explorar interior" (para mazmorras,
 *                       cuevas, edificios con interior propio, etc.)
 *   links            -> (opcional) array de botones que aparecen debajo de
 *                       la descripción, cada uno con "label" (texto del
 *                       botón) y "url" (enlace externo, ej. un canal de
 *                       Discord). Puedes poner tantos como quieras, o
 *                       ninguno (omite el campo o deja un array vacío).
 *                       Ejemplo:
 *                         links: [
 *                           { label: "Canal de Discord", url: "https://discord.com/channels/..." },
 *                           { label: "Hilo de lore", url: "https://discord.com/channels/..." },
 *                         ]
 */

const LOCATIONS = [
  // --- Capa "GALAXIA": un único marcador que lleva al mapa de mundo ---
  {
    id: "planeta-pandora",
    map: "planet",
    x: 660,
    y: 500,
    icon: "landmark",
    name: "Pandora (Sector Norte-Este)",
    shortDescription:
      "Antiguas colonias corporativas abandonadas e infestadas de bandidos y otros peligros. Pulsa \"Explorar interior\" para ver el mapa detallado.",
    images: [
      "assets/images/locations/Pandora/FondoPandora1.jpg",
      "assets/images/locations/Pandora/FondoPandora2.jpg",
      "assets/images/locations/Pandora/FondoPandora3.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Canal del planeta de Pandora", url: "https://discord.com/channels/1103353173567094947/1357096798035906610" },
      { label: "Hilo del espacio exterior", url: "https://discord.com/channels/1103353173567094947/1357101292710920284" },
    ],
    descendsTo: "world",
  },
  {
    id: "estacion-helios",
    map: "planet",
    x: 1380,
    y: 320,
    icon: "landmark",
    name: "Estación Helios",
    shortDescription:
      "Antigua estación de investigación ahora convertida en una de combate para la corporación Hyperion. Pulsa \"Explorar interior\" para ver el mapa detallado.",
    images: [
      "assets/images/locations/Helios/FondoHelios1.jpg",
      "assets/images/locations/Helios/FondoHelios2.jpg",
      "assets/images/locations/Helios/FondoHelios3.jpg"],
    links: [
      { label: "Canal de la estación Helios", url: "https://discord.com/channels/1103353173567094947/1357096392149041392" },
      { label: "Hilo del espacio exterior", url: "https://discord.com/channels/1103353173567094947/1357101414995988643" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    descendsTo: "helios",
  },
  {
    id: "luna-elpis",
    map: "planet",
    x: 1550,
    y: 350,
    icon: "landmark",
    name: "Luna Elpis",
    shortDescription:
      "Luna de Pandora antiguamente habitada por la facción Dahl, luego del despertar de Bayle El Terrible solo quedan tierras devastadas. Pulsa \"Explorar interior\" para ver el mapa detallado.",
    images: [
      "assets/images/locations/Elpis/FondoElpis1.jpg",
      "assets/images/locations/Elpis/FondoElpis2.jpg",
      "assets/images/locations/Elpis/FondoElpis3.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Canal de la luna Elpis", url: "https://discord.com/channels/1103353173567094947/1357096643807412414" },
    ],
    descendsTo: "elpis",
  },
  {
    id: "subsuelo",
    map: "planet",
    x: 1000,
    y: 650,
    icon: "landmark",
    name: "El Subsuelo",
    shortDescription:
      "Pandora alberga muchos misterios, sobretodo en sus interiores. Aunque no se sabe muy bien lo que uno puede encontrarse ahí abajo. Pulsa \"Explorar interior\" para ver el mapa detallado.",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo1.jpg",
      "assets/images/locations/Subsuelo/FondoSubsuelo2.jpg",
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Canal del subsuelo de Pandora", url: "https://discord.com/channels/1103353173567094947/1357102852866310214" },
    ],
    descendsTo: "subsuelo",
  },
  // --- Capa "PANDORA": el mapa principal (basado en tu primera imagen) ---
  {
    id: "sanctuary",
    map: "world",
    x: 1900,
    y: 900,
    icon: "landmark",
    name: "Sanctuary",
    shortDescription:
      "Antiguamente Sanctuary era un poblado y estación minera portátil. Pero con el paso de los años cayó en desuso debido a ciertos acontecimientos, ahora sirve como bastión y fortaleza de los Invasores Carmesíes.",
    images: [
      "assets/images/locations/Sanctuary/FondoSanctuary3.jpg",
      "assets/images/locations/Sanctuary/FondoSanctuary1.jpg",
      "assets/images/locations/Sanctuary/FondoSanctuary2.jpeg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo de Sanctuary", url: "https://discord.com/channels/1103353173567094947/1357100259788198089" },
    ],
    descendsTo: "sanctuary",
  },
  {
    id: "opportunity",
    map: "world",
    x: 450,
    y: 1550,
    icon: "city",
    name: "Ciudad de Opportunity",
    shortDescription:
      "Ciudad construida sobre el mar del Sud-Este de las Highlands, dicha ciudad aún esta en construcción en manos de Hyperion. Este es el proyecto de Jack el Guapo por crear una ciudad pacífica y sin crimen.",
    images: [
      "assets/images/locations/Opportunity/FondoOpportunity1.jpg",
      "assets/images/locations/Opportunity/FondoOpportunity2.jpg",
      "assets/images/locations/Opportunity/FondoOpportunity3.jpg",
    ],
    links: [
      { label: "Hilo de Opportunity", url: "https://discord.com/channels/1103353173567094947/1501924056314810522" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "lynchwood",
    map: "world",
    x: 550,
    y: 700,
    icon: "city",
    name: "Lynchwood",
    shortDescription:
      "Este poblado fue construido hace muchos años por la corporación Dahl para sustentar de techo a los mineros de la época. Aunque hoy en dia este lugar sirve como mina de Eridio para Hyperion mientras es supervisada por la sheriff Nisha.",
    images: [
      "assets/images/locations/Lynchwood/FondoLynchwood1.jpg",
      "assets/images/locations/Lynchwood/FondoLynchwood2.jpg",
      "assets/images/locations/Lynchwood/FondoLynchwood3.jpg",
    ],
    links: [
      { label: "Hilo del poblado de Lynchwood", url: "https://discord.com/channels/1103353173567094947/1357100843358359773" },
      { label: "Comisaría del sheriff", url: "https://discord.com/channels/1103353173567094947/1502418597899669554" },
      { label: "Minas de eridio", url: "https://discord.com/channels/1103353173567094947/1504170176873103450" },
      { label: "Taberna el codo empinado", url: "https://discord.com/channels/1103353173567094947/1380953624288432198" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "junkertown",
    map: "world",
    x: 750,
    y: 550,
    icon: "city",
    name: "Junkertown",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "beatdown",
    map: "world",
    x: 1150,
    y: 400,
    icon: "city",
    name: "Beatdown",
    shortDescription:
      "Esta pequeña ciudad fue alzada como una promesa de un lugar prospero que otorgaría de una gran vida a todo aquel que residiera aquí. Al final nada de eso fue cierto, y ahora este lugar es dominado por bandas de motoristas piromanos que esparcen el terror por toda la ciudad.",
    images: [
      "assets/images/locations/Beatdown/FondoBeatdown1.jpg",
      "assets/images/locations/Beatdown/FondoBeatdown2.jpg",
      "assets/images/locations/Beatdown/FondoBeatdown3.jpg",
    ],
    links: [
      { label: "Hilo de Beatdown", url: "https://discord.com/channels/1103353173567094947/1377734000029728839" },
      { label: "Bar de Pete el Pirómano", url: "https://discord.com/channels/1103353173567094947/1377918012757115002" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "old-new-haven",
    map: "world",
    x: 200,
    y: 920,
    icon: "ruins",
    name: "Old New Haven",
    shortDescription:
      "Este poblado surgió de la nada por colonos pacíficos que trataron de huir de la ola de violencia luego del deshielo de Pandora. Desde cero construyeron una comunidad más o menos pacífica, hasta que Jack El Guapo envió a uno de sus mejores mercenarios para arrasar con todos, a Villhelm. Desde entonces Old New Haven ha sido un lugar desertico y abandonado tan solo usado por Hyperion como torre de comunciaciones.",
    images: [
      "assets/images/locations/OldNewHaven/FondoHaven1.jpg",
      "assets/images/locations/OldNewHaven/FondoHaven2.jpg",
      "assets/images/locations/OldNewHaven/FondoHaven3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "the-forge",
    map: "world",
    x: 850,
    y: 300,
    icon: "village",
    name: "The Forge",
    shortDescription:
      "En este lugar residen complejas instalaciones metalúrgicas y fabricas de armas que se suministran a gran parte de los bandidos y demas facciones de toda Pandora. Este lugar esta dominado por el infame Negan y sus hombres.",
    images: [
      "assets/images/locations/Forge/FondoForge1.jpg",
      "assets/images/locations/Forge/FondoForge2.jpg",
      "assets/images/locations/Forge/FondoForge3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "crater",
    map: "world",
    x: 1050,
    y: 350,
    icon: "village",
    name: "Badass Crater of Badassitude",
    shortDescription:
      "Se desconoce el como se creó este crater, pero ahora lo pueblan principalmente empleados y mercenarios de la empresa Torgue. En el propio centro hay un estadio antiguamente construido a medidas pero que fue tomado y reformado por Torgue con pinchos y EXPLOSIONES. Además hay un circuito de carreras, muy chulo.",
    images: [
      "assets/images/locations/Crater/FondoCrater1.jpg",
      "assets/images/locations/Crater/FondoCrater2.jpg",
      "assets/images/locations/Crater/FondoCrater3.jpg",
    ],
    links: [
      { label: "Hilo principal del crater", url: "https://discord.com/channels/1103353173567094947/1373680231138857081" },
      { label: "Circuito mortal", url: "https://discord.com/channels/1103353173567094947/1376149659088584795" },
      { label: "Arena de Torgue", url: "https://discord.com/channels/1103353173567094947/1380888521396453468" },
      { label: "Almacenes de la arena", url: "https://discord.com/channels/1103353173567094947/1381309224096628757" },
      { label: "Habitación del pánico", url: "https://discord.com/channels/1103353173567094947/1385717272320016557" },
      { label: "Palco VIP de la arena", url: "https://discord.com/channels/1103353173567094947/1385717379472036006" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "bloodshot-stronghold",
    map: "world",
    x: 1225,
    y: 1100,
    icon: "ruins",
    name: "Bloodshot Stronghold",
    shortDescription:
      "En tiempos de paz esto era una presa que suministraba agua y energia hacia las comunidades, luego se convirtió en una guarida para los Ojos Rojos. Dicha facción se conformaba por antiguos miembros de los Lanzas Carmesies de Atlas que no quisieron luchar junto con Roland. Pero acabaron siendo arrasados y destruidos por Jack el Guapo junto con su fortaleza. Ahora ya apenas queda nada allí.",
    images: [
      "assets/images/locations/Bloodshot/FondoBloodshot1.jpg",
      "assets/images/locations/Bloodshot/FondoBloodshot2.jpg",
      "assets/images/locations/Bloodshot/FondoBloodshot3.jpg",
    ],
    links: [
      { label: "Hilo de Stronghold", url: "https://discord.com/channels/1103353173567094947/1357100504110465124" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "motel-sunset",
    map: "world",
    x: 1150,
    y: 700,
    icon: "ruins",
    name: "Motel Sunset",
    shortDescription:
      "Esto antes era un motel para fines turísticos, dicha franquicia de moteles proviene del planeta de Promethea. Pero lo único que queda del hotel son sus habitaciones humedas y mohosas plagadas de psicopatas y bandidos drogadictos.",
    images: [
      "assets/images/locations/MotelSunset/FondoMotel1.jpg",
      "assets/images/locations/MotelSunset/FondoMotel2.jpg",
      "assets/images/locations/MotelSunset/FondoMotel3.jpg",
    ],
    links: [
      { label: "Hilo del Motel", url: "https://discord.com/channels/1103353173567094947/1487858789414604961" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "instalaciones-arquitecto",
    map: "world",
    x: 1025,
    y: 530,
    icon: "ruins",
    name: "Instalaciones del proyecto Arquitecto",
    shortDescription:
      "Instalaciones ocultas en un hangar en mitad del desierto de The Dust antiguamente dirigidas por la corporación Atlas, pero aquí se llevo acabo el Proyecto Arquitecto donde dió origen a la forma actual de la slicer Songbird. Aunque el porque de ello sigue siendo un misterio.",
    images: [
      "assets/images/locations/Arquitecto/FondoArquitecto1.jpg",
      "assets/images/locations/Arquitecto/FondoArquitecto2.jpg",
      "assets/images/locations/Arquitecto/FondoArquitecto3.jpg",
    ],
    links: [
      { label: "Hilo de las instalaciones", url: "https://discord.com/channels/1103353173567094947/1357100223729631323" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "thousand-cuts",
    map: "world",
    x: 500,
    y: 1200,
    icon: "village",
    name: "Thousand Cuts",
    shortDescription:
      "Poblado creado por diversos bandidos y psicópatas los cuales se conglomeraron para formar una pequeña civilización en la que pegarse y matarse entre ellos. Hasta que apareció el Rey Tajo, dirigiendo aquella violencia hacia Hyperion y a sus instalaciones cercanas, de las cuales se desconoce su propósito.",
    images: [
      "assets/images/locations/Cuts/FondoCuts1.jpg",
      "assets/images/locations/Cuts/FondoCuts2.jpg",
      "assets/images/locations/Cuts/FondoCuts3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "¿?",
    map: "world",
    x: 300,
    y: 1200,
    icon: "dungeon",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: ["assets/images/locations/Subsuelo/FondoSubsuelo3.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "reserva",
    map: "world",
    x: 900,
    y: 1400,
    icon: "dungeon",
    name: "Reserva de explotación de vida salvaje",
    shortDescription:
      "Instalaciones de Hyperion sin un uso conocido de las mismas...",
    images: [
      "assets/images/locations/Reserva/FondoReserva1.jpg",
      "assets/images/locations/Reserva/FondoReserva2.jpg",
      "assets/images/locations/Reserva/FondoReserva3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "guarida",
    map: "world",
    x: 1350,
    y: 1600,
    icon: "dungeon",
    name: "Guarida del Capitan Flynt",
    shortDescription:
      "Aquí es donde se encuentra principalmente el Capitan Flynt, quien cuenta con casi miles de bandidos armados hasta los dientes y a psicopatas dispuestos a usar el fuego. El lugar es un mar congelado con diversos buques de guerra y comerciales atascados en el hielo, uno de los buques se encuentra encima de un glaciar y fue modificado por Flynt para que se asemejara a la boca de un dragon para que además escupiera fuego. Muy chulo.",
    images: [
      "assets/images/locations/Guarida/FondoGuarida1.jpg",
      "assets/images/locations/Guarida/FondoGuarida2.jpg",
      "assets/images/locations/Guarida/FondoGuarida3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "southern-shelf",
    map: "world",
    x: 1580,
    y: 1530,
    icon: "village",
    name: "Southern Shelf",
    shortDescription:
      "Diversas aldeas en una bahía congelada al Sur de Three Horns repletas de casas pesqueras pero que ahora son habitadas por bandidos del Capitan Flynt y del culto al halcón de fuego.",
    images: [
      "assets/images/locations/Bay/FondoBay1.jpg",
      "assets/images/locations/Bay/FondoBay2.jpg",
      "assets/images/locations/Bay/FondoBay3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "highlands",
    map: "world",
    x: 800,
    y: 1100,
    icon: "poi",
    name: "Llanuras de las Highlands",
    shortDescription:
      "Páramos verdes y limpios encima de una meseta alta que la separa del desierto de The Dust y de las montañas de Three Horns. Dicho lugar esta controlado por Hyperion con diversas aldeas e instalaciones deplegadas por todos lados.",
    images: [
      "assets/images/locations/Highlands/FondoHighlands1.jpg",
      "assets/images/locations/Highlands/FondoHighlands2.jpg",
      "assets/images/locations/Highlands/FondoHighlands3.jpg",
    ],
    links: [
      { label: "Hilo de las Highlands", url: "https://discord.com/channels/1103353173567094947/1509242399115706400" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "three-horns-divide",
    map: "world",
    x: 1700,
    y: 1050,
    icon: "poi",
    name: "Three Horns Divide",
    shortDescription:
      "Tierras montañas y cavernosas nevadas además de congeladas por el clima, es de los lugares más poco poblados de Pandora. La mayoría de vida que corre por estos páramos son fauna salvaje y territorial dispuesta a luchar con cualquiera.",
    images: [
      "assets/images/locations/Divide/FondoDivide1.jpg",
      "assets/images/locations/Divide/FondoDivide2.jpg",
      "assets/images/locations/Divide/FondoDivide3.jpg",
    ],
    links: [
      { label: "Hilo de Three Horns Divide", url: "https://discord.com/channels/1103353173567094947/1357100786668146800" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "three-horns-valley",
    map: "world",
    x: 1370,
    y: 1050,
    icon: "poi",
    name: "Three Horns Valley",
    shortDescription:
      "Lugar montañoso con cierta humedad y algunas nevadas, suele tener mucha actividad geotérmica con diversos geiseres o volcanes inactivos por las zonas montañosas. Hay diversos bandidos y fauna repartidos por todo el valle.",
    images: [
      "assets/images/locations/Valley/FondoValley1.jpg",
      "assets/images/locations/Valley/FondoValley2.jpg",
      "assets/images/locations/Valley/FondoValley3.jpg",
    ],
    links: [
      { label: "Hilo de Three Horns Valley", url: "https://discord.com/channels/1103353173567094947/1357100749724581969" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "eridium-blight",
    map: "world",
    x: 300,
    y: 500,
    icon: "poi",
    name: "Eridium Blight",
    shortDescription:
      "Al Oeste en el mapa de Pandora se encontraría unas tierras próximas a la cicatriz de Pandora que surgió luego de la muerte de Bayle El Terrible, más allá de Eridium Blight no habría otro lugar habitable, tormentas eléctricas originadas por la energía y fuerza desbordándose de la corteza de Pandora hacían que fuera imposible adentrarse más.",
    images: [
      "assets/images/locations/Eridium/FondoEridium1.jpg",
      "assets/images/locations/Eridium/FondoEridium2.jpg",
      "assets/images/locations/Eridium/FondoEridium3.jpg",
    ],
    links: [
      { label: "Hilo de Eridium Blight", url: "https://discord.com/channels/1103353173567094947/1530707554311606483" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "the-dust",
    map: "world",
    x: 850,
    y: 450,
    icon: "poi",
    name: "Desierto de The Dust",
    shortDescription:
      "Paramos desérticos y arenosos conformados por muchas dunas sin civilización a la vista, atravesar este desierto solo y sin cuidado es casi mortal. Mucha fauna depredadora y bandidos despiadados campan a sus anchas esperando a sus presas.",
    images: [
      "assets/images/locations/Dust/FondoDust1.jpg",
      "assets/images/locations/Dust/FondoDust2.jpg",
      "assets/images/locations/Dust/FondoDust3.jpg",
    ],
    links: [
      { label: "Hilo de The Dust", url: "https://discord.com/channels/1103353173567094947/1502059894151315506" },
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "¿?",
    map: "world",
    x: 250,
    y: 720,
    icon: "dungeon",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: ["assets/images/locations/Subsuelo/FondoSubsuelo3.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "¿?",
    map: "world",
    x: 1450,
    y: 620,
    icon: "dungeon",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: ["assets/images/locations/Subsuelo/FondoSubsuelo3.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },

  // --- Capa "SANCTUARY": mapa interior de las Catacumbas ---
  {
    id: "ayuntamiento",
    map: "sanctuary",
    x: 2200,
    y: 750,
    icon: "poi",
    name: "Ayuntamiento Sanctuary",
    shortDescription:
      "Principal base de operaciones y comunicaciones de los Invasores Carmesíes, además de contar con barracones y diversas salas para distintos fines.",
    images: ["assets/images/locations/Sanctuary/FondoAyuntamiento.jpg"],
    links: [
      { label: "Hilo ayuntamiento", url: "https://discord.com/channels/1103353173567094947/1357100617704669215" },
      { label: "Barracones generales", url: "https://discord.com/channels/1103353173567094947/1364732309873623040" },
      { label: "Puesto de mando", url: "https://discord.com/channels/1103353173567094947/1498690431733600346" },
      { label: "Habitación Lilith/Roland", url: "https://discord.com/channels/1103353173567094947/1369587722213134416" },
      { label: "Habitación Filianore", url: "https://discord.com/channels/1103353173567094947/1364732214167736402" },
      { label: "Sala de torturas", url: "https://discord.com/channels/1103353173567094947/1460587352777818195" },

    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "plaza",
    map: "sanctuary",
    x: 2200,
    y: 1750,
    icon: "poi",
    name: "Plaza Sanctuary",
    shortDescription:
      "Zona central de todo Sanctuary donde transita gran parte de su población, además en dicho centro se puede observar como un obelisco tecnológico de alguna clase.",
    images: ["assets/images/locations/Sanctuary/FondoPlaza.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo de las calles", url: "https://discord.com/channels/1103353173567094947/1461882131474157599" },
    ],
  },
  {
    id: "exterior",
    map: "sanctuary",
    x: 4200,
    y: 2750,
    icon: "poi",
    name: "Exterior Sanctuary",
    shortDescription:
      "Zona árida y desértica, poco hay que ver, solo algunos cadáveres siendo devorados por los cuervos.",
    images: ["assets/images/locations/Sanctuary/FondoExterior.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo exterior", url: "https://discord.com/channels/1103353173567094947/1512824738379206806" },
    ],
  },
  {
    id: "armeria",
    map: "sanctuary",
    x: 4000,
    y: 1250,
    icon: "gunshop",
    name: "Armeria de Marcus",
    shortDescription:
      "Armeria de Sanctuary que cuenta con todo tipo de armas y de municiones. Si deseas algo que mate, probablemente Marcus lo tenga.",
    images: ["assets/images/locations/Sanctuary/FondoArmeria.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo armeria", url: "https://discord.com/channels/1103353173567094947/1357100383654248629" },
      { label: "CATÁLOGO DE ARMAS", url: "https://docs.google.com/document/d/1BSw8b3DVSYWqKRT-CGK8B4Ns_pG1XzvS0Frbt4gwTwU/edit?tab=t.0" },
    ],
  },
  {
    id: "clinica",
    map: "sanctuary",
    x: 1000,
    y: 1600,
    icon: "infirmary",
    name: "Clínica del Doctor Zed",
    shortDescription:
      "El Doctor Zed es infame por su 'curiosa' forma de tratar a sus pacientes, pese a sus tratos hace milagros con su medicina. Y además de ello pone a la venta diversos farmacos.",
    images: ["assets/images/locations/Sanctuary/FondoClinica.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo clínica", url: "https://discord.com/channels/1103353173567094947/1357100454592643212" },
    ],
  },
  {
    id: "bar",
    map: "sanctuary",
    x: 3200,
    y: 2600,
    icon: "bar",
    name: "Bar de Mad Moxxi",
    shortDescription:
      "Uno de los lugares más visitados en toda Pandora, y no me refiero a la entrepierna de su dueña, aquí se goza de muy buen trato a los clientes con diversos platos para comer y distintas bebidas para mayor deleite ante la vista de las camareras. Y es buen lugar para conversar y cotillear.",
    images: ["assets/images/locations/Sanctuary/FondoBar.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo bar", url: "https://discord.com/channels/1103353173567094947/1357100336153886934" },
    ],
  },
  {
    id: "taller",
    map: "sanctuary",
    x: 900,
    y: 2300,
    icon: "garage",
    name: "Taller de Scooter",
    shortDescription:
      "Uno de los mejores talleres de todo el planeta, cosa que no es muy díficil debido a la falta de competencia, aquí en el taller se cuenta con un gran servicio para reparación y tuneo de vehículos, tanto terrestres como naves.",
    images: ["assets/images/locations/Sanctuary/FondoTaller.jpg"],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo taller", url: "https://discord.com/channels/1103353173567094947/1357101235190108384" },
    ],
  },

    // --- Capa "SUBSUELO": el mapa principal (basado en tu primera imagen) ---

  {
    id: "archivos",
    map: "subsuelo",
    x: 1000,
    y: 800,
    icon: "poi",
    name: "Los Archivos",
    shortDescription:
      "Aquí yacen miles de años de conocimientos apilados en bibliotecas casi infinitas, este lugar eridiano se ha respestado y convertido en un pilar inmenso que alberga toda clase de información en muchos formatos. Sin duda un lugar muy valioso para aquel que sepa valorarlo.",
    images: [
      "assets/images/locations/Archivos/FondoArchivos1.jpg",
      "assets/images/locations/Archivos/FondoArchivos2.jpg",
      "assets/images/locations/Archivos/FondoArchivos3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo Archivos", url: "https://discord.com/channels/1103353173567094947/1492736164224827562" },
    ],
  },
  {
    id: "caustic",
    map: "subsuelo",
    x: 1000,
    y: 150,
    icon: "dungeon",
    name: "Caustic Caverns",
    shortDescription:
      "Antigua mina de la corporación que ahora permanece abandonada debajo de la ciudadela portátil de Sanctuary, ahora mismo dichas minas se han convertido en multiples cavernosas que albergan minerales y a fauna hóstil por todos lados. Aun se dice que sus túneles llevan hacia el eridio y algo más...",
    images: [
      "assets/images/locations/Caustic/FondoCaustic1.jpg",
      "assets/images/locations/Caustic/FondoCaustic2.jpg",
      "assets/images/locations/Caustic/FondoCaustic3.jpg",    
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo de las Caustic Caverns", url: "https://discord.com/channels/1103353173567094947/1357100696503189644" },
    ],
  },
  {
    id: "¿?",
    map: "subsuelo",
    x: 1800,
    y: 1400,
    icon: "dungeon",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",    
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",

  },
  {
    id: "camara",
    map: "subsuelo",
    x: 1375,
    y: 800,
    icon: "vault",
    name: "¿?",
    shortDescription:
      "No estais preparados...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "mar",
    map: "subsuelo",
    x: 1375,
    y: 1300,
    icon: "wolf",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "desierto",
    map: "subsuelo",
    x: 1375,
    y: 250,
    icon: "wolf",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "lava",
    map: "subsuelo",
    x: 930,
    y: 1050,
    icon: "wolf",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "nieve",
    map: "subsuelo",
    x: 930,
    y: 500,
    icon: "wolf",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "bosques",
    map: "subsuelo",
    x: 1830,
    y: 530,
    icon: "wolf",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "luna",
    map: "subsuelo",
    x: 1830,
    y: 1050,
    icon: "wolf",
    name: "¿?",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg",
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  // --- Capa "HELIOS": el mapa principal (basado en tu primera imagen) ---

  {
    id: "cañon",
    map: "helios",
    x: 1400,
    y: 750,
    icon: "poi",
    name: "Instalaciones del cañón lunar",
    shortDescription:
      "Una de las armas más versatiles con las que cuenta la Estación Helios es el cañón lunar, un mortero de alta potencia y precisión capaz de enviar cargas de todo tipo a grandes velocidades hacia la superficie de Pandora o cualquier otro planeta. No es un buen método de transporte.",
    images: [
      "assets/images/locations/Helios/FondoHeliosCañon1.jpg",
      "assets/images/locations/Helios/FondoHeliosCañon2.jpg",
      "assets/images/locations/Helios/FondoHeliosCañon3.jpg",   
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo instalaciones", url: "https://discord.com/channels/1103353173567094947/1357099787983257600" },
    ],
  },
  {
    id: "ojo",
    map: "helios",
    x: 1250,
    y: 800,
    icon: "dungeon",
    name: "Ojo de Helios",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg"
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    id: "despacho",
    map: "helios",
    x: 1250,
    y: 650,
    icon: "poi",
    name: "Despacho de Jack",
    shortDescription:
      "Este es el despacho principal de Jack el Guapo, es donde gestiona sus planes de pacificación y dónde asesina con sus propias manos a empleados desleales. Sin duda no quieres estar aquí.",
    images: [
      "assets/images/locations/Helios/FondoHeliosDespacho1.jpg",
      "assets/images/locations/Helios/FondoHeliosDespacho2.jpg",
      "assets/images/locations/Helios/FondoHeliosDespacho3.jpg",   
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo despacho", url: "https://discord.com/channels/1103353173567094947/1357099826931699773" },
    ],
  },
  {
    id: "hangares",
    map: "helios",
    x: 900,
    y: 950,
    icon: "poi",
    name: "Hangares de la estación",
    shortDescription:
      "Es aquí donde se encuentra el control planetario de la estación Helios, además es donde desembarcan y embarcan todas las naves de mercancias y militares.",
    images: [
      "assets/images/locations/Helios/FondoHeliosHangar1.jpg",
      "assets/images/locations/Helios/FondoHeliosHangar2.jpg",
      "assets/images/locations/Helios/FondoHeliosHangar3.jpg",   
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo hangares", url: "https://discord.com/channels/1103353173567094947/1357099503060254760" },
    ],
  },
  {
    id: "oficinas",
    map: "helios",
    x: 1600,
    y: 1350,
    icon: "village",
    name: "Oficinas de la estación",
    shortDescription:
      "Por descubrir...",
    images: [
      "assets/images/locations/Subsuelo/FondoSubsuelo3.jpg"  
    ],
    audio: "assets/audio/locations/SoundEffect.mp3",
    links: [
      { label: "Hilo oficinas", url: "https://discord.com/channels/1103353173567094947/1357099893084393662" },
    ],
  },
];
