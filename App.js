import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CHORDS from './src/data/chords';
import ChordDiagram from './src/components/ChordDiagram';
import ChordSelector from './src/components/ChordSelector';

export default function App() {
  const [selectedChord, setSelectedChord] = useState(CHORDS[0]);
  const { width } = useWindowDimensions();

  // Responsive: center and cap width on wide screens
  const isWide = width >= 600;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={[styles.container, isWide && styles.containerWide]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎸 Guitar Chords</Text>
          <Text style={styles.subtitle}>Tap a chord to see the diagram</Text>
        </View>

        {/* Chord selector */}
        <ChordSelector
          chords={CHORDS}
          selectedChord={selectedChord}
          onSelect={setSelectedChord}
        />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Chord diagram */}
        <View style={styles.diagramContainer}>
          <ChordDiagram chord={selectedChord} />
        </View>

        {/* Finger tip */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {'✕ = muted string\u00A0\u00A0\u00A0○ = open string'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1a1a2e',
  },
  containerWide: {
    maxWidth: 480,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f0e68c',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a4a',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  diagramContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingBottom: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});
