import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import NotesExplorerScreen from './src/screens/NotesExplorerScreen';
import ChordLibraryScreen from './src/screens/ChordLibraryScreen';
import ChordDetailScreen from './src/screens/ChordDetailScreen';
import FretboardScreen from './src/screens/FretboardScreen';
import PracticeModeScreen from './src/screens/PracticeModeScreen';
import PitchDetectorScreen from './src/screens/PitchDetectorScreen';
import BeginnerLessonScreen from './src/screens/BeginnerLessonScreen';

/**
 * Simple stack-based navigator implemented with React state.
 * Each entry: { screen: string, params: object }
 */
export default function App() {
  const [stack, setStack] = useState([{ screen: 'Home', params: {} }]);

  const navigate = useCallback((screen, params = {}) => {
    setStack((prev) => [...prev, { screen, params }]);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const { screen, params } = stack[stack.length - 1];

  const renderScreen = () => {
    switch (screen) {
      case 'Home':
        return <HomeScreen navigate={navigate} />;
      case 'NotesExplorer':
        return <NotesExplorerScreen goBack={goBack} />;
      case 'ChordLibrary':
        return <ChordLibraryScreen navigate={navigate} goBack={goBack} />;
      case 'ChordDetail':
        return <ChordDetailScreen chord={params.chord} goBack={goBack} />;
      case 'Fretboard':
        return <FretboardScreen goBack={goBack} />;
      case 'PracticeMode':
        return <PracticeModeScreen goBack={goBack} />;
      case 'BeginnerLesson':
        return <BeginnerLessonScreen navigate={navigate} goBack={goBack} />;
      case 'PitchDetector':
        return <PitchDetectorScreen goBack={goBack} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
  },
});
