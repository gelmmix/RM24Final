// src/components/StatsSection.js
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';

const STATS = [
  { value: 87, label: 'VIP' },
  { value: 87, label: 'Movile Xpress' },
  { value: 87, label: 'Clientes' },
  { value: 87, label: 'Empresa' },
];

function CounterBlock({ value, label, delay }) {
  const [count, setCount] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Animación visual
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();

      // Contador numérico
      let start = 0;
      const step = Math.ceil(value / 30);
      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 40);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={[styles.block, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.num}>{count} +</Text>
      <View style={styles.yellowLine} />
      <Text style={styles.vipTitle}>{label}</Text>
    </Animated.View>
  );
}

export default function StatsSection() {
  return (
    <View style={styles.estadistic}>
      <View style={styles.informatic}>
        <Text style={styles.title}>Información numérica de la empresa</Text>
        <View style={styles.grid}>
          {STATS.map((s, i) => (
            <CounterBlock key={i} value={s.value} label={s.label} delay={i * 150} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  estadistic: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  informatic: {
    width: '90%',
    backgroundColor: Colors.darkBlue,
    borderRadius: 12,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    color: Colors.white,
    fontSize: Typography.fontSizeLG,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 26,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  block: {
    width: '40%',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  num: {
    color: Colors.white,
    fontSize: Typography.fontSizeDisplay,
    fontWeight: '900',
  },
  yellowLine: {
    width: 30,
    height: 2,
    backgroundColor: Colors.yellow,
    marginVertical: Spacing.sm,
  },
  vipTitle: {
    color: Colors.white,
    fontSize: Typography.fontSizeSM,
    fontWeight: '700',
    textAlign: 'center',
  },
});
