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

/** Build the list of frequencies for each sounding string in a chord */
const getChordFrequencies = (chord) => {
  return chord.strings
    .map((fret, i) => {
      if (fret < 0) return null;
      return OPEN_FREQUENCIES[i] * Math.pow(2, fret / 12);
    })
    .filter(Boolean);
};

const FRETS_TO_SHOW = FRET_COUNT; // 0..12

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
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
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

        {/* String / fret text tab */}
        <View style={styles.tabBox}>
          {STRING_LABELS.slice().reverse().map((label, i) => {
            // reverse so high e is on top
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
            {/* Fret numbers header */}
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
                  // Highlight played frets more prominently
                  const isPlayed =
                    chord.strings[sIdx] >= 0 && chord.strings[sIdx] === f;
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
                        <Text
                          style={[
                            styles.fbNote,
                            isPlayed && styles.fbNotePlayed,
                          ]}
                        >
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

        <Text style={styles.footer}>
          {'✕ = muted string   ○ = open string'}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0d0d1a',
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
    color: '#f0e68c',
    fontSize: 16,
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8888aa',
  },
  chordHeader: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  chordName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#f0e68c',
    letterSpacing: 2,
  },
  category: {
    fontSize: 14,
    color: '#6666aa',
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
    backgroundColor: '#1e1e3a',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#3a3a6a',
  },
  noteBadgeText: {
    color: '#c0c0e8',
    fontWeight: '700',
    fontSize: 15,
  },
  diagramContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  tabBox: {
    backgroundColor: '#111122',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  tabLabel: {
    width: 14,
    fontSize: 12,
    color: '#f0e68c',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  tabPipe: {
    fontSize: 12,
    color: '#555577',
    fontFamily: 'monospace',
  },
  tabFrets: {
    fontSize: 12,
    color: '#555577',
    fontFamily: 'monospace',
  },
  tabFretNum: {
    fontSize: 12,
    color: '#a0a0cc',
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  playBtn: {
    marginHorizontal: 20,
    backgroundColor: '#2a6f3a',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#3a8f4a',
  },
  playBtnActive: {
    backgroundColor: '#1a4f2a',
  },
  playBtnText: {
    color: '#7eff9e',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8888aa',
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
    backgroundColor: '#1a1a2e',
  },
  fbLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f0e68c',
  },
  fbFretHeader: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbFretNum: {
    fontSize: 9,
    color: '#444466',
  },
  fbCell: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#1e1e3a',
    backgroundColor: '#111120',
  },
  fbCellHighlight: {
    backgroundColor: '#1a2a3a',
  },
  fbCellPlayed: {
    backgroundColor: '#2a4a2a',
    borderColor: '#3a6a3a',
  },
  fbNote: {
    fontSize: 9,
    fontWeight: '600',
    color: '#5588aa',
  },
  fbNotePlayed: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7eff9e',
  },
  footer: {
    textAlign: 'center',
    color: '#3a3a5a',
    fontSize: 12,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
});
