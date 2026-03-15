import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

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

const CARDS = [
  {
    screen: 'Learning',
    icon: '🎓',
    title: 'Aprendizaje',
    subtitle: 'Lecciones paso a paso para aprender guitarra',
  },
  {
    screen: 'BeginnerLesson',
    icon: '📚',
    title: 'Lecciones para Principiantes',
    subtitle: 'Notas, cuerdas y acordes desde cero',
  },
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
    title: 'Fretboard Explorer',
    subtitle: 'Resalta notas y acordes en el mástil',
  },
  {
    screen: 'PracticeMode',
    icon: '🎧',
    title: 'Practice Mode',
    subtitle: 'Entrenamiento de acordes',
  },
  {
    screen: 'Songs',
    icon: '🎵',
    title: 'Canciones',
    subtitle: 'De básico a avanzado — tablatura y audio',
  },
  {
    screen: 'PitchDetector',
    icon: '🎤',
    title: 'Pitch Detector',
    subtitle: 'Toca y la app identifica tu nota',
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
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },
  cards: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardIcon: {
    fontSize: 30,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  cardArrow: {
    fontSize: 26,
    color: COLORS.primary,
    fontWeight: '300',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 14,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 12,
  },
});
