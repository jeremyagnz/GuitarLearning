import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

const CARDS = [
  {
    screen: 'NotesExplorer',
    icon: '🎵',
    title: 'Notes Explorer',
    subtitle: 'Ver todas las notas del diapasón',
  },
  {
    screen: 'ChordLibrary',
    icon: '🎼',
    title: 'Chord Library',
    subtitle: 'Explorar acordes de guitarra',
  },
  {
    screen: 'Fretboard',
    icon: '🎸',
    title: 'Fretboard',
    subtitle: 'Ver todas las notas en el mástil',
  },
  {
    screen: 'PracticeMode',
    icon: '🎧',
    title: 'Practice Mode',
    subtitle: 'Entrenamiento de acordes',
  },
];

export default function HomeScreen({ navigate }) {
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
          <Text style={styles.title}>🎸 Guitar Trainer</Text>
          <Text style={styles.subtitle}>Selecciona una opción para comenzar</Text>
        </View>

        {/* Navigation cards */}
        <View style={styles.cards}>
          {CARDS.map((card) => (
            <TouchableOpacity
              key={card.screen}
              style={styles.card}
              onPress={() => navigate(card.screen)}
              activeOpacity={0.75}
            >
              <Text style={styles.cardIcon}>{card.icon}</Text>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </View>
              <Text style={styles.cardArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Decorative rule */}
        <View style={styles.divider} />
        <Text style={styles.footer}>Guitar Trainer v1.0</Text>
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
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#f0e68c',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8888aa',
    marginTop: 6,
    textAlign: 'center',
  },
  cards: {
    paddingHorizontal: 20,
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e8e8f0',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7777aa',
  },
  cardArrow: {
    fontSize: 28,
    color: '#f0e68c',
    fontWeight: '300',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e1e3a',
    marginHorizontal: 24,
    marginTop: 36,
    marginBottom: 16,
  },
  footer: {
    textAlign: 'center',
    color: '#3a3a5a',
    fontSize: 12,
  },
});
