import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  STRING_LABELS,
  FRET_COUNT,
  getFretNote,
  getFretFrequency,
} from '../data/notes';
import { playNote } from '../utils/audio';

// Sharp notes that get a darker accent colour
const SHARP_NOTES = new Set(['F#', 'G#', 'A#', 'C#', 'D#']);

export default function NotesExplorerScreen({ goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const [lastNote, setLastNote] = useState(null);

  const handlePress = (stringIndex, fret) => {
    const note = getFretNote(stringIndex, fret);
    const freq = getFretFrequency(stringIndex, fret);
    setLastNote(note);
    playNote(freq);
  };

  // Cell width is determined by available space / number of columns (frets + label)
  const containerWidth = Math.min(width, 520);
  const totalCols = FRET_COUNT + 1; // 1 label + 13 fret columns (0-12)
  const cellW = Math.floor((containerWidth - 32) / totalCols);
  const cellH = cellW > 32 ? cellW : 36;

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎵 Notes Explorer</Text>
        {lastNote ? (
          <Text style={styles.lastNote}>{lastNote}</Text>
        ) : (
          <Text style={styles.hint}>Tap a note to hear it</Text>
        )}
      </View>

      {/* Fret number header row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Fret numbers */}
          <View style={styles.row}>
            <View style={[styles.labelCell, { width: cellW, height: cellH }]} />
            {Array.from({ length: FRET_COUNT }, (_, f) => (
              <View
                key={f}
                style={[styles.fretHeader, { width: cellW, height: cellH }]}
              >
                <Text style={styles.fretNum}>{f === 0 ? 'Open' : f}</Text>
              </View>
            ))}
          </View>

          {/* One row per string (low E → high e) */}
          {STRING_LABELS.map((label, sIdx) => (
            <View key={sIdx} style={styles.row}>
              {/* String label */}
              <View
                style={[styles.labelCell, { width: cellW, height: cellH }]}
              >
                <Text style={styles.stringLabel}>{label}</Text>
              </View>

              {/* Fret cells */}
              {Array.from({ length: FRET_COUNT }, (_, f) => {
                const note = getFretNote(sIdx, f);
                const isSharp = SHARP_NOTES.has(note);
                return (
                  <TouchableOpacity
                    key={f}
                    onPress={() => handlePress(sIdx, f)}
                    style={[
                      styles.noteCell,
                      { width: cellW, height: cellH },
                      isSharp && styles.noteCellSharp,
                    ]}
                    activeOpacity={0.6}
                  >
                    <Text
                      style={[
                        styles.noteText,
                        isSharp && styles.noteTextSharp,
                      ]}
                    >
                      {note}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Fret markers (3, 5, 7, 9, 12) */}
          <View style={styles.row}>
            <View style={[styles.labelCell, { width: cellW, height: 20 }]} />
            {Array.from({ length: FRET_COUNT }, (_, f) => {
              const marker = [3, 5, 7, 9, 12].includes(f);
              return (
                <View
                  key={f}
                  style={[styles.markerCell, { width: cellW, height: 20 }]}
                >
                  {marker && (
                    <View style={styles.markerDot} />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Text style={styles.footer}>
        🔊 Tap any note to play its sound
      </Text>
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
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  backText: {
    color: '#f0e68c',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f0e68c',
    textAlign: 'center',
  },
  hint: {
    fontSize: 13,
    color: '#6666aa',
    marginTop: 6,
  },
  lastNote: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2ecc71',
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
  },
  labelCell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    borderRightWidth: 2,
    borderColor: '#2a2a4a',
  },
  stringLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#f0e68c',
  },
  fretHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#2a2a4a',
  },
  fretNum: {
    fontSize: 10,
    color: '#555577',
  },
  noteCell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#1e1e3a',
    backgroundColor: '#14142a',
  },
  noteCellSharp: {
    backgroundColor: '#0e0e22',
  },
  noteText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#a8a8cc',
  },
  noteTextSharp: {
    color: '#7777aa',
  },
  markerCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f0e68c',
  },
  footer: {
    textAlign: 'center',
    color: '#444466',
    fontSize: 12,
    paddingVertical: 12,
  },
});
