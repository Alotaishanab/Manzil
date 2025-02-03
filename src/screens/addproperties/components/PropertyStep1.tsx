import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Vibration,
  TextInput,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useIntl } from '@context';
import {
  CustomButton,
  TopSpace,
  PropertyTypeModal,
  FullScreenMap,
  CustomCheckbox,
  CustomMap,
} from '@components';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { ArrowDownIcon } from '@svgs';
import HapticFeedback from 'react-native-haptic-feedback';

const { width: screenWidth } = Dimensions.get('window');

interface PropertyStep1Props {
  selectedPropertyType: string;
  setSelectedPropertyType: (type: string) => void;
  size: string;
  markerPosition: any;
  setMarkerPosition: (pos: any) => void;
  setSize: (size: string) => void;
  propertyAge: string;
  setPropertyAge: (age: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  handleNext: () => void;
}

const SWIPE_THRESHOLD = 100;

const PropertyStep1: React.FC<PropertyStep1Props> = ({
  selectedPropertyType,
  setSelectedPropertyType,
  size,
  markerPosition,
  setMarkerPosition,
  setSize,
  propertyAge,
  setPropertyAge,
  propertyType,
  setPropertyType,
  handleNext,
}) => {
  const { intl } = useIntl();
  const [isPropertyTypeModalVisible, setIsPropertyTypeModalVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [mapType] = useState<string>('standard');
  const [mapVisible, setMapVisible] = useState(false);

  // Animated value for horizontal swiping on the step screen
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      // Only capture horizontal gestures when no modal is open
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (isPropertyTypeModalVisible || mapVisible) return false;
        return (
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 10
        );
      },
      onPanResponderMove: (_, gestureState) => {
        pan.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SWIPE_THRESHOLD) {
          HapticFeedback.trigger('impactMedium');
          handleSubmit();
        }
        // Reset with a quick, smooth spring
        Animated.spring(pan, {
          toValue: 0,
          tension: 120, // Higher tension for a quicker snap
          friction: 8,  // Lower friction for smoothness
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const handleOpenPropertyTypeModal = () => {
    setIsPropertyTypeModalVisible(true);
  };

  const handleClosePropertyTypeModal = () => {
    setIsPropertyTypeModalVisible(false);
  };

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    setErrors(prev => ({ ...prev, propertyType: null }));
    handleClosePropertyTypeModal();
  };

  const handleSizeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setSize(sanitizedText);
    setErrors(prev => ({ ...prev, size: null }));
  };

  const handlePropertyAgeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setPropertyAge(sanitizedText);
    setErrors(prev => ({ ...prev, propertyAge: null }));
  };

  const handleLocationSelect = (location: any) => {
    setMarkerPosition(location);
    setMapVisible(false);
    setErrors(prev => ({ ...prev, markerPosition: null }));
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
    if (!markerPosition) {
      newErrors.markerPosition = 'Please select a location on the map.';
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
    <View style={styles.container} {...panResponder.panHandlers}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Property Type</Text>
        <Text style={styles.screenExplanation}>
          Provide the details of your property below. This will help us create a tailored listing.
        </Text>
      </View>

      <TopSpace top={20} />

      {/* Sell / Rent options */}
      <View style={styles.propertyTypeRow}>
        <CustomCheckbox
          title={intl.formatMessage({ id: 'addpropertyScreen.sell', defaultMessage: 'Sell' })}
          selectedOption={propertyType}
          onValueChange={(value) => {
            HapticFeedback.trigger('selection');
            setPropertyType(value);
          }}
          containerStyle={styles.checkboxContainer}
          labelStyle={styles.checkboxLabel}
        />
        <CustomCheckbox
          title={intl.formatMessage({ id: 'addpropertyScreen.rent', defaultDefault: 'Rent' })}
          selectedOption={propertyType}
          onValueChange={(value) => {
            HapticFeedback.trigger('selection');
            setPropertyType(value);
          }}
          containerStyle={styles.checkboxContainer}
          labelStyle={styles.checkboxLabel}
        />
      </View>

      <TopSpace top={20} />

      {/* Property Type Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {intl.formatMessage({ id: 'landPropertyDetailScreen.property-type', defaultMessage: 'Property Type' })}
        </Text>
        <Text style={styles.fieldExplanation}>
          Choose the type that best describes your property.
        </Text>
        <TouchableOpacity
          style={[styles.dropdown, errors.propertyType && styles.errorBorder]}
          onPress={handleOpenPropertyTypeModal}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownText}>
            {selectedPropertyType ? selectedPropertyType : 'Select Property Type'}
          </Text>
          <ArrowDownIcon width={16} height={16} fill={Colors.primary} />
        </TouchableOpacity>
        {errors.propertyType && <Text style={styles.errorText}>{errors.propertyType}</Text>}
      </View>

      {/* Size and Age Fields */}
      <View style={styles.rowContainer}>
        <View style={styles.halfField}>
          <Text style={styles.label}>
            {intl.formatMessage({ id: 'addpropertyScreen.size', defaultMessage: 'Size' })}
          </Text>
          <Text style={styles.fieldExplanation}>Enter the size in square feet.</Text>
          <View style={[styles.inputWithSuffix, errors.size && styles.errorBorder]}>
            <TextInput
              placeholder="e.g. 1500"
              placeholderTextColor={Colors.placeholder}
              style={[styles.textInput, { flex: 1 }]}
              keyboardType="numeric"
              value={size}
              onChangeText={handleSizeChange}
            />
            <Text style={styles.suffixText}>m²</Text>
          </View>
          {errors.size && <Text style={styles.errorText}>{errors.size}</Text>}
        </View>

        <View style={styles.halfField}>
          <Text style={styles.label}>
            {intl.formatMessage({ id: 'addpropertyScreen.propertyAge', defaultMessage: 'Property Age' })}
          </Text>
          <Text style={styles.fieldExplanation}>Enter the age of the property (in years).</Text>
          <View style={[styles.inputWithSuffix, errors.propertyAge && styles.errorBorder]}>
            <TextInput
              placeholder="e.g. 10"
              placeholderTextColor={Colors.placeholder}
              style={[styles.textInput, { flex: 1 }]}
              keyboardType="numeric"
              value={propertyAge}
              onChangeText={handlePropertyAgeChange}
            />
            <Text style={styles.suffixText}>years</Text>
          </View>
          {errors.propertyAge && <Text style={styles.errorText}>{errors.propertyAge}</Text>}
        </View>
      </View>

      <TopSpace top={10} />

      {/* Map / Address Selection */}
      <Text style={styles.label}>Address</Text>
      <Text style={styles.fieldExplanation}>
        Tap the map below to select your property’s location.
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setMapVisible(true)}
        style={[styles.mapContainer, errors.markerPosition && styles.errorBorder]}
      >
        <CustomMap
          height={250}
          showHome={true}
          showMaximizeScreen={true}
          isAbsoluteFill={false}
          mapType={mapType}
          markerPosition={markerPosition}
        />
      </TouchableOpacity>
      {errors.markerPosition && <Text style={styles.errorText}>{errors.markerPosition}</Text>}

      <TopSpace top={20} />

      <CustomButton
        btnWidth="100%"
        borderRadius={30}
        disabled={false}
        handleClick={handleSubmit}
        title={intl.formatMessage({ id: 'buttons.next', defaultMessage: 'Next' })}
        showRightIconButton={true}
      />

      <PropertyTypeModal
        isVisible={isPropertyTypeModalVisible}
        onRequestClose={handleClosePropertyTypeModal}
        handleClick={handlePropertyTypeSelect}
      />

      <FullScreenMap
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        onLocationSelect={handleLocationSelect}
      />
    </View>
  );
};

export default PropertyStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'flex-start',
  },
  screenTitle: {
    fontSize: 26,
    fontFamily: fonts.primary.bold,
    color: Colors.darkText || '#000',
  },
  screenExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.textSecondary || '#555',
    marginTop: 5,
  },
  propertyTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  checkboxContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  checkboxLabel: {
    fontFamily: fonts.primary.medium,
    fontSize: 14,
    color: Colors.darkText || '#000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.darkText || '#000',
    marginBottom: 8,
  },
  fieldExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.textSecondary || '#555',
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
    height: 50,
    paddingHorizontal: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.darkText || '#000',
    fontFamily: fonts.primary.regular,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfField: {
    width: '48%',
  },
  inputWithSuffix: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
    height: 50,
    paddingHorizontal: 20,
  },
  textInput: {
    height: '100%',
    color: Colors.darkText || '#000',
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
  suffixText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.darkText || '#000',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
    fontFamily: fonts.primary.regular,
  },
  errorBorder: {
    borderColor: '#FF3B30',
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
