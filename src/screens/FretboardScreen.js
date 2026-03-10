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

const SHARP_NOTES = new Set(['F#', 'G#', 'A#', 'C#', 'D#']);

export default function FretboardScreen({ goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const [activeCell, setActiveCell] = useState(null);

  const containerWidth = Math.min(width, 520);
  const totalCols = FRET_COUNT + 1;
  const cellW = Math.floor((containerWidth - 32) / totalCols);
  const cellH = cellW > 32 ? cellW : 36;

  const handlePress = (sIdx, f) => {
    const freq = getFretFrequency(sIdx, f);
    setActiveCell(`${sIdx}-${f}`);
    playNote(freq);
    setTimeout(() => setActiveCell(null), 800);
  };

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎸 Fretboard</Text>
        <Text style={styles.subtitle}>Tap any note to hear its sound</Text>
      </View>

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
                <Text style={styles.fretNum}>{f === 0 ? '○' : f}</Text>
              </View>
            ))}
          </View>

          {STRING_LABELS.map((label, sIdx) => (
            <View key={sIdx} style={styles.row}>
              <View
                style={[styles.labelCell, { width: cellW, height: cellH }]}
              >
                <Text style={styles.stringLabel}>{label}</Text>
              </View>
              {Array.from({ length: FRET_COUNT }, (_, f) => {
                const note = getFretNote(sIdx, f);
                const isSharp = SHARP_NOTES.has(note);
                const key = `${sIdx}-${f}`;
                const isActive = activeCell === key;
                return (
                  <TouchableOpacity
                    key={f}
                    onPress={() => handlePress(sIdx, f)}
                    style={[
                      styles.noteCell,
                      { width: cellW, height: cellH },
                      isSharp && styles.noteCellSharp,
                      isActive && styles.noteCellActive,
                    ]}
                    activeOpacity={0.5}
                  >
                    <Text
                      style={[
                        styles.noteText,
                        isSharp && styles.noteTextSharp,
                        isActive && styles.noteTextActive,
                      ]}
                    >
                      {note}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Fret markers */}
          <View style={styles.row}>
            <View style={[styles.labelCell, { width: cellW, height: 20 }]} />
            {Array.from({ length: FRET_COUNT }, (_, f) => {
              const marker = [3, 5, 7, 9, 12].includes(f);
              return (
                <View
                  key={f}
                  style={[styles.markerCell, { width: cellW, height: 20 }]}
                >
                  {marker && <View style={styles.markerDot} />}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Text style={styles.footer}>🔊 Tap any fret to play the note</Text>
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
  },
  subtitle: {
    fontSize: 13,
    color: '#6666aa',
    marginTop: 4,
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
  noteCellActive: {
    backgroundColor: '#2a4a6a',
  },
  noteText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#a8a8cc',
  },
  noteTextSharp: {
    color: '#7777aa',
  },
  noteTextActive: {
    color: '#f0e68c',
    fontWeight: '800',
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
