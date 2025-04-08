import DocumentPicker from 'react-native-document-picker';
import React, { Fragment, useState, useEffect } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { CustomButton, TopSpace, MediaCarousel } from '@components';
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { useIntl } from '@context';
import * as SVGs from '../../../assets/svgs';
import { launchImageLibrary } from 'react-native-image-picker';

// Utility to determine if a URI corresponds to an image file
const isImage = (uri: string) => {
  const ext = uri.split('.').pop()?.toLowerCase();
  return ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif';
};

// Utility to extract file name from a URI
const getFileName = (uri: string) => {
  const parts = uri.split('/');
  return parts[parts.length - 1];
};

const PropertyStep5 = ({ media, setMedia, floorPlan, setFloorPlan, handleNext }) => {
  const { intl } = useIntl();
  const [errors, setErrors] = useState({});
  const [showPickerModal, setShowPickerModal] = useState(false); // For floor plan picker modal
  const [isPicking, setIsPicking] = useState(false); // Prevent overlapping picker calls
  const [showFullScreen, setShowFullScreen] = useState(false); // For full-screen preview
  const [arGenerated, setArGenerated] = useState(false); // To indicate AR view generation feedback

  // Debug: log whenever floorPlan updates
  useEffect(() => {
    console.log('Floor plan updated:', floorPlan);
  }, [floorPlan]);

  // Open media picker for property media
  const openMediaPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 0,
      },
      response => {
        if (!response.didCancel && response.assets) {
          const currentMedia = Array.isArray(media) ? media : [];
          const selectedMedia = response.assets.filter(asset => asset.uri);
          setMedia([...currentMedia, ...selectedMedia]);
        }
      }
    );
  };

  // Floor plan picker function (for image or document) with isPicking guard
  const handleAddFloorPicker = async (type: 'image' | 'document') => {
    if (isPicking) return;
    setIsPicking(true);
    try {
      setShowPickerModal(false); // Close modal when action starts
      if (type === 'image') {
        launchImageLibrary(
          { mediaType: 'photo', selectionLimit: 1 },
          (response: any) => {
            if (response.didCancel) {
              setIsPicking(false);
              return;
            }
            if (response.assets && response.assets.length > 0) {
              const asset = response.assets[0];
              if (asset.uri) {
                const trimmedUri = asset.uri.trim();
                console.log('Selected floor plan image URI:', trimmedUri);
                setFloorPlan(trimmedUri);
              }
            }
            setIsPicking(false);
          }
        );
      } else if (type === 'document') {
        try {
          const file = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf, DocumentPicker.types.doc],
          });
          if (file && file.uri) {
            const trimmedUri = file.uri.trim();
            console.log('Selected floor plan document URI:', trimmedUri);
            setFloorPlan(trimmedUri);
          }
        } catch (error) {
          if (!DocumentPicker.isCancel(error)) {
            console.error(error);
          }
        } finally {
          setIsPicking(false);
        }
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.error(error);
      }
      setIsPicking(false);
    }
  };

  // Validate that at least one media item is uploaded.
  const validateFields = () => {
    const currentErrors: any = {};
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

  // Handle AR generation click: update visual indicator for 2 seconds
  const handleGenerateAR = () => {
    setArGenerated(true);
    // Simulate processing time before resetting (replace with real AR logic as needed)
    setTimeout(() => setArGenerated(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopSpace top={20} />

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.screenTitle}>Property Media & Floor Plan</Text>
          <Text style={styles.screenExplanation}>
            Upload your property media and add a clear floor plan. Floor plan is free to add; generating an AR view is extra.
          </Text>
        </View>

        {/* Media Carousel */}
        <View style={[styles.mediaContainer, errors.media && styles.errorBorder]}>
          <MediaCarousel media={media} setMedia={setMedia} />
        </View>
        {errors.media && <Text style={styles.errorText}>{errors.media}</Text>}

        {/* Floor Plan Section */}
        <TopSpace top={20} />
        <Text style={styles.label}>Floor Plan</Text>
        <Text style={styles.fieldExplanation}>
          The floor plan must be very clear.
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (floorPlan) {
              setShowFullScreen(true);
            } else {
              setShowPickerModal(true);
            }
          }}
          activeOpacity={0.8}
          style={styles.floorPlanWrapper}
        >
          {floorPlan ? (
            isImage(floorPlan) ? (
              <View style={styles.floorPlanThumbnailContainer}>
                <TouchableOpacity
                  style={styles.floorPlanThumbnailTouch}
                  onPress={() => setShowFullScreen(true)}
                >
                  <Image source={{ uri: floorPlan }} style={styles.floorPlanThumbnail} />
                  <View style={styles.uploadedOverlay}>
                    <Text style={styles.uploadedText}>Uploaded</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setFloorPlan('')}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.filePlaceholder}>
                <Text style={styles.fileText}>{getFileName(floorPlan)} Uploaded</Text>
              </View>
            )
          ) : (
            <View style={styles.floorPlanPlaceholder}>
              <SVGs.MultiWindowAddIcon width={30} height={30} />
              <Text style={styles.floorPlanPlaceholderText}>Add Floor Plan</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* AR Generation Sub-Section */}
        {floorPlan ? (
          <View style={styles.arSection}>
            <View style={styles.arButtonWrapper}>
              <TouchableOpacity style={styles.arButton} onPress={handleGenerateAR}>
                <Text style={styles.arButtonText}>
                  {arGenerated ? 'AR View Generated' : 'Generate AR View'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.arPriceText}>5 Riyals</Text>
            </View>
            <Text style={styles.arNote}>Extra charges apply for AR view generation.</Text>
          </View>
        ) : null}

        <TopSpace top={30} />

        {/* Next Button */}
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={validateFields}
          title={intl.formatMessage({ id: 'buttons.next', defaultMessage: 'Next' })}
          showRightIconButton={true}
        />
        <TopSpace top={20} />
      </ScrollView>

      {/* Full-Screen Floor Plan Preview Modal */}
      <Modal
        visible={showFullScreen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFullScreen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowFullScreen(false)}>
          <View style={styles.fullScreenModalOverlay}>
            <Image source={{ uri: floorPlan }} style={styles.fullScreenImage} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Floor Plan Picker Modal */}
      <Modal
        visible={showPickerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPickerModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPickerModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.pickerModalContent}>
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
                <Text style={styles.modalSubtitle}>
                  Accepted Types: Images (JPG, PNG) or Documents (PDF, DOC)
                </Text>
                <View style={styles.horizontalButtonContainer}>
                  <TouchableOpacity
                    onPress={() => !isPicking && handleAddFloorPicker('image')}
                    style={[styles.modalButton, isPicking && styles.disabledButton]}
                    disabled={isPicking}
                  >
                    <Text style={styles.modalButtonText}>Select Image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => !isPicking && handleAddFloorPicker('document')}
                    style={[styles.modalButton, isPicking && styles.disabledButton]}
                    disabled={isPicking}
                  >
                    <Text style={styles.modalButtonText}>Select File</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default PropertyStep5;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: Colors.light.background,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  screenTitle: {
    fontSize: 26,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
  },
  screenExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
    marginTop: 5,
  },
  mediaContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    // Removed backgroundColor for a cleaner look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  // --- Floor Plan Section Styles ---
  floorPlanWrapper: {
    // No extra container background/shadow
    marginBottom: 10,
  },
  floorPlanThumbnailContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  floorPlanThumbnailTouch: {
    width: '100%',
    height: '100%',
  },
  floorPlanThumbnail: {
    width: '100%',
    height: '100%',
  },
  uploadedOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(76, 175, 80, 0.8)', // semi-transparent green
    paddingVertical: 2,
  },
  uploadedText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
    fontFamily: fonts.primary.bold,
  },
  removeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.light.primaryBtn, // Revolut-inspired accent color
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  floorPlanPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floorPlanPlaceholderText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
  },
  filePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: Colors.light.primaryBtn,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileText: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#fff',
  },
  // AR Generation Section – a tempting sub‑section
  arSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  arButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primaryBtn,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  arButton: {
    marginRight: 10,
  },
  arButtonText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: '#fff',
  },
  arPriceText: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
    color: '#fff',
  },
  arNote: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  // --- End Floor Plan Section Styles ---
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 8,
  },
  fieldExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
    marginBottom: 10,
  },
  textInputFullWidth: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
  },
  descriptionInput: {
    height: 150,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 15,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  counterContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  counterText: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  horizontalScrollView: {
    marginTop: 10,
  },
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
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
    color: Colors.light.headingTitle,
    textAlign: 'center',
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
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.primaryBtn,
    borderRadius: 30,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.light.disabledBtn || '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.primary.medium,
  },
  // --- Full-Screen Modal Styles for Floor Plan Preview ---
  fullScreenModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});
