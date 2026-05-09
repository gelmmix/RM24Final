// src/screens/HomeScreen.js
import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import StatsSection from '../components/StatsSection';
import DriverSection from '../components/DriverSection';
import Footer from '../components/Footer';

export default function HomeScreen({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleNavigate = (screen) => {
    const routes = {
      'Login': 'Login',
      'Register': 'Register',
      'Servicios': 'Services',
      'Contactos': 'Contact',
      'Taxímetro': 'Taximeter',
    };
    if (routes[screen]) {
      navigation?.navigate(routes[screen]);
    }
  };

  const handleTaximeter = () => {
    // Navegar a taxímetro o mostrar alerta si no está implementado aún
    if (navigation) {
      navigation.navigate('Taximeter');
    } else {
      Alert.alert('Taxímetro', 'Próximamente disponible');
    }
  };

  const handleDriverDetails = () => {
    if (navigation) {
      navigation.navigate('Services');
    } else {
      Alert.alert('Conductor Designado', 'Ver más detalles del servicio');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlue} />

      {/* Header fijo arriba */}
      <Header onNavigate={handleNavigate} />

      {/* Contenido scrolleable */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <HeroSection onTaximeter={handleTaximeter} />
        <ServicesSection />
        <StatsSection />
        <DriverSection onDetails={handleDriverDetails} />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
