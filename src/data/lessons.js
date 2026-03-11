/**
 * Structured lesson data for the Learning section.
 * Each lesson belongs to a module and has sections with text content,
 * key points, and an optional tip.
 */

const LESSONS = [
  // ─── MODULE 1: FUNDAMENTOS ───────────────────────────────────────────────
  {
    id: 'guitar-parts',
    module: 1,
    moduleTitle: 'Fundamentos',
    moduleIcon: '🎓',
    title: 'La Guitarra',
    subtitle: 'Partes del instrumento y cómo sujetarla',
    icon: '🎸',
    duration: 5,
    level: 'Principiante',
    keyPoints: [
      'Identificar las partes principales de la guitarra',
      'Aprender a sujetar la guitarra correctamente',
      'Postura adecuada para tocar sentado y de pie',
    ],
    sections: [
      {
        title: 'Partes de la guitarra',
        content:
          'La guitarra acústica se divide en tres partes principales:\n\n' +
          '• Cabeza (Clavijero): Donde se encuentran las clavijas que afilan las cuerdas.\n\n' +
          '• Mástil (Cuello): La parte larga donde colocas los dedos para formar notas y acordes. Tiene los trastes (barras metálicas) que dividen el mástil en semitonos.\n\n' +
          '• Caja de resonancia: El cuerpo hueco que amplifica el sonido. Tiene la boca (agujero central) por donde sale el sonido y el puente, donde se sujetan las cuerdas en la parte inferior.',
      },
      {
        title: 'Cómo sujetar la guitarra',
        content:
          'Posición sentado (clásica):\n' +
          '• Siéntate en el borde de la silla con la espalda recta.\n' +
          '• Apoya la cintura de la guitarra sobre tu muslo derecho (si eres diestro).\n' +
          '• El mástil debe quedar ligeramente elevado, a unos 45°.\n\n' +
          'Posición de pie:\n' +
          '• Usa una correa ajustada para que la guitarra quede a la altura del ombligo.\n' +
          '• El mástil sigue apuntando ligeramente hacia arriba.\n' +
          '• Mantén la espalda recta y los hombros relajados.',
      },
      {
        title: 'La mano izquierda (mano de los trastes)',
        content:
          'La mano izquierda (diestros) presiona las cuerdas contra los trastes:\n\n' +
          '• Dobla los dedos como si sostuvieras una pelota pequeña.\n' +
          '• Usa las yemas de los dedos, no la punta plana.\n' +
          '• Presiona justo detrás del traste (no encima), así el sonido sale limpio.\n' +
          '• El pulgar descansa detrás del mástil, opuesto al dedo medio.',
      },
    ],
    tip: 'Practica sujetar la guitarra frente a un espejo para verificar tu postura. Una mala postura desde el principio puede causar tensión y lesiones.',
  },
  {
    id: 'tuning',
    module: 1,
    moduleTitle: 'Fundamentos',
    moduleIcon: '🎓',
    title: 'Afinación',
    subtitle: 'Cómo afinar tu guitarra correctamente',
    icon: '🔧',
    duration: 5,
    level: 'Principiante',
    keyPoints: [
      'Conocer las notas de las cuerdas al aire',
      'Usar el Detector de Afinación integrado en la app',
      'Método de afinación por armónicos relativos',
    ],
    sections: [
      {
        title: 'Las notas de las cuerdas al aire',
        content:
          'En afinación estándar, las 6 cuerdas al aire producen las siguientes notas (de la más grave a la más aguda):\n\n' +
          '6ª cuerda → E (Mi grave)\n' +
          '5ª cuerda → A (La)\n' +
          '4ª cuerda → D (Re)\n' +
          '3ª cuerda → G (Sol)\n' +
          '2ª cuerda → B (Si)\n' +
          '1ª cuerda → E (Mi agudo)\n\n' +
          'Truco para recordarlas: "Elephants And Donkeys Grow Big Ears".',
      },
      {
        title: 'Usando el afinador de la app',
        content:
          'La app incluye un Detector de Afinación (Pitch Detector) en el menú principal.\n\n' +
          '1. Abre el Pitch Detector.\n' +
          '2. Toca una cuerda al aire.\n' +
          '3. La app detecta la nota que estás tocando.\n' +
          '4. Gira la clavija correspondiente hasta que la nota detectada coincida con la nota objetivo.\n\n' +
          'Gira hacia ti (tensas) para subir el tono.\n' +
          'Gira hacia afuera (afloja) para bajar el tono.',
      },
      {
        title: 'Método de afinación relativa',
        content:
          'Si no tienes afinador, puedes afinar las cuerdas entre sí:\n\n' +
          '• Afina la 6ª cuerda con una referencia (diapasón, piano o app).\n' +
          '• Pisa el traste 5 de la 6ª cuerda → debe sonar igual que la 5ª al aire (A).\n' +
          '• Pisa el traste 5 de la 5ª cuerda → debe sonar igual que la 4ª al aire (D).\n' +
          '• Pisa el traste 5 de la 4ª cuerda → debe sonar igual que la 3ª al aire (G).\n' +
          '• Pisa el traste 4 de la 3ª cuerda → debe sonar igual que la 2ª al aire (B). ⚠️ Aquí es el traste 4, no 5.\n' +
          '• Pisa el traste 5 de la 2ª cuerda → debe sonar igual que la 1ª al aire (E).',
      },
    ],
    tip: 'Afina siempre subiendo el tono (tensando la cuerda). Si te pasas, afloja un poco y vuelve a subir. Esto ayuda a que la clavija mantenga la afinación por más tiempo.',
  },
  {
    id: 'music-notes',
    module: 1,
    moduleTitle: 'Fundamentos',
    moduleIcon: '🎓',
    title: 'Las Notas Musicales',
    subtitle: 'Solfeo, notación inglesa y el diapasón',
    icon: '🎵',
    duration: 7,
    level: 'Principiante',
    keyPoints: [
      'Los 7 nombres de las notas (Do Re Mi / C D E)',
      'Sostenidos (#) y bemoles (b)',
      'Cómo se distribuyen las notas en el diapasón',
    ],
    sections: [
      {
        title: 'Los dos sistemas de nomenclatura',
        content:
          'En la música occidental existen 7 notas naturales. Hay dos formas de nombrarlas:\n\n' +
          'Sistema latino (solfeo): Do – Re – Mi – Fa – Sol – La – Si\n' +
          'Sistema anglosajón (inglés): C – D – E – F – G – A – B\n\n' +
          'En la mayoría de apps, partituras modernas y teoría musical se usa el sistema anglosajón. ¡Vale la pena aprenderlo desde el principio!',
      },
      {
        title: 'Sostenidos y bemoles',
        content:
          'Entre algunas notas naturales existen notas intermedias llamadas alteraciones:\n\n' +
          '• Sostenido (#): sube la nota medio tono. Ej: C# (Do sostenido)\n' +
          '• Bemol (b): baja la nota medio tono. Ej: Bb (Si bemol)\n\n' +
          'La escala cromática completa (12 notas):\n' +
          'C – C# – D – D# – E – F – F# – G – G# – A – A# – B\n\n' +
          'Nota: No hay sostenido entre E y F, ni entre B y C. Esos pares están a solo medio tono de distancia.',
      },
      {
        title: 'Las notas en el diapasón',
        content:
          'Cada traste en la guitarra sube el sonido exactamente un semitono.\n\n' +
          'Por ejemplo, en la 6ª cuerda (E abierta):\n' +
          'Traste 0 (aire) → E\n' +
          'Traste 1 → F\n' +
          'Traste 2 → F#\n' +
          'Traste 3 → G\n' +
          'Traste 4 → G#\n' +
          'Traste 5 → A\n' +
          '... y así sucesivamente.\n\n' +
          'Usa el explorador de notas de la app para ver todas las notas en el diapasón completo.',
      },
    ],
    tip: 'Practica diciendo el nombre de las notas mientras tocas cada traste de la 6ª cuerda de principio a fin. Con repetición, las memorizarás sin esfuerzo.',
  },

  // ─── MODULE 2: PRIMEROS ACORDES ─────────────────────────────────────────
  {
    id: 'first-chords-em-am',
    module: 2,
    moduleTitle: 'Primeros Acordes',
    moduleIcon: '🎼',
    title: 'Em y Am',
    subtitle: 'Los acordes más fáciles para empezar',
    icon: '✌️',
    duration: 8,
    level: 'Principiante',
    keyPoints: [
      'Formar el acorde Em (Mi menor) con 2 dedos',
      'Formar el acorde Am (La menor) con 3 dedos',
      'Rasguear ambos acordes de forma limpia',
    ],
    sections: [
      {
        title: 'El acorde Em (Mi menor)',
        content:
          'Em es el acorde más fácil de la guitarra. Solo necesitas 2 dedos:\n\n' +
          '• Dedo 2 (medio): 5ª cuerda, traste 2\n' +
          '• Dedo 3 (anular): 4ª cuerda, traste 2\n' +
          '• Cuerdas 1, 2, 3 y 6 se tocan al aire\n\n' +
          'Rasguea las 6 cuerdas de arriba a abajo. ¡Deberías escuchar un sonido oscuro y emotivo!',
      },
      {
        title: 'El acorde Am (La menor)',
        content:
          'Am requiere 3 dedos en una sola posición:\n\n' +
          '• Dedo 1 (índice): 2ª cuerda, traste 1\n' +
          '• Dedo 2 (medio): 4ª cuerda, traste 2\n' +
          '• Dedo 3 (anular): 3ª cuerda, traste 2\n' +
          '• La 5ª cuerda se toca al aire\n' +
          '• ⚠️ La 6ª cuerda (Mi grave) NO se toca\n\n' +
          'Rasguea desde la 5ª cuerda hacia abajo.',
      },
      {
        title: 'Practica el cambio Em → Am',
        content:
          'El siguiente paso es cambiar entre acordes con fluidez:\n\n' +
          '1. Forma Em y rasguea 4 veces (un compás).\n' +
          '2. Sin parar el ritmo, mueve los dedos a Am y rasguea 4 veces.\n' +
          '3. Repite hasta que el cambio sea automático.\n\n' +
          'Consejo: fija los dedos que no se mueven entre acordes. Entre Em y Am, el dedo 2 se queda en la 4ª cuerda – úsalo como punto de pivote.',
      },
    ],
    tip: 'Revisa que cada cuerda suene clara. Presiona los dedos justo detrás del traste y asegúrate de que ningún dedo toca accidentalmente otra cuerda.',
  },
  {
    id: 'chords-e-a',
    module: 2,
    moduleTitle: 'Primeros Acordes',
    moduleIcon: '🎼',
    title: 'E y A',
    subtitle: 'Los acordes mayores E y A',
    icon: '🎯',
    duration: 8,
    level: 'Principiante',
    keyPoints: [
      'Diferencia entre acordes mayores y menores',
      'Formar el acorde E mayor con 3 dedos',
      'Formar el acorde A mayor con 3 dedos',
    ],
    sections: [
      {
        title: 'Mayor vs. menor',
        content:
          'La diferencia entre un acorde mayor y uno menor es de un solo semitono (una nota):\n\n' +
          '• Acorde mayor: suena alegre, brillante.\n' +
          '• Acorde menor: suena oscuro, melancólico.\n\n' +
          'Compara Em y E para escuchar la diferencia. ¡Es sorprendente el cambio con un solo dedo!',
      },
      {
        title: 'Acorde E mayor',
        content:
          'E mayor es como Em pero con un dedo extra:\n\n' +
          '• Dedo 1 (índice): 3ª cuerda, traste 1\n' +
          '• Dedo 2 (medio): 5ª cuerda, traste 2\n' +
          '• Dedo 3 (anular): 4ª cuerda, traste 2\n' +
          '• Cuerdas 1, 2 y 6 se tocan al aire\n\n' +
          'Rasguea las 6 cuerdas. Compara con Em – ¿notas cómo cambia el color del sonido?',
      },
      {
        title: 'Acorde A mayor',
        content:
          'A mayor tiene 3 dedos en la 2ª posición:\n\n' +
          '• Dedo 1 (índice): 4ª cuerda, traste 2\n' +
          '• Dedo 2 (medio): 3ª cuerda, traste 2\n' +
          '• Dedo 3 (anular): 2ª cuerda, traste 2\n' +
          '• La 5ª cuerda se toca al aire\n' +
          '• ⚠️ La 6ª cuerda NO se toca\n\n' +
          'Nota que los 3 dedos están en el mismo traste (traste 2) pero en cuerdas distintas. Algunos lo forman con cejilla parcial usando el índice en las 3 cuerdas.',
      },
    ],
    tip: 'Practica el cambio E → A: son los acordes base de muchas canciones de rock. Las cuerdas al aire les dan un sonido poderoso y brillante.',
  },
  {
    id: 'chords-d-g',
    module: 2,
    moduleTitle: 'Primeros Acordes',
    moduleIcon: '🎼',
    title: 'D y G',
    subtitle: 'Dos acordes esenciales para muchas canciones',
    icon: '🌟',
    duration: 10,
    level: 'Principiante',
    keyPoints: [
      'Formar el acorde D mayor con 3 dedos',
      'Formar el acorde G mayor con 3 ó 4 dedos',
      'Practicar la progresión G – D – Em – C',
    ],
    sections: [
      {
        title: 'Acorde D mayor',
        content:
          'D mayor usa 3 dedos en el traste 2:\n\n' +
          '• Dedo 1 (índice): 3ª cuerda, traste 2\n' +
          '• Dedo 2 (medio): 1ª cuerda, traste 2\n' +
          '• Dedo 3 (anular): 2ª cuerda, traste 3\n' +
          '• La 4ª cuerda se toca al aire\n' +
          '• ⚠️ Las cuerdas 5 y 6 NO se tocan\n\n' +
          'Rasguea desde la 4ª cuerda hacia abajo.',
      },
      {
        title: 'Acorde G mayor',
        content:
          'G mayor tiene dos versiones comunes. Versión con 3 dedos:\n\n' +
          '• Dedo 1 (índice): 5ª cuerda, traste 2\n' +
          '• Dedo 2 (medio): 6ª cuerda, traste 3\n' +
          '• Dedo 3 (anular): 1ª cuerda, traste 3\n\n' +
          'Versión con 4 dedos (más completa):\n' +
          '• Añade dedo 4 (meñique) en la 2ª cuerda, traste 3\n\n' +
          'Rasguea las 6 cuerdas. G mayor es uno de los acordes más ricos en sonido de la guitarra.',
      },
      {
        title: 'La progresión G – D – Em – C',
        content:
          'Esta progresión de 4 acordes es la base de cientos de canciones populares:\n\n' +
          'G – D – Em – C\n\n' +
          'Practica así:\n' +
          '1. Cada acorde dura 4 tiempos (un compás).\n' +
          '2. Toca con golpe suave de muñeca de arriba a abajo.\n' +
          '3. Lleva el ritmo contando en voz alta: 1-2-3-4 / 1-2-3-4...\n\n' +
          'Una vez que logres el cambio fluidamente, ya puedes tocar la base de muchas canciones conocidas.',
      },
    ],
    tip: 'El acorde G mayor puede ser difícil al principio por la separación de los dedos. Practica solo el movimiento de D a G muchas veces. ¡La velocidad llegará sola!',
  },

  // ─── MODULE 3: TÉCNICA ───────────────────────────────────────────────────
  {
    id: 'strumming-basics',
    module: 3,
    moduleTitle: 'Técnica',
    moduleIcon: '🥁',
    title: 'Rasgueo Básico',
    subtitle: 'Patrones de rasgueo y ritmo',
    icon: '🎶',
    duration: 10,
    level: 'Principiante',
    keyPoints: [
      'Postura correcta de la mano derecha',
      'El rasgueo básico: abajo (↓) y arriba (↑)',
      'Patrones rítmicos de 4/4',
    ],
    sections: [
      {
        title: 'La mano derecha',
        content:
          'La mano derecha controla el ritmo y la dinámica. Para rasguear:\n\n' +
          '• Dobla ligeramente el índice y usa su uña para rasguear (sin púa).\n' +
          '• O usa una púa (plectro) sujeta entre el pulgar e índice, con poco material expuesto.\n' +
          '• El movimiento viene de la muñeca, no del codo. La muñeca oscila como un péndulo.\n' +
          '• Mantén el brazo derecho apoyado en el borde superior de la caja.',
      },
      {
        title: 'Rasgueo hacia abajo y hacia arriba',
        content:
          'Existen dos direcciones básicas de rasgueo:\n\n' +
          '↓ Hacia abajo (Down): Mueve la mano de la cuerda más grave hacia la más aguda. Acento fuerte.\n' +
          '↑ Hacia arriba (Up): Mueve la mano de la cuerda más aguda hacia la más grave. Acento suave.\n\n' +
          'Para empezar, toca solo golpes hacia abajo (↓):\n' +
          '↓ ↓ ↓ ↓ (4 golpes por compás)\n\n' +
          'Cuando te sientas cómodo, añade golpes hacia arriba:\n' +
          '↓ ↑ ↓ ↑ (2 golpes dobles por compás)',
      },
      {
        title: 'Patrón estándar en 4/4',
        content:
          'El patrón más común en música pop y rock:\n\n' +
          '↓ ↓ ↑ ↓ ↑\n' +
          '1   2  +  3  +\n\n' +
          'Cuenta en voz alta: "uno, dos-y, tres-y" mientras rascas.\n\n' +
          'Patrón alternativo (ballad/pop lento):\n' +
          '↓ ↑ ↓ ↑ ↓ ↑ ↓ ↑\n' +
          '1  +  2  +  3  +  4  +\n\n' +
          'Empieza muy lento (50–60 BPM) y aumenta la velocidad gradualmente.',
      },
    ],
    tip: 'Lo más importante al rasguear es el ritmo constante. Es mejor rasguear lento y constante que rápido e irregular. Usa el metrónomo (o marca el tiempo con el pie) siempre.',
  },
  {
    id: 'chord-transitions',
    module: 3,
    moduleTitle: 'Técnica',
    moduleIcon: '🥁',
    title: 'Cambio de Acordes',
    subtitle: 'Técnicas para transiciones fluidas',
    icon: '🔄',
    duration: 10,
    level: 'Principiante',
    keyPoints: [
      'La técnica del "dedo guía" (pivot finger)',
      'Practicar cambios lentos antes de aplicar el ritmo',
      'El cambio más difícil: G → C',
    ],
    sections: [
      {
        title: 'Por qué los cambios son difíciles',
        content:
          'Los cambios de acorde son el mayor obstáculo para los principiantes porque:\n\n' +
          '• Los dedos deben moverse independientemente.\n' +
          '• El cerebro tiene que memorizar la "forma" de cada acorde.\n' +
          '• Todo debe ocurrir en fracciones de segundo para mantener el ritmo.\n\n' +
          'La buena noticia: con práctica consistente (15–20 minutos al día), los cambios se vuelven automáticos en pocas semanas.',
      },
      {
        title: 'El dedo guía (pivot finger)',
        content:
          'Cuando cambias de un acorde a otro, busca un dedo que permanezca en la misma cuerda y traste (o cercano). Ese es tu "dedo guía".\n\n' +
          'Ejemplo: Em → Am\n' +
          '• El dedo 2 está en la 4ª cuerda, traste 2 en Em.\n' +
          '• En Am también está en la 4ª cuerda, traste 2.\n' +
          '• ¡Deja ese dedo plantado y mueve solo los otros!\n\n' +
          'Ejemplo: G → Cadd9\n' +
          '• Los dedos 3 y 4 permanecen en las cuerdas 1 y 2, traste 3.\n' +
          '• Solo tienes que mover el índice y el medio.',
      },
      {
        title: 'Ejercicio: cambio lento y controlado',
        content:
          'Método "un compás por acorde, muy lento":\n\n' +
          '1. Forma un acorde (ej. G).\n' +
          '2. Cuenta hasta 4 lentamente.\n' +
          '3. En el tiempo 4, ya debes tener el siguiente acorde formado (ej. D).\n' +
          '4. Rasguea el nuevo acorde en el tiempo 1 del compás siguiente.\n' +
          '5. Repite.\n\n' +
          'Cuando puedas hacer el cambio antes del tiempo 4, ya estás listo para añadir el rasgueo completo.',
      },
    ],
    tip: 'Practica los cambios en silencio (sin rasguear) frente al televisor o mientras escuchas música. El músculo de la mano izquierda se desarrolla incluso sin sonido.',
  },
  {
    id: 'chord-c-dm',
    module: 3,
    moduleTitle: 'Técnica',
    moduleIcon: '🥁',
    title: 'C y Dm',
    subtitle: 'Completando los acordes abiertos esenciales',
    icon: '🎸',
    duration: 10,
    level: 'Principiante',
    keyPoints: [
      'Formar el acorde C mayor',
      'Formar el acorde Dm (Re menor)',
      'La progresión Am – F – C – G (tonalidad de La menor)',
    ],
    sections: [
      {
        title: 'Acorde C mayor',
        content:
          'C es uno de los acordes más comunes pero requiere un poco de práctica:\n\n' +
          '• Dedo 1 (índice): 2ª cuerda, traste 1\n' +
          '• Dedo 2 (medio): 4ª cuerda, traste 2\n' +
          '• Dedo 3 (anular): 5ª cuerda, traste 3\n' +
          '• Cuerdas 1, 2 y 3 se tocan al aire (con el acorde formado)\n' +
          '• ⚠️ La 6ª cuerda NO se toca\n\n' +
          'El truco del C: los dedos forman una diagonal. El índice toca la cuerda más delgada y el anular la más gruesa.',
      },
      {
        title: 'Acorde Dm (Re menor)',
        content:
          'Dm tiene una forma compacta y cómoda:\n\n' +
          '• Dedo 1 (índice): 1ª cuerda, traste 1\n' +
          '• Dedo 2 (medio): 3ª cuerda, traste 2\n' +
          '• Dedo 3 (anular): 2ª cuerda, traste 3\n' +
          '• La 4ª cuerda se toca al aire\n' +
          '• ⚠️ Las cuerdas 5 y 6 NO se tocan\n\n' +
          'Rasguea desde la 4ª cuerda hacia abajo. Dm tiene un sonido melancólico y expresivo.',
      },
      {
        title: 'La tonalidad de Do mayor',
        content:
          'Con C, Dm, Em, F, G, Am y B°, tienes todos los acordes de la escala de Do mayor.\n\n' +
          'Los más usados en canciones:\n' +
          'C – G – Am – F (tonalidad de Do, muy común en pop)\n' +
          'Am – F – C – G (tonalidad relativa de La menor)\n\n' +
          'Practica estas dos progresiones cambiando fluidamente. Con ellas puedes tocar decenas de canciones populares.',
      },
    ],
    tip: 'El acorde C es el que más cuesta al principio porque los dedos quedan muy juntos. Practica la forma de C poniéndola y quitándola 20 veces seguidas hasta que salga automáticamente.',
  },

  // ─── MODULE 4: TEORÍA BÁSICA ─────────────────────────────────────────────
  {
    id: 'major-scale',
    module: 4,
    moduleTitle: 'Teoría Básica',
    moduleIcon: '📖',
    title: 'La Escala Mayor',
    subtitle: 'La base de toda la música occidental',
    icon: '📐',
    duration: 10,
    level: 'Intermedio',
    keyPoints: [
      'Qué es una escala musical y para qué sirve',
      'La fórmula de la escala mayor (T-T-S-T-T-T-S)',
      'La escala de Do mayor en la guitarra',
    ],
    sections: [
      {
        title: '¿Qué es una escala?',
        content:
          'Una escala es un conjunto ordenado de notas que forman la base de una tonalidad.\n\n' +
          'La escala mayor es la más importante porque:\n' +
          '• Define qué notas "suenan bien" juntas en una tonalidad.\n' +
          '• Sirve como base para construir acordes.\n' +
          '• Es la "regla" que sigue la mayoría de la música occidental.\n\n' +
          'Las 7 notas de la escala de Do mayor son: C – D – E – F – G – A – B',
      },
      {
        title: 'La fórmula de la escala mayor',
        content:
          'Toda escala mayor sigue el mismo patrón de tonos (T) y semitonos (S):\n\n' +
          'T – T – S – T – T – T – S\n\n' +
          '• Tono (T) = 2 trastes de diferencia\n' +
          '• Semitono (S) = 1 traste de diferencia\n\n' +
          'Aplicando la fórmula desde Do (C):\n' +
          'C →(T)→ D →(T)→ E →(S)→ F →(T)→ G →(T)→ A →(T)→ B →(S)→ C\n\n' +
          'Puedes aplicar esta misma fórmula desde cualquier nota para crear la escala mayor de esa tonalidad.',
      },
      {
        title: 'La escala de Do mayor en la guitarra',
        content:
          'Posición básica (primera posición, en abierto):\n\n' +
          '3ª cuerda: trastes 0-2\n' +
          '2ª cuerda: trastes 0-1-3\n' +
          '1ª cuerda: trastes 0-2-3\n\n' +
          'Notas en orden: G(3c-0) → A(3c-2) → B(2c-0) → C(2c-1) → D(2c-3) → E(1c-0) → F(1c-1) → G(1c-3)\n\n' +
          'Toca la escala arriba y abajo lentamente, poniendo atención al sonido de cada nota.',
      },
    ],
    tip: 'Aprende la escala mayor con el metrónomo. Toca una nota por tiempo. Cuando llegues al 60 BPM limpio, sube a 70, 80, y así sucesivamente.',
  },
  {
    id: 'chord-progressions',
    module: 4,
    moduleTitle: 'Teoría Básica',
    moduleIcon: '📖',
    title: 'Progresiones de Acordes',
    subtitle: 'Cómo se construyen las canciones',
    icon: '🔗',
    duration: 12,
    level: 'Intermedio',
    keyPoints: [
      'Qué es una progresión de acordes',
      'Los grados de la escala (I, IV, V, vi)',
      'Las progresiones más usadas en música pop',
    ],
    sections: [
      {
        title: '¿Qué es una progresión?',
        content:
          'Una progresión de acordes es una secuencia de acordes que se repite y forma la base armónica de una canción.\n\n' +
          'Cada acorde tiene una función:\n' +
          '• Tónica (I): da sensación de "hogar" o reposo.\n' +
          '• Subdominante (IV): crea tensión moderada.\n' +
          '• Dominante (V): crea la máxima tensión que quiere resolver.\n' +
          '• Relativo menor (vi): da color emocional oscuro.',
      },
      {
        title: 'Los grados en Do mayor',
        content:
          'En la tonalidad de Do mayor, los acordes diatónicos son:\n\n' +
          'I   → C mayor\n' +
          'II  → D menor\n' +
          'III → E menor\n' +
          'IV  → F mayor\n' +
          'V   → G mayor\n' +
          'VI  → A menor\n' +
          'VII → B disminuido\n\n' +
          'Los más usados son I, IV, V y VI (C, F, G, Am).',
      },
      {
        title: 'Las progresiones más famosas',
        content:
          'Progresión I–V–VI–IV (la "axis" del pop):\n' +
          'C – G – Am – F\n' +
          'Esta progresión aparece en cientos de canciones de pop y rock.\n\n' +
          'Progresión I–IV–V (blues y rock clásico):\n' +
          'C – F – G (o A – D – E, o G – C – D)\n\n' +
          'Progresión VI–IV–I–V (tonalidad menor):\n' +
          'Am – F – C – G\n\n' +
          'Con estos 4 acordes y estas progresiones, tienes todo lo que necesitas para tocar tus primeras canciones.',
      },
    ],
    tip: 'Escucha una canción que te guste e intenta identificar la progresión. ¿Tiene 4 acordes? ¿Se repite? Muchas canciones populares usan exactamente las progresiones que aprendiste aquí.',
  },
];

export default LESSONS;
