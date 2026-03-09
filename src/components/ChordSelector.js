import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

/**
 * Horizontal scrollable list of chord name buttons.
 * Compatible with iOS, Android, and Web.
 */
export default function ChordSelector({ chords, selectedChord, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}
    >
      {chords.map((chord) => {
        const isSelected = selectedChord && selectedChord.name === chord.name;
        return (
          <TouchableOpacity
            key={chord.name}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(chord)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${chord.name} chord`}
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {chord.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#f0e68c',
    backgroundColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: '#f0e68c',
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f0e68c',
  },
  chipTextSelected: {
    color: '#1a1a2e',
  },
});
