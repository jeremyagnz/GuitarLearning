import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
  error: '#EF4444',
};

const PRACTICE_CHORDS = CHORDS.filter((c) => ['Major', 'Minor'].includes(c.category));

const pickRandom = (arr, exclude) => {
  const pool = arr.filter((c) => c.name !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

const getChordFrequencies = (chord) =>
  chord.strings
    .map((fret, i) => (fret < 0 ? null : OPEN_FREQUENCIES[i] * Math.pow(2, fret / 12)))
    .filter(Boolean);

export default function PracticeModeScreen({ goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [current, setCurrent] = useState(
    () => PRACTICE_CHORDS[Math.floor(Math.random() * PRACTICE_CHORDS.length)]
  );
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const next = useCallback((wasCorrect) => {
    setScore((s) => ({
      correct: s.correct + (wasCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setCurrent((prev) => pickRandom(PRACTICE_CHORDS, prev.name));
    setRevealed(false);
  }, []);

  const handlePlay = () => {
    playChord(getChordFrequencies(current));
  };

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎧 Practice Mode</Text>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>
            ✅ {score.correct} / {score.total}
          </Text>
        </View>
      </View>

      {/* Chord challenge */}
      <View style={styles.body}>
        <Text style={styles.prompt}>Play this chord:</Text>
        <Text style={styles.chordName}>{current.name}</Text>
        <Text style={styles.category}>{current.category}</Text>

        {!revealed ? (
          <TouchableOpacity
            style={styles.revealBtn}
            onPress={() => setRevealed(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.revealBtnText}>👁 Show Diagram</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.diagramArea}>
            <ChordDiagram chord={current} />

            <View style={styles.notesRow}>
              {current.notes.map((n) => (
                <View key={n} style={styles.noteBadge}>
                  <Text style={styles.noteBadgeText}>{n}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.playBtn} onPress={handlePlay} activeOpacity={0.7}>
              <Text style={styles.playBtnText}>🔊 Play Chord</Text>
            </TouchableOpacity>

            <Text style={styles.evaluateLabel}>¿Lo tocaste correctamente?</Text>
            <View style={styles.evalRow}>
              <TouchableOpacity
                style={[styles.evalBtn, styles.evalBtnYes]}
                onPress={() => next(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.evalBtnText}>✅ Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.evalBtn, styles.evalBtnNo]}
                onPress={() => next(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.evalBtnText}>❌ No todavía</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!revealed && (
          <Text style={styles.hint}>
            Intenta tocar el acorde y luego presiona "Show Diagram" para verificar.
          </Text>
        )}
      </View>
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
    paddingBottom: 8,
    paddingHorizontal: 20,
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
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  scorePill: {
    marginTop: 10,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  scoreText: {
    color: COLORS.success,
    fontWeight: '700',
    fontSize: 14,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  prompt: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  chordName: {
    fontSize: 64,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 3,
  },
  category: {
    fontSize: 15,
    color: COLORS.textMuted,
    marginBottom: 28,
  },
  revealBtn: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  revealBtnText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 17,
  },
  diagramArea: {
    alignItems: 'center',
    width: '100%',
  },
  notesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  noteBadge: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  noteBadgeText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
  playBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  playBtnText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 16,
  },
  evaluateLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  evalRow: {
    flexDirection: 'row',
    gap: 16,
  },
  evalBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 1,
  },
  evalBtnYes: {
    backgroundColor: '#052E16',
    borderColor: COLORS.success,
  },
  evalBtnNo: {
    backgroundColor: '#2D0000',
    borderColor: COLORS.error,
  },
  evalBtnText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 15,
  },
  hint: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 20,
    maxWidth: 280,
  },
});
