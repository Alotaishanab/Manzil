import React, {useRef, useState} from 'react';
import {useIntl} from '@context';
import {
  CustomButton,
  TopSpace,
  PropertyTypeModal,
  CustomMap,
  FullScreenMap,
  CustomCheckbox,
} from '@components';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Vibration,
  TextInput,
  Dimensions,
  PanResponder,
} from 'react-native';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {ArrowDownIcon} from '@svgs';
import HapticFeedback from 'react-native-haptic-feedback'; // Import the Haptic Feedback library


const {height: screenHeight} = Dimensions.get('window');

const PropertyStep1 = ({
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
  const {intl} = useIntl();
  const [isPropertyTypeModalVisible, setIsPropertyTypeModalVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // New map state and handlers
  const [mapType, setMapType] = useState<string>('standard');
  const [mapVisible, setMapVisible] = useState(false);
  

  const handleOpenPropertyTypeModal = () => {
    setIsPropertyTypeModalVisible(true);
  };

  const handleClosePropertyTypeModal = () => {
    setIsPropertyTypeModalVisible(false);
  };

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    setErrors(prev => ({...prev, propertyType: null}));
    handleClosePropertyTypeModal();
  };

  const handleSizeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setSize(sanitizedText);
    setErrors(prev => ({...prev, size: null}));
  };

  const handlePropertyAgeChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setPropertyAge(sanitizedText);
    setErrors(prev => ({...prev, propertyAge: null}));
  };

  const handleLocationSelect = location => {
    setMarkerPosition(location); // Update the marker position for both maps
    setMapVisible(false); // Close full-screen map after selection
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
    <View style={{flexGrow: 1}}>
      <TopSpace top={10} />
      <Text style={styles.label}>Select</Text>

      {/* Sell Rent */}
<View style={[styles.propertyTypeContainer, { justifyContent: 'flex-start', paddingHorizontal: 10 }]}>
  <CustomCheckbox
    title={intl.formatMessage({ id: 'addpropertyScreen.sell' })}
    selectedOption={propertyType}
    onValueChange={(value) => {
      HapticFeedback.trigger('selection'); // Trigger haptic feedback
      setPropertyType(value);
    }}
  />
  <CustomCheckbox
    title={intl.formatMessage({ id: 'addpropertyScreen.rent' })}
    selectedOption={propertyType}
    onValueChange={(value) => {
      HapticFeedback.trigger('selection'); // Trigger haptic feedback
      setPropertyType(value);
    }}
  />
</View>


      <TopSpace top={20} />

      {/* Property Type Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.propertyTypeLabel}>
          {intl.formatMessage({id: 'landPropertyDetailScreen.property-type'})}
        </Text>
        <TouchableOpacity
          style={[
            styles.propertyTypeContainer,
            !!errors.propertyType && styles.errorBorder,
          ]}
          onPress={handleOpenPropertyTypeModal}>
          <Text style={styles.propertyTypeText}>
            {selectedPropertyType
              ? selectedPropertyType
              : 'Select Property Type'}
          </Text>
          <ArrowDownIcon width={16} height={16} fill="black" />
        </TouchableOpacity>
        {errors.propertyType && (
          <Text style={styles.errorText}>{errors.propertyType}</Text>
        )}
      </View>

      {/* Size and Property Age Fields */}
      <View style={styles.rowContainer}>
        <View style={styles.halfWidthContainer}>
          <Text style={styles.label}>
            {intl.formatMessage({id: 'addpropertyScreen.size'})}
          </Text>
          <TextInput
            placeholder="Property size..."
            placeholderTextColor={Colors.light.black}
            style={[
              styles.textInputHalfWidth,
              !!errors.size && styles.errorBorder,
            ]}
            keyboardType="numeric"
            value={size}
            onChangeText={handleSizeChange}
          />
          {errors.size && <Text style={styles.errorText}>{errors.size}</Text>}
        </View>

        <View style={styles.halfWidthContainer}>
          <Text style={styles.label}>
            {intl.formatMessage({id: 'addpropertyScreen.propertyAge'})}
          </Text>
          <TextInput
            placeholder="Property Age..."
            placeholderTextColor={Colors.light.black}
            style={[
              styles.textInputHalfWidth,
              !!errors.propertyAge && styles.errorBorder,
            ]}
            keyboardType="numeric"
            value={propertyAge}
            onChangeText={handlePropertyAgeChange}
          />
          {errors.propertyAge && (
            <Text style={styles.errorText}>{errors.propertyAge}</Text>
          )}
        </View>
      </View>

      <TopSpace top={10} />

      {/* Address and Map */}
      <Text style={styles.label}>Address</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setMapVisible(true)} // Open full-screen map on press
        style={[
          styles.mapContainer,
          errors.markerPosition && styles.errorBorder, // Apply red border if there's an error
        ]}>
        <CustomMap
          height={250} // Reduced height for compactness
          showHome={true}
          showMaximizeScreen={true}
          isAbsoluteFill={false}
          mapType={mapType}
          markerPosition={markerPosition} // Pass the selected marker position
          setMapVisible={setMapVisible} // Pass setMapVisible to handle full-screen button
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
        
      </TouchableOpacity>
      {errors.markerPosition && (
        <Text style={styles.errorText}>{errors.markerPosition}</Text>
      )}

      <TopSpace top={20} />

      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleSubmit}
        title={intl.formatMessage({id: 'buttons.next'})}
        showRightIconButton={true}
      />

      <PropertyTypeModal
        isVisible={isPropertyTypeModalVisible}
        onRequestClose={handleClosePropertyTypeModal}
        handleClick={handlePropertyTypeSelect}
      />

      {/* Full-Screen Map for selecting location */}
      <FullScreenMap
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        onLocationSelect={handleLocationSelect} // Update marker in CustomMap when location is selected
      />
    </View>
  );
};

export default PropertyStep1;

const styles = StyleSheet.create({
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 16, // Reduced font size
    fontFamily: fonts.primary.medium,
  },
  propertyTypeLabel: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginBottom: 5,
    fontSize: 14, // Reduced font size
  },
  propertyTypeText: {
    fontSize: 14, // Reduced font size
    color: Colors.light.black,
    fontFamily: fonts.primary.regular,
    flex: 1,
  },
  propertyTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 8, // Reduced border radius
    backgroundColor: Colors.light.inputBg,
    height: 45, // Reduced height
    paddingHorizontal: 15, // Reduced padding
    justifyContent: 'space-between',
    marginTop: 10, // Reduced margin top
  },
  inputContainer: {
    marginBottom: 20, // Reduced margin bottom
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Reduced margin bottom
  },
  halfWidthContainer: {
    width: '48%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 3, // Reduced margin top
  },
  errorBorder: {
    borderColor: 'red',
  },
  label: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginBottom: 5,
    fontSize: 14, // Reduced font size
  },
  textInputHalfWidth: {
    height: 45, // Reduced height
    borderColor: Colors.light.inputBg,
    width: '100%',
    paddingHorizontal: 15, // Reduced padding
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 8, // Reduced border radius
    fontSize: 14, // Reduced font size
  },
});
