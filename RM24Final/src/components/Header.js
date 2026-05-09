// src/components/Header.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';

const { width } = Dimensions.get('window');

const NAV_ITEMS = [
  {
    label: 'Inicio',
    sub: ['Servicios', 'Estadísticas'],
  },
  {
    label: 'Nosotros',
    sub: ['Misión', 'Visión', 'Tecnología'],
  },
  {
    label: 'Servicios',
    sub: ['Transporte', 'Aeropuerto', 'Conductor Designado', 'Envíos', 'Mecánico', 'Taxímetro'],
  },
  {
    label: 'Contactos',
    sub: [],
  },
];

export default function Header({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;

  const openMenu = () => {
    setMenuOpen(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.75,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      {/* Top navbar: redes + Regístrate / Iniciar sesión */}
      <View style={styles.navbar}>
        <View style={styles.navbarLeft}>
          <Text style={styles.navPhone}>4470024</Text>
          <Text style={styles.navPhone}>  |  78900247</Text>
        </View>
        <View style={styles.navbarRight}>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('Register')}>
            <Text style={styles.navLink}>Regístrate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('Login')}>
            <Text style={styles.navLink}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu principal */}
      <View style={styles.menuBar}>
        {/* Logo */}
        <Text style={styles.logo}>RM <Text style={styles.logoAccent}>24siete</Text></Text>

        {/* Acciones derecha: buscador + hamburguesa */}
        <View style={styles.menuActions}>
          {/* Buscador inline */}
          {searchOpen ? (
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor={Colors.grey}
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
              <TouchableOpacity onPress={() => { setSearchOpen(false); setSearchText(''); }}>
                <Text style={styles.searchClose}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.searchIcon} onPress={() => setSearchOpen(true)}>
              <Text style={styles.searchIconText}>🔍</Text>
            </TouchableOpacity>
          )}

          {/* Hamburguesa */}
          <TouchableOpacity style={styles.hamburger} onPress={openMenu}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Drawer lateral */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu} />
        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerLogo}>RM <Text style={styles.drawerLogoAccent}>24siete</Text></Text>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.drawerClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.drawerNav}>
            {NAV_ITEMS.map((item, i) => (
              <View key={i}>
                <TouchableOpacity
                  style={styles.drawerItem}
                  onPress={() => item.sub.length > 0 ? toggleExpand(i) : (closeMenu(), onNavigate && onNavigate(item.label))}
                >
                  <Text style={styles.drawerItemText}>{item.label}</Text>
                  {item.sub.length > 0 && (
                    <Text style={styles.drawerArrow}>{expandedItem === i ? '▲' : '▼'}</Text>
                  )}
                </TouchableOpacity>

                {expandedItem === i && item.sub.map((sub, j) => (
                  <TouchableOpacity
                    key={j}
                    style={styles.drawerSubItem}
                    onPress={() => { closeMenu(); onNavigate && onNavigate(sub); }}
                  >
                    <Text style={styles.drawerSubText}>— {sub}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          {/* Footer del drawer */}
          <View style={styles.drawerFooter}>
            <Text style={styles.drawerFooterText}>info@24siete.com</Text>
            <Text style={styles.drawerFooterText}>470024  |  76924244</Text>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // --- Navbar superior ---
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  navbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navPhone: {
    color: Colors.yellow,
    fontSize: Typography.fontSizeXS,
    fontWeight: '600',
  },
  navbarRight: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  navLink: {
    color: Colors.white,
    fontSize: Typography.fontSizeXS,
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },

  // --- Barra de menú principal ---
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  logo: {
    fontSize: Typography.fontSizeXL,
    fontWeight: '900',
    color: Colors.darkBlue,
    letterSpacing: 1,
  },
  logoAccent: {
    color: Colors.yellow,
  },
  menuActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  searchIcon: {
    padding: Spacing.xs,
  },
  searchIconText: {
    fontSize: Typography.fontSizeLG,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.silver,
    borderRadius: 20,
    paddingHorizontal: Spacing.sm,
    height: 36,
    width: 160,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSizeSM,
    color: Colors.darkBlue,
    paddingVertical: 0,
  },
  searchClose: {
    color: Colors.darkBlue,
    fontSize: Typography.fontSizeMD,
    marginLeft: Spacing.xs,
    fontWeight: '700',
  },
  hamburger: {
    padding: Spacing.xs,
    gap: 5,
  },
  hamburgerLine: {
    width: 24,
    height: 2.5,
    backgroundColor: Colors.darkBlue,
    borderRadius: 2,
    marginVertical: 2,
  },

  // --- Overlay + Drawer ---
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.75,
    backgroundColor: Colors.darkBlue,
    zIndex: 999,
    elevation: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlueTransparent,
  },
  drawerLogo: {
    color: Colors.white,
    fontSize: Typography.fontSizeXL,
    fontWeight: '900',
  },
  drawerLogoAccent: {
    color: Colors.yellow,
  },
  drawerClose: {
    color: Colors.white,
    fontSize: Typography.fontSizeXL,
  },
  drawerNav: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  drawerItemText: {
    color: Colors.white,
    fontSize: Typography.fontSizeMD,
    fontWeight: '600',
  },
  drawerArrow: {
    color: Colors.yellow,
    fontSize: Typography.fontSizeXS,
  },
  drawerSubItem: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  drawerSubText: {
    color: Colors.lightBlue,
    fontSize: Typography.fontSizeSM,
  },
  drawerFooter: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  drawerFooterText: {
    color: Colors.yellow,
    fontSize: Typography.fontSizeXS,
    marginBottom: Spacing.xs,
  },
});
