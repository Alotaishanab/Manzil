import React, {useCallback, useEffect, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  AddPropertiesContent,
  GenericModal,
  Screen,
  SearchBar,
  TopSpace,
} from '@components';
import LandCard from './components/LandCard';
import {useNavigation} from '@react-navigation/native';
import {useIntl} from '@context';
import SimpleContent from '../explore/SimpleContent';
import MapContent from '../explore/components/MapContent';
import {height} from '../../hooks/useDimension';
import {Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '@globalStyles';
import {PlusIcon} from '@svgs';
import {Colors} from '@colors';
import {styles} from './styles';
import {fonts} from '@fonts';

export const Land = () => {
  const navigation: any = useNavigation();
  const {intl} = useIntl();
  const [showButton, setShowButton] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [mapType, setMapType] = useState('standard');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['7%', '10%', '25%', '50%', '90.5%'];

  const handleLand = () => {
    navigation.navigate('LandPropertyDetails', {
      header: intl.formatMessage({id: 'landPropertyDetailScreen.land-details'}),
    });
  };
  const renderLand = () => {
    return <LandCard handleClick={handleLand} />;
  };
  const handleFilter = () => {
    navigation.navigate('FilterProperty');
  };
  const onFocusInput = () => {
    navigation.navigate('ExploreSearch');
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh action
    setTimeout(() => {
      setRefreshing(false);
      setShowMap(true);
    }, 2000);
  };

  const toggleMap = () => {
    setShowMap(true);
    bottomSheetRef.current?.snapToIndex(0);
  };
  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 2000);
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      if (index === snapPoints.length - 1) {
        setShowMap(false); // Show SimpleContent when fully expanded
      } else {
        setShowMap(true); // Show MapContent when not fully expanded
      }
    },
    [snapPoints.length],
  );

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowButton(offsetY > 100);
  };
  const exploreList = [1, 2, 3, 4, 5, 6];
  const markers = [
    {
      id: 1,
      latitude: 37.7881,
      longitude: -122.4304,
      title: 'SR 5,253',
      description: 'Description 1',
    },
    {
      id: 2,
      latitude: 37.7885,
      longitude: -122.4344,
      title: 'SR 5.9',
      description: 'Description 2',
    },
    {
      id: 3,
      latitude: 37.78835,
      longitude: -122.4384,
      title: 'SR 55',
      description: 'Description 3',
    },
    {
      id: 4,
      latitude: 37.797,
      longitude: -122.4284,
      title: 'SR 3',
      description: 'Description 4',
    },
  ];

  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const togglePropertyModal = () => {
    setShowPropertiesModal(!showPropertiesModal);
  };
  const handleAddProperty = () => {
    navigation.navigate('AddProperties');
  };
  const handlePromoteProperty = () => {
    navigation.navigate('PromoteProperty');
  };
  const handleRequestProperty = () => {
    togglePropertyModal();
    navigation.navigate('RequestProperty');
  };

  return (
    <Screen padding={10} showKeyboardAware={false}>
      <SearchBar
        onFocusInput={onFocusInput}
        handleFilter={handleFilter}
        placeholder={intl.formatMessage({
          id: 'landPropertyDetailScreen.search-house-prices',
        })}
        showFilterBtn={true}
      />

      {!showMap ? (
        <SimpleContent
          showButton={showButton}
          exploreList={exploreList}
          handleScroll={handleScroll}
          renderList={renderLand}
          handleMap={toggleMap}
          showContent={showContent}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      ) : (
        <MapContent
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          exploreList={exploreList}
          markers={markers}
          height={height}
          mapType={mapType}
          showPenIcon={true}
          toggleMap={toggleMap}
          setMapType={setMapType}
          setShowMap={setShowMap}
          handleScroll={handleScroll}
          renderList={renderLand}
          handleSheetChanges={handleSheetChanges}
        />
      )}
      {!showMap && !showPropertiesModal && (
        <TouchableOpacity
          onPress={() => togglePropertyModal()}
          style={globalStyles.addBtn}
          activeOpacity={0.8}>
          <PlusIcon width={20} height={20} fill={Colors.light.background} />
        </TouchableOpacity>
      )}
      {/*  */}
      <GenericModal
        modalTitle={intl.formatMessage({
          id: 'addPropertiesModal.header',
        })}
        centeredModal={false}
        toggleModal={togglePropertyModal}
        isVisible={showPropertiesModal}>
        <TopSpace top={10} />
        <AddPropertiesContent
          handleAdd={handleAddProperty}
          handlePromote={handlePromoteProperty}
          handleRequest={handleRequestProperty}
        />
      </GenericModal>
    </Screen>
  );
};
