// src/components/HeroSection.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';

const { height } = Dimensions.get('window');

export default function HeroSection({ onTaximeter }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.hero}>
      {/* Fondo degradado oscuro (simulando la imagen de fondo del web) */}
      <View style={styles.heroBg}>
        <View style={styles.heroBgOverlay} />
        {/* Patrón decorativo geométrico */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
        <View style={styles.decorLine} />
      </View>

      {/* Contenido centrado */}
      <Animated.View
        style={[
          styles.heroContent,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.heroSubtitle}>Nueva empresa de transporte</Text>
        <Text style={styles.heroTitle}>Radio Móvil{'\n'}24siete</Text>
        <Text style={styles.heroDesc}>Con registro de móviles en línea</Text>

        <TouchableOpacity style={styles.heroBtn} onPress={onTaximeter} activeOpacity={0.85}>
          <View style={styles.heroBtnInner}>
            <Text style={styles.heroBtnText}>TAXÍMETRO</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Badge "24/7" decorativo */}
      <View style={styles.badge}>
        <Text style={styles.badgeNumber}>24</Text>
        <Text style={styles.badgeSiete}>/7</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: height * 0.45,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  heroBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  heroBgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darkBlue,
  },
  decorCircle1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 40,
    borderColor: 'rgba(255, 222, 5, 0.07)',
    top: -80,
    right: -60,
  },
  decorCircle2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 25,
    borderColor: 'rgba(255, 222, 5, 0.05)',
    bottom: -40,
    left: -30,
  },
  decorLine: {
    position: 'absolute',
    width: 3,
    height: '120%',
    backgroundColor: 'rgba(255, 222, 5, 0.08)',
    transform: [{ rotate: '15deg' }],
    right: '30%',
  },

  heroContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    backgroundColor: 'rgba(10, 10, 10, 0.35)',
    borderRadius: 16,
    paddingVertical: Spacing.xl,
    width: '80%',
    maxWidth: 340,
  },
  heroSubtitle: {
    color: Colors.yellow,
    fontSize: Typography.fontSizeSM,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: Typography.fontSizeDisplay,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: Spacing.sm,
  },
  heroDesc: {
    color: Colors.whiteTransparent,
    fontSize: Typography.fontSizeSM,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    letterSpacing: 0.5,
  },
  heroBtn: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 4,
    overflow: 'hidden',
  },
  heroBtnInner: {
    backgroundColor: Colors.yellow,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
  },
  heroBtnText: {
    color: Colors.black,
    fontWeight: '900',
    fontSize: Typography.fontSizeSM,
    letterSpacing: 2,
  },

  badge: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.yellow,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  badgeNumber: {
    color: Colors.darkBlue,
    fontSize: Typography.fontSizeXL,
    fontWeight: '900',
  },
  badgeSiete: {
    color: Colors.darkBlue,
    fontSize: Typography.fontSizeMD,
    fontWeight: '700',
  },
});
