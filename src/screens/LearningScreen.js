import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import LESSONS from '../data/lessons';

const COLORS = {
  background: '#0F0F0F',
  card: '#1A1A1A',
  cardBorder: '#2A2A2A',
  secondary: '#3D3D3D',
  primary: '#DC143C',
  primaryDark: '#8B0000',
  text: '#F5F5F5',
  textSecondary: '#999999',
  textMuted: '#555555',
  success: '#22C55E',
  gold: '#F0C040',
  blue: '#4A90D9',
  orange: '#E07B39',
};

const LEVEL_COLORS = {
  Principiante: COLORS.success,
  Intermedio: COLORS.gold,
  Avanzado: COLORS.primary,
};

/** Group lessons by module number */
function groupByModule(lessons) {
  const map = {};
  lessons.forEach((lesson) => {
    if (!map[lesson.module]) {
      map[lesson.module] = {
        module: lesson.module,
        moduleTitle: lesson.moduleTitle,
        moduleIcon: lesson.moduleIcon,
        lessons: [],
      };
    }
    map[lesson.module].lessons.push(lesson);
  });
  return Object.values(map).sort((a, b) => a.module - b.module);
}

export default function LearningScreen({ navigate, goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const modules = groupByModule(LESSONS);
  const [openModules, setOpenModules] = useState({ 1: true });

  const toggleModule = (moduleNum) => {
    setOpenModules((prev) => ({ ...prev, [moduleNum]: !prev[moduleNum] }));
  };

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Atrás</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>🎓 Aprendizaje</Text>
          <Text style={styles.screenSubtitle}>
            Lecciones paso a paso para aprender guitarra desde cero
          </Text>
        </View>

        {/* Stats bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{LESSONS.length}</Text>
            <Text style={styles.statLabel}>Lecciones</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{modules.length}</Text>
            <Text style={styles.statLabel}>Módulos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {LESSONS.reduce((acc, l) => acc + l.duration, 0)} min
            </Text>
            <Text style={styles.statLabel}>Contenido</Text>
          </View>
        </View>

        {/* Module list */}
        <View style={styles.moduleList}>
          {modules.map((mod) => {
            const isOpen = !!openModules[mod.module];
            return (
              <View key={mod.module} style={styles.moduleBlock}>
                {/* Module header */}
                <TouchableOpacity
                  style={styles.moduleHeader}
                  onPress={() => toggleModule(mod.module)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.moduleIcon}>{mod.moduleIcon}</Text>
                  <View style={styles.moduleHeaderText}>
                    <Text style={styles.moduleNumber}>MÓDULO {mod.module}</Text>
                    <Text style={styles.moduleTitle}>{mod.moduleTitle}</Text>
                  </View>
                  <View style={styles.moduleHeaderRight}>
                    <View style={styles.lessonCountBadge}>
                      <Text style={styles.lessonCountText}>{mod.lessons.length}</Text>
                    </View>
                    <Text style={styles.toggleChevron}>{isOpen ? '▲' : '▼'}</Text>
                  </View>
                </TouchableOpacity>

                {/* Lesson cards */}
                {isOpen && (
                  <View style={styles.lessonList}>
                    {mod.lessons.map((lesson, index) => (
                      <TouchableOpacity
                        key={lesson.id}
                        style={styles.lessonCard}
                        onPress={() => navigate('LessonDetail', { lesson })}
                        activeOpacity={0.75}
                      >
                        <View style={styles.lessonIndex}>
                          <Text style={styles.lessonIndexText}>
                            {mod.module}.{index + 1}
                          </Text>
                        </View>
                        <Text style={styles.lessonCardIcon}>{lesson.icon}</Text>
                        <View style={styles.lessonCardText}>
                          <Text style={styles.lessonCardTitle}>{lesson.title}</Text>
                          <Text style={styles.lessonCardSubtitle}>{lesson.subtitle}</Text>
                          <View style={styles.lessonMeta}>
                            <View
                              style={[
                                styles.levelBadge,
                                { borderColor: LEVEL_COLORS[lesson.level] },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.levelBadgeText,
                                  { color: LEVEL_COLORS[lesson.level] },
                                ]}
                              >
                                {lesson.level}
                              </Text>
                            </View>
                            <Text style={styles.durationText}>⏱ {lesson.duration} min</Text>
                          </View>
                        </View>
                        <Text style={styles.cardArrow}>›</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.divider} />
        <Text style={styles.footer}>Guitar Trainer — Aprende a tu ritmo 🎸</Text>
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
    marginBottom: 10,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },

  /* Stats bar */
  statsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 14,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 4,
  },

  /* Module blocks */
  moduleList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  moduleBlock: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  moduleIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  moduleHeaderText: {
    flex: 1,
  },
  moduleNumber: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  moduleHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lessonCountBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  lessonCountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  toggleChevron: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  /* Lesson cards */
  lessonList: {
    backgroundColor: '#141414',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 13,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  lessonIndex: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  lessonIndexText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  lessonCardIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  lessonCardText: {
    flex: 1,
  },
  lessonCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  lessonCardSubtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelBadge: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  levelBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  durationText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  cardArrow: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: '300',
    marginLeft: 6,
  },

  /* Misc */
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 12,
    paddingHorizontal: 20,
  },
});
