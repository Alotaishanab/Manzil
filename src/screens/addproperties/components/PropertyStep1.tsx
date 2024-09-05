import React, { useState, useRef } from 'react';
import { useIntl } from '@context';
import { CustomButton, TopSpace, PropertyTypeModal } from '@components';
import { CustomCheckbox } from '../../../components/atoms/CustomCheckbox';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Vibration,
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
  handleNext,
}: any) => {
  const { intl } = useIntl();
  const { allPropertyType } = useAddPropertiesProps();
  const [propertyType, setPropertyType] = useState(
    intl.formatMessage({ id: 'addpropertyScreen.sell' })
  );
  const [isPropertyTypeModalVisible, setIsPropertyTypeModalVisible] = useState(false);
  const [errors, setErrors] = useState({}); // Track validation errors

  const panY = useRef(new Animated.Value(screenHeight)).current;

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
    setErrors((prev) => ({ ...prev, propertyType: null })); // Clear error when a valid selection is made
    handleClosePropertyTypeModal();
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};

    if (!selectedPropertyType) {
      newErrors.propertyType = 'Please select a property type.';
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
      <Text style={styles.wantText}>
        {intl.formatMessage({ id: 'addpropertyScreen.want-to' })}
      </Text>
      <TopSpace top={10} />
      
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
      <TopSpace top={10} />

      {/* Property Type Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.propertyTypeLabel}>
          {intl.formatMessage({ id: 'landPropertyDetailScreen.property-type' })}
        </Text>
        <TouchableOpacity
          style={[
            styles.propertyTypeContainer,
            errors.propertyType && styles.errorBorder, // Apply error border if there's an error
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

      <TopSpace top={250} />

      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleSubmit} // Use handleSubmit for validation
        title={intl.formatMessage({ id: 'buttons.next' })}
        showRightIconButton={true}
      />

      {/* Property Type Modal */}
      <PropertyTypeModal
        isVisible={isPropertyTypeModalVisible}
        onRequestClose={handleClosePropertyTypeModal}
        handleClick={handlePropertyTypeSelect} // Pass the correct prop for handling click
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
    fontFamily: fonts.primary.regular,
  },
  propertyTypeLabel: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginBottom: 5,
    fontSize: 16,
    marginTop: 30,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
