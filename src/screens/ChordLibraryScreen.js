import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import CHORDS, { CATEGORIES } from '../data/chords';

const CATEGORY_ICONS = {
  Major: '🎵',
  Minor: '🎶',
  Seventh: '7️⃣',
  Extended: '✨',
};

export default function ChordLibraryScreen({ navigate, goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

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
          <Text style={styles.title}>🎼 Chord Library</Text>
          <Text style={styles.subtitle}>Tap a chord to see the diagram</Text>
        </View>

        {/* Category sections */}
        {CATEGORIES.map((category) => {
          const chords = CHORDS.filter((c) => c.category === category);
          return (
            <View key={category} style={styles.section}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>
                  {CATEGORY_ICONS[category]}
                </Text>
                <Text style={styles.categoryTitle}>{category}</Text>
              </View>

              <View style={styles.grid}>
                {chords.map((chord) => (
                  <TouchableOpacity
                    key={chord.name}
                    style={styles.chordCard}
                    onPress={() => navigate('ChordDetail', { chord })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.chordName}>{chord.name}</Text>
                    <Text style={styles.chordNotes}>
                      {chord.notes.join(' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
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
    paddingBottom: 32,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
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
  subtitle: {
    fontSize: 13,
    color: '#6666aa',
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#c0c0e0',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chordCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
    minWidth: 70,
  },
  chordName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f0e68c',
    marginBottom: 2,
  },
  chordNotes: {
    fontSize: 10,
    color: '#6666aa',
  },
});
