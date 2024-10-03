/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  BuildingAmenitiesModal,
  FilterModal,
  PropertiesFeaturesModal,
  PropertyCard,
  PropertyTypeModal,
  Screen,
  TopSpace,
} from '@components';
import {useExploreProps} from './useExploreProps';
import FilterHeader from '../../../src/components/molecules/FilterHeader';
import {width} from '../../hooks/useDimension';
import {useIntl} from '@context';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {styles} from './styles';
import {ArrowForIcon, ArrowForwardIcon} from '@svgs';
import {ag1, ag2, ag5, ag6, ag7} from '@assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useGetNearbyProperties,
  UserLocation,
  useGetInterestedProperties,
} from '@services';

export const Explore = () => {
  const [location, setLocation] = useState<UserLocation>({
    latitude: 37.76816965856596, // Example latitude
    longitude: -122.4264693260193, // Example longitude
  });
  // const location: UserLocation = {
  //   latitude: 37.76816965856596, // Example latitude
  //   longitude: -122.4264693260193, // Example longitude
  // };
  const {data: nearByProperties} = useGetNearbyProperties(location);
  const {data: interestedProperties} = useGetInterestedProperties();

  console.log('nearByProperties', nearByProperties);
  console.log('interestedProperties', interestedProperties);
  const navigation: any = useNavigation();
  const {
    exploreList,
    onFocusInput,

    towerFeatures,
    apartmentFeatures,
    officeWorkerFeatures,
    shopWarehouseFeatures,
    farmhouseFeatures,
    chaletFeatures,
  } = useExploreProps();
  const {intl} = useIntl();
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [propertyFeature, setPropertyFeature] = useState(null);
  const [showPropertiesFeature, setShowPropertiesFeature] = useState(false);

  // const handleScroll = (event: any) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   setShowButton(offsetY > 100);
  // };
  const handleCard = () => {
    navigation.navigate('PropertyScreen');
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
  const [showArea, setShowArea] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const toggleLocation = () => {
    setShowLocation(!showLocation);
  };
  const toggleArea = () => {
    setShowArea(!showArea);
  };
  
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
    {label: '100,000 SAR', value: '100 SAR'},
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
  const [space, setSpace] = useState(null);
  const [showSpace, setShowSpace] = useState(false);
  const toggleSpace = () => {
    setShowSpace(!showSpace);
  };
  const [selectedAmenitiesItems, setSelectedAmenitiesItems] = useState<any>([]);
  const handleSelectAmenities = (itemName: string) => {
    const current = selectedAmenitiesItems ?? [];
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
    console.log('selectAmenities type', type);
    switch (type) {
      case intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.houses',
      }):
        return apartmentFeatures;
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
        return officeWorkerFeatures;
    }
  };
  const agencies = [ag5, ag6, ag7, ag2, ag1];
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
  // const ListFooter=()=>{
  //   return(

  //   )
  // }
  const handleClear = () => {
    setArea(null);
    setLocation(null);
    setPrice(null);
    setMaxPrice(null);
    setSpace(null);
    setBedroom(null);
    setBathroom(null);
    setFloor(null);
    setFurnished(null);
    setSelectedPropertyType(null);
    setDirection(null);
    toggleSearchFilter();
  };

  useEffect(() => {
    setSelectedAmenitiesItems(null);
  }, [selectedPropertyType]);

  useEffect(() => {
    setAminities(null);
  }, [selectedPropertyType]);
  return (
    <Screen padding={0} paddingHorizontal={10} showKeyboardAware={false}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.light.background,
          paddingTop: 20,
          width: '100%',
        }}>
        <FilterHeader
          onFocusInput={onFocusInput}
          handleFilter={togglePropertyModal}
        />

        {/* Updated Smart Search with AI Option */}
<TouchableOpacity
  onPress={() => navigation.navigate('PropertyFullScreen')}
  style={styles.aiSearchContainer}
>
  <View style={styles.aiSearchContent}>
    <Text style={styles.aiSearchText}>Explore with AI   </Text>
    <Icon name="robot-outline" size={20} color={Colors.light.primaryBtn} />
    <View style={styles.underline} />
  </View>
</TouchableOpacity>


        <FlatList
          // ListFooterComponent={<View style={{marginBottom: 120}} />}
          data={exploreList}
          keyExtractor={item => item?.toString()}
          // onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.firstFlatListContentContainerStyle}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          // onScrollToTop={onRefresh}
          renderItem={({item, index}: any) => {
            if (index < 1) {
              return (
                <PropertyCard
                  sliderWidth={'100%'}
                  item={item}
                  handleClick={handleCard}
                />
              );
            }
            return null;
          }}
        />

        {/* <TopSpace top={30} /> */}

        <View style={[styles.topAgencyWrap, {}]}>
          <View style={globalStyles.rowSpaceBetween}>
            <Text style={styles.topAgencyText}>
              {intl.formatMessage({
                id: 'explore.top-agencies',
              })}
            </Text>

            <Pressable
              onPress={() => {
                navigation.navigate('AllAgencies');
              }}
              style={globalStyles.simpleRow}>
              <Text style={styles.sellAll}>
                {intl.formatMessage({
                  id: 'buttons.sell-all',
                })}
                {'  '}
              </Text>
              <ArrowForIcon width={20} height={20} />
            </Pressable>

            {/*  */}
          </View>

          <TopSpace top={10} />

          <FlatList
            horizontal
            data={agencies}
            contentContainerStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 4, // Adjust padding as needed
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AgencyDetails');
                  }}
                  style={[
                    styles.agencyBtn,
                  ]}>
                  <Image source={item} style={styles.agencyImg} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TopSpace top={30} />

        <View>
          <FlatList
            data={exploreList}
            keyExtractor={item => item?.toString()}
            // onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 3,
              paddingHorizontal: 3,
              overflow: 'hidden',
              width: '100%',
            }}
            // onScrollToTop={onRefresh}
            renderItem={({item, index}: any) => {
              if (index > 0) {
                return (
                  <PropertyCard
                    sliderWidth={'100%'}
                    item={item}
                    handleClick={handleCard}
                  />
                );
              }
              return null;
            }}
          />
        </View>
      </ScrollView>
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
