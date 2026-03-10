import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import ChordDiagram from '../components/ChordDiagram';
import { OPEN_FREQUENCIES, STRING_LABELS, getFretNote, FRET_COUNT } from '../data/notes';
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
};

const getChordFrequencies = (chord) =>
  chord.strings
    .map((fret, i) => (fret < 0 ? null : OPEN_FREQUENCIES[i] * Math.pow(2, fret / 12)))
    .filter(Boolean);

const FRETS_TO_SHOW = FRET_COUNT;

export default function ChordDetailScreen({ chord, goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const [playing, setPlaying] = useState(false);

  if (!chord) return null;

  const chordNoteSet = new Set(chord.notes);

  const handlePlay = () => {
    const freqs = getChordFrequencies(chord);
    setPlaying(true);
    playChord(freqs);
    setTimeout(() => setPlaying(false), freqs.length * 55 + 2200);
  };

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>🎸 Chord Detail</Text>
        </View>

        {/* Chord name + category */}
        <View style={styles.chordHeader}>
          <Text style={styles.chordName}>{chord.name}</Text>
          <Text style={styles.category}>{chord.category}</Text>
        </View>

        {/* Notes badges */}
        <View style={styles.notesRow}>
          {chord.notes.map((note) => (
            <View key={note} style={styles.noteBadge}>
              <Text style={styles.noteBadgeText}>{note}</Text>
            </View>
          ))}
        </View>

        {/* Chord diagram */}
        <View style={styles.diagramContainer}>
          <ChordDiagram chord={chord} />
        </View>

        {/* Tab notation */}
        <View style={styles.tabBox}>
          {STRING_LABELS.slice().reverse().map((label, i) => {
            const sIdx = 5 - i;
            const fret = chord.strings[sIdx];
            const fretStr = fret < 0 ? 'X' : fret === 0 ? '0' : `${fret}`;
            return (
              <View key={sIdx} style={styles.tabRow}>
                <Text style={styles.tabLabel}>{label}</Text>
                <Text style={styles.tabPipe}> |</Text>
                <Text style={styles.tabFrets}>
                  {'---'}
                  <Text style={styles.tabFretNum}>{fretStr}</Text>
                  {'---'}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Play button */}
        <TouchableOpacity
          style={[styles.playBtn, playing && styles.playBtnActive]}
          onPress={handlePlay}
          activeOpacity={0.7}
        >
          <Text style={styles.playBtnText}>
            {playing ? '♪ Playing...' : '🔊 Play Chord'}
          </Text>
        </TouchableOpacity>

        {/* Fretboard highlighting */}
        <Text style={styles.sectionLabel}>Fretboard View</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.fretboard}>
            <View style={styles.fbRow}>
              <View style={styles.fbLabelCell} />
              {Array.from({ length: FRETS_TO_SHOW }, (_, f) => (
                <View key={f} style={styles.fbFretHeader}>
                  <Text style={styles.fbFretNum}>{f === 0 ? '' : f}</Text>
                </View>
              ))}
            </View>

            {STRING_LABELS.map((label, sIdx) => (
              <View key={sIdx} style={styles.fbRow}>
                <View style={styles.fbLabelCell}>
                  <Text style={styles.fbLabel}>{label}</Text>
                </View>
                {Array.from({ length: FRETS_TO_SHOW }, (_, f) => {
                  const note = getFretNote(sIdx, f);
                  const isInChord = chordNoteSet.has(note);
                  const isPlayed = chord.strings[sIdx] >= 0 && chord.strings[sIdx] === f;
                  return (
                    <View
                      key={f}
                      style={[
                        styles.fbCell,
                        isInChord && styles.fbCellHighlight,
                        isPlayed && styles.fbCellPlayed,
                      ]}
                    >
                      {(isInChord || isPlayed) && (
                        <Text style={[styles.fbNote, isPlayed && styles.fbNotePlayed]}>
                          {note}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.footer}>{'✕ = muted string   ○ = open string'}</Text>
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
  header: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 4,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  chordHeader: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  chordName: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  category: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  notesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  noteBadge: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  noteBadgeText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 15,
  },
  diagramContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  tabBox: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  tabLabel: {
    width: 14,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  tabPipe: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontFamily: 'monospace',
  },
  tabFrets: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontFamily: 'monospace',
  },
  tabFretNum: {
    fontSize: 12,
    color: COLORS.text,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  playBtn: {
    marginHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
  },
  playBtnActive: {
    backgroundColor: COLORS.primaryDark,
  },
  playBtnText: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  fretboard: {
    paddingLeft: 20,
    paddingBottom: 8,
  },
  fbRow: {
    flexDirection: 'row',
  },
  fbLabelCell: {
    width: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
  },
  fbLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  fbFretHeader: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbFretNum: {
    fontSize: 9,
    color: COLORS.textMuted,
  },
  fbCell: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#222222',
    backgroundColor: '#111111',
  },
  fbCellHighlight: {
    backgroundColor: '#3A0000',
  },
  fbCellPlayed: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  fbNote: {
    fontSize: 9,
    fontWeight: '600',
    color: '#CC4444',
  },
  fbNotePlayed: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.text,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 12,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
});
