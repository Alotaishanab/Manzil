import React, {Fragment, useState, useRef} from 'react';
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
import {AreaIcon, DoubleTcIcon, ArrowDownIcon} from '@svgs';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {globalStyles} from '@globalStyles';
import {useIntl} from '@context';
import {CustomButton, TopSpace} from '@components';
import {CompassDirectionModal} from '../../../components/molecules/CompassDirectionModal';

const {height: screenHeight} = Dimensions.get('window');

const PropertyStep4 = ({
  selectedType, // assuming this replaces `propertyType`
  price,
  setPrice,
  rentDuration,
  setRentDuration,
  handleNext,
  handleBack,
}) => {
  const {intl} = useIntl();
  const [errors, setErrors] = useState({});

  const handlePriceChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (sanitizedText.length > 9) return;

    const formattedText = sanitizedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setPrice(formattedText);
    /** @ts-ignore */
    setErrors((prev) => ({...prev, price: null}));
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};

    if (!price) {
      newErrors.price = 'Please enter a price.';
      valid = false;
    }

    if (selectedType === 'rent' && !rentDuration) {
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
    if (selectedType === 'rent' && rentDuration) {
      return ` / ${rentDuration === 'semi-annual' ? '6 months' : rentDuration}`;
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {intl.formatMessage({id: 'requestPropertyScreen.select-price'})}
          </Text>
          <View
            style={[
              styles.priceContainer,
              !!errors.price && styles.errorBorder,
            ]}>
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

        {/* Rent Duration Options (if selectedType is rent) */}
        {selectedType === 'rent' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {intl.formatMessage({
                id: 'requestPropertyScreen.select-rent-duration',
              })}
            </Text>
            <View style={styles.rentDurationContainer}>
              {['monthly', 'quarterly', 'semi-annual', 'annual'].map(
                (duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.rentDurationButton,
                      rentDuration === duration && styles.rentDurationSelected,
                    ]}
                    onPress={() => setRentDuration(duration)}>
                    <Text
                      style={[
                        styles.rentDurationText,
                        rentDuration === duration &&
                          styles.rentDurationTextSelected,
                      ]}>
                      {duration === 'semi-annual'
                        ? 'Semi-Annual'
                        : duration.charAt(0).toUpperCase() + duration.slice(1)}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
            {errors.rentDuration && (
              <Text style={styles.errorText}>{errors.rentDuration}</Text>
            )}
          </View>
        )}

        {/* Submit Button */}
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handleSubmit}
          title={intl.formatMessage({id: 'buttons.next'})}
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
    paddingHorizontal: 20,
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
  priceLabel: {
    marginRight: 10,
    fontSize: 18,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.bold,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
  rentDurationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rentDurationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.light.primaryBtn,
    borderRadius: 5,
    backgroundColor: Colors.light.inputBg,
    marginRight: 5,
  },
  rentDurationSelected: {
    backgroundColor: Colors.light.primaryBtn,
  },
  rentDurationText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    textTransform: 'capitalize',
  },
  rentDurationTextSelected: {
    color: 'white',
  },
});
