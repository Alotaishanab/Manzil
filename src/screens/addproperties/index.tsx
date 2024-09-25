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
import {useNavigation} from '@react-navigation/native';
import { AddPropertyBack, TopSpace } from '@components';
import { fonts } from '@fonts';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import PropertyStep1 from './components/PropertyStep1';
import PropertyStep2 from './components/PropertyStep2';
import PropertyStep3 from './components/PropertyStep3';
import PropertyStep4 from './components/PropertyStep4';
import PropertyStep5 from './components/PropertyStep5';
import PropertyStep6 from './components/PropertyStep6';
import axios from 'axios';  // Make sure axios is installed


export const AddProperties = () => {
  const navigation: any = useNavigation();

  const [step, setStep] = useState(1);
  const [floor, setFloor] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('House');
  const [title, setTitle] = useState('awdawdaw');
  const [price, setPrice] = useState('4444');
  const [description, setDescription] = useState('dwadawdawdawd');
  const [size, setSize] = useState('333');
  const [propertyAge, setPropertyAge] = useState('3');
  const [propertyType, setPropertyType] = useState('Sell');
  const [direction, setDirection] = useState('');
  const [errors, setErrors] = useState({}); // Error state for validation

  // Step 2 fields
  const [beds, setBeds] = useState<number>(1);
  const [baths, setBaths] = useState<number>(1);
  const [floors, setFloors] = useState<number>(1);
  const [livingRooms, setLivingRooms] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
  const [numberOfStreets, setNumberOfStreets] = useState<number>(1);
  const [footTraffic, setFootTraffic] = useState<string>('Medium');
  const [proximity, setProximity] = useState<string>('Near Main Road'); // Added for Shop
  const [floorNumber, setFloorNumber] = useState<number>(1);
  const [numberOfGates, setNumberOfGates] = useState<number>(1);
  const [loadingDocks, setLoadingDocks] = useState<number>(1);
  const [storageCapacity, setStorageCapacity] = useState<number>(100);
  const [numberOfUnits, setNumberOfUnits] = useState<number>(1);
  const [parkingSpaces, setParkingSpaces] = useState<number>(1);

  // Step 3
  const [waterAccess, setWaterAccess] = useState('Yes');
  const [electricityAccess, setElectricityAccess] = useState('Yes');
  const [sewageSystem, setSewageSystem] = useState('Yes');

  // Step 5
  const [floorPlan, setFloorPlan] = useState('');
  const [media, setMedia] = useState([]);
  const [selectedPropertyFeatures, setSelectedPropertyFeatures] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null); // Coordinates

  // Step 6
  const [ownershipType, setOwnershipType] = useState('independent');
  const [selectedDOBs, setSelectedDOBs] = useState({
    independent: '',
    multipleOwners: '',
    agency: '',
  });

  const [independentFields, setIndependentFields] = useState({
    instrumentNumber: '',
    ownerIDNumber: '',
  });

  const [multipleOwnersFields, setMultipleOwnersFields] = useState({
    instrumentNumber: '',
    ownerIDNumber: '',
    agencyNumber: '',
  });

  const [agencyFields, setAgencyFields] = useState({
    instrumentNumber: '',
    commercialRegNumber: '',
    agentIDNumber: '',
    agencyNumber: '',
  });


  const { intl } = useIntl();

  const totalSteps = 6;

  const handleNext = () => {
    setStep((prevStep) => (prevStep < totalSteps ? prevStep + 1 : prevStep));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    } else {
      // Navigating to a screen inside the tab navigator
      navigation.navigate('BottomTabNavigator', {
        screen: 'CenterScreen',
      });
    }
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

  const submitProperty = async () => {
    try {
      // Initialize the common data that applies to all property types
      let propertyData = {
        selectedPropertyType,
        title,
        price,
        description,
        size,
        propertyAge,
        propertyType, // Sell or Rent
        direction,
        floor,
        waterAccess,
        electricityAccess,
        sewageSystem,
        media,
        floorPlan,
        selectedPropertyFeatures,
        markerPosition,
        ownershipType,
      };
  
      // Conditional logic based on the property type
      switch (selectedPropertyType) {
        case 'House':
          propertyData = {
            ...propertyData,
            beds,
            baths,
            floors,
            livingRooms,
            direction,
          };
          break;
  
        case 'Appartment':
          propertyData = {
            ...propertyData,
            rooms,
            baths,
            floorNumber,
            livingRooms,
            floors,
            direction,
          };
          break;
  
        case 'Workers Residence':
          propertyData = {
            ...propertyData,
            beds,
            baths,
            direction,
          };
          break;
  
        case 'Land':
          propertyData = {
            ...propertyData,
            direction,
            numberOfStreets,
          };
          break;
  
        case 'Farmhouse':
          propertyData = {
            ...propertyData,
            beds,
            baths,
            livingRooms,
            direction,
          };
          break;
  
        case 'Shop':
          propertyData = {
            ...propertyData,
            footTraffic,
            proximity, // Assuming proximity is available in the state
          };
          break;
  
        case 'Chalet':
          propertyData = {
            ...propertyData,
            beds,
            baths,
            livingRooms,
            direction,
          };
          break;
  
        case 'Office':
          propertyData = {
            ...propertyData,
            floors,
            parkingSpaces,
            direction,
          };
          break;
  
        case 'Warehouse':
          propertyData = {
            ...propertyData,
            numberOfGates,
            loadingDocks,
            storageCapacity,
          };
          break;
  
        case 'Tower':
          propertyData = {
            ...propertyData,
            rooms,
            baths,
            numberOfUnits,
            floors,
            direction,
          };
          break;
  
        default:
          throw new Error('Invalid property type selected');
      }
  
      // Handle ownership-specific fields based on the ownership type
      if (ownershipType === 'Independent') {
        propertyData.ownership = {
          instrumentNumber: independentFields.instrumentNumber,
          ownerIDNumber: independentFields.ownerIDNumber,
          ownerDOB: selectedDOBs.independent,
        };
      } else if (ownershipType === 'Multiple Owners') {
        propertyData.ownership = {
          instrumentNumber: multipleOwnersFields.instrumentNumber,
          ownerIDNumber: multipleOwnersFields.ownerIDNumber,
          agencyNumber: multipleOwnersFields.agencyNumber,
          ownerDOB: selectedDOBs.multipleOwners,
        };
      } else if (ownershipType === 'Agency') {
        propertyData.ownership = {
          instrumentNumber: agencyFields.instrumentNumber,
          commercialRegNumber: agencyFields.commercialRegNumber,
          agentIDNumber: agencyFields.agentIDNumber,
          agencyNumber: agencyFields.agencyNumber,
          agentDOB: selectedDOBs.agency,
        };
      }
  
      // Log the final property data for debugging
      console.log('Submitting property data:', JSON.stringify(propertyData, null, 2));
  
      // Submit the filtered propertyData
      const response = await axios.post('https://your-backend-url.com/api/properties', propertyData);
  
      if (response.status === 200) {
        console.log('Property submitted successfully:', response.data);
      } else {
        console.log('Error submitting property:', response.data);
      }
    } catch (error) {
      console.error('Error while submitting property:', error);
    }
  };
  
  

  const handleSubmit = () => {
    let valid = true;
    const newErrors = {};

    // If everything is valid, submit the property
    submitProperty();
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
            direction={direction}
            setDirection={setDirection}
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
            footTraffic={footTraffic}
            setFootTraffic={setFootTraffic}
            proximity={proximity}
            setProximity={setProximity}
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
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}  

        {step === 3 && (
          <PropertyStep3
            waterAccess={waterAccess}
            setWaterAccess={setWaterAccess}
            electricityAccess={electricityAccess}
            setElectricityAccess={setElectricityAccess}
            sewageSystem={sewageSystem}
            setSewageSystem={setSewageSystem}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 4 && (
          <PropertyStep4
            selectedPropertyType={selectedPropertyType}
            setPrice={setPrice}
            price={price}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 5 && (
          <PropertyStep5
            selectedPropertyType={selectedPropertyType}
            media={media}
            setMedia={setMedia}
            selectedPropertyFeatures={selectedPropertyFeatures}
            setSelectedPropertyFeatures={setSelectedPropertyFeatures}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
            floorPlan={floorPlan}
            setFloorPlan={setFloorPlan}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

{step === 6 && (
  <PropertyStep6
    selectedDOBs={selectedDOBs}
    setSelectedDOBs={setSelectedDOBs}
    independentFields={independentFields}
    setIndependentFields={setIndependentFields}
    multipleOwnersFields={multipleOwnersFields}
    setMultipleOwnersFields={setMultipleOwnersFields}
    agencyFields={agencyFields}
    setAgencyFields={setAgencyFields}
    ownershipType={ownershipType}
    setOwnershipType={setOwnershipType}
    handleNext={handleSubmit} // Assuming this is your submission function
    handleBack={handleBack}   // Handle going back to the previous step
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
});

export default AddProperties;
