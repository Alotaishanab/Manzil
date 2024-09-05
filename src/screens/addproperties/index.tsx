/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '@colors';
import { HeaderBackButtonTitle, TopSpace } from '@components';
import { fonts } from '@fonts';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import PropertyStep1 from './components/PropertyStep1';
import PropertyStep2 from './components/PropertyStep2';
import PropertyStep3 from './components/PropertyStep3';
import PropertyStep4 from './components/PropertyStep4';
import PropertyStep5 from './components/PropertyStep5';

export const AddProperties = () => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [floor, setFloor] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const { intl } = useIntl();

  const totalSteps = 5; // Update this if more steps are added

  const handleNext = () => {
    setStep((prevStep) => (prevStep < totalSteps ? prevStep + 1 : prevStep)); // Increment step by 1 to go to the next step
  };

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1)); // Decrement step by 1, ensuring it doesn't go below 1
  };

  const handlePicker = async () => {
    try {
      const res: any = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: false,
      });
      if (res?.didCancel) {
        console.log('User canceled the action');
      } else if (Array.isArray(res.assets)) {
        const selectedImages: any = res.assets.map((asset: any) => ({
          uri: asset.uri,
        }));
        setPhotos((prevPhotos: any) => [...prevPhotos, ...selectedImages]);
      } else {
        console.log('No images selected or response format is incorrect');
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const handleAddFloorPicker = async () => {
    try {
      const res: any = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });
      if (res?.didCancel) {
        console.log('User canceled the action');
      } else if (Array.isArray(res.assets)) {
        setFloor(res.assets[0]?.uri);
      } else {
        console.log('No images selected or response format is incorrect');
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <HeaderBackButtonTitle
          text={''}
          onPress={handleBack} // Ensure this triggers the handleBack function
        />
        <TopSpace top={10} />
        {/* Request Property step content starts */}
        <View style={globalStyles.rowSpaceBetween}>
          <Text style={styles.heading}>
            {intl.formatMessage({ id: 'addpropertyScreen.header' })}
          </Text>

          <View style={globalStyles.simpleRow}>
            <Text style={styles.stepText}>
              {`Step ${step} / ${totalSteps}`}
            </Text>
          </View>
        </View>

        <TopSpace top={10} />
        
        {/* Step Components */}
        {step === 1 && (
          <PropertyStep1
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
            handleNext={handleNext} // This will navigate to step 2
          />
        )}

        {step === 2 && (
          <PropertyStep2
            selectedType={selectedPropertyType}
            images={photos}
            floor={floor}
            handleAddFloorPicker={handleAddFloorPicker}
            handlePicker={handlePicker}
            handleNext={handleNext} // This will navigate to step 3
            handleBack={handleBack} // Use the handleBack function to navigate back to step 1
          />
        )}

        {step === 3 && (
          <PropertyStep3
            handleNext={handleNext} // This will navigate to step 4
            handleBack={handleBack} // Use the handleBack function to navigate back to step 2
          />
        )}

        {/* Add Step 4 Component */}
        {step === 4 && (
          <PropertyStep4
            selectedPropertyType={selectedPropertyType}
            handleNext={handleNext} // This will navigate to step 5
            handleBack={handleBack} // Use the handleBack function to navigate back to step 3
          />
        )}

        {/* Add Step 5 Component */}
{step === 5 && (
  <PropertyStep5
    selectedType={selectedPropertyType}  // Pass the selected type here
    handleNext={handleSubmit} // This will handle the final submission
    handleBack={handleBack} // Use the handleBack function to navigate back to step 4
  />
)}

        
        <TopSpace top={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: { backgroundColor: Colors.light.background, flex: 1, padding: 24 },
  heading: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 20,
  },
  stepText: {
    color: Colors.light.primaryBtn,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  propertyType: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
  },
  propertTypeCard: {
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 5,
    borderColor: Colors.light.greyDescription,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
