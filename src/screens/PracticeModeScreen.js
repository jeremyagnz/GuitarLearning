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

const PRACTICE_CHORDS = CHORDS.filter((c) =>
  ['Major', 'Minor'].includes(c.category)
);

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

  const next = useCallback(
    (wasCorrect) => {
      setScore((s) => ({
        correct: s.correct + (wasCorrect ? 1 : 0),
        total: s.total + 1,
      }));
      setCurrent((prev) => pickRandom(PRACTICE_CHORDS, prev.name));
      setRevealed(false);
    },
    []
  );

  const handlePlay = () => {
    const freqs = getChordFrequencies(current);
    playChord(freqs);
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

        {/* Reveal button or diagram */}
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

            {/* Notes */}
            <View style={styles.notesRow}>
              {current.notes.map((n) => (
                <View key={n} style={styles.noteBadge}>
                  <Text style={styles.noteBadgeText}>{n}</Text>
                </View>
              ))}
            </View>

            {/* Play sound */}
            <TouchableOpacity
              style={styles.playBtn}
              onPress={handlePlay}
              activeOpacity={0.7}
            >
              <Text style={styles.playBtnText}>🔊 Play Chord</Text>
            </TouchableOpacity>

            {/* Self-evaluation */}
            <Text style={styles.evaluateLabel}>Did you get it right?</Text>
            <View style={styles.evalRow}>
              <TouchableOpacity
                style={[styles.evalBtn, styles.evalBtnYes]}
                onPress={() => next(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.evalBtnText}>✅ Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.evalBtn, styles.evalBtnNo]}
                onPress={() => next(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.evalBtnText}>❌ Not yet</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!revealed && (
          <Text style={styles.hint}>
            Try playing the chord, then tap Show Diagram to check.
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
    backgroundColor: '#0d0d1a',
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
    color: '#f0e68c',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f0e68c',
  },
  scorePill: {
    marginTop: 10,
    backgroundColor: '#1a2a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#2a4a2a',
  },
  scoreText: {
    color: '#7eff9e',
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
    color: '#8888aa',
    marginBottom: 8,
  },
  chordName: {
    fontSize: 64,
    fontWeight: '900',
    color: '#f0e68c',
    letterSpacing: 3,
  },
  category: {
    fontSize: 15,
    color: '#5555aa',
    marginBottom: 28,
  },
  revealBtn: {
    backgroundColor: '#1e1e3a',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: '#3a3a6a',
  },
  revealBtnText: {
    color: '#c0c0e8',
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
    backgroundColor: '#1e1e3a',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#3a3a6a',
  },
  noteBadgeText: {
    color: '#c0c0e8',
    fontWeight: '700',
    fontSize: 14,
  },
  playBtn: {
    backgroundColor: '#1a3a2a',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#2a5a3a',
    marginBottom: 20,
  },
  playBtnText: {
    color: '#7eff9e',
    fontWeight: '700',
    fontSize: 16,
  },
  evaluateLabel: {
    fontSize: 14,
    color: '#7777aa',
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
    backgroundColor: '#1a3a2a',
    borderColor: '#2a5a3a',
  },
  evalBtnNo: {
    backgroundColor: '#3a1a1a',
    borderColor: '#5a2a2a',
  },
  evalBtnText: {
    color: '#e0e0f0',
    fontWeight: '700',
    fontSize: 15,
  },
  hint: {
    fontSize: 13,
    color: '#444466',
    textAlign: 'center',
    marginTop: 20,
    maxWidth: 280,
  },
});
