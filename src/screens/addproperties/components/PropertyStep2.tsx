import React, { Fragment, useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  Vibration,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { AreaIcon, DoubleTcIcon, ArrowDownIcon } from '@svgs';
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import { CustomButton, TopSpace } from '@components';
import { CompassDirectionModal } from '../../../components/molecules/CompassDirectionModal';

const { height: screenHeight } = Dimensions.get('window');

const PropertyStep2 = ({ selectedType, handleNext, handleBack }: any) => {
  const { intl } = useIntl();
  const [priceMeter, setPriceMeter] = useState(null);
  const [valueDirection, setValueDirection] = useState<any>('');
  const [isDirectionModalVisible, setIsDirectionModalVisible] = useState(false);
  const [propertyAge, setPropertyAge] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [errors, setErrors] = useState({});

  // Initialize panY starting from the bottom of the screen
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(panY, {
            toValue: screenHeight, // Slide down
            duration: 300,
            useNativeDriver: true,
          }).start(() => setIsDirectionModalVisible(false));
        } else {
          Animated.spring(panY, {
            toValue: 0, // Stay in place
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openModal = () => {
    setIsDirectionModalVisible(true);
    Animated.timing(panY, {
      toValue: 0, // Bring up the modal
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const handleDirectionSelect = (direction: string) => {
    setValueDirection(direction);
    setIsDirectionModalVisible(false);
  };

  const handleTitleChange = (text: string) => {
    if (/[^a-zA-Z\s]/.test(text)) {
      setErrors((prev) => ({ ...prev, title: 'Title should not contain numbers or special characters.' }));
      return;
    }
    setTitle(text.slice(0, 50));
    setErrors((prev) => ({ ...prev, title: null }));
  };

  const handlePriceChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (sanitizedText.length > 9) {
      return;
    }

    const formattedText = sanitizedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setPrice(formattedText);
    setErrors((prev) => ({ ...prev, price: null }));
  };

  const handlePropertyAgeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setPropertyAge(sanitizedText);
    setErrors((prev) => ({ ...prev, propertyAge: null }));
  };

  const handleSizeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setSize(sanitizedText);
    setErrors((prev) => ({ ...prev, size: null }));
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title.';
      valid = false;
    }

    if (!price) {
      newErrors.price = 'Please enter a price.';
      valid = false;
    }

    if (!propertyAge) {
      newErrors.propertyAge = 'Please enter a property age.';
      valid = false;
    } else if (parseInt(propertyAge) < 0 || parseInt(propertyAge) > 99) {
      newErrors.propertyAge = 'Property age must be between 0 and 99 years.';
      valid = false;
    }

    if (!size) {
      newErrors.size = 'Please enter the property size.';
      valid = false;
    } else if (parseInt(size) < 10 || parseInt(size) > 999999) {
      newErrors.size = 'Size must be between 10 and 999,999 sqm.';
      valid = false;
    }

    if (!valueDirection) {
      newErrors.direction = 'Please select a direction.';
      valid = false;
    }

    if (!valid) {
      Vibration.vibrate(50);
      setErrors(newErrors);
      return;
    }

    handleNext();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isDirectionModalVisible && <View style={styles.dimOverlay} />}
      
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ad Title</Text>
          <TextInput
            placeholder="Enter your property title here..."
            placeholderTextColor={Colors.light.black}
            style={[
              styles.textInputFullWidth,
              errors.title && styles.errorBorder,
            ]}
            value={title}
            onChangeText={handleTitleChange}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {intl.formatMessage({ id: 'requestPropertyScreen.select-price' })}
          </Text>
          <View style={[styles.priceContainer, errors.price && styles.errorBorder]}>
            <TextInput
              placeholder="2,000,000"
              placeholderTextColor={Colors.light.grey}
              style={styles.priceInput}
              keyboardType="numeric"
              value={price}
              onChangeText={handlePriceChange}
            />
            <Text style={styles.priceCurrency}>SAR</Text>
          </View>
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.halfWidthContainer}>
            <Text style={styles.label}>
              {intl.formatMessage({ id: 'requestPropertyScreen.size' })}
            </Text>
            <TextInput
              placeholder="E.g 500 sqm"
              placeholderTextColor={Colors.light.black}
              style={[
                styles.textInputHalfWidth,
                errors.size && styles.errorBorder,
              ]}
              keyboardType="numeric"
              value={size}
              onChangeText={handleSizeChange}
            />
            {errors.size && <Text style={styles.errorText}>{errors.size}</Text>}
          </View>

          <View style={styles.halfWidthContainer}>
            <Text style={styles.label}>
              {intl.formatMessage({
                id: 'addpropertyScreen.properties-type.age',
              })}
            </Text>
            <TextInput
              placeholder="E.g 10 years"
              placeholderTextColor={Colors.light.black}
              style={[
                styles.textInputHalfWidth,
                errors.propertyAge && styles.errorBorder,
              ]}
              keyboardType="numeric"
              value={propertyAge}
              onChangeText={handlePropertyAgeChange}
            />
            {errors.propertyAge && <Text style={styles.errorText}>{errors.propertyAge}</Text>}
          </View>
        </View>

        {/* Direction Field */}
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Text style={styles.directionLabel}>
            {intl.formatMessage({
              id: 'landPropertyDetailScreen.direction',
            })}
          </Text>
          <TouchableOpacity
            style={[styles.directionContainer, errors.direction && styles.errorBorder]}
            onPress={openModal}
          >
            <Text style={styles.directionText}>
              {valueDirection ? valueDirection : 'Select Direction'}
            </Text>
            <ArrowDownIcon width={20} height={20} fill="black" />
          </TouchableOpacity>
          {errors.direction && <Text style={styles.errorText}>{errors.direction}</Text>}
        </View>

        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handleSubmit}
          title={intl.formatMessage({ id: 'buttons.next' })}
          showRightIconButton={true}
        />

        {/* Direction Bottom Sheet Modal */}
        <Modal
          transparent={true}
          visible={isDirectionModalVisible}
          animationType="fade"
          onRequestClose={() => setIsDirectionModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsDirectionModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[
                  styles.modalContainer,
                  {
                    transform: [{ translateY: panY }],
                  },
                ]}
                {...panResponder.panHandlers}
              >
                <CompassDirectionModal
                  isVisible={isDirectionModalVisible}
                  onDirectionSelect={handleDirectionSelect}
                  panY={panY}
                  panResponder={panResponder}
                  onRequestClose={() => setIsDirectionModalVisible(false)}
                />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default PropertyStep2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginBottom: 5,
    fontSize: 16,
  },
  textInputFullWidth: {
    height: 50,
    borderColor: Colors.light.inputBg,
    width: '100%',
    paddingHorizontal: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  halfWidthContainer: {
    width: '48%',
  },
  textInputHalfWidth: {
    height: 50,
    borderColor: Colors.light.inputBg,
    width: '100%',
    paddingHorizontal: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
  directionLabel: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginBottom: 5,
    fontSize: 16,
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.inputBg,
    height: 50,
  },
  priceInput: {
    flex: 1,
    fontSize: 34,
    textAlign: 'center',
    color: Colors.light.black,
    fontFamily: fonts.primary.bold,
  },
  priceCurrency: {
    marginRight: 10,
    fontSize: 18,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
  },
  directionText: {
    fontSize: 16,
    color: Colors.light.black,
    fontFamily: fonts.primary.regular,
    flex: 1,
  },
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.inputBg,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height: screenHeight * 0.4, // Adjust height to 60% of the screen height
    backgroundColor: Colors.light.offWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inputBg,
  },
  modalOptionText: {
    fontSize: 18,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 0,
  },
});
