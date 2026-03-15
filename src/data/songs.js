/**
 * Song library for the Songs module.
 *
 * Each song contains:
 *   - Metadata: id, title, artist, difficulty, icon, bpm, key, description
 *   - chords: chord names used in the song
 *   - tabs: array of { label, lines[] } — ASCII guitar tab sections
 *   - notes: array of { freq, dur } — note frequencies (Hz) and durations (s)
 *            for sequential audio playback. freq === 0 means a silence/rest.
 *
 * Difficulty levels: 'Principiante' | 'Intermedio' | 'Avanzado'
 */

// Convenience frequency table (Hz) for guitar notes
const N = {
  E2: 82.41,  F2: 87.31,  Gb2: 92.50,  G2: 98.00,  Ab2: 103.83,
  A2: 110.00, Bb2: 116.54, B2: 123.47,
  C3: 130.81, Db3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81,
  F3: 174.61, Gb3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00,
  Bb3: 233.08, B3: 246.94,
  C4: 261.63, Db4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63,
  F4: 349.23, Gb4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00,
  Bb4: 466.16, B4: 493.88,
  C5: 523.25,
};

// Silence / rest
const R = 0;

export const SONGS = [
  // ─── PRINCIPIANTE ──────────────────────────────────────────────────────────
  {
    id: 'smoke-on-the-water',
    title: 'Smoke on the Water',
    artist: 'Deep Purple',
    difficulty: 'Principiante',
    icon: '🎸',
    bpm: 112,
    key: 'G menor',
    description:
      'Uno de los riffs más famosos del rock. Ideal para aprender power chords con dos cuerdas a la vez.',
    chords: ['G5', 'Bb5', 'C5', 'Db5'],
    tabs: [
      {
        label: 'Riff Principal',
        lines: [
          'e|----------------------------|',
          'B|----------------------------|',
          'G|--0---3---5---0---3---6-5---|',
          'D|--0---3---5---0---3---6-5---|',
          'A|----------------------------|',
          'E|----------------------------|',
        ],
      },
    ],
    notes: [
      { freq: N.G3,  dur: 0.45 }, { freq: N.Bb3, dur: 0.45 }, { freq: N.C4,  dur: 0.70 },
      { freq: R,     dur: 0.20 },
      { freq: N.G3,  dur: 0.45 }, { freq: N.Bb3, dur: 0.45 }, { freq: N.Db4, dur: 0.35 },
      { freq: N.C4,  dur: 0.70 }, { freq: R,     dur: 0.20 },
      { freq: N.G3,  dur: 0.45 }, { freq: N.Bb3, dur: 0.45 }, { freq: N.C4,  dur: 0.45 },
      { freq: N.Bb3, dur: 0.45 }, { freq: N.G3,  dur: 1.00 },
    ],
  },
  {
    id: 'seven-nation-army',
    title: 'Seven Nation Army',
    artist: 'The White Stripes',
    difficulty: 'Principiante',
    icon: '🥁',
    bpm: 124,
    key: 'E menor',
    description:
      'Riff icónico con una sola cuerda. Perfecto para principiantes: solo necesitas memorizar 7 notas.',
    chords: [],
    tabs: [
      {
        label: 'Riff Principal (cuerda 6 — Mi grave)',
        lines: [
          'e|------------------------|',
          'B|------------------------|',
          'G|------------------------|',
          'D|------------------------|',
          'A|------------------------|',
          'E|--7--7-10--7--5--3--2---|',
        ],
      },
    ],
    notes: [
      { freq: N.B2,  dur: 0.35 }, { freq: N.B2,  dur: 0.20 }, { freq: N.D3,  dur: 0.35 },
      { freq: N.B2,  dur: 0.35 }, { freq: R,     dur: 0.15 },
      { freq: N.A2,  dur: 0.50 }, { freq: N.G2,  dur: 0.35 }, { freq: N.Gb2, dur: 1.00 },
      { freq: R,     dur: 0.40 },
      { freq: N.B2,  dur: 0.35 }, { freq: N.B2,  dur: 0.20 }, { freq: N.D3,  dur: 0.35 },
      { freq: N.B2,  dur: 0.35 }, { freq: R,     dur: 0.15 },
      { freq: N.A2,  dur: 0.50 }, { freq: N.G2,  dur: 0.35 }, { freq: N.Gb2, dur: 1.50 },
    ],
  },
  {
    id: 'happy-birthday',
    title: 'Happy Birthday',
    artist: 'Tradicional',
    difficulty: 'Principiante',
    icon: '🎂',
    bpm: 90,
    key: 'C mayor',
    description:
      'Melodía clásica ideal para aprender las primeras notas en el mástil. Tocada en cuerdas 1 y 2.',
    chords: ['C', 'G', 'F'],
    tabs: [
      {
        label: 'Melodía (cuerdas 1 y 2)',
        lines: [
          'e|--0--0--2--0--5--4---0--0--2--0--7--5--|',
          'B|--1--1-----1--------|--1--1-----1--------|',
          'G|----------------------|----------------------|',
          'D|----------------------|----------------------|',
          'A|----------------------|----------------------|',
          'E|----------------------|----------------------|',
        ],
      },
    ],
    notes: [
      { freq: N.C4,  dur: 0.30 }, { freq: N.C4,  dur: 0.15 }, { freq: N.D4,  dur: 0.45 },
      { freq: N.C4,  dur: 0.45 }, { freq: N.F4,  dur: 0.45 }, { freq: N.E4,  dur: 0.80 },
      { freq: R,     dur: 0.20 },
      { freq: N.C4,  dur: 0.30 }, { freq: N.C4,  dur: 0.15 }, { freq: N.D4,  dur: 0.45 },
      { freq: N.C4,  dur: 0.45 }, { freq: N.G4,  dur: 0.45 }, { freq: N.F4,  dur: 0.80 },
      { freq: R,     dur: 0.20 },
      { freq: N.C4,  dur: 0.30 }, { freq: N.C4,  dur: 0.15 }, { freq: N.C5,  dur: 0.45 },
      { freq: N.A4,  dur: 0.45 }, { freq: N.F4,  dur: 0.30 }, { freq: N.E4,  dur: 0.30 },
      { freq: N.D4,  dur: 0.50 },
      { freq: N.Bb4, dur: 0.30 }, { freq: N.Bb4, dur: 0.15 }, { freq: N.A4,  dur: 0.45 },
      { freq: N.F4,  dur: 0.45 }, { freq: N.G4,  dur: 0.45 }, { freq: N.F4,  dur: 1.00 },
    ],
  },

  // ─── INTERMEDIO ────────────────────────────────────────────────────────────
  {
    id: 'knockin-on-heavens-door',
    title: "Knockin' on Heaven's Door",
    artist: 'Bob Dylan',
    difficulty: 'Intermedio',
    icon: '🚪',
    bpm: 68,
    key: 'G mayor',
    description:
      'Progresión de acordes clásica con ritmo lento y expresivo. Excelente para practicar transiciones entre acordes abiertos.',
    chords: ['G', 'D', 'Am7'],
    tabs: [
      {
        label: 'Acordes (G – D – Am7 – Am7)',
        lines: [
          'e|--3---2---0---0---|',
          'B|--3---3---1---1---|',
          'G|--0---2---2---0---|',
          'D|--0---0---2---2---|',
          'A|--2---x---0---0---|',
          'E|--3---x---x---x---|',
        ],
      },
      {
        label: 'Arpegio intro',
        lines: [
          'e|--3-----2-----0---0---|',
          'B|----3-----3-----1---1-|',
          'G|------0-----2-----2---|',
          'D|--0---------0-----2---|',
          'A|----------------------|',
          'E|--3-----------x---x---|',
        ],
      },
    ],
    notes: [
      // G arpeggio
      { freq: N.G2,  dur: 0.30 }, { freq: N.B3,  dur: 0.30 }, { freq: N.D4,  dur: 0.30 },
      { freq: N.G4,  dur: 0.50 },
      // D arpeggio
      { freq: N.D3,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 }, { freq: N.D4,  dur: 0.30 },
      { freq: N.Gb4, dur: 0.50 },
      // Am7 arpeggio
      { freq: N.A2,  dur: 0.30 }, { freq: N.E3,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.C4,  dur: 0.50 },
      // Am7 again
      { freq: N.A2,  dur: 0.30 }, { freq: N.E3,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.C4,  dur: 0.80 },
    ],
  },
  {
    id: 'nothing-else-matters',
    title: 'Nothing Else Matters',
    artist: 'Metallica',
    difficulty: 'Intermedio',
    icon: '🎶',
    bpm: 69,
    key: 'E menor',
    description:
      'Intro fingerpicking con cuerdas al aire. Requiere práctica de independencia de dedos y mano derecha.',
    chords: ['Em', 'Am', 'C', 'G'],
    tabs: [
      {
        label: 'Intro Fingerpicking',
        lines: [
          'e|--0--0--0--0-----0--0--|',
          'B|------0--------0-------|',
          'G|----0--------0---------|',
          'D|--2------2------2------|',
          'A|--2------2------2------|',
          'E|--0------0------0------|',
        ],
      },
    ],
    notes: [
      { freq: N.E4, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.G3, dur: 0.30 },
      { freq: N.E3, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.G3, dur: 0.30 },
      { freq: N.E4, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.G3, dur: 0.30 },
      { freq: N.E3, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.G3, dur: 0.30 },
      { freq: N.E4, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.A3, dur: 0.30 },
      { freq: N.E3, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.A3, dur: 0.30 },
      { freq: N.E4, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.A3, dur: 0.30 },
      { freq: N.E3, dur: 0.30 }, { freq: N.B3, dur: 0.30 }, { freq: N.A3, dur: 0.50 },
    ],
  },

  // ─── AVANZADO ──────────────────────────────────────────────────────────────
  {
    id: 'stairway-to-heaven',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    difficulty: 'Avanzado',
    icon: '🪜',
    bpm: 72,
    key: 'A menor',
    description:
      'Legendaria intro de fingerpicking que todo guitarrista aspira a tocar. Combina arpegio y melodía con cambios de bajo cromáticos.',
    chords: ['Am', 'Am/G#', 'Am/G', 'D/F#', 'Fmaj7', 'G/B', 'Am'],
    tabs: [
      {
        label: 'Intro (primeras 4 frases)',
        lines: [
          'e|--------0-1-0----------0---------|',
          'B|----1-----------1---1------1-0---|',
          'G|--2---2-----------2---2--------0-|',
          'D|--2---0-----------0---0----------|',
          'A|--0-------4-0-0-------4-0-0------|',
          'E|----------4-----------3----------|',
        ],
      },
      {
        label: 'Continuación',
        lines: [
          'e|--0-1-3-1-0-------------0--------|',
          'B|--1---------3-1------1------3-1--|',
          'G|--2-----------2----2----------2--|',
          'D|--2-----------0--2------------2--|',
          'A|--0---0-----------2--------------|',
          'E|----------4-----3----------------|',
        ],
      },
    ],
    notes: [
      { freq: N.A2,  dur: 0.35 }, { freq: N.E4,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.B3,  dur: 0.30 }, { freq: N.E4,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.C4,  dur: 0.30 }, { freq: N.B3,  dur: 0.30 },
      { freq: N.Ab2, dur: 0.35 }, { freq: N.E4,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.B3,  dur: 0.30 }, { freq: N.E4,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.E3,  dur: 0.30 }, { freq: N.B3,  dur: 0.30 },
      { freq: N.G2,  dur: 0.35 }, { freq: N.D4,  dur: 0.30 }, { freq: N.G3,  dur: 0.30 },
      { freq: N.A3,  dur: 0.30 }, { freq: N.D4,  dur: 0.30 }, { freq: N.G3,  dur: 0.30 },
      { freq: N.Gb3, dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.Gb2, dur: 0.35 }, { freq: N.C4,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.B3,  dur: 0.30 }, { freq: N.C4,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.Gb3, dur: 0.30 }, { freq: N.B3,  dur: 0.50 },
    ],
  },
  {
    id: 'hotel-california',
    title: 'Hotel California',
    artist: 'Eagles',
    difficulty: 'Avanzado',
    icon: '🏨',
    bpm: 75,
    key: 'B menor',
    description:
      'Icónico intro de guitarra con arpegio en Bm. Requiere precisión en la mano derecha y cambios fluidos entre acordes.',
    chords: ['Bm', 'F#', 'A', 'E', 'G', 'D', 'Em', 'F#'],
    tabs: [
      {
        label: 'Intro – Bm / F#',
        lines: [
          'e|--------2-----------2------|',
          'B|------3---3-------3---3----|',
          'G|----4-------4---4-------4--|',
          'D|--4-----------4------------|',
          'A|---------------------------|',
          'E|--2------------------------|',
        ],
      },
      {
        label: 'Continuación – A / E',
        lines: [
          'e|--------0-----------0------|',
          'B|------2---2-------0---0----|',
          'G|----2-------2---1-------1--|',
          'D|--2-----------2------------|',
          'A|--0---0---------0----------|',
          'E|---------------------------|',
        ],
      },
    ],
    notes: [
      // Bm arpeggio
      { freq: N.B2,  dur: 0.30 }, { freq: N.Gb3, dur: 0.30 }, { freq: N.B3,  dur: 0.30 },
      { freq: N.D4,  dur: 0.30 }, { freq: N.Gb4, dur: 0.40 },
      // F# arpeggio
      { freq: N.Gb2, dur: 0.30 }, { freq: N.Ab3, dur: 0.30 }, { freq: N.Db4, dur: 0.30 },
      { freq: N.Gb4, dur: 0.30 }, { freq: N.Ab4, dur: 0.40 },
      // A arpeggio
      { freq: N.A2,  dur: 0.30 }, { freq: N.E3,  dur: 0.30 }, { freq: N.A3,  dur: 0.30 },
      { freq: N.E4,  dur: 0.30 }, { freq: N.A4,  dur: 0.40 },
      // E arpeggio
      { freq: N.E2,  dur: 0.30 }, { freq: N.B2,  dur: 0.30 }, { freq: N.E3,  dur: 0.30 },
      { freq: N.Ab3, dur: 0.30 }, { freq: N.B3,  dur: 0.40 },
    ],
  },
  {
    id: 'eruption',
    title: 'Eruption',
    artist: 'Van Halen',
    difficulty: 'Avanzado',
    icon: '🌋',
    bpm: 160,
    key: 'E menor',
    description:
      'Legendario solo de Eddie Van Halen con técnica de tapping a dos manos. El nivel más alto de la técnica guitarrística rock.',
    chords: [],
    tabs: [
      {
        label: 'Tapping – fragmento 1',
        lines: [
          'e|--12h17p12h15p12-12h17p12h15p12--|',
          'B|----------------------------------|',
          'G|----------------------------------|',
          'D|----------------------------------|',
          'A|----------------------------------|',
          'E|----------------------------------|',
        ],
      },
      {
        label: 'Tapping – fragmento 2',
        lines: [
          'e|--15-17-19-17-15------------------|',
          'B|--15-17-19-17-15---15-17-19-17-15-|',
          'G|----------------------------------|',
          'D|----------------------------------|',
          'A|----------------------------------|',
          'E|----------------------------------|',
        ],
      },
    ],
    notes: [
      { freq: N.B4,  dur: 0.10 }, { freq: N.E4,  dur: 0.10 }, { freq: N.Ab4, dur: 0.10 },
      { freq: N.B4,  dur: 0.10 }, { freq: N.E4,  dur: 0.10 }, { freq: N.Ab4, dur: 0.10 },
      { freq: N.B4,  dur: 0.10 }, { freq: N.E4,  dur: 0.10 }, { freq: N.Ab4, dur: 0.10 },
      { freq: N.C5,  dur: 0.10 }, { freq: N.Gb4, dur: 0.10 }, { freq: N.A4,  dur: 0.10 },
      { freq: N.C5,  dur: 0.10 }, { freq: N.Gb4, dur: 0.10 }, { freq: N.A4,  dur: 0.10 },
      { freq: N.C5,  dur: 0.10 }, { freq: N.Gb4, dur: 0.10 }, { freq: N.A4,  dur: 0.10 },
      { freq: N.B4,  dur: 0.10 }, { freq: N.E4,  dur: 0.10 }, { freq: N.Ab4, dur: 0.10 },
      { freq: N.B4,  dur: 0.10 }, { freq: N.E4,  dur: 0.10 }, { freq: N.Ab4, dur: 0.10 },
      { freq: N.Bb4, dur: 0.10 }, { freq: N.Eb4, dur: 0.10 }, { freq: N.G4,  dur: 0.10 },
      { freq: N.Bb4, dur: 0.10 }, { freq: N.Eb4, dur: 0.10 }, { freq: N.G4,  dur: 0.10 },
      { freq: N.A4,  dur: 0.10 }, { freq: N.Eb4, dur: 0.10 }, { freq: N.Gb4, dur: 0.30 },
    ],
  },
];

export default SONGS;
