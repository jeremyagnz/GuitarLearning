import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { playNote, stopAllNotes } from '../utils/audio';

const COLORS = {
  background: '#0F0F0F',
  card: '#1A1A1A',
  cardBorder: '#2A2A2A',
  secondary: '#3D3D3D',
  primary: '#DC143C',
  text: '#F5F5F5',
  textSecondary: '#999999',
  textMuted: '#555555',
  success: '#22C55E',
  gold: '#F0C040',
};

const DIFFICULTY_COLORS = {
  Principiante: COLORS.success,
  Intermedio: COLORS.gold,
  Avanzado: COLORS.primary,
};

/**
 * Renders a single ASCII guitar tab section.
 * Uses a monospace font so the grid lines up correctly.
 */
function TabSection({ label, lines }) {
  return (
    <View style={tabStyles.container}>
      <Text style={tabStyles.label}>{label}</Text>
      <View style={tabStyles.tabBox}>
        {lines.map((line, i) => (
          <Text key={i} style={tabStyles.line}>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: 8,
  },
  tabBox: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  line: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13,
    color: '#E0E0E0',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
});

/**
 * Song detail screen — shows tabs, chords and an audio play/pause player.
 */
export default function SongDetailScreen({ song, goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState(-1);

  const timeoutsRef = useRef([]);
  const isAudioSupported = Platform.OS === 'web';

  /** Clear all scheduled note timeouts and stop playing notes immediately. */
  const stopPlayback = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    stopAllNotes();
    setIsPlaying(false);
    setCurrentNote(-1);
  }, []);

  /** Navigate back after stopping any active playback. */
  const handleBack = useCallback(() => {
    stopPlayback();
    goBack();
  }, [stopPlayback, goBack]);

  /** Stop playback when navigating away. */
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      stopAllNotes();
    };
  }, []);

  /** Schedule all notes from the song sequentially. */
  const startPlayback = useCallback(() => {
    if (!song || !song.notes || song.notes.length === 0) return;
    setIsPlaying(true);

    let elapsed = 0;
    song.notes.forEach(({ freq, dur }, index) => {
      // Highlight current note
      const tHighlight = setTimeout(() => setCurrentNote(index), elapsed * 1000);
      timeoutsRef.current.push(tHighlight);

      // Play the note (freq === 0 means silence/rest)
      if (freq > 0) {
        const tPlay = setTimeout(() => playNote(freq, dur), elapsed * 1000);
        timeoutsRef.current.push(tPlay);
      }

      elapsed += dur;
    });

    // Mark playback as finished when all notes have been scheduled
    const tDone = setTimeout(() => {
      setIsPlaying(false);
      setCurrentNote(-1);
      timeoutsRef.current = [];
    }, elapsed * 1000);
    timeoutsRef.current.push(tDone);
  }, [song]);

  const handlePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  if (!song) {
    return (
      <View style={[styles.container, isWide && styles.containerWide]}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>No se encontró la canción.</Text>
      </View>
    );
  }

  const diffColor = DIFFICULTY_COLORS[song.difficulty] || COLORS.textSecondary;
  const totalDurationSec = song.notes
    ? song.notes.reduce((acc, n) => acc + n.dur, 0)
    : 0;
  const mins = Math.floor(totalDurationSec / 60);
  const secs = Math.round(totalDurationSec % 60);
  const durationLabel = `${mins}:${String(secs).padStart(2, '0')}`;

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Volver</Text>
          </TouchableOpacity>

          {/* Song title row */}
          <View style={styles.titleRow}>
            <Text style={styles.songIcon}>{song.icon}</Text>
            <View style={styles.titleBlock}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
          </View>

          {/* Meta badges */}
          <View style={styles.metaRow}>
            <View style={[styles.diffBadge, { borderColor: diffColor }]}>
              <Text style={[styles.diffText, { color: diffColor }]}>
                {song.difficulty}
              </Text>
            </View>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>♩ {song.bpm} BPM</Text>
            </View>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>🎼 {song.key}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descBox}>
          <Text style={styles.descText}>{song.description}</Text>
        </View>

        {/* Audio Player */}
        <View style={styles.playerBox}>
          <View style={styles.playerInfo}>
            <Text style={styles.playerTitle}>
              {isPlaying ? '▶ Reproduciendo…' : '🎵 Reproductor de notas'}
            </Text>
            <Text style={styles.playerDuration}>{durationLabel}</Text>
          </View>

          {isAudioSupported ? (
            <TouchableOpacity
              style={[styles.playBtn, isPlaying && styles.playBtnActive]}
              onPress={handlePlayPause}
              activeOpacity={0.8}
            >
              <Text style={styles.playBtnIcon}>{isPlaying ? '⏸' : '▶'}</Text>
              <Text style={styles.playBtnText}>
                {isPlaying ? 'Pausar' : 'Reproducir'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.noAudioBox}>
              <Text style={styles.noAudioText}>
                🌐 El audio solo está disponible en la versión web.
              </Text>
            </View>
          )}

          {/* Note progress dots */}
          {song.notes && song.notes.length > 0 && (
            <View style={styles.dotsRow}>
              {song.notes.map(({ freq }, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    freq === 0 && styles.dotRest,
                    i === currentNote && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Chords used */}
        {song.chords && song.chords.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🤘 Acordes utilizados</Text>
            <View style={styles.chordsRow}>
              {song.chords.map((chord) => (
                <View key={chord} style={styles.chordBadge}>
                  <Text style={styles.chordText}>{chord}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Guitar Tabs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Tablatura</Text>
          <Text style={styles.tabHint}>
            Números = traste  ·  0 = cuerda al aire  ·  h = hammer-on  ·  p = pull-off
          </Text>
          {song.tabs.map((tab, i) => (
            <TabSection key={i} label={tab.label} lines={tab.lines} />
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Cómo usar esta pantalla</Text>
          <Text style={styles.tipText}>
            {'1. Lee la tablatura de izquierda a derecha.\n'}
            {'2. Cada número indica el traste que debes pisar.\n'}
            {'3. Pulsa ▶ Reproducir para escuchar las notas de la canción.\n'}
            {'4. Practica lento primero y luego aumenta la velocidad gradualmente.'}
          </Text>
        </View>

        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.backBottomBtn}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Text style={styles.backBottomText}>‹ Volver a Canciones</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Guitar Trainer — ¡Sigue practicando! 🎸</Text>
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
    paddingBottom: 40,
  },
  errorText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },

  /* Header */
  header: {
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  backBtn: {
    marginBottom: 14,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  songIcon: {
    fontSize: 40,
    marginRight: 14,
  },
  titleBlock: {
    flex: 1,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  songArtist: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  diffBadge: {
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  diffText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metaBadge: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  metaBadgeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  /* Description */
  descBox: {
    backgroundColor: '#1A1A2A',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  descText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },

  /* Player */
  playerBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  playerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  playerDuration: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 10,
    marginBottom: 14,
  },
  playBtnActive: {
    backgroundColor: '#8B0000',
  },
  playBtnIcon: {
    fontSize: 20,
    color: '#FFF',
  },
  playBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  noAudioBox: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  noAudioText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  dotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  dotRest: {
    backgroundColor: '#2A2A2A',
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1.4 }],
  },

  /* Chords */
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  chordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chordBadge: {
    backgroundColor: '#2A1A1A',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  chordText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* Tab hints */
  tabHint: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 12,
    lineHeight: 17,
  },

  /* Tip box */
  tipBox: {
    backgroundColor: '#1A1A2A',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6A8FD9',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  /* Bottom button */
  backBottomBtn: {
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 16,
  },
  backBottomText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 15,
  },

  /* Misc */
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 12,
    paddingHorizontal: 20,
  },
});
