/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BuildingAmenitiesModal,
  FilterModal,
  PropertiesFeaturesModal,
  PropertyTypeModal,
  Screen,
  PropertyCardSimple,
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
import {ag1, ag2, ag5, ag6, ag7} from '@assets';
import { throttle } from 'lodash';
import { LatLng } from 'react-native-maps';

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
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [propertyFeature, setPropertyFeature] = useState(null);
  const [showPropertiesFeature, setShowPropertiesFeature] = useState(false);

  const [mapType, setMapType] = useState('standard');
  const [drawing, setDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [loading, setLoading] = useState(false); // State to manage loading modal visibility
  const [showDrawMessage, setShowDrawMessage] = useState(false); // New state for managing draw message visibility
  const mapRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  

  const throttledHandleMapPress = useCallback(
    throttle((newCoordinate) => {
      setCoordinates((prevCoords) => [...prevCoords, newCoordinate]);
    }, 50), // Adjust this delay to tune responsiveness vs. performance
    []
  );
  
  const handleMapPress = useCallback(
    (e) => {
      if (drawing) {
        const newCoordinate = e.nativeEvent.coordinate;
        throttledHandleMapPress(newCoordinate);
      }
    },
    [drawing, throttledHandleMapPress] // Include throttled function in the dependency array
  );

const handleToggleDrawing = useCallback(() => {
  if (drawing && coordinates.length > 1 && coordinates[0] !== coordinates[coordinates.length - 1]) {
    setCoordinates((prevCoords) => [...prevCoords, prevCoords[0]]); // Close the loop
    handleViewProperties();
  }
  setDrawing((prev) => !prev);
  setShowDrawMessage((prev) => !prev);
}, [drawing, coordinates]);


const handleDeleteDrawing = useCallback(() => {
  setCoordinates([]);
  setShowDrawMessage(false);
}, []);


const handleViewProperties = useCallback(() => {
  if (coordinates.length > 1 && coordinates[0] !== coordinates[coordinates.length - 1]) {
    setCoordinates((prevCoords) => [...prevCoords, prevCoords[0]]); // Close the loop
  }
  setLoading(true);
  queryProperties(coordinates);
}, [coordinates]);
  

  const handleCard = () => {
    navigation.navigate('PropertyScreen');
  };

  const [showArea, setShowArea] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const toggleLocation = () => {
    setShowLocation(!showLocation);
  };
  const toggleArea = () => {
    setShowArea(!showArea);
  };
  const togglePropertiesFeature = () => {
    setShowPropertiesFeature(!showPropertiesFeature);
  };

  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

  const togglePropertyModal = () => {
    setShowPropertiesModal(!showPropertiesModal);
  };

  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const toggleSearchFilter = () => {
    setShowSearchFilter(!showSearchFilter);
  };
  const handlePropertyFeatures = () => {
    setShowSearchFilter(false);
    setShowPropertiesFeature(!showPropertiesFeature);
  };
  const [area, setArea] = useState(null);
  const [location, setLocation] = useState(null);
  const allAreas = [
    {label: 'Riyadh', value: 'Riyadh'},
    {label: 'Jeddah', value: 'Jeddah'},
    {label: 'Khobar', value: 'Khobar'},
    {label: 'Alqassim', value: 'Alqassim'},
    {label: 'Makkah', value: 'Makkah'},
    {label: 'Madinah', value: 'Madinah'},
  ];

  const allLocations: any = [
    {label: 'Almalqa', value: 'Almalqa'},
    {label: 'Hittin', value: 'Hittin'},
    {label: 'Slahhudin', value: 'Slahhudin'},
    {label: 'Alrafiah', value: 'Alrafiah'},
    {label: 'Almakeel', value: 'Almakeel'},
    {label: 'Alrayan', value: 'Alrayan'},
  ];
  const [bathroom, setBathroom] = useState(null);
  const [showBathroom, setShowBathroom] = useState(false);
  const [showBedrooms, setShowBedrooms] = useState(false);
  const [bedroom, setBedroom] = useState(null);
  const allBathrooms: any = [
    {label: '1 Bath', value: '1 Bath'},
    {label: '2 Bath', value: '2 Bath'},
    {label: '3 Bath', value: '3 Bath'},
    {label: '4 Bath', value: '4 Bath'},
    {label: '5 Bath', value: '5 Bath'},
    {label: '6 Bath', value: '6 Bath'},
  ];
  const allBedroom: any = [
    {label: '1 Bedroom', value: '1 Bedroom'},
    {label: '2 Bedroom', value: '2 Bedroom'},
    {label: '3 Bedroom', value: '3 Bedroom'},
    {label: '4 Bedroom', value: '4 Bedroom'},
    {label: '5 Bedroom', value: '5 Bedroom'},
    {label: '6 Bedroom', value: '6 Bedroom'},
  ];

  const allDirections = [
    {label: 'South', value: 'South'},
    {label: 'North', value: 'North'},
    {label: 'West', value: 'West'},
    {label: 'East', value: 'East'},
  ];

  const [showFurnished, setShowFurnished] = useState(false);
  const allFurnishedTypes = [
    {
      label: intl.formatMessage({
        id: 'filterPropertyScreen.furnished',
      }),
      value: intl.formatMessage({
        id: 'filterPropertyScreen.furnished',
      }),
    },
    {
      label: intl.formatMessage({
        id: 'filterPropertyScreen.unfurnished',
      }),
      value: intl.formatMessage({
        id: 'filterPropertyScreen.unfurnished',
      }),
    },
  ];
  const [furnished, setFurnished] = useState(null);
  const toggleFurnished = () => {
    setShowFurnished(!showFurnished);
  };

  const [direction, setDirection] = useState(null);
  const [showDirection, setShowDirection] = useState(false);
  const toggleDirection = () => {
    setShowDirection(!showDirection);
  };
  const handleSelectPropertyType = (type: React.SetStateAction<null>) => {
    setSelectedPropertyType(type);
    setShowPropertiesModal(false);
    setShowSearchFilter(true);
  };
  const toggleBathroom = () => {
    setShowBathroom(!showBathroom);
  };
  const toggleBedroom = () => {
    setShowBedrooms(!showBedrooms);
  };

  const [amenities, setAminities] = useState(null);
  const [showAmenities, setShowAminities] = useState(false);
  const toggleAminities = () => {
    setShowAminities(!showAmenities);
  };
  const handleAmenities = (val: any) => {
    setAminities(val);
    toggleAminities();
  };

  const [floor, setFloor] = useState(null);
  const [showFloor, setShowFloor] = useState(false);
  const toggleFloor = () => {
    setShowFloor(!showFloor);
  };
  const allPrices = [
    {label: '100 SAR', value: '100 SAR'},
    {label: '150 SAR', value: '150 SAR'},
    {label: '200 SAR', value: '200 SAR'},
    {label: '250 SAR', value: '250 SAR'},
    {label: '300 SAR', value: '300 SAR'},
    {label: '350 SAR', value: '350 SAR'},
    {label: '400 SAR', value: '400 SAR'},
  ];
  const [showMaxPrice, setShowMaxPrice] = useState(false);
  const [maxPrice, setMaxPrice] = useState(null);
  const toggleMaxPrice = () => {
    setShowMaxPrice(!showMaxPrice);
  };
  const [price, setPrice] = useState(null);
  const [showPrice, setShowPrice] = useState(false);
  const togglePrice = () => {
    setShowPrice(!showPrice);
  };
  const allSpaces = [
    {label: '100 m²', value: '100 m²'},
    {label: '150 m²', value: '150 m²'},
    {label: '200 m²', value: '200 m²'},
    {label: '250 m²', value: '250 m²'},
    {label: '300 m²', value: '300 m²'},
    {label: '350 m²', value: '350 m²'},
  ];

  const [landsize, setLandSize] = useState(null);
  const [showLandSize, setShowLandSize] = useState(false);
  const toggleLandSize = () => {
    setShowLandSize(!showLandSize);
  };
  const [showLivingSpace, setShowLivingSpace] = useState(false);
  const [livingSpace, setLivingSpace] = useState(null);
  const toggleLivingSpace = () => {
    setShowLivingSpace(!showLivingSpace);
  };

  const [space, setSpace] = useState(null);
  const [showSpace, setShowSpace] = useState(false);
  const toggleSpace = () => {
    setShowSpace(!showSpace);
  };
  const [selectedAmenitiesItems, setSelectedAmenitiesItems] = useState<any>([]);

  const handleSelectAmenities = (itemName: string) => {
    console.log('itemName:', itemName);
    const current = selectedAmenitiesItems || [];
    // Check if selectedItems is an array before using includes
    if (current?.includes(itemName)) {
      // Remove item if it's already selected (deselect)
      setSelectedAmenitiesItems(
        current?.filter((name: any) => name !== itemName),
      );
    } else {
      // Add item to selected items (select)
      setSelectedAmenitiesItems([...current, itemName]);
    }
  };
  const selectAmenities = (type: any) => {
    switch (type) {
      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.appartments',
      }):
        return apartmentFeatures;

      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.tower',
      }):
        return towerFeatures;

      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.shop',
      }):
        return shopWarehouseFeatures;

      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.farm-house',
      }):
        return farmhouseFeatures;

      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.chalet',
      }):
        return chaletFeatures;

      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.office',
      }):
        return officeWorkerFeatures;

      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.warehouse',
      }):
        return shopWarehouseFeatures;

      case intl.formatMessage({
        id: 'addpropertyScreen.properties-type.worker-warehouse',
      }):
        return shopWarehouseFeatures;
    }
  };

  const handleClear = () => {
    setArea(null);
    setLocation(null);
    setPrice(null);
    setSpace(null);
    setBedroom(null);
    setBathroom(null);
    setFurnished(null);
    setSelectedPropertyType(null);
    setDirection(null);
    toggleSearchFilter();
  };
  const [showDrawArea, setShowDrawArea] = useState(true);
  useEffect(() => {
    drawing &&
      setTimeout(() => {
        setShowDrawArea(false);
      }, 1000);
  }, [drawing]);
  
  useEffect(() => {
    setSelectedAmenitiesItems(null);
  }, [selectedPropertyType]);

  useEffect(() => {
    setAminities(null);
  }, [selectedPropertyType]);

  const queryProperties = useCallback(async (coords: LatLng[]) => {
    try {
      console.log('Sending coordinates to the backend...', coords);
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates: coords }),
      });
      const data = await response.json(); // Assumes the backend sends back JSON
      console.log('Properties loaded:', data);
      Alert.alert(
        'Properties Loaded',
        'Properties within the selected area have been loaded.'
      );
    } catch (error) {
      console.error('Failed to load properties:', error);
      Alert.alert('Error', 'Failed to load properties.');
    } finally {
      setLoading(false); // Ensure loading state is turned off whether the fetch succeeds or fails
    }
  }, []);

  return (
    <Screen padding={0} paddingHorizontal={0} showKeyboardAware={false}>
      <View style={{ paddingHorizontal: 20, paddingTop: 5 }}>
        <FilterHeader
          onFocusInput={onFocusInput}
          handleFilter={() => setShowPropertiesModal(true)}
        />
      </View>

      <View>
        <View style={[StyleSheet.absoluteFillObject, styles.container, { height: isFullScreen ? Dimensions.get('window').height : height }]}>
          {showDrawArea && (
            <View style={styles.drawYourSearchAreaView}>
              <Text style={styles.drawSearchText}>
                {intl.formatMessage({ id: 'explore-search.draw-search-area' })}
              </Text>
            </View>
          )}

          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            mapType={mapType}
            onMarkerDragEnd={handleToggleDrawing}
            onPanDrag={drawing ? handleMapPress : () => null}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            scrollEnabled={!drawing}
            zoomEnabled={!drawing}
          >
            {coordinates.length > 0 && (
              <>
                <Polyline coordinates={coordinates} strokeColor="#307e20" strokeWidth={4} />
                <Marker coordinate={coordinates[coordinates.length - 1]} pinColor="#307e20" />
              </>
            )}
          </MapView>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
          style={styles.mapLayerBtn}
        >
          <MapLayerIcon width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleToggleDrawing}
          style={[styles.mapLayerBtn, { top: 20 }]}
        >
          <PenIcon width={30} height={30} />
        </TouchableOpacity>
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          <TopSpace top={10} />
          <View style={globalStyles.simpleRow}>
            <TouchableOpacity onPress={handleDeleteDrawing} style={styles.drawSketchBtn}>
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
          < PropertyCard />
        </BottomSheetScrollView>
      </BottomSheet>

      <PropertyTypeModal
        isVisible={showPropertiesModal}
        modalTitle={intl.formatMessage({
          id: 'landPropertyDetailScreen.property-type',
        })}
        toggleModal={togglePropertyModal}
        selectedPropertyType={selectedPropertyType}
        handleClick={handleSelectPropertyType}
        // setSelectedPropertyType={handleSelectPropertyType}
      />

      <FilterModal
        isVisible={showSearchFilter}
        selectedPropertyType={selectedPropertyType}
        setPropertyFeature={setPropertyFeature}
        propertyFeature={propertyFeature}
        toggleModal={toggleSearchFilter}
        handleArea={toggleArea}
        handleLocation={toggleLocation}
        showArea={showArea}
        area={area}
        setArea={setArea}
        location={location}
        setLocation={setLocation}
        allAreas={allAreas}
        allLocations={allLocations}
        showLocation={showLocation}
        handlePropertyFeatures={handlePropertyFeatures}
        showDirection={showDirection}
        toggleDirection={toggleDirection}
        direction={direction}
        setDirection={setDirection}
        allDirections={allDirections}
        allFurnishedTypes={allFurnishedTypes}
        furnished={furnished}
        setFurnished={setFurnished}
        toggleFurnished={toggleFurnished}
        showFurnished={showFurnished}
        showBathroom={showBathroom}
        allBathrooms={allBathrooms}
        toggleBathroom={toggleBathroom}
        bathroom={bathroom}
        setBathroom={setBathroom}
        bedroom={bedroom}
        setBedroom={setBedroom}
        showBedrooms={showBedrooms}
        toggleBedroom={toggleBedroom}
        allBedroom={allBedroom}
        amenities={amenities}
        toggleAminities={toggleAminities}
        price={price}
        setPrice={setPrice}
        showPrice={showPrice}
        togglePrice={togglePrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        showMaxPrice={showMaxPrice}
        toggleMaxPrice={toggleMaxPrice}
        allPrices={allPrices}
        allSpaces={allSpaces}
        space={space}
        setSpace={setSpace}
        toggleSpace={toggleSpace}
        showSpace={showSpace}
        handleClear={handleClear}
        selectedPropertyFeatures={selectedAmenitiesItems}
        data={selectAmenities(selectedPropertyType)}
        floor={floor}
        setFloor={setFloor}
        showFloor={showFloor}
        toggleFloor={toggleFloor}
        landsize={landsize}
        setLandSize={setLandSize}
        showLandSize={showLandSize}
        toggleLandSize={toggleLandSize}
        livingSpace={livingSpace}
        setLivingSpace={setLivingSpace}
        showLivingSpace={showLivingSpace}
        toggleLivingSpace={toggleLivingSpace}
      />

      <BuildingAmenitiesModal
        isVisible={showAmenities}
        toggleModal={toggleAminities}
        handleClick={handleAmenities}
        data={selectAmenities(selectedPropertyType)}
      />

      <PropertiesFeaturesModal
        data={selectAmenities(selectedPropertyType)}
        isVisible={showPropertiesFeature}
        toggleModal={togglePropertiesFeature}
        setPropertyFeature={setPropertyFeature}
        selectedProperties={selectedAmenitiesItems}
        handleSelectAmenities={handleSelectAmenities}
      />
    </Screen>
  );
};
