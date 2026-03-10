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

        {CATEGORIES.map((category) => {
          const chords = CHORDS.filter((c) => c.category === category);
          return (
            <View key={category} style={styles.section}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{CATEGORY_ICONS[category]}</Text>
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
                    <Text style={styles.chordNotes}>{chord.notes.join(' ')}</Text>
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
    backgroundColor: COLORS.background,
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
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
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
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chordCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minWidth: 70,
  },
  chordName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 2,
  },
  chordNotes: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
});
