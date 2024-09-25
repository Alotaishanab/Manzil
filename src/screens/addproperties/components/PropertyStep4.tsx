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

const PropertyStep4 = 
({ selectedType,
  price,
  setPrice,
  handleNext,
  handleBack
   }: any) => {
  const { intl } = useIntl();
  const [errors, setErrors] = useState({});

  const handlePriceChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (sanitizedText.length > 9) {
      return;
    }

    const formattedText = sanitizedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setPrice(formattedText);
    setErrors((prev) => ({ ...prev, price: null }));
  };


  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};


    if (!price) {
      newErrors.price = 'Please enter a price.';
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
      <View style={styles.container}>
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
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 0,
  },
});

