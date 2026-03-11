import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import LessonIllustration from '../components/GuitarIllustrations';

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

const LEVEL_COLORS = {
  Principiante: COLORS.success,
  Intermedio: COLORS.gold,
  Avanzado: COLORS.primary,
};

export default function LessonDetailScreen({ lesson, goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  if (!lesson) {
    return (
      <View style={[styles.container, isWide && styles.containerWide]}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>No se encontró la lección.</Text>
      </View>
    );
  }

  const levelColor = LEVEL_COLORS[lesson.level] || COLORS.textSecondary;

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹ Volver</Text>
          </TouchableOpacity>

          {/* Module breadcrumb */}
          <Text style={styles.moduleBreadcrumb}>
            {lesson.moduleIcon} {lesson.moduleTitle} · Módulo {lesson.module}
          </Text>

          {/* Title row */}
          <View style={styles.titleRow}>
            <Text style={styles.lessonIcon}>{lesson.icon}</Text>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>
          <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>

          {/* Meta badges */}
          <View style={styles.metaRow}>
            <View style={[styles.levelBadge, { borderColor: levelColor }]}>
              <Text style={[styles.levelBadgeText, { color: levelColor }]}>{lesson.level}</Text>
            </View>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>⏱ {lesson.duration} min</Text>
            </View>
          </View>
        </View>

        {/* Key points */}
        <View style={styles.keyPointsBox}>
          <Text style={styles.keyPointsTitle}>📋 Lo que aprenderás</Text>
          {lesson.keyPoints.map((point, i) => (
            <View key={i} style={styles.keyPointRow}>
              <Text style={styles.keyPointBullet}>✓</Text>
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <LessonIllustration lessonId={lesson.id} />
        </View>

        {/* Content sections */}
        <View style={styles.sectionsContainer}>
          {lesson.sections.map((section, i) => (
            <View key={i} style={styles.sectionBlock}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionNumberBadge}>
                  <Text style={styles.sectionNumberText}>{i + 1}</Text>
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        {/* Tip box */}
        {lesson.tip && (
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Consejo del Profesor</Text>
            <Text style={styles.tipText}>{lesson.tip}</Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Back button at bottom */}
        <TouchableOpacity style={styles.backBottomBtn} onPress={goBack} activeOpacity={0.8}>
          <Text style={styles.backBottomText}>‹ Volver a Aprendizaje</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Guitar Trainer — Practica lo que aprendiste 🎸</Text>
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
  moduleBreadcrumb: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  lessonIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  lessonTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    flex: 1,
    letterSpacing: 0.3,
  },
  lessonSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 14,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  levelBadge: {
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  durationBadge: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  durationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  /* Illustration */
  illustrationContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  /* Key points */
  keyPointsBox: {
    backgroundColor: '#1A2A1A',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A3A2A',
  },
  keyPointsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.success,
    marginBottom: 12,
  },
  keyPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  keyPointBullet: {
    fontSize: 13,
    color: COLORS.success,
    fontWeight: '800',
    marginRight: 10,
    marginTop: 1,
  },
  keyPointText: {
    fontSize: 13,
    color: COLORS.text,
    flex: 1,
    lineHeight: 20,
  },

  /* Content sections */
  sectionsContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
  },
  sectionBlock: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionNumberText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    flex: 1,
  },
  sectionContent: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  /* Tip */
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
    lineHeight: 21,
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
