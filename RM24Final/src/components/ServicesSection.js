// src/components/ServicesSection.js
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;

const SERVICES = [
  {
    id: '1',
    title: 'AEROPUERTO',
    description: 'Recojo y traslado de aeropuerto',
    icon: 'plane',
    color: Colors.darkBlue,
    accent: Colors.yellow,
  },
  {
    id: '2',
    title: 'CONDUCTOR DESIGNADO',
    description: 'Se asigna un conductor verificado para su seguridad',
    icon: 'driver',
    color: Colors.darkBlue,
    accent: Colors.yellow,
  },
  {
    id: '3',
    title: 'ENVÍOS',
    description: 'Se realiza envíos de paquetes',
    icon: 'send',
    color: Colors.darkBlue,
    accent: Colors.yellow,
  },
  {
    id: '4',
    title: 'MECÁNICA',
    description: 'Auxilio mecánico básico',
    icon: 'mechanic',
    color: Colors.darkBlue,
    accent: Colors.yellow,
  },
];

// Iconos SVG extraídos del proyecto web
function ServiceIcon({ type, size = 36, color = Colors.white }) {
  if (type === 'plane') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M10.812,24H8l3.038-9H6L4.915,16.653A2.993,2.993,0,0,1,2.412,18H.043l2.2-6L.027,6H2.4A2.991,2.991,0,0,1,4.9,7.343L6,9h5.041L8,0h2.812a3,3,0,0,1,2.634,1.563L17.588,9h3.305a3.084,3.084,0,0,1,3.067,2.5A3,3,0,0,1,21,15H17.588l-4.146,7.444A3,3,0,0,1,10.812,24Z"
          fill={color}
        />
      </Svg>
    );
  }
  if (type === 'driver') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M20.379,5.393A3.5,3.5,0,0,0,17.059,3H16l-.544-1.632A2,2,0,0,0,13.558,0H10.442a2,2,0,0,0-1.9,1.368L8,3H6.941a3.5,3.5,0,0,0-3.32,2.394L2.752,8H0v3H1.752L1.1,12.969A3.481,3.481,0,0,0,0,15.5V21H3v3H7V21H17v3h4V21h3V15.5a3.481,3.481,0,0,0-1.1-2.531L22.248,11H24V8H21.248ZM17,16.5h0A1.5,1.5,0,0,1,18.5,15h0A1.5,1.5,0,0,1,20,16.5h0A1.5,1.5,0,0,1,18.5,18h0A1.5,1.5,0,0,1,17,16.5ZM6.941,6H17.059a.5.5,0,0,1,.474.342L19.419,12H4.581L6.467,6.342A.5.5,0,0,1,6.941,6ZM5.5,18h0A1.5,1.5,0,0,1,4,16.5H4A1.5,1.5,0,0,1,5.5,15h0A1.5,1.5,0,0,1,7,16.5H7A1.5,1.5,0,0,1,5.5,18Z"
          fill={color}
        />
      </Svg>
    );
  }
  if (type === 'send') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="m7.942,20c.034.162.058.328.058.5,0,1.381-1.119,2.5-2.5,2.5s-2.5-1.119-2.5-2.5c0-.172.024-.338.058-.5h4.885ZM12,1H3C1.346,1,0,2.346,0,4v5h8.036l-2.518-2.518,1.414-1.414,3.518,3.518c.78.78.78,2.048,0,2.828l-3.518,3.518-1.414-1.414,2.518-2.518H0v7h15V4c0-1.654-1.346-3-3-3Zm5,17h7v-5h-7v5Zm.058,2c-.034.162-.058.328-.058.5,0,1.381,1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5c0-.172-.024-.338-.058-.5h-4.885Zm1.942-15h-2v6h7v-1c0-2.757-2.243-5-5-5Z"
          fill={color}
        />
      </Svg>
    );
  }
  if (type === 'mechanic') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M21,5h3a3.488,3.488,0,0,1-6.31,0H6.31A3.488,3.488,0,0,1,0,5H3V2H0A3.488,3.488,0,0,1,6.31,2H17.69A3.488,3.488,0,0,1,24,2H21Zm.757,7.832A12.58,12.58,0,0,1,23,18.267V22H21v2H16V22H8v2H3V22H1V18.267a12.58,12.58,0,0,1,1.243-5.435L4.1,8.979A3.517,3.517,0,0,1,7.255,7h9.49A3.517,3.517,0,0,1,19.9,8.979ZM5.5,16h0A1.5,1.5,0,0,0,4,17.5H4A1.5,1.5,0,0,0,5.5,19h0A1.5,1.5,0,0,0,7,17.5H7A1.5,1.5,0,0,0,5.5,16Zm13.007-3L17.2,10.283a.5.5,0,0,0-.45-.283H7.255a.5.5,0,0,0-.45.283L5.493,13ZM18.5,16h0A1.5,1.5,0,0,0,17,17.5h0A1.5,1.5,0,0,0,18.5,19h0A1.5,1.5,0,0,0,20,17.5h0A1.5,1.5,0,0,0,18.5,16Z"
          fill={color}
        />
      </Svg>
    );
  }
  return null;
}

function ServiceCard({ item, index }) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 120,
        tension: 70,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.card, pressed && styles.cardPressed]}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {/* Círculo del ícono */}
        <View style={styles.iconCircle}>
          <ServiceIcon type={item.icon} size={34} color={Colors.white} />
        </View>

        {/* Borde amarillo decorativo */}
        <View style={styles.iconBorder} />

        {/* Título */}
        <Text style={styles.cardTitle}>{item.title}</Text>

        {/* Descripción (aparece en hover → en mobile al presionar) */}
        <Text style={styles.cardDesc}>{item.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ServicesSection() {
  const titleFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(titleFade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.section}>
      <Animated.View style={{ opacity: titleFade }}>
        <Text style={styles.sectionSubtitle}>SERVICIOS BRINDADOS POR LA EMPRESA</Text>
        <Text style={styles.sectionTitle}>24 Siete</Text>
      </Animated.View>

      <View style={styles.grid}>
        {SERVICES.map((item, i) => (
          <ServiceCard key={item.id} item={item} index={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  sectionSubtitle: {
    color: Colors.darkBlue,
    fontSize: Typography.fontSizeSM,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    color: Colors.darkBlue,
    fontSize: Typography.fontSizeXXL,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  card: {
    width: CARD_WIDTH,
    alignItems: 'center',
    paddingTop: Spacing.xl + 8,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  cardPressed: {
    opacity: 0.9,
  },
  iconCircle: {
    width: CARD_WIDTH - 20,
    height: CARD_WIDTH - 20,
    borderRadius: (CARD_WIDTH - 20) / 2,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: Colors.white,
    position: 'absolute',
    top: 10,
    zIndex: 2,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  iconBorder: {
    width: CARD_WIDTH - 20,
    height: CARD_WIDTH - 20,
    borderRadius: (CARD_WIDTH - 20) / 2,
    borderWidth: 8,
    borderColor: Colors.yellow,
    position: 'absolute',
    top: 10,
    zIndex: 1,
  },
  cardTitle: {
    color: Colors.lightDarkBlue,
    fontSize: Typography.fontSizeXS,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: CARD_WIDTH - 10,
    letterSpacing: 0.5,
  },
  cardDesc: {
    color: Colors.grey,
    fontSize: Typography.fontSizeXS,
    textAlign: 'center',
    marginTop: Spacing.xs,
    lineHeight: 16,
  },
});
