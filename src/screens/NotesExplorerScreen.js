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

const COLORS = {
  background: '#0F0F0F',
  card: '#1A1A1A',
  cardBorder: '#2A2A2A',
  secondary: '#3D3D3D',
  primary: '#DC143C',
  text: '#F5F5F5',
  textSecondary: '#999999',
  textMuted: '#555555',
};

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

  const containerWidth = Math.min(width, 520);
  const totalCols = FRET_COUNT + 1;
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

          {STRING_LABELS.map((label, sIdx) => (
            <View key={sIdx} style={styles.row}>
              <View style={[styles.labelCell, { width: cellW, height: cellH }]}>
                <Text style={styles.stringLabel}>{label}</Text>
              </View>
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
                      style={[styles.noteText, isSharp && styles.noteTextSharp]}
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
                <View key={f} style={[styles.markerCell, { width: cellW, height: 20 }]}>
                  {marker && <View style={styles.markerDot} />}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Text style={styles.footer}>🔊 Tap any note to play its sound</Text>
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
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  hint: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  lastNote: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
  },
  labelCell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRightWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  stringLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  fretHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  fretNum: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  noteCell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#222222',
    backgroundColor: '#111111',
  },
  noteCellSharp: {
    backgroundColor: '#0A0A0A',
  },
  noteText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#777777',
  },
  noteTextSharp: {
    color: '#555555',
  },
  markerCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 12,
    paddingVertical: 12,
  },
});
