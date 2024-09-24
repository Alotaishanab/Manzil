import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Vibration,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '@colors';
import { AddPropertyBack, TopSpace } from '@components';
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
  const [selectedPropertyType, setSelectedPropertyType] = useState('House'); 
  const [title, setTitle] = useState('awdawdaw');
  const [description, setDescription] = useState('dwadawdawdawd'); 
  const [size, setSize] = useState('333');
  const [propertyAge, setPropertyAge] = useState('3');
  const [propertyType, setPropertyType] = useState('');
  const [direction, setDirection] = useState('');  
  const [errors, setErrors] = useState({}); // Error state for validation
  
  // New state variables for property fields
  const [beds, setBeds] = useState(null);
  const [baths, setBaths] = useState(null);
  const [floors, setFloors] = useState(null);
  const [livingRooms, setLivingRooms] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [numberOfStreets, setNumberOfStreets] = useState(1);
  const [footTraffic, setFootTraffic] = useState('Medium');
  const [floorNumber, setFloorNumber] = useState(1);
  const [numberOfGates, setNumberOfGates] = useState(1);
  const [loadingDocks, setLoadingDocks] = useState(1);
  const [storageCapacity, setStorageCapacity] = useState(100);
  const [numberOfUnits, setNumberOfUnits] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(1);

  const { intl } = useIntl();

  const totalSteps = 5;

  const handleNext = () => {
    setStep((prevStep) => (prevStep < totalSteps ? prevStep + 1 : prevStep));
  };

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
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

  const handleSubmit = () => {
    let valid = true;
    const newErrors = {};

    if (!selectedPropertyType) {
      newErrors.propertyType = 'Please select a property type.';
      valid = false;
    }

    if (!title.trim()) {
      newErrors.title = 'Please enter a title.';
      valid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Please describe the property.';
      valid = false;
    }

    // Dynamic validation based on selectedPropertyType
    switch (selectedPropertyType) {
      case 'House':
        if (!beds || beds <= 0) {
          newErrors.beds = 'Please select the number of beds.';
          valid = false;
        }
        if (!baths || baths <= 0) {
          newErrors.baths = 'Please select the number of baths.';
          valid = false;
        }
        if (!floors || floors <= 0) {
          newErrors.floors = 'Please select the number of floors.';
          valid = false;
        }
        if (!livingRooms || livingRooms <= 0) {
          newErrors.livingRooms = 'Please select the number of living rooms.';
          valid = false;
        }
        break;

      // Add cases for other property types with their specific validations...
      // Similar to the 'House' case, add the validations for other types
      
      default:
        break;
    }

    if (!valid) {
      Vibration.vibrate(50);
      setErrors(newErrors);
      return;
    }

    handleNext();
  };

  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <AddPropertyBack
          text={"Add Properties"}
          onPress={handleBack}
        />
        <TopSpace top={10} />
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
            title={title}
            setTitle={setTitle}
            size={size}
            setSize={setSize}
            propertyAge={propertyAge}
            setPropertyAge={setPropertyAge}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            direction={direction}
            setDirection={setDirection}
            handleNext={handleNext}
          />
        )}

        {step === 2 && (
          <PropertyStep2
            selectedPropertyType={selectedPropertyType}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            beds={beds}
            setBeds={setBeds}
            baths={baths}
            setBaths={setBaths}
            floors={floors}
            setFloors={setFloors}
            livingRooms={livingRooms}
            setLivingRooms={setLivingRooms}
            rooms={rooms}
            setRooms={setRooms}
            numberOfStreets={numberOfStreets}
            setNumberOfStreets={setNumberOfStreets}
            direction={direction}
            setDirection={setDirection}
            footTraffic={footTraffic}
            setFootTraffic={setFootTraffic}
            floorNumber={floorNumber}
            setFloorNumber={setFloorNumber}
            numberOfGates={numberOfGates}
            setNumberOfGates={setNumberOfGates}
            loadingDocks={loadingDocks}
            setLoadingDocks={setLoadingDocks}
            storageCapacity={storageCapacity}
            setStorageCapacity={setStorageCapacity}
            numberOfUnits={numberOfUnits}
            setNumberOfUnits={setNumberOfUnits}
            parkingSpaces={parkingSpaces}
            setParkingSpaces={setParkingSpaces}
            errors={errors}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 3 && (
          <PropertyStep3
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 4 && (
          <PropertyStep4
            selectedPropertyType={selectedPropertyType}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 5 && (
          <PropertyStep5
            selectedPropertyType={selectedPropertyType}
            handleNext={handleSubmit}
            handleBack={handleBack}
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

export default AddProperties;
