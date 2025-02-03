/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '@colors';
import {useNavigation} from '@react-navigation/native';
import {AddPropertyBack, PropertyStepHeader, TopSpace} from '@components';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import {useIntl} from '@context';
import { loadingAnimation } from '@assets';
import LottieView from 'lottie-react-native';
import PropertyStep1 from './components/PropertyStep1';
import PropertyStep2 from './components/PropertyStep2';
import PropertyStep3 from './components/PropertyStep3';
import PropertyStep4 from './components/PropertyStep4';
import PropertyStep5 from './components/PropertyStep5';
import PropertyStep6 from './components/PropertyStep6';
import FinalStep from './components/FinalStep';
import {
  AddPropertyPayload,
  DirectionType,
  FootTrafficType,
  MarkerPosition,
  OwnershipType,
  PropertyFeature,
  useAddProperty,
} from '@services';

export const AddProperties = () => {
  const navigation: any = useNavigation();

  // Update total steps to 7 so that step 7 is the FinalStep component.
  const totalSteps = 7;

  const [step, setStep] = useState(1);
  const [selectedPropertyType, setSelectedPropertyType] = useState('House');
  const [title, setTitle] = useState('awdawdaw');
  const [description, setDescription] = useState('dwadawdawdawd');
  const [size, setSize] = useState('333');
  const [propertyAge, setPropertyAge] = useState('3');
  const [propertyType, setPropertyType] = useState('Rent');
  const [direction, setDirection] = useState('North');

  const [errors, setErrors] = useState({}); // Error state for validation
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

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

  // Step 4
  const [rentDuration, setRentDuration] = useState(''); // monthly, quarterly, etc.
  const [price, setPrice] = useState('4444');

  // Step 5
  const [floorPlan, setFloorPlan] = useState('');
  const [media, setMedia] = useState<any[]>([]);
  const [selectedPropertyFeatures, setSelectedPropertyFeatures] = useState([]);
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition | null>(null); // Coordinates

  // Step 6
  const [ownershipType, setOwnershipType] = useState<OwnershipType>('independent');
  const [selectedDOBs, setSelectedDOBs] = useState({
    independent: '',
    multipleOwners: '',
    agency: '',
  });

  const [independentFields, setIndependentFields] = useState({
    instrumentNumber: '718703000570',
    ownerIDNumber: '1003128350',
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

  // New state variables for property fields
  const [propertyFeature, setPropertyFeature] = useState<PropertyFeature[]>([]);
  const [bedroomCount, setBedroomCount] = useState<number | string | null>(1);
  const [bathroomCount, setBathroomCount] = useState<number | string | null>(1);
  const [priceMeter, setPriceMeter] = useState<string | null>(null);
  const [images, setImages] = useState<Array<any>>([]);

  const {intl} = useIntl();
  const {mutate: addProperty} = useAddProperty();

  const handleNext = () => {
    // Increase step until we reach the final step (7)
    setStep(prevStep => (prevStep < totalSteps ? prevStep + 1 : prevStep));
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

  const onChangePropertyFeature = (feature: PropertyFeature) => {
    const exists = propertyFeature.some(item => item.id === feature.id);
    if (!exists) {
      setPropertyFeature([...propertyFeature, feature]);
    } else {
      setPropertyFeature(propertyFeature.filter(item => item.id !== feature.id));
    }
  };

  const submitProperty = async () => {
    setIsLoading(true); // Show loading animation
    try {
      // Initialize the common data that applies to all property types
      let propertyData: AddPropertyPayload = {
        propertyCategory: selectedPropertyType,
        title,
        price,
        description,
        area: size,
        propertyAge,
        propertyType, // Sell or Rent
        direction: direction as unknown as DirectionType,
        waterAccess: waterAccess === 'Yes',
        electricityAccess: electricityAccess === 'Yes',
        sewageSystem: sewageSystem === 'Yes',
        media,
        floorPlan,
        propertyFeature: selectedPropertyFeatures,
        markerPosition,
        ownershipType,
      };

      // Include rentDuration if propertyType is rent
      if (propertyType === 'rent') {
        propertyData = {
          ...propertyData,
          rentDuration,
        };
      }

      switch (selectedPropertyType) {
        case 'House':
          propertyData = {
            ...propertyData,
            bedrooms: beds,
            bathrooms: baths,
            floors,
            livingRooms,
            direction: direction as unknown as DirectionType,
          };
          break;
        case 'Appartment':
          propertyData = {
            ...propertyData,
            rooms,
            bathrooms: baths,
            floorNumber,
            livingRooms,
            floors,
            direction: direction as unknown as DirectionType,
          };
          break;
        case 'Workers Residence':
          propertyData = {
            ...propertyData,
            bedrooms: beds,
            bathrooms: baths,
            direction: direction as unknown as DirectionType,
          };
          break;
        case 'Land':
          propertyData = {
            ...propertyData,
            direction: direction as unknown as DirectionType,
            numberOfStreets,
          };
          break;
        case 'Farmhouse':
          propertyData = {
            ...propertyData,
            bedrooms: beds,
            bathrooms: baths,
            livingRooms,
            direction: direction as unknown as DirectionType,
          };
          break;
        case 'Shop':
          propertyData = {
            ...propertyData,
            footTraffic: footTraffic as unknown as FootTrafficType,
            proximity,
          };
          break;
        case 'Chalet':
          propertyData = {
            ...propertyData,
            bedrooms: beds,
            bathrooms: baths,
            livingRooms,
            direction: direction as unknown as DirectionType,
          };
          break;
        case 'Office':
          propertyData = {
            ...propertyData,
            floors,
            parkingSpaces,
            direction: direction as unknown as DirectionType,
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
            bathrooms: baths,
            numberOfUnits,
            floors,
            direction: direction as unknown as DirectionType,
          };
          break;
        default:
          throw new Error('Invalid property type selected');
      }

      // Ownership-specific fields
      if (ownershipType === 'independent') {
        propertyData.ownership = {
          instrumentNumber: independentFields.instrumentNumber,
          ownerIDNumber: independentFields.ownerIDNumber,
          ownerDOB: selectedDOBs.independent,
        };
      } else if (ownershipType === 'multipleOwners') {
        propertyData.ownership = {
          instrumentNumber: multipleOwnersFields.instrumentNumber,
          ownerIDNumber: multipleOwnersFields.ownerIDNumber,
          agencyNumber: multipleOwnersFields.agencyNumber,
          ownerDOB: selectedDOBs.multipleOwners,
        };
      } else if (ownershipType === 'agency') {
        propertyData.ownership = {
          instrumentNumber: agencyFields.instrumentNumber,
          commercialRegNumber: agencyFields.commercialRegNumber,
          agentIDNumber: agencyFields.agentIDNumber,
          agencyNumber: agencyFields.agencyNumber,
          agentDOB: selectedDOBs.agency,
        };
      }

      // Debug log the final property data
      console.log(
        'Submitting property data:',
        JSON.stringify(propertyData, null, 2)
      );

      addProperty(propertyData, {
        onSuccess: (data) => {
          setIsLoading(false);
          console.log('Property created with ID:', data.propertyId);
          navigation.navigate('PropertyScreen', { propertyId: data.propertyId });
        },
        onError: (error) => {
          setIsLoading(false);
          setErrorMessage(error.message || "An unexpected error occurred");
          setShowErrorModal(true);
        },
      });
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message || "An unexpected error occurred");
      setShowErrorModal(true);
    }
  };

  const handleSubmit = () => {
    // You can add any final validation here before submission.
    submitProperty();
  };

  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
        }}>
        <AddPropertyBack onPress={handleBack} />

        {/* Step Components */}
        {step === 1 && (
          <PropertyStep1
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
            size={size}
            setSize={setSize}
            propertyAge={propertyAge}
            setPropertyAge={setPropertyAge}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
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
            apartmentRooms={rooms}
            setApartmentRooms={setRooms}
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
            errors={errors}
            setErrors={setErrors}
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
          />
        )}

        {step === 4 && (
          <PropertyStep4
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            setPrice={setPrice}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            selectedPropertyFeatures={selectedPropertyFeatures}
            setSelectedPropertyFeatures={setSelectedPropertyFeatures}
            propertyFeature={propertyFeature}
            setPropertyFeature={onChangePropertyFeature}
            rentDuration={rentDuration}
            setRentDuration={setRentDuration}
            handleNext={handleNext}
            handleBack={handleBack}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {step === 5 && (
          <PropertyStep5
            selectedPropertyType={selectedPropertyType}
            media={media}
            setMedia={setMedia}
            floorPlan={floorPlan}
            setFloorPlan={setFloorPlan}
            handleNext={handleNext}
            handleBack={handleBack}
            bedroomCount={bedroomCount}
            setBedroomCount={setBedroomCount}
            bathroomCount={bathroomCount}
            setBathroomCount={setBathroomCount}
            priceMeter={priceMeter}
            setPriceMeter={setPriceMeter}
            images={images}
            setImages={setImages}
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
            handleNext={handleNext}  // This now moves to step 7 (the final step)
            handleBack={handleBack}
          />
        )}

        {step === 7 && (
          <FinalStep
            // Pass all fields so the user can review them before final submission.
            data={{
              selectedPropertyType,
              title,
              description,
              size,
              propertyAge,
              propertyType,
              direction,
              beds,
              baths,
              floors,
              livingRooms,
              rooms,
              numberOfStreets,
              footTraffic,
              proximity,
              floorNumber,
              numberOfGates,
              loadingDocks,
              storageCapacity,
              numberOfUnits,
              parkingSpaces,
              waterAccess,
              electricityAccess,
              sewageSystem,
              rentDuration,
              price,
              floorPlan,
              selectedPropertyFeatures,
              propertyFeature,
              markerPosition,
              ownershipType,
              selectedDOBs,
              independentFields,
              multipleOwnersFields,
              agencyFields,
              bedroomCount,
              bathroomCount,
              priceMeter,
              media,
              images,
            }}
            handleSubmit={handleSubmit}  // Call final submission when ready
            handleBack={handleBack}
          />
        )}

        {/* Error Modal */}
        <Modal
          transparent={true}
          visible={showErrorModal}
          animationType="slide"
          onRequestClose={() => setShowErrorModal(false)}>
          <TouchableWithoutFeedback onPress={() => setShowErrorModal(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalText}>Error</Text>
                    <TouchableOpacity onPress={() => setShowErrorModal(false)}>
                      <Image
                        source={require('../../assets/images/close.png')}
                        style={styles.closeIconImage}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalBody}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <LottieView
                source={loadingAnimation}
                autoPlay
                loop
                style={styles.loadingAnimation}
              />
            </View>
          </View>
        )}

        <TopSpace top={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {backgroundColor: Colors.light.background, flex: 1, padding: 24},
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay to match the modal
    zIndex: 1000,
  },  
  loadingContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent white background
    borderRadius: 10,
  },
  loadingAnimation: {
    width: 50,
    height: 50,
  },
  errorModalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for modal background
},
modalContent: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 30, // Updated to 30 for rounder borders
    alignSelf: 'center',
    marginBottom: 30,
    padding: 0,
},
modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
},
modalText: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'center',
},
modalBody: {
    padding: 20,
    alignItems: 'center',
},
errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
},
closeIconImage: {
    width: 20,
    height: 20,
    tintColor: '#000',
},
});

export default AddProperties;
