// src/components/Footer.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';

const LINKS = ['Servicios', 'Soporte', 'Contacto'];
const LEGAL = ['Términos y condiciones', 'Política de Privacidad'];
const SOCIAL = [
  { label: 'Facebook', emoji: '📘' },
  { label: 'Instagram', emoji: '📷' },
  { label: 'TikTok', emoji: '🎵' },
  { label: 'X', emoji: '✖' },
];

export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* Separador amarillo */}
      <View style={styles.topAccent} />

      <View style={styles.footerContent}>
        {/* Columna 1: info empresa */}
        <View style={styles.column}>
          <Text style={styles.widgetTitle}>TRANSPORTE SEGURO</Text>
          <Text style={styles.paragraph}>
            Empresa confiable en transporte y envíos. Tu seguridad es nuestra prioridad.
          </Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>📧  info@24siete.com</Text>
            <Text style={styles.infoItem}>📞  470024  |  76924244</Text>
            <Text style={styles.infoItem}>📍  090 Av. Barrientos - C.Bolivar</Text>
            <Text style={styles.infoItemSub}>     Cochabamba - Sacaba</Text>
          </View>
        </View>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Columna 2: enlaces */}
        <View style={styles.column}>
          <Text style={styles.widgetTitle}>ENLACES ÚTILES</Text>
          {LINKS.map((link, i) => (
            <TouchableOpacity key={i}>
              <Text style={styles.link}>{link}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.spacer} />
          {LEGAL.map((item, i) => (
            <TouchableOpacity key={i}>
              <Text style={styles.legalLink}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Columna 3: social */}
        <View style={styles.column}>
          <Text style={styles.widgetTitle}>SÍGUENOS</Text>
          <View style={styles.socialGrid}>
            {SOCIAL.map((s, i) => (
              <TouchableOpacity key={i} style={styles.socialBtn}>
                <Text style={styles.socialEmoji}>{s.emoji}</Text>
                <Text style={styles.socialLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Crédito */}
      <View style={styles.credit}>
        <View style={styles.creditLine} />
        <Text style={styles.creditText}>
          Diseñado y desarrollado por{' '}
          <Text
            style={styles.creditLink}
            onPress={() => Linking.openURL('https://www.altalos.com')}
          >
            Altalos
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.darkBlue,
  },
  topAccent: {
    height: 4,
    backgroundColor: Colors.yellow,
  },
  footerContent: {
    padding: Spacing.xl,
  },
  column: {
    marginBottom: Spacing.xl,
  },
  widgetTitle: {
    color: Colors.yellow,
    fontSize: Typography.fontSizeSM,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
  },
  paragraph: {
    color: Colors.whiteTransparent,
    fontSize: Typography.fontSizeXS,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  infoList: {
    gap: Spacing.xs,
  },
  infoItem: {
    color: Colors.lightBlue,
    fontSize: Typography.fontSizeXS,
    marginBottom: Spacing.xs,
  },
  infoItemSub: {
    color: Colors.lightBlue,
    fontSize: Typography.fontSizeXS,
    marginTop: -Spacing.xs,
    marginBottom: Spacing.xs,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: Spacing.xl,
  },
  link: {
    color: Colors.lightBlue,
    fontSize: Typography.fontSizeXS,
    marginBottom: Spacing.sm,
  },
  spacer: { height: Spacing.sm },
  legalLink: {
    color: Colors.whiteTransparent,
    fontSize: Typography.fontSizeXS,
    marginBottom: Spacing.xs,
    textDecorationLine: 'underline',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
    gap: 5,
    marginBottom: Spacing.xs,
  },
  socialEmoji: { fontSize: 14 },
  socialLabel: {
    color: Colors.white,
    fontSize: Typography.fontSizeXS,
  },
  credit: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  creditLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: Spacing.md,
  },
  creditText: {
    color: Colors.whiteTransparent,
    fontSize: Typography.fontSizeXS,
    textAlign: 'center',
  },
  creditLink: {
    color: Colors.yellow,
    fontWeight: '700',
  },
});
