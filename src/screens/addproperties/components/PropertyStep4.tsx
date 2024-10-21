import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Dimensions,
} from 'react-native';
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { useIntl } from '@context';
import { CustomButton, TopSpace } from '@components';

const { height: screenHeight } = Dimensions.get('window');

const PropertyStep4 = ({
  propertyType,
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  rentDuration,
  setRentDuration,
  handleNext,
}) => {
  const { intl } = useIntl();
  const [errors, setErrors] = useState({});

  const handlePriceChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (sanitizedText.length > 9) return;

    const formattedText = sanitizedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setPrice(formattedText);
    setErrors((prev) => ({ ...prev, price: null }));
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title.';
      valid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Please describe the property.';
      valid = false;
    }

    if (!price) {
      newErrors.price = 'Please enter a price.';
      valid = false;
    }

    if (propertyType === 'Rent' && !rentDuration) {
      newErrors.rentDuration = 'Please select a rent duration.';
      valid = false;
    }

    if (!valid) {
      Vibration.vibrate(50);
      setErrors(newErrors);
      return;
    }

    handleNext();
  };

  const renderPriceLabel = () => {
    if (propertyType === 'Rent' && rentDuration) {
      return ` / ${rentDuration === 'semi-annual' ? '6 months' : rentDuration}`;
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Ad Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ad Title</Text>
          <TextInput
            placeholder="Enter your property title here..."
            placeholderTextColor={Colors.light.black}
            style={[
              styles.textInputFullWidth,
              !!errors.title && styles.errorBorder,
            ]}
            value={title}
            onChangeText={setTitle}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <TopSpace top={20} />

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {intl.formatMessage({ id: 'requestPropertyScreen.select-price' })}
          </Text>
          <View style={[styles.priceContainer, !!errors.price && styles.errorBorder]}>
            <TextInput
              placeholder="2,000,000"
              placeholderTextColor={Colors.light.grey}
              style={styles.priceInput}
              keyboardType="numeric"
              value={price}
              onChangeText={handlePriceChange}
            />
            <Text style={styles.priceLabel}>SAR{renderPriceLabel()}</Text>
          </View>
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        </View>

        <TopSpace top={20} />

        {/* Rent Duration Options (only show for 'rent' property type) */}
        {propertyType === 'Rent' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {intl.formatMessage({
                id: 'requestPropertyScreen.select-rent-duration',
              })}
            </Text>
            <View style={styles.rentDurationContainer}>
              {['monthly', 'quarterly', 'semi-annual', 'annual'].map((duration) => (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.rentDurationButton,
                    rentDuration === duration && styles.rentDurationSelected,
                  ]}
                  onPress={() => setRentDuration(duration)}
                >
                  <Text
                    style={[
                      styles.rentDurationText,
                      rentDuration === duration && styles.rentDurationTextSelected,
                    ]}
                  >
                    {duration === 'semi-annual'
                      ? 'Semi-Annual'
                      : duration.charAt(0).toUpperCase() + duration.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.rentDuration && (
              <Text style={styles.errorText}>{errors.rentDuration}</Text>
            )}
          </View>
        )}

        <TopSpace top={20} />

        {/* Description Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Property Description</Text>
          <TextInput
            style={[
              styles.descriptionInput,
              !!errors.description && styles.errorBorder,
            ]}
            placeholder="Enter a brief description of the property"
            placeholderTextColor={Colors.light.black}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>

        <TopSpace top={20} />

        {/* Submit Button */}
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handleSubmit}
          title={intl.formatMessage({ id: 'buttons.next' })}
          showRightIconButton={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default PropertyStep4;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0, // Add some horizontal padding
  },
  inputContainer: {
    marginBottom: 20, // Ensure uniform spacing between input fields
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
  descriptionInput: {
    height: 150,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.inputBg,
    height: 50,
    paddingHorizontal: 10, // Add padding for better spacing
  },
  priceInput: {
    flex: 1,
    fontSize: 34,
    textAlign: 'center',
    color: Colors.light.black,
    fontFamily: fonts.primary.bold,
  },
  priceLabel: {
    marginLeft: 10,
    fontSize: 18,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  rentDurationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rentDurationButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.light.primaryBtn,
    borderRadius: 5,
    backgroundColor: Colors.light.inputBg,
    marginHorizontal: 5, // Add margin between buttons
  },
  rentDurationSelected: {
    backgroundColor: Colors.light.primaryBtn,
  },
  rentDurationText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    textAlign: 'center', // Center text in the button
  },
  rentDurationTextSelected: {
    color: 'white',
  },
});
