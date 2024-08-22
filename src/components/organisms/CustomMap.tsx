import {Colors} from '@colors';
import {FullScreenIcon, HouseIcon} from '@svgs';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {fonts} from '../../../src/assets/fonts';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useNavigation} from '@react-navigation/native';
const markers = [
  {
    id: 1,
    latitude: 37.7881,
    longitude: -122.4304,
    title: 'Location 1',
    description: 'Description 1',
  },
  // {
  //   id: 2,
  //   latitude: 37.7885,
  //   longitude: -122.4344,
  //   title: 'Location 2',
  //   description: 'Description 2',
  // },
  // {
  //   id: 3,
  //   latitude: 37.78835,
  //   longitude: -122.4384,
  //   title: 'Location 3',
  //   description: 'Description 3',
  // },
];
type MapType = {
  showMaximizeScreen: boolean;
  height: number;
  markerData?: any;
  showHome: boolean;
  isAbsoluteFill: boolean;
  mapType?:
    | 'standard'
    | 'satellite'
    | 'hybrid'
    | 'hybridFlyover'
    | 'mutedStandard'
    | 'none'
    | 'satelliteFlyover'
    | 'terrain'
    | any;
};

export const CustomMap: React.FC<MapType> = ({
  showMaximizeScreen = true,
  height = 250,
  markerData = markers,
  showHome = true,
  isAbsoluteFill = true,
  mapType = 'standard',
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const navigation: any = useNavigation();
  return (
    <View
      style={[
        isAbsoluteFill ? StyleSheet.absoluteFillObject : null,
        styles.container,
        {
          // height: height,
          height: isFullScreen ? Dimensions.get('window').height : height,
        },
      ]}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        // style={isFullScreen ? styles.flex1 : styles.map}
        mapType={mapType}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markerData?.map(item => {
          return (
            <Marker
              key={item?.id}
              coordinate={{
                latitude: item?.latitude,
                longitude: item?.longitude,
              }}
              onPress={() => {
                navigation.navigate('LandPropertyDetails');
              }}>
              {showHome ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.homeBtnStyle}>
                  <HouseIcon
                    fill={Colors.light.background}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.8} style={styles.btnStyle}>
                  <Text style={styles.titleText}>{item?.title}</Text>
                </TouchableOpacity>
              )}
            </Marker>
          );
        })}
      </MapView>
      {showMaximizeScreen && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleFullScreen}
          style={styles.maximizeScreenBtn}>
          <FullScreenIcon width={25} height={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 8,
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
