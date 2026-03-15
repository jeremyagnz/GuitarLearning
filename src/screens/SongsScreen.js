import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import SONGS from '../data/songs';

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

const DIFFICULTY_ICONS = {
  Principiante: '🟢',
  Intermedio: '🟡',
  Avanzado: '🔴',
};

const FILTERS = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];

export default function SongsScreen({ navigate, goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const [filter, setFilter] = useState('Todos');

  const filtered =
    filter === 'Todos' ? SONGS : SONGS.filter((s) => s.difficulty === filter);

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🎵 Canciones</Text>
          <Text style={styles.subtitle}>
            De principiante a avanzado — aprende a tocar y escucha cómo suena
          </Text>
        </View>

        {/* Difficulty filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, filter === f && styles.filterTabActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Songs list */}
        <View style={styles.list}>
          {filtered.map((song) => {
            const diffColor = DIFFICULTY_COLORS[song.difficulty] || COLORS.textSecondary;
            return (
              <TouchableOpacity
                key={song.id}
                style={styles.card}
                onPress={() => navigate('SongDetail', { song })}
                activeOpacity={0.75}
              >
                {/* Icon + info */}
                <Text style={styles.songIcon}>{song.icon}</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                  <View style={styles.metaRow}>
                    <View style={[styles.diffBadge, { borderColor: diffColor }]}>
                      <Text style={[styles.diffText, { color: diffColor }]}>
                        {DIFFICULTY_ICONS[song.difficulty]} {song.difficulty}
                      </Text>
                    </View>
                    <Text style={styles.bpmText}>♩ {song.bpm} BPM</Text>
                    <Text style={styles.keyText}>🎼 {song.key}</Text>
                  </View>
                </View>
                <Text style={styles.cardArrow}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filtered.length === 0 && (
          <Text style={styles.emptyText}>No hay canciones en esta categoría.</Text>
        )}

        <View style={styles.divider} />
        <Text style={styles.footer}>
          Toca cada canción para ver la tablatura y escuchar las notas 🎸
        </Text>
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
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 1.0,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },

  /* Filter tabs */
  filtersRow: {
    paddingHorizontal: 20,
    paddingBottom: 4,
    gap: 10,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: '#FFF',
  },

  /* Song cards */
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  songIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 2,
  },
  songArtist: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  diffBadge: {
    borderRadius: 6,
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  diffText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bpmText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  keyText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  cardArrow: {
    fontSize: 26,
    color: COLORS.primary,
    fontWeight: '300',
    marginLeft: 8,
  },

  /* Empty state */
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: 40,
    fontSize: 15,
  },

  /* Misc */
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
    paddingHorizontal: 20,
  },
});
