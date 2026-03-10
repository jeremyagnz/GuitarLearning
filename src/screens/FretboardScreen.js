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
import CHORDS from '../data/chords';

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

const NATURAL_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Normalize flat note names (from chord data) to sharp equivalents
const ENHARMONIC = { Eb: 'D#', Bb: 'A#', Ab: 'G#', Db: 'C#', Gb: 'F#' };
const normalizeNote = (n) => ENHARMONIC[n] || n;

export default function FretboardScreen({ goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedChord, setSelectedChord] = useState(null);
  const [activeCell, setActiveCell] = useState(null);

  const containerWidth = Math.min(width, 520);
  const totalCols = FRET_COUNT + 1;
  const cellW = Math.floor((containerWidth - 32) / totalCols);
  const cellH = Math.max(cellW, 36);

  // Build a set of highlighted note names based on current selection
  const getHighlightedNotes = () => {
    if (selectedNote) return new Set([selectedNote]);
    if (selectedChord) {
      const chord = CHORDS.find((c) => c.name === selectedChord);
      if (chord) return new Set(chord.notes.map(normalizeNote));
    }
    return new Set();
  };
  const highlighted = getHighlightedNotes();

  const handlePress = (sIdx, f) => {
    const freq = getFretFrequency(sIdx, f);
    const key = `${sIdx}-${f}`;
    setActiveCell(key);
    playNote(freq);
    setTimeout(() => setActiveCell((cur) => (cur === key ? null : cur)), 700);
  };

  const handleNoteSelect = (note) => {
    setSelectedNote((prev) => (prev === note ? null : note));
    setSelectedChord(null);
  };

  const handleChordSelect = (name) => {
    setSelectedChord((prev) => (prev === name ? null : name));
    setSelectedNote(null);
  };

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🎸 Fretboard Explorer</Text>
          <Text style={styles.subtitle}>Selecciona nota o acorde para resaltar • Toca para escuchar</Text>
        </View>

        {/* Note selector */}
        <View style={styles.selectorSection}>
          <Text style={styles.selectorLabel}>Nota:</Text>
          <View style={styles.selectorRow}>
            {NATURAL_NOTES.map((note) => (
              <TouchableOpacity
                key={note}
                style={[styles.selBtn, selectedNote === note && styles.selBtnActive]}
                onPress={() => handleNoteSelect(note)}
              >
                <Text style={[styles.selBtnText, selectedNote === note && styles.selBtnTextActive]}>
                  {note}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chord selector */}
        <View style={styles.selectorSection}>
          <Text style={styles.selectorLabel}>Acorde:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.selectorRow}>
              {CHORDS.map((chord) => (
                <TouchableOpacity
                  key={chord.name}
                  style={[styles.selBtn, selectedChord === chord.name && styles.selBtnActive]}
                  onPress={() => handleChordSelect(chord.name)}
                >
                  <Text style={[styles.selBtnText, selectedChord === chord.name && styles.selBtnTextActive]}>
                    {chord.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Highlighted info strip */}
        {(selectedNote || selectedChord) && (
          <View style={styles.infoStrip}>
            {selectedNote && (
              <Text style={styles.infoText}>
                🔴 Resaltando todas las posiciones de <Text style={styles.infoHighlight}>{selectedNote}</Text>
              </Text>
            )}
            {selectedChord && (() => {
              const chord = CHORDS.find((c) => c.name === selectedChord);
              return chord ? (
                <Text style={styles.infoText}>
                  🔴 Acorde <Text style={styles.infoHighlight}>{chord.name}</Text>
                  {' — notas: '}
                  <Text style={styles.infoHighlight}>{chord.notes.map(normalizeNote).join(' · ')}</Text>
                </Text>
              ) : null;
            })()}
          </View>
        )}

        {/* Fretboard grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fbScroll}>
          <View>
            {/* Fret number header */}
            <View style={styles.row}>
              <View style={[styles.labelCell, { width: cellW, height: cellH }]} />
              {Array.from({ length: FRET_COUNT }, (_, f) => (
                <View key={f} style={[styles.fretHeader, { width: cellW, height: cellH }]}>
                  <Text style={styles.fretNum}>{f === 0 ? '○' : f}</Text>
                </View>
              ))}
            </View>

            {/* String rows */}
            {STRING_LABELS.map((label, sIdx) => (
              <View key={sIdx} style={styles.row}>
                <View style={[styles.labelCell, { width: cellW, height: cellH }]}>
                  <Text style={styles.stringLabel}>{label}</Text>
                </View>
                {Array.from({ length: FRET_COUNT }, (_, f) => {
                  const note = getFretNote(sIdx, f);
                  const isHighlighted = highlighted.has(note);
                  const isActive = activeCell === `${sIdx}-${f}`;
                  return (
                    <TouchableOpacity
                      key={f}
                      onPress={() => handlePress(sIdx, f)}
                      style={[
                        styles.noteCell,
                        { width: cellW, height: cellH },
                        isHighlighted && styles.noteCellHighlighted,
                        isActive && !isHighlighted && styles.noteCellActive,
                      ]}
                      activeOpacity={0.6}
                    >
                      <Text
                        style={[
                          styles.noteText,
                          isHighlighted && styles.noteTextHighlighted,
                          isActive && !isHighlighted && styles.noteTextActive,
                        ]}
                      >
                        {note}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* Fret position markers */}
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

        <Text style={styles.footer}>🔊 Toca cualquier traste para escuchar la nota</Text>
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

  /* Header */
  header: {
    paddingTop: 48,
    paddingBottom: 12,
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
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },

  /* Selectors */
  selectorSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  selectorLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  selBtn: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minWidth: 40,
    alignItems: 'center',
  },
  selBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  selBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  selBtnTextActive: {
    color: COLORS.text,
  },

  /* Info strip */
  infoStrip: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#1A0000',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#3A0000',
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  infoHighlight: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  /* Fretboard */
  fbScroll: {
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
  },
  labelCell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
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
  noteCellHighlighted: {
    backgroundColor: COLORS.primary,
  },
  noteCellActive: {
    backgroundColor: COLORS.secondary,
  },
  noteText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
  },
  noteTextHighlighted: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 11,
  },
  noteTextActive: {
    color: COLORS.text,
    fontWeight: '700',
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
    paddingVertical: 14,
  },
});
