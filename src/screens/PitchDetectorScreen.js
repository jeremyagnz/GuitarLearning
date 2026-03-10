import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { autoCorrelate, frequencyToNote } from '../utils/pitchDetection';

const NATURAL_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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
  error: '#EF4444',
};

const pickRandom = (arr, exclude) => {
  const pool = arr.filter((n) => n !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
};

export default function PitchDetectorScreen({ goBack }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [listening, setListening] = useState(false);
  const [detectedNote, setDetectedNote] = useState(null);
  const [targetNote, setTargetNote] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // true | false | null
  const [error, setError] = useState(null);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const listeningRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if detected note matches target
  useEffect(() => {
    if (!targetNote || !detectedNote) {
      setIsCorrect(null);
      return;
    }
    setIsCorrect(detectedNote.note === targetNote);
  }, [detectedNote, targetNote]);

  const analyse = useCallback(() => {
    if (!analyserRef.current || !listeningRef.current) return;
    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);
    const freq = autoCorrelate(buffer, audioCtxRef.current.sampleRate);
    const noteInfo = freq > 0 ? frequencyToNote(freq) : null;
    setDetectedNote(noteInfo);
  }, []);

  const startListening = async () => {
    if (Platform.OS !== 'web') {
      setError('La detección de micrófono solo está disponible en la versión web.');
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Tu navegador no soporta acceso al micrófono.');
      return;
    }
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();

      const source = audioCtxRef.current.createMediaStreamSource(stream);
      const analyser = audioCtxRef.current.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      analyserRef.current = analyser;

      listeningRef.current = true;
      setListening(true);
      setDetectedNote(null);

      intervalRef.current = setInterval(analyse, 100);
    } catch (err) {
      const msg =
        err.name === 'NotAllowedError'
          ? 'Permiso de micrófono denegado. Habilítalo en la configuración del navegador.'
          : 'No se pudo acceder al micrófono. Comprueba que está conectado.';
      setError(msg);
    }
  };

  const stopListening = () => {
    listeningRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setListening(false);
    setDetectedNote(null);
    setIsCorrect(null);
  };

  const handleTargetNote = (note) => {
    setTargetNote((prev) => (prev === note ? null : note));
    setIsCorrect(null);
  };

  const handleRandom = () => {
    const note = pickRandom(ALL_NOTES, targetNote);
    setTargetNote(note);
    setIsCorrect(null);
  };

  const centsLabel = (cents) => {
    if (cents === 0) return '± 0¢';
    return cents > 0 ? `+${cents}¢` : `${cents}¢`;
  };

  const centsColor = (cents) => {
    const abs = Math.abs(cents);
    if (abs <= 5) return COLORS.success;
    if (abs <= 20) return '#FACC15';
    return COLORS.error;
  };

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
          <Text style={styles.title}>🎤 Pitch Detector</Text>
          <Text style={styles.subtitle}>Toca una nota y la app la identificará</Text>
        </View>

        {/* Error banner */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Detected note display */}
        <View style={styles.detectorCard}>
          <Text style={styles.cardLabel}>Nota detectada</Text>
          {listening ? (
            detectedNote ? (
              <View style={styles.noteDisplay}>
                <Text style={styles.bigNote}>{detectedNote.note}</Text>
                <Text style={[styles.cents, { color: centsColor(detectedNote.cents) }]}>
                  {centsLabel(detectedNote.cents)}
                </Text>
                <Text style={styles.freq}>{detectedNote.frequency} Hz</Text>
              </View>
            ) : (
              <View style={styles.noteDisplay}>
                <Text style={styles.listeningPulse}>🎵</Text>
                <Text style={styles.listeningText}>Escuchando...</Text>
              </View>
            )
          ) : (
            <View style={styles.noteDisplay}>
              <Text style={styles.idleDash}>—</Text>
              <Text style={styles.idleHint}>Presiona el botón para comenzar</Text>
            </View>
          )}

          {/* Feedback */}
          {targetNote && detectedNote && isCorrect !== null && (
            <View style={[styles.feedbackBadge, isCorrect ? styles.feedbackOk : styles.feedbackFail]}>
              <Text style={styles.feedbackText}>
                {isCorrect ? '✅ ¡Correcto!' : `❌ Detectado: ${detectedNote.note} — Esperado: ${targetNote}`}
              </Text>
            </View>
          )}
        </View>

        {/* Start / Stop button */}
        <TouchableOpacity
          style={[styles.listenBtn, listening && styles.listenBtnActive]}
          onPress={listening ? stopListening : startListening}
          activeOpacity={0.75}
        >
          <Text style={styles.listenBtnText}>
            {listening ? '⬛ Detener' : '🎤 Iniciar escucha'}
          </Text>
        </TouchableOpacity>

        {/* Target note selector */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Nota objetivo</Text>
          <Text style={styles.sectionHint}>
            Selecciona la nota que quieres tocar y la app te dirá si lo hiciste bien.
          </Text>
          <View style={styles.noteRow}>
            {NATURAL_NOTES.map((note) => (
              <TouchableOpacity
                key={note}
                style={[styles.noteBtn, targetNote === note && styles.noteBtnActive]}
                onPress={() => handleTargetNote(note)}
              >
                <Text style={[styles.noteBtnText, targetNote === note && styles.noteBtnTextActive]}>
                  {note}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* All notes (including sharps) */}
          <View style={styles.noteRow}>
            {ALL_NOTES.filter((n) => n.includes('#')).map((note) => (
              <TouchableOpacity
                key={note}
                style={[styles.noteBtn, styles.noteBtnSharp, targetNote === note && styles.noteBtnActive]}
                onPress={() => handleTargetNote(note)}
              >
                <Text style={[styles.noteBtnText, targetNote === note && styles.noteBtnTextActive]}>
                  {note}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.randomBtn} onPress={handleRandom}>
            <Text style={styles.randomBtnText}>🎲 Nota aleatoria</Text>
          </TouchableOpacity>

          {targetNote && (
            <View style={styles.challengeBox}>
              <Text style={styles.challengeLabel}>Reto actual</Text>
              <Text style={styles.challengeNote}>{targetNote}</Text>
              <Text style={styles.challengeHint}>
                {listening
                  ? 'Toca esta nota en tu guitarra…'
                  : 'Inicia la escucha y toca esta nota'}
              </Text>
            </View>
          )}
        </View>

        {/* Tips */}
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💡 Consejos</Text>
          <Text style={styles.tipsText}>• Toca una sola cuerda a la vez para mejor precisión.</Text>
          <Text style={styles.tipsText}>• Acércate al micrófono o usa auriculares.</Text>
          <Text style={styles.tipsText}>• Un ± de 10¢ o menos se considera afinado.</Text>
        </View>
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
    textAlign: 'center',
  },

  /* Error */
  errorBanner: {
    marginHorizontal: 20,
    backgroundColor: '#3A0000',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 12,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '600',
  },

  /* Detector card */
  detectorCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  noteDisplay: {
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  bigNote: {
    fontSize: 72,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
    lineHeight: 80,
  },
  cents: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  freq: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  listeningPulse: {
    fontSize: 48,
  },
  listeningText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  idleDash: {
    fontSize: 48,
    color: COLORS.textMuted,
    lineHeight: 60,
  },
  idleHint: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },

  /* Feedback badge */
  feedbackBadge: {
    marginTop: 14,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  feedbackOk: {
    backgroundColor: '#052E16',
    borderColor: COLORS.success,
  },
  feedbackFail: {
    backgroundColor: '#2D0000',
    borderColor: COLORS.error,
  },
  feedbackText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },

  /* Listen button */
  listenBtn: {
    marginHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
  },
  listenBtnActive: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  listenBtnText: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.5,
  },

  /* Target note section */
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  sectionHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  noteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  noteBtn: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minWidth: 44,
    alignItems: 'center',
  },
  noteBtnSharp: {
    backgroundColor: '#111111',
  },
  noteBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  noteBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  noteBtnTextActive: {
    color: COLORS.text,
  },

  /* Random button */
  randomBtn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4A4A4A',
  },
  randomBtnText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 15,
  },

  /* Challenge box */
  challengeBox: {
    backgroundColor: '#1A0000',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
  },
  challengeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  challengeNote: {
    fontSize: 52,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 2,
    lineHeight: 60,
  },
  challengeHint: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },

  /* Tips */
  tipsBox: {
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
});
