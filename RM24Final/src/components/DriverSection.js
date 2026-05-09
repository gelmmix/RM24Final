// src/components/DriverSection.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function DriverSection({ onDetails }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, delay: 100, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, delay: 100, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.section}>
      {/* Decoración lateral */}
      <View style={styles.decorStripe} />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
        {/* Ícono conductor */}
        <View style={styles.iconWrapper}>
          <Text style={styles.iconEmoji}>🚗</Text>
        </View>

        <Text style={styles.title}>CONDUCTOR DESIGNADO</Text>
        <Text style={styles.description}>
          El servicio que brinda la empresa con conductor asignado es por velar su seguridad.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onDetails} activeOpacity={0.85}>
          <Text style={styles.btnText}>MÁS DETALLES</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Decoración derecha */}
      <View style={styles.decorRight}>
        <View style={styles.decorCircle} />
        <View style={styles.decorDot} />
        <View style={styles.decorDot2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.darkBlue,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  decorStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: Colors.yellow,
  },
  content: {
    zIndex: 2,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,222,5,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.yellowTransparent,
  },
  iconEmoji: {
    fontSize: 28,
  },
  title: {
    color: Colors.white,
    fontSize: Typography.fontSizeXL,
    fontWeight: '900',
    marginBottom: Spacing.md,
    letterSpacing: 1,
  },
  description: {
    color: Colors.aliceBlue,
    fontSize: Typography.fontSizeMD,
    lineHeight: 24,
    marginBottom: Spacing.xl,
    opacity: 0.85,
    maxWidth: '80%',
  },
  btn: {
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: Colors.yellow,
    backgroundColor: Colors.yellow,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: 4,
  },
  btnText: {
    color: Colors.darkBlue,
    fontWeight: '900',
    fontSize: Typography.fontSizeSM,
    letterSpacing: 2,
  },
  decorRight: {
    position: 'absolute',
    right: -20,
    top: '10%',
  },
  decorCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 20,
    borderColor: 'rgba(255,222,5,0.08)',
  },
  decorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.yellow,
    opacity: 0.4,
    marginTop: Spacing.sm,
    marginLeft: Spacing.md,
  },
  decorDot2: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.yellow,
    opacity: 0.25,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xl,
  },
});
