import React, { Fragment, useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, Vibration, Platform } from 'react-native';
import { CustomButton, TopSpace, ImageCarouselPicker } from '@components';
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import * as SVGs from '../../../assets/svgs';
import { launchImageLibrary } from 'react-native-image-picker';

const PropertyStep5 = ({ media, setMedia, floor, setFloor, handleNext, handleBack }) => {
  const { intl } = useIntl();
  const [errors, setErrors] = useState({}); // State to manage validation errors

  const handlePicker = (selectedMedia: Array<any>) => {
    setMedia(selectedMedia); // Handle both images and videos
  };

  const handleAddFloorPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setFloor(asset.uri);
        }
      },
    );
  };

  const openMediaPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 0,
      },
      response => {
        if (!response.didCancel && response.assets) {
          const currentMedia = media || [];
          const selectedMedia = response.assets.filter(asset => {
            const isImage = asset.type.startsWith('image');
            const isVideo = asset.type.startsWith('video');
            return (isImage || isVideo);
          });

          setMedia([...currentMedia, ...selectedMedia]);
        }
      },
    );
  };

  const validateFields = () => {
    const currentErrors = {};
    if (media.length === 0) {
      currentErrors.media = intl.formatMessage({ id: 'errors.addMedia' }) || 'Please add at least one media item.';
    }
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      Vibration.vibrate(50); // Vibrate for 50ms on error
    } else {
      setErrors({});
      handleNext(); // Proceed to the next step if no errors
    }
  };

  return (
    <Fragment>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopSpace top={10} />

        {/* Image and Video Carousel Picker */}
        <View style={[styles.mediaContainer, errors.media && styles.errorBorder]}>
          <ImageCarouselPicker media={media} handlePicker={handlePicker} />
        </View>
        {errors.media && <Text style={styles.errorText}>{errors.media}</Text>}

        {/* Add Media Button */}
        <TouchableOpacity onPress={openMediaPicker} style={styles.addMediaBtn}>
          <Text style={styles.addImageText}>Add More Media</Text>
        </TouchableOpacity>

        {/* Floor Plan Input */}
        <TopSpace top={10} />
        <TouchableOpacity onPress={handleAddFloorPicker} activeOpacity={0.8} style={styles.addFloorplanBtn}>
          {floor ? (
            <Image source={{ uri: floor }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <View style={globalStyles.simpleRow}>
              <SVGs.MultiWindowAddIcon width={45} height={45} />
              <Text style={styles.addImageText}>
                {intl.formatMessage({ id: 'addpropertyScreen.feature-property.add-floor-plan' })}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Next Button */}
        <TopSpace top={20} />
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={validateFields}
          title={intl.formatMessage({ id: 'buttons.next' })}
          showRightIconButton={true}
        />
      </ScrollView>
    </Fragment>
  );
};

export default PropertyStep5;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
  mediaContainer: {
    borderRadius: 10,
  },
});
