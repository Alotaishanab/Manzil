import DocumentPicker from 'react-native-document-picker';
import React, { Fragment, useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, Vibration, Modal, TouchableWithoutFeedback } from 'react-native';
import { CustomButton, TopSpace, MediaCarousel } from '@components';
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { useIntl } from '@context';
import * as SVGs from '../../../assets/svgs';
import { launchImageLibrary } from 'react-native-image-picker';

const PropertyStep5 = ({ media, setMedia, floor, setFloorPlan, handleNext }) => {
  const { intl } = useIntl();
  const [errors, setErrors] = useState({});
  const [showPickerModal, setShowPickerModal] = useState(false); // State for modal

  const openMediaPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 0,
      },
      response => {
        if (!response.didCancel && response.assets) {
          const currentMedia = media || [];
          const selectedMedia = response.assets.filter(asset => asset.uri);
          setMedia([...currentMedia, ...selectedMedia]);
        }
      }
    );
  };

  const handleAddFloorPicker = async (type) => {
    try {
      setShowPickerModal(false); // Close modal only when action starts
      if (type === 'image') {
        const response = await new Promise((resolve) => {
          launchImageLibrary(
            { mediaType: 'photo', selectionLimit: 1 },
            resolve
          );
        });
        if (!response.didCancel && response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setFloorPlan(asset.uri);
        }
      } else if (type === 'document') {
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.doc],
        });
        setFloorPlan(file.uri);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.error(error);
      }
    }
  };

  const validateFields = () => {
    const currentErrors = {};
    if (!media || media.length === 0) {
      currentErrors.media = 'Please add at least one media item.';
    }
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      Vibration.vibrate(50);
    } else {
      setErrors({});
      handleNext();
    }
  };

  return (
    <Fragment>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopSpace top={20} />

        {/* Media Carousel */}
        <View style={[styles.mediaContainer, errors.media && styles.errorBorder]}>
          <MediaCarousel media={media} setMedia={setMedia} />
        </View>
        {errors.media && <Text style={styles.errorText}>{errors.media}</Text>}

        {/* Slim and Refined Floor Plan Section */}
        <TopSpace top={20} />
        <TouchableOpacity onPress={() => setShowPickerModal(true)} activeOpacity={0.8} style={styles.glassAddFloorplanBtn}>
          {floor ? (
            floor.startsWith('http') || floor.startsWith('file:') ? (
              <Image source={{ uri: floor }} style={styles.glassFloorImage} />
            ) : (
              <View style={styles.filePlaceholder}>
                <Text style={styles.fileText}>File Uploaded</Text>
              </View>
            )
          ) : (
            <View style={styles.glassFloorPlaceholder}>
              <SVGs.MultiWindowAddIcon width={30} height={30} />
              <Text style={styles.glassAddFloorText}>Add Floor Plan</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Modal for Choosing Floor Plan Type */}
        <Modal
          visible={showPickerModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowPickerModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowPickerModal(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.bottomModalContent}>
                  <TouchableOpacity
                    style={styles.closeButtonModal}
                    onPress={() => setShowPickerModal(false)}
                  >
                    <Image
                      source={require('../../../assets/images/close.png')}
                      style={styles.closeIconImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Choose Floor Plan Type</Text>
                  <Text style={styles.modalSubtitle}>Accepted Types: Images (JPG, PNG) or Documents (PDF, DOC)</Text>
                  <View style={styles.horizontalButtonContainer}>
                    <TouchableOpacity onPress={() => handleAddFloorPicker('image')} style={styles.modalButton}>
                      <Text style={styles.modalButtonText}>Select Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAddFloorPicker('document')} style={styles.modalButton}>
                      <Text style={styles.modalButtonText}>Select File</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Next Button */}
        <TopSpace top={30} />
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={validateFields}
          title="Next"
          showRightIconButton={true}
        />
        <TopSpace top={20} />
      </ScrollView>
    </Fragment>
  );
};

export default PropertyStep5;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  mediaContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: Colors.light.inputBg,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  glassAddFloorplanBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  glassFloorImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  glassFloorPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassAddFloorText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
  },
  filePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.light.primaryBtn,
  },
  fileText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.primary.bold,
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
  // Bottom Slide-in Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButtonModal: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIconImage: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 20,
    textAlign: 'center',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.primaryBtn,
    borderRadius: 30,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
