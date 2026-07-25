/*
 * JUGADORES EN EL MAPA
 * --------------------
 * Cada objeto de PLAYERS representa un personaje y dónde está AHORA MISMO.
 * Aparece como una "chapa" redonda con su inicial encima del icono de esa
 * ubicación.
 *
 * Lo importante: también aparece encima de TODAS las ubicaciones que
 * llevan hasta ahí. Por ejemplo, si un jugador está en el Bar de Mad Moxxi
 * (dentro de la capa "sanctuary"), su chapa aparece:
 *   1. Sobre el icono del Bar de Mad Moxxi (en el mapa de Sanctuary)
 *   2. Sobre el icono de "Sanctuary" (en el mapa de Pandora/world, porque
 *      ese icono es el que lleva a la capa "sanctuary")
 *   3. Sobre el icono de "Pandora (Sector Norte-Este)" (en el mapa de la
 *      Galaxia Centurión, porque ese icono lleva a la capa "world")
 * Esto es automático: solo tienes que decir en qué ubicación está cada
 * jugador y la página calcula sola por qué otros iconos "asciende".
 *
 * Campos:
 *   name       -> nombre del jugador o personaje (se usa para el tooltip
 *                 y para la inicial de la chapa)
 *   locationId -> el "id" exacto de una ubicación de js/locations.js
 *                 (tiene que coincidir letra por letra)
 *   color      -> (opcional) color de fondo de su chapa en formato CSS
 *                 (ej. "#e24b4a"). Si lo omites, se le asigna un color
 *                 automáticamente según su posición en esta lista. Se
 *                 ignora si usas "avatar" (ver abajo).
 *   avatar     -> (opcional) ruta a una imagen (png/jpg) para usar como
 *                 chapa en vez del círculo de color con la inicial. Se
 *                 recorta automáticamente en círculo, así que una imagen
 *                 cuadrada centrada en la cara funciona mejor.
 *                 Ejemplo: avatar: "assets/images/players/yoshua.png"
 *
 * AL PULSAR la chapa se abre la ficha del personaje. Estos campos son
 * todos opcionales: si no pones alguno, esa fila simplemente no aparece
 * en la ficha (no hace falta rellenarlos todos).
 *   sheetImage -> ruta a una imagen de cuerpo completo (formato vertical,
 *                 ideal 9:16, ej. 720x1280) para la ficha del personaje.
 *                 Si no la pones, se usa "avatar" en su lugar (o la
 *                 inicial de color si tampoco hay avatar).
 *                 Ejemplo: sheetImage: "assets/images/players/fichas/yoshua.png"
 *   height     -> estatura, como texto libre. Ejemplo: height: "1,85 m"
 *   race       -> raza/especie. Ejemplo: race: "Humano"
 *   gender     -> género. Ejemplo: gender: "Masculino"
 *   traits     -> rasgos físicos destacables, como texto libre.
 *                 Ejemplo: traits: "Cicatriz en el ojo izquierdo, pelo blanco"
 *   extra      -> (opcional) array de filas extra para lo que quieras
 *                 añadir que no encaje en los campos de arriba (ocupación,
 *                 arma favorita, facción...). Cada una es
 *                 { label: "Nombre del campo", value: "Su valor" }.
 *                 Ejemplo:
 *                   extra: [
 *                     { label: "Ocupación", value: "Mecánico" },
 *                     { label: "Facción", value: "Invasores Carmesíes" },
 *                   ]
 *
 * Puedes tener tantos jugadores como quieras aquí, pero por icono solo se
 * mostrarán como mucho 10 chapas a la vez: si en una misma ubicación (o
 * en las que ascienden desde ella) hay más de 10 jugadores, las últimas
 * se agrupan en una chapa "+N".
 *
 * Para mover a un jugador de sitio: cambia su "locationId" y recarga la
 * página. Para quitar a alguien del mapa, borra su objeto de la lista (o
 * coméntalo poniendo "//" delante de cada línea).
 */

const PLAYERS = [
  { name: "Yoshua", locationId: "taller", avatar: "assets/images/players/IconoYoshua.png"},

  { name: "Filianore", locationId: "sanctuary", avatar: "assets/images/players/IconoFilianore.png" },

  { name: "Unknown", locationId: "motel-sunset", avatar: "assets/images/players/IconoUnknown.png" },

  { name: "Stann", locationId: "opportunity", avatar: "assets/images/players/IconoStann.png"},

  { name: "Delsin", locationId: "highlands", avatar: "assets/images/players/IconoDelsin.png" },

  { name: "Elise", locationId: "sanctuary", avatar: "assets/images/players/IconoElise.png",
    color: "#0e8ed2",
    sheetImage: "assets/images/players/FotoElise.jpg",
    height: "1,60m",
    race: "Humano",
    gender: "Mujer",
    traits: "Mujer de rubios cabellos y ojos azules. Desde lejos puede verse que posee prótesis repartidas por el cuerpo, pero manteniendo su belleza característica." 
  },

  { name: "Amelia", locationId: "bar", avatar: "assets/images/players/IconoAmelia.png" },

  { name: "Ayax", locationId: "highlands", avatar: "assets/images/players/IconoAyax.png", },

  { name: "Viper", locationId: "ayuntamiento", avatar: "assets/images/players/IconoViper.png" },

  { name: "Lama", locationId: "highlands", avatar: "assets/images/players/IconoLama.png" },

  { name: "Merik", locationId: "highlands", avatar: "assets/images/players/IconoMerik.png" },

  { name: "Novek", locationId: "highlands", avatar: "assets/images/players/IconoNovek.png" },

  { name: "Valkyr", locationId: "highlands", avatar: "assets/images/players/IconoValkyr.png" },
];
