/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {CustomMap, TopSpace} from '@components';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Colors} from '@colors';
import {fonts} from '../../../../src/assets/fonts';
import {FullScreenIcon, HouseIcon, MapLayerIcon, PenIcon} from '@svgs';
import {useIntl} from '@context';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';

const MapContent = ({
  bottomSheetRef,
  exploreList,
  snapPoints,
  markers,
  height,
  mapType,
  setMapType,
  handleSheetChanges,
  setShowMap,
  renderList,
  handleScroll,
}: any) => {
  const {intl} = useIntl();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [drawing, setDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [loading, setLoading] = useState(false); // State to manage loading modal visibility
  const [showDrawMessage, setShowDrawMessage] = useState(false); // New state for managing draw message visibility
  const mapRef = useRef(null);

  const handleMapPress = e => {
    if (drawing) {
      const newCoordinate = e.nativeEvent.coordinate;
      setCoordinates(prevCoords => [...prevCoords, newCoordinate]);
      setShowDrawMessage(false);
    }
  };

  const handleToggleDrawing = () => {
    if (
      drawing &&
      coordinates.length > 1 &&
      coordinates[0] !== coordinates[coordinates.length - 1]
    ) {
      setCoordinates([...coordinates, coordinates[0]]); // Close the loop when finishing drawing
      handleViewProperties();
    }
    setDrawing(!drawing);
    setShowDrawMessage(!drawing);
  };

  const handleDeleteDrawing = () => {
    setCoordinates([]);
    setShowDrawMessage(false);
  };

  const handleViewProperties = () => {
    if (
      coordinates.length > 1 &&
      coordinates[0] !== coordinates[coordinates.length - 1]
    ) {
      setCoordinates([...coordinates, coordinates[0]]); // Close the loop
    }
    setLoading(true); // Show loading screen
    queryProperties(coordinates);
  };

  const queryProperties = async coords => {
    try {
      console.log('Sending coordinates to the backend...', coords);
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({coordinates: coords}),
      });
      const data = await response.json(); // Assumes the backend sends back JSON
      // Process your data here
      console.log('Properties loaded:', data);
      Alert.alert(
        'Properties Loaded',
        'Properties within the selected area have been loaded.',
      );
    } catch (error) {
      console.error('Failed to load properties:', error);
      Alert.alert('Error', 'Failed to load properties.');
    } finally {
      setLoading(false); // Ensure loading state is turned off whether the fetch succeeds or fails
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  return (
    <>
      <View>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            styles.container,
            {
              // height: height,
              height: isFullScreen ? Dimensions.get('window').height : height,
            },
          ]}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            // style={isFullScreen ? styles.flex1 : styles.map}
            mapType={mapType}
            onMarkerDragEnd={handleToggleDrawing}
            onPanDrag={drawing ? handleMapPress : null}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            scrollEnabled={!drawing}
            zoomEnabled={!drawing}>
            {coordinates?.length > 0 && (
              <>
                <Polyline
                  coordinates={coordinates}
                  strokeColor="#307e20"
                  strokeWidth={4}
                />
                <Marker
                  coordinate={coordinates[coordinates.length - 1]}
                  pinColor="#307e20"
                />
              </>
            )}
          </MapView>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (mapType === 'standard') {
              setMapType('satellite');
            } else {
              setMapType('standard');
            }
          }}
          style={styles.mapLayerBtn}>
          <MapLayerIcon width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleToggleDrawing}
          style={[
            styles.mapLayerBtn,
            {
              top: 20,
            },
          ]}>
          <PenIcon width={30} height={30} />
        </TouchableOpacity>
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        animateOnMount={false}
        onClose={() => {
          setShowMap(false);
        }}
        style={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            flexGrow: 1,
            paddingHorizontal: 10,
            // alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.light.headingTitle,
              fontFamily: fonts.primary.semiBold,
              textAlign: 'center',
            }}>
            {intl.formatMessage({
              id: 'explore.over-amazing-views',
            })}
            {/*  */}
            {/* Over {exploreList?.length} amazing views */}
          </Text>
          <TopSpace top={10} />
          <View>
            <FlatList
              // ListFooterComponent={<View style={{marginBottom: 120}} />}
              data={exploreList}
              keyExtractor={item => item?.toString()}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 2}}
              renderItem={renderList}
              ListFooterComponent={
                <>
                  <View style={{height: 40}} />
                </>
              }
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default React.memo(MapContent);

const styles = StyleSheet.create({
  imageBgStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    flex: 1,
    // height: 350,
    width: '95%',
    alignSelf: 'center',
  },
  favoriteBtn: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
  },
  favoriteBtnText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 14,
  },
  mapLayerBtn: {
    backgroundColor: Colors.light.background,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    borderRadius: 8,
    right: 5,
    top: 10,
    alignSelf: 'flex-end',
  },
  container: {},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flex1: {
    flex: 1,
  },
  maximizeScreenBtn: {
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 2,
    height: 40,
    width: 40,
    top: 10,
    alignSelf: 'flex-end',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtnStyle: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: Colors.light.mapHomeBtn,
  },
  btnStyle: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  titleText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
  },
});
