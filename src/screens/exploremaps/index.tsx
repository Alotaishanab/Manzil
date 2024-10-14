/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { globalStyles } from '../../../src/styles/globalStyles';
import { PenIcon } from '@svgs';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
import { useIntl } from '@context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomMap } from './components/CustomMap';
import { styles } from './styles';

export const ExploreMaps = () => {
  const { intl } = useIntl();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const snapPoints = ['10%', '10%', '25%', '50%', '90.8%'];
  const [drawing, setDrawing] = useState(false); // Toggle for drawing mode
  const [resetDrawing, setResetDrawing] = useState(false); // Trigger to reset drawing

  // Toggle drawing mode
  const toggleDrawingMode = () => {
    setDrawing((prev) => !prev);
  };

  // Reset the drawing state (clear the drawing)
  const resetDrawingHandler = () => {
    setResetDrawing(true);
    setTimeout(() => setResetDrawing(false), 100); // Reset the flag after a brief timeout
  };

  return (
    <View style={{ flex: 1 }}>
      {/* MapView */}
      <View style={{ flex: 1 }}>
        <CustomMap drawing={drawing} resetDrawing={resetDrawing} />
      </View>

      {/* Overlaying FilterHeader */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 10,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
        }}
      >
        <FilterHeader handleFilter={() => console.log('Filter pressed')} />
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
      >
        <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          <View style={globalStyles.simpleRow}>
            {/* "Draw from Scratch" Button */}
            <TouchableOpacity onPress={resetDrawingHandler} style={styles.drawSketchBtn}>
              <PenIcon width={20} height={20} />
              <Text style={styles.drawSketchText}>
                {intl.formatMessage({ id: 'explore-search.draw-scratch' })}
              </Text>
            </TouchableOpacity>

            {/* Search Button */}
            <View style={{ marginHorizontal: 5 }} />
            <TouchableOpacity onPress={toggleDrawingMode} style={styles.searchBtn}>
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};
