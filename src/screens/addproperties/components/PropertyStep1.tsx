import React, { useRef, useState } from 'react';
import { useIntl } from '@context';
import { CustomButton, TopSpace, PropertyTypeModal, CompassDirectionModal } from '@components';
import { CustomCheckbox } from '../../../components/atoms/CustomCheckbox';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Vibration,
  TextInput,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import { globalStyles } from '@globalStyles';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { ArrowDownIcon } from '@svgs';
import { useAddPropertiesProps } from '../useAddPropertiesProps';

const { height: screenHeight } = Dimensions.get('window');

const PropertyStep1 = ({
  selectedPropertyType,
  setSelectedPropertyType,
  size,
  setSize,
  propertyAge,
  setPropertyAge,
  propertyType,
  setPropertyType, 
  handleNext,
}: any) => {
  const { intl } = useIntl();
  const { allPropertyType } = useAddPropertiesProps();
  const [isPropertyTypeModalVisible, setIsPropertyTypeModalVisible] = useState(false);
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

  const handleOpenPropertyTypeModal = () => {
    setIsPropertyTypeModalVisible(true);
    Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClosePropertyTypeModal = () => {
    Animated.timing(panY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsPropertyTypeModalVisible(false));
  };

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    setErrors((prev) => ({ ...prev, propertyType: null }));
    handleClosePropertyTypeModal();
  };

  const handleTitleChange = (text: string) => {
    if (/[^a-zA-Z\s]/.test(text)) {
      setErrors((prev) => ({ ...prev, title: 'Title should not contain numbers or special characters.' }));
      return;
    }
    setTitle(text.slice(0, 50));
    setErrors((prev) => ({ ...prev, title: null }));
  };

  const handleSizeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setSize(sanitizedText);
    setErrors((prev) => ({ ...prev, size: null }));
  };

  const handlePropertyAgeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setPropertyAge(sanitizedText);
    setErrors((prev) => ({ ...prev, propertyAge: null }));
  };



  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};

    if (!selectedPropertyType) {
      newErrors.propertyType = 'Please select a property type.';
      valid = false;
    }


    if (!size) {
      newErrors.size = 'Please enter the property size.';
      valid = false;
    }

    if (!propertyAge) {
      newErrors.propertyAge = 'Please enter the property age.';
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
    <View style={{ flexGrow: 1 }}>
      <TopSpace top={20} />
      <Text style={styles.label}>Select</Text>
      {/* Sell Rent */}
      <View style={globalStyles.simpleRow}>
        <CustomCheckbox
          title={intl.formatMessage({ id: 'addpropertyScreen.sell' })}
          selectedOption={propertyType}
          onValueChange={setPropertyType}
        />
        <CustomCheckbox
          title={intl.formatMessage({ id: 'addpropertyScreen.rent' })}
          selectedOption={propertyType}
          onValueChange={setPropertyType}
        />
      </View>

      <TopSpace top={30} />

     

      {/* Property Type Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.propertyTypeLabel}>
          {intl.formatMessage({ id: 'landPropertyDetailScreen.property-type' })}
        </Text>
        <TouchableOpacity
          style={[
            styles.propertyTypeContainer,
            errors.propertyType && styles.errorBorder,
          ]}
          onPress={handleOpenPropertyTypeModal}
        >
          <Text style={styles.propertyTypeText}>
            {selectedPropertyType ? selectedPropertyType : 'Select Property Type'}
          </Text>
          <ArrowDownIcon width={20} height={20} fill="black" />
        </TouchableOpacity>
        {errors.propertyType && <Text style={styles.errorText}>{errors.propertyType}</Text>}
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.halfWidthContainer}>
          <Text style={styles.label}>
            {intl.formatMessage({ id: 'addpropertyScreen.size' })}
          </Text>
          <TextInput
            placeholder="Property size..."
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
            {intl.formatMessage({ id: 'addpropertyScreen.propertyAge' })}
          </Text>
          <TextInput
            placeholder="Property Age..."
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


      <TopSpace top={20} />

      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleSubmit}
        title={intl.formatMessage({ id: 'buttons.next' })}
        showRightIconButton={true}
      />

      <PropertyTypeModal
        isVisible={isPropertyTypeModalVisible}
        onRequestClose={handleClosePropertyTypeModal}
        handleClick={handlePropertyTypeSelect}
        panY={panY}
      />

    </View>
  );
};

export default PropertyStep1;

const styles = StyleSheet.create({
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 17,
    fontFamily: fonts.primary.medium,
  },
  propertyTypeLabel: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginBottom: 5,
    fontSize: 16,
  },
  propertyTypeText: {
    fontSize: 16,
    color: Colors.light.black,
    fontFamily: fonts.primary.regular,
    flex: 1,
  },
  propertyTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.inputBg,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  halfWidthContainer: {
    width: '48%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
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
    fontSize: 16,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    justifyContent: 'center',
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
    fontSize: 16,
  },
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height: screenHeight * 0.4,
    backgroundColor: Colors.light.offWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
});
