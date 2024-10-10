/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BuildingAmenitiesModal,
  FilterModal,
  PropertiesFeaturesModal,
  PropertyTypeModal,
  Screen,
  TopSpace,
} from '@components';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
// import {useNavigation} from '@react-navigation/native';
import {height} from '../../hooks/useDimension';
import {useExploreMapProps} from './useExploreMapProps';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../../src/styles/globalStyles';
import {MapLayerIcon, PenIcon} from '@svgs';
import {styles} from './styles';
import {TouchableOpacity} from 'react-native';
// import {building} from '@assets';
import {useIntl} from '@context';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {PropertyCard} from '@components';
import {useNavigation} from '@react-navigation/native';
import { CustomMap } from './components/CustomMap';

import { LatLng } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ExploreMaps = () => {
  const {intl} = useIntl();
  const {
    onFocusInput,
    // markers,

    towerFeatures,
    apartmentFeatures,
    officeWorkerFeatures,
    shopWarehouseFeatures,
    farmhouseFeatures,
    chaletFeatures,
  } = useExploreMapProps();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['10%', '10%', '25%', '50%', '90.8%'];
  const navigation: any = useNavigation();
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const insets = useSafeAreaInsets();
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);

  const [isFullScreen, setIsFullScreen] = useState(false);




  const handleCard = () => {
    navigation.navigate('PropertyScreen');
  };

  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

  const togglePropertyModal = () => {
    setShowPropertiesModal(!showPropertiesModal);
  };


  return (
    <View style={{ flex: 1 }}>
      {/* MapView */}
      <View style={{ flex: 1 }}>
      <CustomMap />
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
  <FilterHeader
    onFocusInput={onFocusInput}
    handleFilter={() => setShowPropertiesModal(true)}
  />

</View>



      

      {/* Bottom Sheet */}
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          <TopSpace top={10} />
          <View style={globalStyles.simpleRow}>
            <TouchableOpacity style={styles.drawSketchBtn}>
              <PenIcon width={20} height={20} />
              <Text style={styles.drawSketchText}>
                {intl.formatMessage({ id: 'explore-search.draw-scratch' })}
              </Text>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 5 }} />
            <TouchableOpacity style={styles.searchBtn}>
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
          </View>
          <TopSpace top={10} />
          <PropertyCard />
        </BottomSheetScrollView>
      </BottomSheet>

      <PropertyTypeModal
        isVisible={showPropertiesModal}
        modalTitle={intl.formatMessage({
          id: 'landPropertyDetailScreen.property-type',
        })}
        toggleModal={togglePropertyModal}
        selectedPropertyType={selectedPropertyType}
       
        // setSelectedPropertyType={handleSelectPropertyType}
      />

    </View>
  );
};
