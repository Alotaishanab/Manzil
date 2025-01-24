// src/components/ScrollOutHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import FilterHeader from './FilterHeader';

type ScrollOutHeaderProps = {
  isFilterVisible: boolean;
  toggleFilterModal: () => void;
  onApplyFilters: () => void;
  textInputRef: React.RefObject<TextInput>;
};

export function ScrollOutHeader({
  isFilterVisible,
  toggleFilterModal,
  onApplyFilters,
  textInputRef,
}: ScrollOutHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <BlurView
        style={styles.blurContainer}
        blurType="dark" // Dark blur for better contrast
        blurAmount={25}
        overlayColor="transparent"
      >
        <View style={styles.content}>
          <Text style={styles.greetingTitle}>Hello, Welcome Home!</Text>
          <Text style={styles.greetingSubtitle}>
            Discover your perfect place with Manzil.
          </Text>

          <FilterHeader
            isFilterVisible={isFilterVisible}
            toggleFilterModal={toggleFilterModal}
            onApplyFilters={onApplyFilters}
            textInputRef={textInputRef}
            containerStyle={styles.filterHeader}
          />
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'rgba(40, 80, 40, 0.3)', // Dark green base
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(30, 70, 30, 0.4)', // Rich forest green glass
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // Subtle white border
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 60,
  },
  content: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f0fff0', // Soft mint white
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  greetingSubtitle: {
    fontSize: 18,
    color: 'rgba(240, 255, 240, 0.9)', // Bright off-white
    marginBottom: 15,
  },
  filterHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Subtle white overlay
    borderRadius: 12,
    paddingHorizontal: 15,
  },
});