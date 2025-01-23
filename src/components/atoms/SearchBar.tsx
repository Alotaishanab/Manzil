import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { ExploreIcon, FilterIcon } from '@svgs';
import { Colors } from '@colors';
import { fonts } from '../../../src/assets/fonts';
import { globalStyles } from '../../../src/styles/globalStyles';
import { BlurView } from '@react-native-community/blur';

type SearchType = {
  placeholder: string;
  showFilterBtn: boolean;
  onFocusInput?: () => void;
  handleFilter?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
};

export const SearchBar: React.FC<SearchType> = ({
  placeholder,
  showFilterBtn,
  onFocusInput = () => {},
  handleFilter = () => {},
  onChangeText = () => {},
  value = '',
}) => {
  return (
    <View style={[globalStyles.simpleRow, styles.container]}>
      {/* Search Input Container */}
      <View style={styles.exploreWrap}>
        {/* iOS Blur Effect */}
        {Platform.OS === 'ios' && (
          <BlurView
            blurType="light"
            blurAmount={15}
            style={StyleSheet.absoluteFill}
            reducedTransparencyFallbackColor="rgba(245,255,245,0.9)"
          />
        )}

        {/* Android Fallback */}
        {Platform.OS === 'android' && (
          <View style={[StyleSheet.absoluteFill, styles.androidBackground]} />
        )}

        <ExploreIcon 
          width={24} 
          height={24} 
          color="rgba(255,255,255,0.8)" 
        />
        <TextInput
          onFocus={onFocusInput}
          placeholderTextColor="rgba(255,255,255,0.7)"
          placeholder={placeholder}
          style={styles.inputStyle}
          onChangeText={onChangeText}
          value={value}
          selectionColor="rgba(255,255,255,0.5)"
        />
      </View>

      {/* Filter Button */}
      {showFilterBtn && (
        <View style={styles.filterBtn}>
          {Platform.OS === 'ios' && (
            <BlurView
              blurType="light"
              blurAmount={15}
              style={StyleSheet.absoluteFill}
            />
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleFilter}
            style={styles.filterTouchable}
          >
            <FilterIcon 
              width={22} 
              height={22} 
              color="rgba(255,255,255,0.8)" 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    // Removed horizontal padding as requested
  },
  exploreWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: Platform.select({
      ios: 'rgba(240,255,240,0.4)', // Subtle green tint
      android: 'rgba(245,255,245,0.6)'
    }),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  androidBackground: {
    backgroundColor: 'rgba(245,255,245,0.6)',
    backdropFilter: 'blur(15px)',
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: fonts.primary.medium,
    includeFontPadding: false,
    paddingVertical: 0,
    marginLeft: 8,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginLeft: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: Platform.select({
      ios: 'rgba(240,255,240,0.4)',
      android: 'rgba(245,255,245,0.6)'
    }),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  filterTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});