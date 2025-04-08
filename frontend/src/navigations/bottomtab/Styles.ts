// Styles.ts

import { StyleSheet } from 'react-native';
import { Colors } from '@colors';
import { fonts } from '../../../src/assets/fonts'; // Adjust the path based on your project structure

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.light.background,
    borderTopWidth: 0.5,
    borderTopColor: Colors.light.border,
    height: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  tabBarItemStyle: {
    // Customize tabBarItemStyle if needed
  },
  tabText: {
    fontFamily: Platform.OS === 'ios' ? fonts.tertiary.bold : fonts.secondary.bold,
    fontSize: 12,
  },
  roundedCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.primaryBtnBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  
});

export default styles;
