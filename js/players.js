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
 *                 Si no la pones, se muestra un placeholder (el icono
 *                 pequeño de la cabecera es independiente y no cambia).
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
 *   sound      -> (opcional) ruta a un audio corto (mp3/ogg) que suena al
 *                 abrir la ficha de este jugador (un pequeño jingle, una
 *                 frase de su voz, etc.). Se detiene solo al cerrar la
 *                 ficha. Si no lo pones, no suena nada.
 *                 Ejemplo: sound: "assets/audio/players/yoshua.mp3"
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
  { name: "Yoshua", locationId: "taller", avatar: "assets/images/players/IconoYoshua.png", sound: "assets/audio/player.mp3",
    sound: "assets/audio/player.mp3",
    color: "#50511f",
    sheetImage: "assets/images/players/FotoYoshua.jpg",
    height: "1,55m",
    race: "Humano",
    gender: "Hombre",
    traits: "Cabeza Afeitada, Barba de candado Estilizada y con un clip de pelo  sobresaliendo ligeramente de ella, Narizon." 
  
  },

  { name: "Filianore Oneiros", locationId: "sanctuary", avatar: "assets/images/players/IconoFilianore.png",
    sound: "assets/audio/player.mp3",
    color: "#f9edbf",
    sheetImage: "assets/images/players/FotoFilianore.jpg",
    height: "1,81m",
    race: "¿Humano?",
    gender: "Mujer",
    traits: "Es alta, de cabello rubio platinado y belleza etérea, Lleva una venda cubriendo sus ojos debido a la pérdida de su vista a manos de un combate del pasado, el color de estos fue azul zafiro actualmente lucen apagados y vacios.",
    extra: [
      { label: "Edad", value: "Entre los 19 a 23 años aparentes, podría tener milenios debido al encapsulamiento de carbono." },
      { label: "Fuerza", value: "Oscuro potencialmente, Luminoso estable, [desconocido]." },
      { label: "Personalidad", value: "Serena, tranquila, movimientos refinados, palabras suaves como una nota de canción, presencia cálida y gentileza sumada a nobleza en cada postura." },
    ]
  },

  { name: "Unknown", locationId: "motel-sunset", avatar: "assets/images/players/IconoUnknown.png", sound: "assets/audio/player.mp3",},

  { name: "Stann", locationId: "opportunity", avatar: "assets/images/players/IconoStann.png", sound: "assets/audio/player.mp3",},

  { name: "Delsin Rowe", locationId: "highlands", avatar: "assets/images/players/IconoDelsin.png",
    sound: "assets/audio/player.mp3",
    color: "#ce800b",
    sheetImage: "assets/images/players/FotoDelsin.jpg",
    height: "1,78m",
    race: "Humano",
    gender: "Hombre",
    traits: "Pelo castaño corto y ligeramente despeinado, cubierto generalmente por un gorro. Posee facciones marcadas, con una complexión atlética y definida. Cuenta con tatuajes en el brazo izquierdo y una cadena enrollada al derecho." 
  },

  { name: "Elise Bernadeth", locationId: "plaza", avatar: "assets/images/players/IconoElise.png", 
    sound: "assets/audio/player.mp3",
    color: "#0e8ed2",
    sheetImage: "assets/images/players/FotoElise.jpg",
    height: "1,60m",
    race: "Humano",
    gender: "Mujer",
    traits: "Mujer de rubios cabellos y ojos azules. Desde lejos puede verse que posee prótesis repartidas por el cuerpo, pero manteniendo su belleza característica."
  },

  { name: "Amelia Shan", locationId: "bar", avatar: "assets/images/players/IconoAmelia.png",
    sound: "assets/audio/player.mp3",
    color: "#860cab",
    sheetImage: "assets/images/players/FotoAmelia.jpg",
    height: "1,71m",
    race: "Humano",
    gender: "Mujer",
    traits: "Heterocromía (verde y cian), pecas, pelo morado.",
    extra: [
      { label: "Karma", value: "Neutral luminoso" },
      { label: "Facción", value: "Invasores Carmesíes, Orden Jedi" },
    ]
   },

  { name: "Ayax", locationId: "highlands", avatar: "assets/images/players/IconoAyax.png",
    sound: "assets/audio/player.mp3",
    color: "#7a0800",
    sheetImage: "assets/images/players/FotoAyax.jpg",
    height: "1.75m",
    race: "Saiyajin",
    gender: "Hombre",
    traits: "Es un hombre adulto de complexión atlética y musculosa, con varias marcas y cicatrices por todo su cuerpo. Tiene un tono de piel bronceado u oscuro. Sus facciones son muy afiladas, acompañadas de ojos oscuros que casi siempre muestran una expresión severa, fría o arrogante. Además posee cabello negro y erizado que apunta en varias direcciones hacia arriba.",
    extra: [
      { label: "Detalles extras", value: "A simple vista destacan dos elementos clave, un pendiente de color verde con bordes dorados en su oreja izquierda y un anillo dorado con una gema de color rojizo en el dedo anular de su mano derecha." },
    ]
   },

  { name: "Viper", locationId: "ayuntamiento", avatar: "assets/images/players/IconoViper.png",sound: "assets/audio/player.mp3", },

  { name: "Lama", locationId: "highlands", avatar: "assets/images/players/IconoLama.png", sound: "assets/audio/player.mp3", },

  { name: "Merik", locationId: "highlands", avatar: "assets/images/players/IconoMerik.png", sound: "assets/audio/player.mp3", },

  { name: "Novek", locationId: "highlands", avatar: "assets/images/players/IconoNovek.png", sound: "assets/audio/player.mp3",},

  { name: "Valkyr", locationId: "highlands", avatar: "assets/images/players/IconoValkyr.png", sound: "assets/audio/player.mp3", },
];
