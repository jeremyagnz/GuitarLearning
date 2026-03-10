import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  primary: '#DC143C',
  text: '#F5F5F5',
  textMuted: '#888888',
  card: '#1A1A1A',
  error: '#EF4444',
  success: '#22C55E',
};

const FRETS = 5;
const STRINGS = 6;
const STRING_LABELS = ['E', 'A', 'D', 'G', 'B', 'e'];

/**
 * Renders a guitar chord diagram using plain React Native Views.
 * Compatible with iOS, Android, and Web.
 */
export default function ChordDiagram({ chord }) {
  if (!chord) return null;

  const { strings, fingers, barre } = chord;

  const pressedFrets = strings.filter((f) => f > 0);
  const minFret = pressedFrets.length > 0 ? Math.min(...pressedFrets) : 1;
  const startFret = minFret > 1 ? minFret : 1;

  const isFretPressed = (stringIndex, fret) => {
    const absoluteFret = fret + startFret - 1;
    return strings[stringIndex] === absoluteFret;
  };

  const barreCoveredAt = (stringIndex, fret) => {
    if (!barre) return false;
    const absoluteFret = fret + startFret - 1;
    if (barre.fret !== absoluteFret) return false;
    const sIdx = stringIndex + 1;
    return sIdx >= barre.from && sIdx <= barre.to;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chordName}>{chord.name}</Text>

      {startFret > 1 && (
        <Text style={styles.fretLabel}>{startFret}fr</Text>
      )}

      <View style={styles.nut} />

      <View style={styles.topRow}>
        {strings.map((fret, i) => (
          <View key={i} style={styles.stringLabelCell}>
            {fret === -1 ? (
              <Text style={styles.muteSymbol}>✕</Text>
            ) : fret === 0 ? (
              <Text style={styles.openSymbol}>○</Text>
            ) : (
              <Text style={styles.stringLabelText}>{STRING_LABELS[i]}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.fretboard}>
        {Array.from({ length: STRINGS }).map((_, si) => (
          <View
            key={`string-${si}`}
            style={[styles.stringLine, { left: `${(si / (STRINGS - 1)) * 100}%` }]}
          />
        ))}

        {Array.from({ length: FRETS + 1 }).map((_, fi) => (
          <View
            key={`fret-${fi}`}
            style={[styles.fretLine, { top: `${(fi / FRETS) * 100}%` }]}
          />
        ))}

        {barre && (() => {
          const fretRow = barre.fret - startFret;
          if (fretRow < 0 || fretRow >= FRETS) return null;
          const fromPct = ((barre.from - 1) / (STRINGS - 1)) * 100;
          const toPct = ((barre.to - 1) / (STRINGS - 1)) * 100;
          return (
            <View
              key="barre"
              style={[
                styles.barre,
                {
                  top: `${((fretRow + 0.5) / FRETS) * 100}%`,
                  left: `${fromPct}%`,
                  right: `${100 - toPct}%`,
                },
              ]}
            />
          );
        })()}

        {Array.from({ length: FRETS }).map((_, fi) =>
          Array.from({ length: STRINGS }).map((_, si) => {
            if (!isFretPressed(si, fi + 1)) return null;
            if (barreCoveredAt(si, fi + 1)) return null;
            return (
              <View
                key={`dot-${si}-${fi}`}
                style={[
                  styles.dot,
                  {
                    top: `${((fi + 0.5) / FRETS) * 100}%`,
                    left: `${(si / (STRINGS - 1)) * 100}%`,
                  },
                ]}
              />
            );
          })
        )}
      </View>

      <View style={styles.bottomRow}>
        {STRING_LABELS.map((label, i) => (
          <View key={i} style={styles.stringLabelCell}>
            <Text style={styles.stringLabelText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const CELL_SIZE = 36;
const BOARD_HEIGHT = FRETS * CELL_SIZE;
const BOARD_WIDTH = (STRINGS - 1) * CELL_SIZE;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  chordName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  fretLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  nut: {
    width: BOARD_WIDTH + 4,
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    marginBottom: 0,
  },
  topRow: {
    flexDirection: 'row',
    width: BOARD_WIDTH + 4,
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    width: BOARD_WIDTH + 4,
    justifyContent: 'space-between',
    marginTop: 6,
  },
  stringLabelCell: {
    width: CELL_SIZE,
    alignItems: 'center',
  },
  stringLabelText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  muteSymbol: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '700',
  },
  openSymbol: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '700',
  },
  fretboard: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    position: 'relative',
    marginHorizontal: 2,
  },
  stringLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#555555',
    transform: [{ translateX: -1 }],
  },
  fretLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#333333',
  },
  dot: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  barre: {
    position: 'absolute',
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    transform: [{ translateY: -12 }],
  },
});
