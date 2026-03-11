/**
 * Visual illustrations for the Learning section lessons.
 * All graphics are built with plain React Native Views — no SVG library required.
 * Compatible with iOS, Android, and Web.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CHORDS from '../data/chords';

// ─── Shared colour palette ────────────────────────────────────────────────────
const C = {
  bg:     '#111111',
  card:   '#1A1A1A',
  border: '#2A2A2A',
  text:   '#F5F5F5',
  muted:  '#999999',
  dim:    '#444444',
  red:    '#DC143C',
  blue:   '#4A90D9',
  green:  '#22C55E',
  gold:   '#F0C040',
  purple: '#9B59B6',
  orange: '#E07B39',
};

// ─── Shared wrapper ───────────────────────────────────────────────────────────
function IllustrationWrapper({ title, children }) {
  return (
    <View style={iWrap.container}>
      <Text style={iWrap.title}>{title}</Text>
      {children}
    </View>
  );
}
const iWrap = StyleSheet.create({
  container: {
    backgroundColor: C.bg,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC143C',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 12,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. GUITAR PARTS ILLUSTRATION
// ─────────────────────────────────────────────────────────────────────────────
const GUITAR_LEGEND = [
  { color: C.blue,   label: 'Clavijero', desc: 'Cabeza con 6 clavijas para afinar' },
  { color: C.gold,   label: 'Cejuela',   desc: 'Barra que separa y guía las cuerdas' },
  { color: C.green,  label: 'Mástil / Trastes', desc: 'Cuello donde formas notas y acordes' },
  { color: C.orange, label: 'Caja de resonancia', desc: 'Cuerpo hueco que amplifica el sonido' },
  { color: C.purple, label: 'Boca',      desc: 'Agujero que proyecta el sonido al exterior' },
  { color: C.red,    label: 'Puente',    desc: 'Ancla las cuerdas al cuerpo de la guitarra' },
];

function GuitarPartsIllustration() {
  return (
    <IllustrationWrapper title="🎸 Anatomía de la Guitarra">
      <View style={gpStyles.row}>

        {/* ── Guitar graphic ── */}
        <View style={gpStyles.guitarCol}>

          {/* ① Headstock */}
          <View style={[gpStyles.headstock, { borderColor: C.blue }]}>
            <View style={gpStyles.pegsRow}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={[gpStyles.peg, { backgroundColor: C.blue }]} />
              ))}
            </View>
          </View>

          {/* ② Nut */}
          <View style={[gpStyles.nut, { backgroundColor: C.gold }]} />

          {/* ③ Neck */}
          <View style={[gpStyles.neck, { borderColor: C.green }]}>
            {[16, 32, 48, 64].map((t) => (
              <View key={t} style={[gpStyles.fretLine, { top: t }]} />
            ))}
            {[6, 14, 22, 30, 38, 44].map((l, i) => (
              <View
                key={i}
                style={[gpStyles.stringLine, { left: l, width: i < 3 ? 2.5 : 1.5 }]}
              />
            ))}
          </View>

          {/* ④ Body */}
          <View style={[gpStyles.body, { borderColor: C.orange }]}>
            {/* ⑤ Soundhole */}
            <View style={[gpStyles.soundhole, { borderColor: C.purple }]} />
            {/* ⑥ Bridge */}
            <View style={[gpStyles.bridge, { backgroundColor: C.red }]} />
          </View>
        </View>

        {/* ── Legend ── */}
        <View style={gpStyles.legendCol}>
          {GUITAR_LEGEND.map((item, i) => (
            <View key={i} style={gpStyles.legendRow}>
              <View style={[gpStyles.legendNum, { backgroundColor: item.color }]}>
                <Text style={gpStyles.legendNumText}>{i + 1}</Text>
              </View>
              <View style={gpStyles.legendText}>
                <Text style={gpStyles.legendLabel}>{item.label}</Text>
                <Text style={gpStyles.legendDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

      </View>
    </IllustrationWrapper>
  );
}

const gpStyles = StyleSheet.create({
  row:       { flexDirection: 'row', alignItems: 'flex-start' },
  guitarCol: { width: 88, alignItems: 'center', marginRight: 12 },
  legendCol: { flex: 1 },

  /* Guitar parts */
  headstock: {
    width: 66, height: 48, borderRadius: 10, backgroundColor: '#15202C',
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  pegsRow:   { flexDirection: 'row', flexWrap: 'wrap', gap: 5, width: 54, justifyContent: 'center' },
  peg:       { width: 10, height: 10, borderRadius: 5 },
  nut:       { width: 58, height: 7 },
  neck: {
    width: 50, height: 80, backgroundColor: '#14201A',
    borderWidth: 2, borderTopWidth: 0, overflow: 'hidden', position: 'relative',
  },
  fretLine:  { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: '#1E3A22' },
  stringLine:{ position: 'absolute', top: 0, bottom: 0, backgroundColor: '#555' },
  body: {
    width: 88, height: 106, borderRadius: 44, backgroundColor: '#171208',
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  soundhole: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 2, backgroundColor: '#050505', marginBottom: 10,
  },
  bridge:    { width: 50, height: 6, borderRadius: 2 },

  /* Legend */
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8 },
  legendNum: {
    width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  legendNumText: { color: '#FFF', fontWeight: '900', fontSize: 10 },
  legendText:    { flex: 1 },
  legendLabel:   { color: C.text, fontWeight: '700', fontSize: 12 },
  legendDesc:    { color: C.muted, fontSize: 10, lineHeight: 14 },
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. STRING TUNING ILLUSTRATION
// ─────────────────────────────────────────────────────────────────────────────
const STRINGS_DATA = [
  { num: 6, note: 'E', solfege: 'Mi',  desc: '6ª — más grave', color: '#DC143C', thick: 4 },
  { num: 5, note: 'A', solfege: 'La',  desc: '5ª cuerda',       color: '#9B59B6', thick: 3.5 },
  { num: 4, note: 'D', solfege: 'Re',  desc: '4ª cuerda',       color: '#E07B39', thick: 3 },
  { num: 3, note: 'G', solfege: 'Sol', desc: '3ª cuerda',       color: '#22C55E', thick: 2 },
  { num: 2, note: 'B', solfege: 'Si',  desc: '2ª cuerda',       color: '#4A90D9', thick: 1.5 },
  { num: 1, note: 'E', solfege: 'Mi',  desc: '1ª — más aguda',  color: '#F0C040', thick: 1 },
];

function StringTuningIllustration() {
  return (
    <IllustrationWrapper title="🔧 Afinación Estándar — 6 Cuerdas">
      {STRINGS_DATA.map((s) => (
        <View key={s.num} style={stStyles.row}>
          {/* String number badge */}
          <View style={[stStyles.numBadge, { borderColor: s.color }]}>
            <Text style={[stStyles.numText, { color: s.color }]}>{s.num}</Text>
          </View>
          {/* Visual string line */}
          <View style={stStyles.lineWrapper}>
            <View style={[stStyles.stringLine, { height: s.thick, backgroundColor: s.color }]} />
          </View>
          {/* Note + solfège */}
          <View style={stStyles.noteBlock}>
            <Text style={[stStyles.noteLetter, { color: s.color }]}>{s.note}</Text>
            <Text style={stStyles.noteSolfege}>({s.solfege})</Text>
          </View>
          {/* Description */}
          <Text style={stStyles.desc}>{s.desc}</Text>
        </View>
      ))}
      <View style={stStyles.memBox}>
        <Text style={stStyles.memTitle}>💡 Truco mnemónico</Text>
        <Text style={stStyles.memText}>
          <Text style={stStyles.memHighlight}>"Elephants And Donkeys Grow Big Ears"</Text>
          {'\n'}E  –  A  –  D  –  G  –  B  –  E
        </Text>
      </View>
    </IllustrationWrapper>
  );
}

const stStyles = StyleSheet.create({
  row:        { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  numBadge:   {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  numText:    { fontSize: 13, fontWeight: '900' },
  lineWrapper:{ flex: 1, justifyContent: 'center', height: 12 },
  stringLine: { borderRadius: 2, width: '100%' },
  noteBlock:  { flexDirection: 'row', alignItems: 'baseline', gap: 3, width: 56, flexShrink: 0 },
  noteLetter: { fontSize: 20, fontWeight: '900' },
  noteSolfege:{ fontSize: 11, color: C.muted },
  desc:       { fontSize: 10, color: C.muted, width: 72, textAlign: 'right', flexShrink: 0 },
  memBox:     {
    marginTop: 10, backgroundColor: '#1A2A1A', borderRadius: 10,
    padding: 10, borderWidth: 1, borderColor: '#2A3A2A',
  },
  memTitle:   { fontSize: 11, fontWeight: '700', color: C.green, marginBottom: 4 },
  memText:    { fontSize: 12, color: C.muted, textAlign: 'center', lineHeight: 18 },
  memHighlight:{ color: C.text, fontWeight: '700' },
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. CHROMATIC SCALE ILLUSTRATION
// ─────────────────────────────────────────────────────────────────────────────
const CHROMATIC = [
  { note: 'C',  solfege: 'Do',  natural: true },
  { note: 'C#', solfege: 'Do#', natural: false },
  { note: 'D',  solfege: 'Re',  natural: true },
  { note: 'D#', solfege: 'Re#', natural: false },
  { note: 'E',  solfege: 'Mi',  natural: true,  noSharpAfter: true },
  { note: 'F',  solfege: 'Fa',  natural: true },
  { note: 'F#', solfege: 'Fa#', natural: false },
  { note: 'G',  solfege: 'Sol', natural: true },
  { note: 'G#', solfege: 'Sol#',natural: false },
  { note: 'A',  solfege: 'La',  natural: true },
  { note: 'A#', solfege: 'La#', natural: false },
  { note: 'B',  solfege: 'Si',  natural: true,  noSharpAfter: true },
];

function ChromaticScaleIllustration() {
  const row1 = CHROMATIC.slice(0, 6);
  const row2 = CHROMATIC.slice(6);

  const NoteBox = ({ item, last }) => (
    <View style={[
      csStyles.noteBox,
      item.natural ? csStyles.naturalBox : csStyles.sharpBox,
      last && csStyles.lastBox,
    ]}>
      <Text style={[csStyles.noteText, !item.natural && csStyles.sharpText]}>
        {item.note}
      </Text>
      <Text style={[csStyles.solfegeText, !item.natural && csStyles.sharpText]}>
        {item.solfege}
      </Text>
      {item.noSharpAfter && (
        <View style={csStyles.noSharpBadge}>
          <Text style={csStyles.noSharpText}>½</Text>
        </View>
      )}
    </View>
  );

  return (
    <IllustrationWrapper title="🎼 Escala Cromática — 12 Notas">
      {[row1, row2].map((row, ri) => (
        <View key={ri} style={csStyles.row}>
          {row.map((item, i) => (
            <NoteBox key={item.note} item={item} last={i === row.length - 1} />
          ))}
        </View>
      ))}
      <View style={csStyles.legend}>
        <View style={csStyles.legendItem}>
          <View style={[csStyles.swatch, { backgroundColor: '#2A3A5A' }]} />
          <Text style={csStyles.legendLabel}>Nota natural (7)</Text>
        </View>
        <View style={csStyles.legendItem}>
          <View style={[csStyles.swatch, { backgroundColor: '#2A2A2A' }]} />
          <Text style={csStyles.legendLabel}>Alteración # / b (5)</Text>
        </View>
        <View style={csStyles.legendItem}>
          <View style={[csStyles.swatch, { backgroundColor: '#3A3000', borderColor: C.gold, borderWidth: 1 }]} />
          <Text style={csStyles.legendLabel}>½ tono sin # (E-F, B-C)</Text>
        </View>
      </View>
    </IllustrationWrapper>
  );
}

const csStyles = StyleSheet.create({
  row:         { flexDirection: 'row', gap: 3, marginBottom: 3 },
  noteBox: {
    flex: 1, paddingVertical: 6, borderRadius: 6,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', borderWidth: 1, borderColor: '#3A3A3A',
  },
  naturalBox:  { backgroundColor: '#1E2A42' },
  sharpBox:    { backgroundColor: '#1F1F1F' },
  lastBox:     {},
  noteText:    { fontSize: 11, fontWeight: '900', color: C.text },
  sharpText:   { color: C.muted },
  solfegeText: { fontSize: 8, color: C.muted, marginTop: 1 },
  noSharpBadge:{
    position: 'absolute', bottom: -5, width: 14, height: 14,
    borderRadius: 7, backgroundColor: '#3A3000',
    borderWidth: 1, borderColor: C.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  noSharpText: { fontSize: 7, fontWeight: '900', color: C.gold },
  legend:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14, justifyContent: 'center' },
  legendItem:  { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch:      { width: 14, height: 14, borderRadius: 3 },
  legendLabel: { fontSize: 10, color: C.muted },
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. COMPACT CHORD DIAGRAM (mini, fits two side by side)
// ─────────────────────────────────────────────────────────────────────────────
const MINI = 22;
const MINI_FRETS = 5;
const MINI_STRINGS = 6;
const MINI_BW = (MINI_STRINGS - 1) * MINI;
const MINI_BH = MINI_FRETS * MINI;

function CompactChordDiagram({ chord }) {
  if (!chord) return null;

  const { strings, barre } = chord;
  const pressedFrets = strings.filter((f) => f > 0);
  const minFret = pressedFrets.length > 0 ? Math.min(...pressedFrets) : 1;
  const startFret = minFret > 1 ? minFret : 1;

  const isPressed = (si, fi) => {
    const absoluteFret = fi + startFret - 1;
    return strings[si] === absoluteFret;
  };
  const isBarred = (si, fi) => {
    if (!barre) return false;
    const abs = fi + startFret - 1;
    if (barre.fret !== abs) return false;
    return si + 1 >= barre.from && si + 1 <= barre.to;
  };

  return (
    <View style={miniStyles.container}>
      <Text style={miniStyles.name}>{chord.name}</Text>
      {startFret > 1 && <Text style={miniStyles.fretLabel}>{startFret}fr</Text>}
      <View style={miniStyles.nut} />

      {/* Mute / open row */}
      <View style={miniStyles.topRow}>
        {strings.map((f, i) => (
          <View key={i} style={miniStyles.cell}>
            {f === -1
              ? <Text style={miniStyles.mute}>✕</Text>
              : f === 0
              ? <Text style={miniStyles.open}>○</Text>
              : null}
          </View>
        ))}
      </View>

      {/* Fretboard */}
      <View style={miniStyles.board}>
        {/* String lines */}
        {Array.from({ length: MINI_STRINGS }).map((_, si) => (
          <View key={`s${si}`} style={[miniStyles.sLine, { left: `${(si / (MINI_STRINGS - 1)) * 100}%` }]} />
        ))}
        {/* Fret lines */}
        {Array.from({ length: MINI_FRETS + 1 }).map((_, fi) => (
          <View key={`f${fi}`} style={[miniStyles.fLine, { top: `${(fi / MINI_FRETS) * 100}%` }]} />
        ))}
        {/* Barre */}
        {barre && (() => {
          const row = barre.fret - startFret;
          if (row < 0 || row >= MINI_FRETS) return null;
          return (
            <View style={[miniStyles.barre, {
              top: `${((row + 0.5) / MINI_FRETS) * 100}%`,
              left: `${((barre.from - 1) / (MINI_STRINGS - 1)) * 100}%`,
              right: `${100 - ((barre.to - 1) / (MINI_STRINGS - 1)) * 100}%`,
            }]} />
          );
        })()}
        {/* Dots */}
        {Array.from({ length: MINI_FRETS }).map((_, fi) =>
          Array.from({ length: MINI_STRINGS }).map((_, si) => {
            if (!isPressed(si, fi + 1)) return null;
            if (isBarred(si, fi + 1)) return null;
            return (
              <View key={`d${si}-${fi}`} style={[miniStyles.dot, {
                top: `${((fi + 0.5) / MINI_FRETS) * 100}%`,
                left: `${(si / (MINI_STRINGS - 1)) * 100}%`,
              }]} />
            );
          })
        )}
      </View>

      {/* String labels */}
      <View style={miniStyles.bottomRow}>
        {['E', 'A', 'D', 'G', 'B', 'e'].map((l, i) => (
          <View key={i} style={miniStyles.cell}>
            <Text style={miniStyles.strLabel}>{l}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const miniStyles = StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: 8, paddingVertical: 10 },
  name:      { fontSize: 20, fontWeight: '900', color: C.red, marginBottom: 2 },
  fretLabel: { fontSize: 10, color: C.muted, marginBottom: 2 },
  nut:       { width: MINI_BW + 4, height: 5, backgroundColor: C.red, borderRadius: 2 },
  topRow:    { flexDirection: 'row', width: MINI_BW + 4, justifyContent: 'space-between', marginTop: 4, marginBottom: 2 },
  bottomRow: { flexDirection: 'row', width: MINI_BW + 4, justifyContent: 'space-between', marginTop: 4 },
  cell:      { width: MINI, alignItems: 'center' },
  mute:      { fontSize: 11, color: '#EF4444', fontWeight: '700' },
  open:      { fontSize: 11, color: C.green, fontWeight: '700' },
  strLabel:  { fontSize: 9, color: C.muted },
  board:     { width: MINI_BW, height: MINI_BH, position: 'relative', marginHorizontal: 2 },
  sLine:     { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: '#555', transform: [{ translateX: -1 }] },
  fLine:     { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#333' },
  dot:       { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: C.red, transform: [{ translateX: -9 }, { translateY: -9 }] },
  barre:     { position: 'absolute', height: 18, borderRadius: 9, backgroundColor: C.red, transform: [{ translateY: -9 }] },
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. CHORD DIAGRAM PAIR  (two compact diagrams side by side)
// ─────────────────────────────────────────────────────────────────────────────
function ChordDiagramPair({ chordNames }) {
  const chords = chordNames
    .map((name) => CHORDS.find((c) => c.name === name))
    .filter(Boolean);

  return (
    <IllustrationWrapper title={`🎸 ${chordNames.join(' y ')}`}>
      <View style={cpStyles.row}>
        {chords.map((chord, i) => (
          <React.Fragment key={chord.name}>
            <View style={cpStyles.diagBox}>
              <CompactChordDiagram chord={chord} />
              <View style={cpStyles.noteRow}>
                {chord.notes.map((n) => (
                  <View key={n} style={cpStyles.noteBadge}>
                    <Text style={cpStyles.noteBadgeText}>{n}</Text>
                  </View>
                ))}
              </View>
            </View>
            {i < chords.length - 1 && (
              <View style={cpStyles.vs}>
                <Text style={cpStyles.vsText}>vs</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    </IllustrationWrapper>
  );
}

const cpStyles = StyleSheet.create({
  row:          { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' },
  diagBox:      { alignItems: 'center', flex: 1 },
  noteRow:      { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginTop: 6 },
  noteBadge:    { backgroundColor: '#2A2A2A', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  noteBadgeText:{ color: C.text, fontSize: 11, fontWeight: '700' },
  vs:           { width: 30, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  vsText:       { color: C.muted, fontSize: 12, fontWeight: '700' },
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. STRUMMING PATTERN ILLUSTRATION
// ─────────────────────────────────────────────────────────────────────────────
const STRUMMING_PATTERNS = [
  {
    name: 'Básico — solo golpes hacia abajo',
    beats: ['1', '+', '2', '+', '3', '+', '4', '+'],
    strums: ['↓', '', '↓', '', '↓', '', '↓', ''],
    highlight: [0, 2, 4, 6],
  },
  {
    name: 'Alternado — bajo / arriba',
    beats: ['1', '+', '2', '+', '3', '+', '4', '+'],
    strums: ['↓', '↑', '↓', '↑', '↓', '↑', '↓', '↑'],
    highlight: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    name: 'Pop / Rock — patrón estándar',
    beats: ['1', '+', '2', '+', '3', '+', '4', '+'],
    strums: ['↓', '', '↓', '↑', '↓', '', '↑', ''],
    highlight: [0, 2, 3, 4, 6],
  },
];

function StrummingPatternIllustration() {
  return (
    <IllustrationWrapper title="🎶 Patrones de Rasgueo">
      {STRUMMING_PATTERNS.map((pattern, pi) => (
        <View key={pi} style={spStyles.patternBlock}>
          <Text style={spStyles.patternName}>{pattern.name}</Text>
          <View style={spStyles.beatRow}>
            {pattern.beats.map((beat, bi) => {
              const strum = pattern.strums[bi];
              const isDown = strum === '↓';
              const isUp   = strum === '↑';
              const active = pattern.highlight.includes(bi);
              return (
                <View key={bi} style={spStyles.beatCell}>
                  <Text style={[
                    spStyles.strumArrow,
                    isDown && spStyles.downArrow,
                    isUp   && spStyles.upArrow,
                    !active && spStyles.noStrum,
                  ]}>
                    {strum || '·'}
                  </Text>
                  <View style={[spStyles.beatBar, active && (isDown ? spStyles.beatBarDown : spStyles.beatBarUp)]} />
                  <Text style={[spStyles.beatCount, active && spStyles.beatCountActive]}>
                    {beat}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      ))}
      <View style={spStyles.legend}>
        <Text style={[spStyles.legendItem, { color: C.orange }]}>↓ Hacia abajo</Text>
        <Text style={[spStyles.legendItem, { color: C.blue }]}>  ↑ Hacia arriba</Text>
        <Text style={[spStyles.legendItem, { color: C.dim }]}>  · Sin golpe</Text>
      </View>
    </IllustrationWrapper>
  );
}

const spStyles = StyleSheet.create({
  patternBlock: { marginBottom: 12 },
  patternName:  { fontSize: 11, color: C.muted, marginBottom: 6, fontStyle: 'italic' },
  beatRow:      { flexDirection: 'row', gap: 2 },
  beatCell:     { flex: 1, alignItems: 'center', gap: 2 },
  strumArrow:   { fontSize: 16, fontWeight: '900', color: C.dim },
  downArrow:    { color: C.orange },
  upArrow:      { color: C.blue },
  noStrum:      { color: C.dim, fontSize: 12 },
  beatBar:      { width: '80%', height: 3, borderRadius: 1, backgroundColor: '#2A2A2A' },
  beatBarDown:  { backgroundColor: C.orange },
  beatBarUp:    { backgroundColor: C.blue },
  beatCount:    { fontSize: 10, color: C.dim },
  beatCountActive:{ color: C.muted },
  legend:       { flexDirection: 'row', justifyContent: 'center', marginTop: 2 },
  legendItem:   { fontSize: 11 },
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. PIVOT FINGER ILLUSTRATION  (chord transition Em → Am)
// ─────────────────────────────────────────────────────────────────────────────
function PivotFingerIllustration() {
  const em = CHORDS.find((c) => c.name === 'Em');
  const am = CHORDS.find((c) => c.name === 'Am');

  return (
    <IllustrationWrapper title="🔄 Cambio de Acorde: Em → Am">
      <View style={pfStyles.row}>
        {/* Em */}
        <View style={pfStyles.diagBox}>
          <CompactChordDiagram chord={em} />
        </View>
        {/* Arrow */}
        <View style={pfStyles.arrowCol}>
          <Text style={pfStyles.arrow}>→</Text>
        </View>
        {/* Am */}
        <View style={pfStyles.diagBox}>
          <CompactChordDiagram chord={am} />
        </View>
      </View>

      {/* Pivot callout */}
      <View style={pfStyles.pivotBox}>
        <Text style={pfStyles.pivotTitle}>🔵 El dedo pivote (pivot finger)</Text>
        <View style={pfStyles.pivotRow}>
          <View style={pfStyles.pivotBadge}>
            <Text style={pfStyles.pivotBadgeText}>Dedo 2</Text>
          </View>
          <Text style={pfStyles.pivotDesc}>
            En Em: 5ª cuerda, traste 2{'\n'}
            En Am: 4ª cuerda, traste 2{'\n'}
            ¡Permanece en el mismo traste!
          </Text>
        </View>
      </View>

      {/* Finger guide */}
      <View style={pfStyles.fingerGuide}>
        <Text style={pfStyles.guideTitle}>Posición de los dedos</Text>
        <View style={pfStyles.guideRow}>
          <View style={pfStyles.guideChord}>
            <Text style={pfStyles.guideChordName}>Em</Text>
            <Text style={pfStyles.guideItem}>Dedo 2 → 5ª cuerda, traste 2</Text>
            <Text style={pfStyles.guideItem}>Dedo 3 → 4ª cuerda, traste 2</Text>
          </View>
          <View style={pfStyles.guideDivider} />
          <View style={pfStyles.guideChord}>
            <Text style={pfStyles.guideChordName}>Am</Text>
            <Text style={pfStyles.guideItem}>Dedo 1 → 2ª cuerda, traste 1</Text>
            <Text style={[pfStyles.guideItem, { color: C.blue }]}>Dedo 2 → 4ª cuerda, traste 2 ← pivote</Text>
            <Text style={pfStyles.guideItem}>Dedo 3 → 3ª cuerda, traste 2</Text>
          </View>
        </View>
      </View>
    </IllustrationWrapper>
  );
}

const pfStyles = StyleSheet.create({
  row:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  diagBox:      { flex: 1 },
  arrowCol:     { width: 30, alignItems: 'center', paddingTop: 20 },
  arrow:        { fontSize: 24, color: C.red, fontWeight: '900' },
  pivotBox:     {
    backgroundColor: '#15202C', borderRadius: 10, padding: 10, marginTop: 10,
    borderWidth: 1, borderColor: C.blue,
  },
  pivotTitle:   { fontSize: 12, fontWeight: '700', color: C.blue, marginBottom: 6 },
  pivotRow:     { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  pivotBadge:   {
    backgroundColor: C.blue, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
    alignSelf: 'flex-start', flexShrink: 0,
  },
  pivotBadgeText:{ color: '#FFF', fontWeight: '900', fontSize: 11 },
  pivotDesc:    { fontSize: 12, color: C.muted, lineHeight: 18, flex: 1 },
  fingerGuide:  {
    backgroundColor: '#1A1A1A', borderRadius: 10, padding: 10, marginTop: 8,
    borderWidth: 1, borderColor: '#2A2A2A',
  },
  guideTitle:   { fontSize: 11, fontWeight: '700', color: C.muted, marginBottom: 6, textAlign: 'center' },
  guideRow:     { flexDirection: 'row' },
  guideChord:   { flex: 1 },
  guideChordName:{ fontSize: 16, fontWeight: '900', color: C.red, marginBottom: 4 },
  guideItem:    { fontSize: 10, color: C.muted, lineHeight: 16 },
  guideDivider: { width: 1, backgroundColor: '#2A2A2A', marginHorizontal: 10 },
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. MAJOR SCALE ILLUSTRATION  (C major on mini fretboard)
// ─────────────────────────────────────────────────────────────────────────────
// C major notes: C D E F G A B
const C_MAJOR = new Set(['C', 'D', 'E', 'F', 'G', 'A', 'B']);

// [string label, fret 0..5 notes]
const SCALE_GRID = [
  { label: '1ª (E)', frets: ['E', 'F', 'F#', 'G', 'G#', 'A'] },
  { label: '2ª (B)', frets: ['B', 'C', 'C#', 'D', 'D#', 'E'] },
  { label: '3ª (G)', frets: ['G', 'G#', 'A', 'A#', 'B', 'C'] },
  { label: '4ª (D)', frets: ['D', 'D#', 'E', 'F', 'F#', 'G'] },
  { label: '5ª (A)', frets: ['A', 'A#', 'B', 'C', 'C#', 'D'] },
  { label: '6ª (E)', frets: ['E', 'F', 'F#', 'G', 'G#', 'A'] },
];

const FRET_NUMS = [0, 1, 2, 3, 4, 5];

function MajorScaleIllustration() {
  return (
    <IllustrationWrapper title="📐 Escala de Do Mayor en el Diapasón">
      {/* Fret header */}
      <View style={msStyles.headerRow}>
        <View style={msStyles.strLabelCell} />
        {FRET_NUMS.map((f) => (
          <View key={f} style={msStyles.fretCell}>
            <Text style={msStyles.fretNum}>{f === 0 ? 'aire' : `T${f}`}</Text>
          </View>
        ))}
      </View>

      {/* Strings */}
      {SCALE_GRID.map((str) => (
        <View key={str.label} style={msStyles.strRow}>
          <View style={msStyles.strLabelCell}>
            <Text style={msStyles.strLabel}>{str.label}</Text>
          </View>
          {str.frets.map((note, fi) => {
            const inScale = C_MAJOR.has(note);
            return (
              <View
                key={fi}
                style={[msStyles.fretCell, inScale ? msStyles.scaleFret : msStyles.nonScaleFret]}
              >
                <Text style={[msStyles.noteText, inScale ? msStyles.scaleNote : msStyles.nonScaleNote]}>
                  {note}
                </Text>
              </View>
            );
          })}
        </View>
      ))}

      {/* Legend */}
      <View style={msStyles.legend}>
        <View style={[msStyles.swatch, { backgroundColor: '#3A0A14' }]} />
        <Text style={msStyles.legendLabel}>Nota en escala de Do mayor</Text>
        <View style={[msStyles.swatch, { backgroundColor: '#1A1A1A', marginLeft: 12 }]} />
        <Text style={msStyles.legendLabel}>Nota fuera de la escala</Text>
      </View>
    </IllustrationWrapper>
  );
}

const msStyles = StyleSheet.create({
  headerRow:     { flexDirection: 'row', marginBottom: 2 },
  strRow:        { flexDirection: 'row', marginBottom: 2 },
  strLabelCell:  { width: 52, justifyContent: 'center', paddingRight: 4 },
  strLabel:      { fontSize: 9, color: C.muted, textAlign: 'right' },
  fretCell:      {
    flex: 1, height: 28, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#222', borderRadius: 4, marginHorizontal: 1,
  },
  fretNum:       { fontSize: 8, color: C.dim, fontWeight: '600' },
  scaleFret:     { backgroundColor: '#3A0A14', borderColor: '#6A1A24' },
  nonScaleFret:  { backgroundColor: '#141414' },
  noteText:      { fontSize: 9, fontWeight: '700' },
  scaleNote:     { color: C.red },
  nonScaleNote:  { color: '#333' },
  legend:        { flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap', gap: 4 },
  swatch:        { width: 12, height: 12, borderRadius: 2, borderWidth: 1, borderColor: '#3A3A3A' },
  legendLabel:   { fontSize: 10, color: C.muted },
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. CHORD PROGRESSION ILLUSTRATION
// ─────────────────────────────────────────────────────────────────────────────
const PROGRESSIONS = [
  {
    name: 'Pop / Rock — la progresión más usada',
    degrees: ['I', 'V', 'vi', 'IV'],
    chords: ['C', 'G', 'Am', 'F'],
    key: 'Do mayor',
    colors: [C.blue, C.green, C.orange, C.purple],
  },
  {
    name: 'Tonalidad de La menor',
    degrees: ['vi', 'IV', 'I', 'V'],
    chords: ['Am', 'F', 'C', 'G'],
    key: 'La menor',
    colors: [C.orange, C.purple, C.blue, C.green],
  },
  {
    name: 'Blues / Rock clásico',
    degrees: ['I', 'IV', 'V', 'I'],
    chords: ['A', 'D', 'E', 'A'],
    key: 'La mayor',
    colors: [C.red, C.blue, C.green, C.red],
  },
];

function ChordProgressionIllustration() {
  return (
    <IllustrationWrapper title="🔗 Progresiones de Acordes Comunes">
      {PROGRESSIONS.map((prog, pi) => (
        <View key={pi} style={prStyles.progBlock}>
          <View style={prStyles.progHeader}>
            <Text style={prStyles.progName}>{prog.name}</Text>
            <View style={prStyles.keyBadge}>
              <Text style={prStyles.keyText}>{prog.key}</Text>
            </View>
          </View>
          <View style={prStyles.chordRow}>
            {prog.chords.map((chord, ci) => (
              <React.Fragment key={ci}>
                <View style={[prStyles.chordBox, { borderColor: prog.colors[ci] }]}>
                  <Text style={[prStyles.degree, { color: prog.colors[ci] }]}>
                    {prog.degrees[ci]}
                  </Text>
                  <Text style={prStyles.chordName}>{chord}</Text>
                </View>
                {ci < prog.chords.length - 1 && (
                  <Text style={prStyles.dash}>–</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </IllustrationWrapper>
  );
}

const prStyles = StyleSheet.create({
  progBlock:  { marginBottom: 14 },
  progHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  progName:   { flex: 1, fontSize: 11, color: C.muted, fontStyle: 'italic' },
  keyBadge:   {
    backgroundColor: '#2A2A2A', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2,
  },
  keyText:    { fontSize: 9, color: C.muted, fontWeight: '700' },
  chordRow:   { flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'center' },
  chordBox:   {
    flex: 1, borderWidth: 2, borderRadius: 10,
    paddingVertical: 8, alignItems: 'center', backgroundColor: '#1A1A1A',
  },
  degree:     { fontSize: 11, fontWeight: '700', marginBottom: 2 },
  chordName:  { fontSize: 20, fontWeight: '900', color: C.text },
  dash:       { fontSize: 16, color: C.dim, fontWeight: '700' },
});

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT EXPORT — dispatches by lesson ID
// ─────────────────────────────────────────────────────────────────────────────
export default function LessonIllustration({ lessonId }) {
  switch (lessonId) {
    case 'guitar-parts':
      return <GuitarPartsIllustration />;
    case 'tuning':
      return <StringTuningIllustration />;
    case 'music-notes':
      return <ChromaticScaleIllustration />;
    case 'first-chords-em-am':
      return <ChordDiagramPair chordNames={['Em', 'Am']} />;
    case 'chords-e-a':
      return <ChordDiagramPair chordNames={['E', 'A']} />;
    case 'chords-d-g':
      return <ChordDiagramPair chordNames={['D', 'G']} />;
    case 'strumming-basics':
      return <StrummingPatternIllustration />;
    case 'chord-transitions':
      return <PivotFingerIllustration />;
    case 'chord-c-dm':
      return <ChordDiagramPair chordNames={['C', 'Dm']} />;
    case 'major-scale':
      return <MajorScaleIllustration />;
    case 'chord-progressions':
      return <ChordProgressionIllustration />;
    default:
      return null;
  }
}
