/*
 * PERSONAJES (NPCs) DEL MUNDO
 * ---------------------------
 * Cada objeto de NPCS aparece en el listado "Personajes" (el botón de
 * arriba a la derecha, donde antes estaba la leyenda de iconos). Al
 * pulsar su nombre se abre un panel a la IZQUIERDA de la pantalla —igual
 * que el panel de una ubicación, pero al otro lado— con su imagen,
 * descripción, y un sonido que se reproduce al abrirlo y se detiene al
 * cerrarlo.
 *
 * Campos:
 *   name             -> nombre del NPC (aparece en el listado y en el panel)
 *   avatar           -> (opcional) ruta a una imagen pequeña y cuadrada
 *                       para el círculo del listado. Si no la pones, se
 *                       muestra la inicial de su nombre.
 *   specialization   -> (opcional) a qué se dedica el NPC, como texto
 *                       libre (ej. "Mercader", "Sicario", "Científica").
 *                       Aparece en el panel justo debajo del nombre.
 *   faction          -> (opcional) nombre de su facción. Aparece debajo
 *                       de "specialization", con el icono de esa facción
 *                       al lado.
 *   factionIcon      -> (opcional) ruta al icono de ESE símbolo de
 *                       facción para ESTE NPC (ej. "assets/icons/
 *                       factions/carmesies.svg"). Es la forma más directa
 *                       de poner tu propio icono: solo pon esta ruta y
 *                       listo. Si lo omites, se busca automáticamente en
 *                       el registro FACTIONS de js/config.js por el
 *                       nombre exacto de "faction" (útil si varios NPCs
 *                       comparten facción y no quieres repetir la ruta
 *                       en cada uno). Si tampoco está ahí, se usa un
 *                       icono genérico de marcador de posición.
 *   shortDescription -> descripción corta (1-3 frases). Aparece al
 *                       final del panel, debajo de todo lo demás.
 *   image            -> (opcional) ruta a UNA imagen (formato vertical,
 *                       igual que la de los jugadores) para el panel.
 *                       Si la omites, no se muestra ninguna imagen.
 *   sound            -> (opcional) ruta a un audio corto que suena al
 *                       abrir su panel y se detiene al cerrarlo.
 *
 * Para añadir un NPC nuevo, copia uno de estos objetos de ejemplo y
 * rellena sus datos. Para quitarlo del listado, borra su objeto (o
 * coméntalo poniendo "//" delante de cada línea).
 */

const NPCS = [
  {
    name: "Ariane Yeong",
    avatar: "assets/images/npcs/ariane/IconoAriane.jpg",
    specialization: "Enfermería",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Mujer humana de 1,70m de altura con cabello corto ceniciento, ojos rojos carmesíes intensos, rasgos juveniles de una chica de 19 o 20 años y piel increíblemente pálida y suave. Su actitud es algo infantil e inexperta en relaciones sociales pese a que más o menos se camufla ante su actitud tan buena y ciertos conocimientos bastante avanzados para alguien de su edad.",
    image: "assets/images/npcs/ariane/FotoAriane.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Song Natalie (Athena)",
    avatar: "assets/images/npcs/athena/IconoAthena.jpg",
    specialization: "Combatiente",
    faction: "N/A",
    factionIcon: "assets/icons/factions/neutral.png",
    shortDescription: "Mujer humana de 1,80m de rostro curtido con pómulos muy definidos, ojos azul oscuro, pelo corto azul oscuro y varias cicatrices por su cuerpo. Presenta también un tatuaje en el brazo del símbolo del Omega junto a un casco de gladiador.",
    image: "assets/images/npcs/athena/FotoAthena.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Brick",
    avatar: "assets/images/npcs/brick/IconoBrick.jpg",
    specialization: "Culturismo, Peleas Callejeras",
    faction: "Invasores Carmesíes, Los Tajos",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre adulto de 2m de altura y con una musculatura abrumadora, se puede ver que su piel está repleta de cicatrices y estrias debido al enorme creciente de sus músculos. Lleva el pelo rapado y un chaleco vaquero junto con la patita disecada de un perro en dicha prenda.",
    image: "assets/images/npcs/brick/FotoBrick.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "CL4P-TP (Claptrap)",
    avatar: "assets/images/npcs/claptrap/IconoClaptrap.jpg",
    specialization: "Algo, no se...",
    faction: "Invasores Carmesíes (creo)",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Droide de marca Hyperion multifunciones de 1m de alto que cuenta con brazos robóticos delgados y una rueda a modo de método de desplazamiento. Lo más probable es que al encotrartelo y tenerlo cerca ya a los 10 segundos tengas ganas de patearlo.",
    image: "assets/images/npcs/claptrap/FotoClaptrap.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Denia",
    avatar: "assets/images/npcs/denia/IconoDenia.jpg",
    specialization: "¿?",
    faction: "¿?, Hyperion",
    factionIcon: "assets/icons/factions/hyperion.png",
    shortDescription: "Cabello rosado claro, suave y ligeramente ondulado, ojos grandes de tonalidad rojiza-rosada, que alternan entre una inocencia casi infantil y una mirada inquietante dependiendo de su estado, complexión pequeña y delicada.",
    image: "assets/images/npcs/denia/FotoDenia.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "FL4K",
    avatar: "assets/images/npcs/flak/IconoFlak.jpg",
    specialization: "Domador de bestias",
    faction: "Desconocida",
    factionIcon: "assets/icons/factions/neutral.png",
    shortDescription: "Droide humanoide de 1,90m de alto con una lente verde a modo de óptica, el propósito de su modelo o su fabricante son desconocidos. Suele vestir sin motivo aparente una chaqueta verde maltrecha con capucha y pantalones sucios, además de ello parece usar partes de otros droides como reemplazos.",
    image: "assets/images/npcs/flak/FotoFlak.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Capitan Flynt",
    avatar: "assets/images/npcs/flynt/IconoFlynt.jpg",
    specialization: "Quemar y aplastar cosas",
    faction: "Bandidos de Flynt",
    factionIcon: "assets/icons/factions/flynt.png",
    shortDescription: "Hombre corpulento de 2m de altura con un traje blindado y un casco metálico de chatarra con cuernos vikingos, lo único que se puede ver de su rostro son dos ojos rojos brillantes.",
    image: "assets/images/npcs/flynt/FotoFlynt.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Gaige",
    avatar: "assets/images/npcs/gaige/IconoGaige.jpg",
    specialization: "Robótica, Ingeniería eléctrica",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Mujer humana de 1,69m de estatura con unos ojos verdes y un cabello semilargo pelirrojo natural, suele llevar dos coletas en cada lado. Su piel es algo blanquecina debido a que no sale mucho a tomar el sol, también suele llevar alguna tirita producto de sus accidentes con sus proyectos de ciencias. Su vestimenta suele ser bastante juvenil y de colegiala, llevando falda corta con calzas blancas y negras, además de un top rojo con una calavera en medio y una chaqueta vaquera, también lleva zapatillas casuales, unos anteojos por encima del pelo y su brazo izquierdo está sustituido por uno mecánico construido por ella misma. Huele bastante a caramelo y a soldadura.",
    image: "assets/images/npcs/gaige/FotoGaige.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "¿?",
    avatar: "assets/images/npcs/ira/IconoIra.jpg",
    specialization: "¿?",
    faction: "Desconocida",
    factionIcon: "assets/icons/factions/neutral.png",
    shortDescription: "Lo que no tiene reflejo no puede verse.",
    image: "assets/images/npcs/ira/FotoIra.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Jack El Guapo",
    avatar: "assets/images/npcs/jack/IconoJack.jpg",
    specialization: "Programación, Aterrorizar",
    faction: "Hyperion",
    factionIcon: "assets/icons/factions/hyperion.png",
    shortDescription: "Hombre humano de 1,75m de altura de cabello castaño engominado, con una máscara que simula las facciones de su rostro, heterocromía con un ojo verde y otro azul y suele llevar un traje gris muy caro, un chaleco y un jersei por debajo.",
    image: "assets/images/npcs/jack/FotoJack.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Janey Springs",
    avatar: "assets/images/npcs/janey/IconoJaney.jpg",
    specialization: "Ingeniería aeroespacial",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Mujer huamana de 1,65m de altura con un cabello corto rubio descolorido, sus ojos son marrones, su piel es algo pálida y tiene muchas cicatrices de quemaduras por el lateral derecho del cuello, del torso y del brazo. Suele vestir ropa de mecánica usando chalecos y pantalones vaqueros casuales.",
    image: "assets/images/npcs/janey/FotoJaney.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Judy Zarpedon (Judith)",
    avatar: "assets/images/npcs/judith/IconoJudith.jpg",
    specialization: "Efectos especiales, Neurodanzas",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Chica de 1,71m de altura con rasgos asiáticos, cabello corto de colores morados y verdes con una lateral rapado, lleva normalmente un top blanco y un mono de trabajo negro que nunca se pone hasta arriba. Tiene muchos tatuajes por todo el cuerpo y se ve como tiene un implante en el lateral de la cabeza.",
    image: "assets/images/npcs/judith/FotoJudith.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Rick Grimes (Krieg)",
    avatar: "assets/images/npcs/krieg/IconoKrieg.jpg",
    specialization: "Agricultura, LOCURA",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre humano de 2m de altura, sus rasgos no son visibles para la mayoría debido a su máscara la cual porta el símbolo de la cámara, un filtro de aire el cual no usa y un ojo tapado. Pero por debajo de ella tiene la cabeza rapada junto a ojos marrones y un rostro lleno de cicatrices al igual que todo su cuerpo, el cual también tiene una musculatura muy definida aunque uniforme en ciertas áreas debido a desnutrición ocasional.",
    image: "assets/images/npcs/krieg/FotoKrieg.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Lilith",
    avatar: "assets/images/npcs/lilith/IconoLilith.jpg",
    specialization: "Contrabando",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Sirena de 1,72m de altyra con ojos amarillos debido a su genética, cabello pelirrojo natural, tatuajes con forma de oleaje violento por su cuerpo, labios carnosos y rasgos de vejez pero conservando parte de la belleza de su juventud como sus pomulos.",
    image: "assets/images/npcs/lilith/FotoLilith.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Marcus Kincaid",
    avatar: "assets/images/npcs/marcus/IconoMarcus.jpg",
    specialization: "Armamentística, Negocios",
    faction: "Invasores Carmesíes (O quien pague)",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre humano obeso de 1,78m de altura con un cabello castaño corto acicalado hacia atrás y canoso, suele llevar perilla. Su vestimenta varía pero suele ostentar el llevar una chaqueta de cuero marrón y unos pantalones marrones claros.",
    image: "assets/images/npcs/marcus/FotoMarcus.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Mordecai Artemisa",
    avatar: "assets/images/npcs/mordecai/IconoMordecai.jpg",
    specialization: "Reconocimiento, Cetrería",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre humano de 1,90m de altura con constitución flaca, pelo largo mohicano grisáceo por la edad, barba sin bigote larga y afilada, conjunto de tela rojo y grisáceo ligero, pañuelo rojo sobre la cabeza y anteojos para que no le moleste el sol, viento ni entorno. Suele llevar consigo siempre a su alimentabasuras (su pájaro Bloodwing).",
    image: "assets/images/npcs/mordecai/FotoMordecai.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Mad Moxxy",
    avatar: "assets/images/npcs/moxxy/IconoMoxxy.jpg",
    specialization: "¿?",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Mujer humana de 1,66m de altura con cabello largo castaño recogido, gargantilla en el cuello con casquillos de balas de francotirador colgando, vestimenta de maestra de circo solo que mucho más revelador, lleva siempre maquillaje por todo el rostro, un sombrerito de copa con pluma, tatuajes por diversas secciones de su cuerpo al descubierto y una media de rejilla y otra a rayas. Su edad es un misterio, pero no se la preguntaría.",
    image: "assets/images/npcs/moxxy/FotoMoxxy.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Negan Smith",
    avatar: "assets/images/npcs/negan/IconoNegan.jpg",
    specialization: "Imponer",
    faction: "Los Salvadores, Hyperion",
    factionIcon: "assets/icons/factions/hyperion.png",
    shortDescription: "Hombre humano de 1,80m de altura con cabello negro y canoso, lleva una barba de 2 meses tambien canosa, su edad ronda entre los 40 y 50 años. Suele vestir una chaqueta de cuero negra, pantalones vaqueros y zapatos negros con tacón, además de que nunca sale sin su bate cubierto con alambre de espino.",
    image: "assets/images/npcs/negan/FotoNegan.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Nisha Kadam",
    avatar: "assets/images/npcs/nisha/IconoNisha.jpg",
    specialization: "Tiradora",
    faction: "Pueblo de Lynchwood, Hyperion",
    factionIcon: "assets/icons/factions/hyperion.png",
    shortDescription: "Mujer humana de 1,79m de altura con ojos rojos intensos y brillantes, labios carnosos y con pintalabios rojo, pestañas bien largas, piel blanca y cabello ceniciento. Suele vestirse con un chaleco de cuero, una camisa blanca, pantalones de cuero ajustados, botas marrones con tacón y un sombrero vaquero de color negro.",
    image: "assets/images/npcs/nisha/FotoNisha.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Pauline",
    avatar: "assets/images/npcs/pauline/IconoPauline.jpg",
    specialization: "Gestión administrativa",
    faction: "Empresas Torgue",
    factionIcon: "assets/icons/factions/torgue.png",
    shortDescription: "Niña humana de 1,30m de altura con ojos verdes y cabellos rubios recogidos mediante dos coletas. Su rostro se muestra siempre muy taciturno y palido, suele llevar un vestido de colores negro y blanco con logos de la empresa Torgue y zapatos que le llegan hasta las piernas a modo de medias.",
    image: "assets/images/npcs/pauline/FotoPauline.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Rhys Stronkford",
    avatar: "assets/images/npcs/rhys/IconoRhys.jpg",
    specialization: "Finanzas",
    faction: "Hyperion",
    factionIcon: "assets/icons/factions/hyperion.png",
    shortDescription: "Hombre humano de 1,70m de altura con un ojo de color marrón y otro cibernético con el iris de color azul, su cabello es castaño y suele engominarlo de forma similar a Jack El Guapo. Su vestimenta consta de una camisa azul claro, chaleco corporativo, corbata roja y pantalones de traje de oficina. Además de llo cuenta con un brazo cibernético de marca Hyperion en su brazo izquierdo.",
    image: "assets/images/npcs/rhys/FotoRhys.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Roland",
    avatar: "assets/images/npcs/roland/IconoRoland.jpg",
    specialization: "Liderazgo, Estrategía miltiar",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre humano de 1,80m con piel oscura, constitución media pero altamente musculada, pomulos definidos, ojos marrones, calvo y labios grandes. Sue llevar uniformes y armaduras militares dependiendo de la ocasión además de una boina con el logo de los invasores carmesíes.",
    image: "assets/images/npcs/roland/FotoRoland.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Salvador",
    avatar: "assets/images/npcs/salvador/IconoSalvador.jpg",
    specialization: "El crimen",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre humano de 1,55m de altura con la piel bronceada y una constitución ancha. Su pelo es de color azul en cresta con una barba sin parte del bigote, tiene bastante pelo por todo el cuerpo y los rasgos de su rostro son de procedencia sud-americana. Lleva piercings en las orejas y presenta un caracter rudo mediante sus facciones marcadas.",
    image: "assets/images/npcs/salvador/FotoSalvador.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Scooter",
    avatar: "assets/images/npcs/scooter/IconoScooter.jpg",
    specialization: "Mecánica, Chapuzas",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre humano de 1,67m de altura con la piel siempre manchada de aceite de motor, aparenta tener entre 20 y 30 años. Suele vestir un chaleco marrón, camisa verde, una gorra con el logo de su taller y unos pantalones color café.",
    image: "assets/images/npcs/scooter/FotoScooter.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Song So Mi (Songbird)",
    avatar: "assets/images/npcs/songbird/IconoSongbird.jpg",
    specialization: "Slicing",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Mujer cyborg constructa cuyo cuerpo ha estado reconstruido al completo para simular su antigua yo, hoy en día el cuerpo de Songbird es más de un 95% compuesto por implantes. Cuenta con un pelo protésico semilargo de color violeta, sus ojos son achinados mostrando rasgos coreanos, sus ojos son de color marrón y muestra una complexión media. Se puede ver como detrás en la nuca su cabeza está casi completamente sustituida por metal y resortes hidráulicos, con solo el cerebro intacto en su interior. Su cuerpo tiene una epidermis artificial de polímero, aunque su parte trasera y espalda tiene al descubierto su parte cyborg..",
    image: "assets/images/npcs/songbird/FotoSongbird.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Doctora Patricia Tannis",
    avatar: "assets/images/npcs/tannis/IconoTannis.jpg",
    specialization: "Arqueología, Historia",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Mujer humana de 1,71m de altura con cabello castaño corto, ojos verdes y labios carnosos. Su complexión es media y suele llevar anteojos sobre la frente además de una gabardina roja junto con un top negro muy sucio y pantalones de cuero marrones.",
    image: "assets/images/npcs/tannis/FotoTannis.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Tina Chiquitina",
    avatar: "assets/images/npcs/tina/IconoTina.jpg",
    specialization: "Explosivos",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Niña humana de 1,32m de altura con pelo rubio medio largo con 2 lazos rosas en sus mechones, ojos azules grandes, rostro redondeado y complexión delgada. Suele llevar la máscara del primer psicópata que mató en la cabeza aún manchada de sangre, tiene algunas tiritas en el cuerpo, lleva un pequeño vestido marrón desgarrado y un delantal rosa, también lleva pantalones naranjas robados de un ex presidiario y zapatos y calcetines distintos en cada pie. Lleva una manga en su brazo derecho de una camisa de fuerza",
    image: "assets/images/npcs/tina/FotoTina.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Torgue Flexington",
    avatar: "assets/images/npcs/torgue/IconoTorgue.jpg",
    specialization: "Hacer bocadillos",
    faction: "Empresas Torgue",
    factionIcon: "assets/icons/factions/torgue.png",
    shortDescription: "Hombre humano de 1,95m de altura de complexión ancha y musculosa, tiene un cabello negro largo y un mostacho. Suele ir sin camisa, con pantalones vaqueros, cadenas de metal por el cuello, audifonos antiguos en las orejas, gafas de sol, un pañuelo rojo sobre la cabeza y guantes sin dedos con nudillos de tuercas.",
    image: "assets/images/npcs/torgue/FotoTorgue.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Tyler Durden",
    avatar: "assets/images/npcs/tyler/IconoTyler.jpg",
    specialization: "¿?",
    faction: "¿?, Empresas Torgue",
    factionIcon: "assets/icons/factions/torgue.png",
    shortDescription: "Hombre humano de 1,82m de altura con facciones marcadas y rostro visiblemente bello y joven, pelo corto castaño revuelto y sin hacer, ligera perilla, ojos azules claros, constitución definida y musculada, suele llevar ropa de segunda mano y que sabe combinar muy bien a conjunto.",
    image: "assets/images/npcs/tyler/FotoTyler.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Vaughn",
    avatar: "assets/images/npcs/vaughn/IconoVaughn.jpg",
    specialization: "Contabilidad",
    faction: "Hyperion",
    factionIcon: "assets/icons/factions/hyperion.png",
    shortDescription: "Hombre humano de 1,60m de altura con rostro blando, pelo corto castaño, perilla y complexión delgada pero definida para sorpresa de muchos. Suele llevar una camisa blanca de oficinista, pantalones de traje y unos lentes cuadrados de contable. Tiene cara de chico bueno.",
    image: "assets/images/npcs/vaughn/FotoVaughn.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "El Vigilante",
    avatar: "assets/images/npcs/vigilante/IconoVigilante.jpg",
    specialization: "Lado luminoso de la fuerza",
    faction: "¿?",
    factionIcon: "assets/icons/factions/neutral.png",
    shortDescription: "Especie insectoide desconocida por el resto de la Galaxia la cual cuenta con una coraza de quitina grisácea similar a los insectos, de su espalda emergen una especie de alas a base de energía similar al plasma pero de un color morado al igual que su cabello largo. Lleva consigo una armadura metálica y varios trozos de tela a modo de vestimenta, cuenta también con unas patas que a partir de la articulación donde serían las rodillas se hacen hacia atrás como las patas traseras de una mantis.",
    image: "assets/images/npcs/vigilante/FotoVigilante.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Willhelm",
    avatar: "assets/images/npcs/willhelm/IconoWillhelm.jpg",
    specialization: "Matar",
    faction: "Hyperion",
    factionIcon: "assets/icons/factions/hyperion.png",
    shortDescription: "¿?",
    image: "assets/images/npcs/willhelm/FotoWillhelm.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
  {
    name: "Doctor Zed",
    avatar: "assets/images/npcs/zed/IconoZed.jpg",
    specialization: "Medicina, Microbiología",
    faction: "Invasores Carmesíes",
    factionIcon: "assets/icons/factions/carmesies.png",
    shortDescription: "Hombre humano de 1,82m de altura con cabello oscuro bien peinado y engominado con unas canas al lateral de la cabeza, barba descuidada y corta, ojos azules aguamarina. Suele llevar ropa de doctor con unos guantes quirúrgicos sucios, una mascarilla de pintor en la boca, uniforme de quirófano y un chaleco antibalas por encima hecho de kevlar.",
    image: "assets/images/npcs/zed/FotoZed.jpg",
    sound: "assets/audio/locations/SoundEffect.mp3",
  },
];
