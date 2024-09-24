import React, { Fragment, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomButton, CustomMap, DropDownPicker, TopSpace , FullScreenMap } from '@components';
import ImageCarouselPicker from './ImageCorouselPicker'; // Ensure this is the correct import path
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import * as SVGs from '../../../assets/svgs';
import { useAddPropertiesProps } from '../useAddPropertiesProps';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const PropertyStep5 = ({ selectedType, handleNext, handleBack }) => {
  const navigation = useNavigation();
  const { intl } = useIntl();
  const { propertyFeatures } = useAddPropertiesProps();
  const [selectedFeatures, setSelectedFeatures] = useState<Array<string>>([]); // Array for multiple features
  const [bedroomCount, setBedroomCount] = useState<number | string | null>(null);
  const [bathroomCount, setBathroomCount] = useState<number | string | null>(null);
  const [valueFloor, setValueFloor] = useState<string>('');
  const [isFocusFloor, setIsFocusFloor] = useState<boolean>(false);
  const [media, setMedia] = useState<Array<any>>([]);
  const [mapType, setMapType] = useState<string>('standard');
  const [description, setDescription] = useState<string>('');
  const [floor, setFloor] = useState<any>(null); // Assuming `floor` can be an image or any other type

  const [mapVisible, setMapVisible] = useState(false); // Map modal visibility state
  const [markerPosition, setMarkerPosition] = useState(null); // Marker position state

  // Function to toggle property feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prevFeatures) => {
      if (prevFeatures.includes(feature)) {
        return prevFeatures.filter(f => f !== feature);
      } else {
        return [...prevFeatures, feature];
      }
    });
  };

  // Handle location selection from FullScreenMap
  const handleLocationSelect = (location) => {
    setMarkerPosition(location); // Store the selected location
    console.log('Selected Location:', location); // Log coordinates for testing
  };

  const handlePicker = (selectedMedia: Array<any>) => {
    setMedia(selectedMedia); // Handle both images and videos
  };

  const handleAddFloorPicker = () => {
    // Implement logic to add floor plan (e.g., opening image picker)
  };

  const openMediaPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed', // Allow both images and videos
        selectionLimit: 0,  // Allow multiple media selection
      },
      (response) => {
        if (!response.didCancel && response.assets) {
          const currentImages = media.filter(item => item.type.startsWith('image'));
          const currentVideos = media.filter(item => item.type.startsWith('video'));

          // Filter selected media
          const selectedMedia = response.assets.filter(asset => {
            const isImage = asset.type.startsWith('image');
            const isVideo = asset.type.startsWith('video');

            // Common formats supported for images and videos
            const supportedImageFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const supportedVideoFormats = ['video/mp4', 'video/quicktime'];

            if (isImage && supportedImageFormats.includes(asset.type)) {
              return true;
            }
            if (isVideo && supportedVideoFormats.includes(asset.type)) {
              return true;
            }
            return false;
          });

          let newImages = [];
          let newVideos = [];

          selectedMedia.forEach((asset) => {
            if (asset.type.startsWith('image') && currentImages.length + newImages.length < 10) {
              newImages.push({
                uri: asset.uri,
                type: asset.type, // Image type
              });
            }
            if (asset.type.startsWith('video') && currentVideos.length + newVideos.length < 3) {
              newVideos.push({
                uri: asset.uri,
                type: asset.type, // Video type
              });
            }
          });

          setMedia((prevMedia) => [
            ...prevMedia,
            ...newImages,
            ...newVideos
          ]);
        }
      }
    );
  };

  const renderPropertyType = ({ item }: any) => {
    const Icon = SVGs[item?.icon];
    const isSelected = selectedFeatures.includes(item?.name); // Check if the feature is selected
    return (
      <TouchableOpacity
        onPress={() => toggleFeature(item?.name)} // Toggle selection
        style={[
          globalStyles.propertTypeCard,
          {
            borderColor: isSelected
              ? Colors.light.primaryBtn
              : Colors.light.propertyCardLine,
          },
        ]}
      >
        <Icon width={50} height={50} />
        <Text numberOfLines={2} style={globalStyles.propertyTypeCardText}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const ListFooter = () => (
    <>
      <TopSpace top={10} />

      {/* Address and Map */}
      <TopSpace top={10} />
      <Text style={styles.selectPrice}>Address</Text>
      <TopSpace top={5} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setMapVisible(true)} // Open full-screen map on press
        style={styles.mapContainer}
      >
        <CustomMap
          height={250}
          showHome={true}
          showMaximizeScreen={true}
          isAbsoluteFill={false}
          mapType={mapType}
          markerPosition={markerPosition} // Pass the selected marker position
          initialRegion={
            markerPosition
              ? {
                  latitude: markerPosition.latitude,
                  longitude: markerPosition.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
              : undefined
          }
        />
        {markerPosition && (
          <Text style={styles.selectedLocationText}>
            {`Lat: ${markerPosition.latitude}, Lng: ${markerPosition.longitude}`}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setMapType(prevType => (prevType === 'standard' ? 'satellite' : 'standard'))}
        style={styles.mapToggleButton}
      >
        <SVGs.MapLayerIcon width={25} height={25} />
      </TouchableOpacity>

      {/* Floor Plan Input */}
      <TopSpace top={10} />
      <TouchableOpacity
        onPress={handleAddFloorPicker}
        activeOpacity={0.8}
        style={styles.addFloorplanBtn}
      >
        {floor ? (
          <Image
            source={floor}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          <View style={globalStyles.simpleRow}>
            <SVGs.MultiWindowAddIcon width={45} height={45} />
            <Text style={styles.addImageText}>
              {intl.formatMessage({
                id: 'addpropertyScreen.feature-property.add-floor-plan',
              })}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TopSpace top={20} />

      {/* Next Button */}
      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleNext}
        title={intl.formatMessage({ id: 'buttons.next' })}
        showRightIconButton={true}
      />
    </>
  );

  return (
    <Fragment>
      {/* Image and Video Carousel Picker */}
      <ImageCarouselPicker media={media} handlePicker={handlePicker} />

      {/* Add Media Button */}
      <TouchableOpacity onPress={openMediaPicker} style={styles.addMediaBtn}>
        <Text style={styles.addImageText}>Add More Media</Text>
      </TouchableOpacity>

      {/* Property Features */}
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.featuredPropertyText}>Properties Features</Text>
      </View>
      <FlatList
        data={propertyFeatures}
        showsVerticalScrollIndicator={false}
        renderItem={renderPropertyType}
        numColumns={3}
        horizontal={false}
        keyboardShouldPersistTaps="always"
        columnWrapperStyle={styles.propertyColumnWrap}
        ListFooterComponent={ListFooter}
      />
      {/* Full-Screen Map for selecting location */}
      <FullScreenMap
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        onLocationSelect={handleLocationSelect}
      />
    </Fragment>
  );
};

export default PropertyStep5;

const styles = StyleSheet.create({
  selectPrice: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 5,
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  addMediaBtn: {
    backgroundColor: Colors.light.primaryBtn,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addImageText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.background,
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
  },
  featuredPropertyText: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
  },
  addFloorplanBtn: {
    borderWidth: 1,
    borderColor: Colors.light.inputBg,
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Colors.light.inputBg,
  },
  mapToggleButton: {
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 8,
    right: 10,
    position: 'absolute',
    top: 80,
    alignSelf: 'flex-end',
  },
  selectedLocationText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#fff',
  },
});
