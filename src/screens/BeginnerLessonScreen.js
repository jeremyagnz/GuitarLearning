import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import CHORDS from '../data/chords';
import ChordDiagram from '../components/ChordDiagram';
import { OPEN_FREQUENCIES } from '../data/notes';
import { playChord } from '../utils/audio';

const COLORS = {
  background: '#0F0F0F',
  card: '#1A1A1A',
  cardBorder: '#2A2A2A',
  secondary: '#3D3D3D',
  primary: '#DC143C',
  primaryDark: '#8B0000',
  text: '#F5F5F5',
  textSecondary: '#999999',
  textMuted: '#555555',
  success: '#22C55E',
  gold: '#F0C040',
  blue: '#4A90D9',
  orange: '#E07B39',
};

/** Solfège ↔ English note name mapping */
const NOTE_MAP = [
  { solfege: 'Do', english: 'C', color: '#DC143C' },
  { solfege: 'Re', english: 'D', color: '#E07B39' },
  { solfege: 'Mi', english: 'E', color: '#F0C040' },
  { solfege: 'Fa', english: 'F', color: '#4A90D9' },
  { solfege: 'Sol', english: 'G', color: '#22C55E' },
  { solfege: 'La', english: 'A', color: '#9B59B6' },
  { solfege: 'Si', english: 'B', color: '#E74C3C' },
];

/** Open string labels and their solfège equivalents */
const OPEN_STRINGS = [
  { string: '6ª (grave)', note: 'E', solfege: 'Mi', color: '#DC143C' },
  { string: '5ª', note: 'A', solfege: 'La', color: '#9B59B6' },
  { string: '4ª', note: 'D', solfege: 'Re', color: '#E07B39' },
  { string: '3ª', note: 'G', solfege: 'Sol', color: '#22C55E' },
  { string: '2ª', note: 'B', solfege: 'Si', color: '#E74C3C' },
  { string: '1ª (aguda)', note: 'E', solfege: 'Mi', color: '#DC143C' },
];

/** Chord difficulty data */
const DIFFICULTY_LEVELS = [
  {
    id: 'easy',
    label: '🟢 Fácil',
    description: 'Acordes abiertos ideales para empezar. Requieren 2-3 dedos y no usan cejilla.',
    chordNames: ['Em', 'Am', 'E', 'A', 'D', 'G'],
  },
  {
    id: 'intermediate',
    label: '🟡 Intermedio',
    description: 'Acordes abiertos con más dedos o variantes con séptima. Requieren más precisión.',
    chordNames: ['C', 'Dm', 'E7', 'A7', 'D7', 'G7', 'Cmaj7', 'Csus4'],
  },
  {
    id: 'advanced',
    label: '🔴 Avanzado',
    description: 'Acordes con cejilla (barre) o posiciones cerradas. Requieren mayor fuerza y técnica.',
    chordNames: ['F', 'B', 'Bm', 'Fm', 'Gm', 'Cm', 'Cm7'],
  },
];

const getChordFrequencies = (chord) =>
  chord.strings
    .map((fret, i) => (fret < 0 ? null : OPEN_FREQUENCIES[i] * Math.pow(2, fret / 12)))
    .filter(Boolean);

/** Small interactive chord card used inside difficulty sections */
function ChordCard({ chord, navigate }) {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handlePlay = () => {
    const freqs = getChordFrequencies(chord);
    setPlaying(true);
    playChord(freqs);
    setTimeout(() => setPlaying(false), freqs.length * 55 + 2200);
  };

  return (
    <View style={cardStyles.wrapper}>
      {/* Header row */}
      <TouchableOpacity
        style={cardStyles.header}
        onPress={() => setExpanded((v) => !v)}
        activeOpacity={0.75}
      >
        <View style={cardStyles.headerLeft}>
          <Text style={cardStyles.chordName}>{chord.name}</Text>
          <Text style={cardStyles.category}>{chord.category}</Text>
        </View>
        <View style={cardStyles.headerRight}>
          {chord.barre && (
            <View style={cardStyles.barreBadge}>
              <Text style={cardStyles.barreBadgeText}>Cejilla</Text>
            </View>
          )}
          <Text style={cardStyles.toggle}>{expanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {/* Expanded: diagram + buttons */}
      {expanded && (
        <View style={cardStyles.expanded}>
          <ChordDiagram chord={chord} />

          {/* Notes row */}
          <View style={cardStyles.notesRow}>
            {chord.notes.map((n) => (
              <View key={n} style={cardStyles.noteBadge}>
                <Text style={cardStyles.noteBadgeText}>{n}</Text>
              </View>
            ))}
          </View>

          {/* Action buttons */}
          <View style={cardStyles.actions}>
            <TouchableOpacity
              style={[cardStyles.playBtn, playing && cardStyles.playBtnActive]}
              onPress={handlePlay}
              activeOpacity={0.7}
            >
              <Text style={cardStyles.playBtnText}>
                {playing ? '♪ Sonando…' : '🔊 Escuchar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={cardStyles.detailBtn}
              onPress={() => navigate('ChordDetail', { chord })}
              activeOpacity={0.7}
            >
              <Text style={cardStyles.detailBtnText}>Ver detalle ›</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const cardStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chordName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  category: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  barreBadge: {
    backgroundColor: '#3A1A1A',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  barreBadgeText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
  },
  toggle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  expanded: {
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 4,
  },
  notesRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
    marginBottom: 14,
  },
  noteBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  noteBadgeText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    width: '100%',
  },
  playBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  playBtnActive: {
    backgroundColor: COLORS.primaryDark,
  },
  playBtnText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
  detailBtn: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  detailBtnText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 14,
  },
});

/** Main screen */
export default function BeginnerLessonScreen({ navigate, goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => setOpenSection((prev) => (prev === id ? null : id));

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Atrás</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>📚 Lecciones para Principiantes</Text>
          <Text style={styles.screenSubtitle}>
            Aprende desde cero: notas, cuerdas y acordes por dificultad
          </Text>
        </View>

        {/* ── SECTION 1: Note names ─────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('notes')}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionIcon}>🎵</Text>
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>Las notas musicales</Text>
            <Text style={styles.sectionDesc}>Solfeo (Do…Si) vs. notación anglosajona (C…B)</Text>
          </View>
          <Text style={styles.sectionToggle}>{openSection === 'notes' ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {openSection === 'notes' && (
          <View style={styles.sectionBody}>
            <Text style={styles.bodyText}>
              En la música occidental existen{' '}
              <Text style={styles.highlight}>7 notas naturales</Text>. Dependiendo del país o el
              contexto, se usan dos sistemas de nomenclatura:
            </Text>

            {/* Note table */}
            <View style={styles.noteTable}>
              <View style={[styles.noteTableRow, styles.noteTableHeader]}>
                <Text style={[styles.noteTableCell, styles.noteTableHeaderText]}>Solfeo</Text>
                <Text style={[styles.noteTableCell, styles.noteTableHeaderText]}>Inglés</Text>
                <Text style={[styles.noteTableCell, styles.noteTableHeaderText]}>En guitarra</Text>
              </View>
              {NOTE_MAP.map(({ solfege, english, color }) => (
                <View key={english} style={styles.noteTableRow}>
                  <View style={styles.noteTableCell}>
                    <View style={[styles.noteCircle, { backgroundColor: color }]}>
                      <Text style={styles.noteCircleText}>{solfege}</Text>
                    </View>
                  </View>
                  <View style={styles.noteTableCell}>
                    <Text style={[styles.noteEnglish, { color }]}>{english}</Text>
                  </View>
                  <View style={styles.noteTableCell}>
                    <Text style={styles.noteGuitar}>
                      {english === 'E'
                        ? 'Cuerdas 1 y 6 al aire'
                        : english === 'A'
                        ? 'Cuerda 5 al aire'
                        : english === 'D'
                        ? 'Cuerda 4 al aire'
                        : english === 'G'
                        ? 'Cuerda 3 al aire'
                        : english === 'B'
                        ? 'Cuerda 2 al aire'
                        : '—'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Sharps/flats explanation */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>🎼 Sostenidos (#) y bemoles (b)</Text>
              <Text style={styles.infoText}>
                Entre algunas notas naturales existen{' '}
                <Text style={styles.highlight}>notas intermedias</Text>. Se llaman{' '}
                <Text style={styles.highlight}>sostenidos (#)</Text> o{' '}
                <Text style={styles.highlight}>bemoles (b)</Text>:{'\n\n'}
                C – C# – D – D# – E – F – F# – G – G# – A – A# – B{'\n\n'}
                (Do – Do# – Re – Re# – Mi – Fa – Fa# – Sol – Sol# – La – La# – Si){'\n\n'}
                En total son <Text style={styles.highlight}>12 notas</Text> antes de que la escala
                se repita una octava más arriba.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.divider} />

        {/* ── SECTION 2: Guitar strings ─────────────────────────────────── */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('strings')}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionIcon}>🎸</Text>
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>Las cuerdas de la guitarra</Text>
            <Text style={styles.sectionDesc}>Afinación estándar: E A D G B e</Text>
          </View>
          <Text style={styles.sectionToggle}>{openSection === 'strings' ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {openSection === 'strings' && (
          <View style={styles.sectionBody}>
            <Text style={styles.bodyText}>
              La guitarra tiene <Text style={styles.highlight}>6 cuerdas</Text>. En afinación
              estándar, cada cuerda al aire produce la siguiente nota:
            </Text>

            {OPEN_STRINGS.map(({ string, note, solfege, color }, i) => (
              <View key={i} style={styles.stringRow}>
                <View style={[styles.stringNum, { borderColor: color }]}>
                  <Text style={[styles.stringNumText, { color }]}>{i + 1}</Text>
                </View>
                <View style={styles.stringLine} />
                <View style={styles.stringInfo}>
                  <Text style={styles.stringLabel}>{string}</Text>
                  <Text style={[styles.stringNote, { color }]}>
                    {note} <Text style={styles.stringNoteSmall}>({solfege})</Text>
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>💡 Consejo</Text>
              <Text style={styles.infoText}>
                Un truco para recordar el orden es la frase:{'\n'}
                <Text style={styles.highlight}>"Elephants And Donkeys Grow Big Ears"</Text>
                {'\n'}(E – A – D – G – B – E)
              </Text>
            </View>
          </View>
        )}

        <View style={styles.divider} />

        {/* ── SECTION 3: Chords by difficulty ──────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🎼</Text>
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>Acordes por dificultad</Text>
            <Text style={styles.sectionDesc}>Toca la fila para expandir; escucha y practica</Text>
          </View>
        </View>

        {DIFFICULTY_LEVELS.map((level) => {
          const levelChords = level.chordNames
            .map((name) => CHORDS.find((c) => c.name === name))
            .filter(Boolean);
          const isOpen = openSection === level.id;

          return (
            <View key={level.id} style={styles.difficultyBlock}>
              <TouchableOpacity
                style={styles.difficultyHeader}
                onPress={() => toggleSection(level.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.difficultyLabel}>{level.label}</Text>
                <Text style={styles.sectionToggle}>{isOpen ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.difficultyBody}>
                  <Text style={styles.difficultyDesc}>{level.description}</Text>
                  {levelChords.map((chord) => (
                    <ChordCard key={chord.name} chord={chord} navigate={navigate} />
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.divider} />
        <Text style={styles.footer}>
          Guitar Trainer — Practica cada acorde hasta que suene limpio 🎸
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.background,
    alignSelf: 'center',
  },
  containerWide: {
    maxWidth: 520,
  },
  scroll: {
    paddingBottom: 40,
  },

  /* Header */
  header: {
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  backBtn: {
    marginBottom: 10,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  /* Section headers (collapsible) */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  sectionIcon: {
    fontSize: 26,
    marginRight: 14,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  sectionDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sectionToggle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },

  /* Section body */
  sectionBody: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  bodyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: 16,
  },
  highlight: {
    color: COLORS.text,
    fontWeight: '700',
  },

  /* Note table */
  noteTable: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 16,
  },
  noteTableHeader: {
    backgroundColor: COLORS.secondary,
  },
  noteTableHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  noteTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  noteTableCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  noteCircle: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  noteCircleText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
  },
  noteEnglish: {
    fontSize: 22,
    fontWeight: '900',
  },
  noteGuitar: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  /* Info box */
  infoBox: {
    backgroundColor: '#1A2A1A',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A3A2A',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.success,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  /* Strings section */
  stringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stringNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stringNumText: {
    fontSize: 14,
    fontWeight: '900',
  },
  stringLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 8,
  },
  stringInfo: {
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stringLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  stringNote: {
    fontSize: 18,
    fontWeight: '900',
  },
  stringNoteSmall: {
    fontSize: 12,
    fontWeight: '400',
  },

  /* Difficulty levels */
  difficultyBlock: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  difficultyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  difficultyBody: {
    padding: 14,
    backgroundColor: '#141414',
  },
  difficultyDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 14,
    lineHeight: 19,
  },

  /* Misc */
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 20,
    marginVertical: 4,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 12,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
