/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import { TopSpace, AddPropertyBack, ErrorModal, LoadingOverlay } from '@components';

// Import step components
import PropertyStep1 from './components/PropertyStep1';
import PropertyStep2 from './components/PropertyStep2';
import PropertyStep3 from './components/PropertyStep3';
import PropertyStep4 from './components/PropertyStep4';
import PropertyStep5 from './components/PropertyStep5';
import PropertyStep6 from './components/PropertyStep6';
import FinalStep from './components/FinalStep';

// Import types and hooks from services
import {
  AddPropertyPayload,
  DirectionType,
  MarkerPosition,
  OwnershipType,
  PropertyFeature,
  useAddProperty,
  useUpdatePropertyStep,
} from '@services';

export const AddProperties = () => {
  const navigation: any = useNavigation();
  const { intl } = useIntl();
  const totalSteps = 7;

  // Current step state
  const [step, setStep] = useState(1);

  // ---------- Step 1 Fields (Basic Info) ----------
  const [selectedPropertyType, setSelectedPropertyType] = useState('House');
  const [title, setTitle] = useState('awdawdaw');
  const [description, setDescription] = useState('dwadawdawdawd');
  const [size, setSize] = useState('333');
  const [propertyAge, setPropertyAge] = useState('3');
  const [propertyType, setPropertyType] = useState('Rent');
  const [direction, setDirection] = useState('North');
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition | null>(null);

  // ---------- Global Error & Loading State ----------
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ---------- Other Step Fields (Used in Later Steps) ----------
  // Step 2 Fields
  const [beds, setBeds] = useState<number>(1);
  const [baths, setBaths] = useState<number>(1);
  const [floors, setFloors] = useState<number>(1);
  const [livingRooms, setLivingRooms] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
  const [numberOfStreets, setNumberOfStreets] = useState<number>(1);
  const [footTraffic, setFootTraffic] = useState<string>('Medium');
  const [proximity, setProximity] = useState<string>('Near Main Road');
  const [floorNumber, setFloorNumber] = useState<number>(1);
  const [numberOfGates, setNumberOfGates] = useState<number>(1);
  const [loadingDocks, setLoadingDocks] = useState<number>(1);
  const [storageCapacity, setStorageCapacity] = useState<number>(100);
  const [numberOfUnits, setNumberOfUnits] = useState<number>(1);
  const [parkingSpaces, setParkingSpaces] = useState<number>(1);

  // Step 3: Utilities
  const [waterAccess, setWaterAccess] = useState('Yes');
  const [electricityAccess, setElectricityAccess] = useState('Yes');
  const [sewageSystem, setSewageSystem] = useState('Yes');

  // Step 4: Ad Content (title & description already provided in Step 1)
  const [selectedPropertyFeatures, setSelectedPropertyFeatures] = useState([]);
  const [propertyFeature, setPropertyFeature] = useState<PropertyFeature[]>([]);

  // Step 5: Media and Floor Plan
  const [floorPlan, setFloorPlan] = useState('');
  const [media, setMedia] = useState<any[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  // Step 6: Ownership Fields
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

  // Final Step (7): Price Details (price is entered in Final Step)
  const [price, setPrice] = useState('4444');
  const [rentDuration, setRentDuration] = useState('');
  const [commission, setCommission] = useState('');

  // Additional fields if needed
  const [priceMeter, setPriceMeter] = useState<string | null>(null);
  const [images, setImages] = useState<Array<any>>([]);

  const { mutate: addPropertyMutation } = useAddProperty();
  // (Integration of updatePropertyStep for later steps can be added similarly.)

  // Build payload for Step 1 only.
  // IMPORTANT: Since price is required in the serializer but belongs in the final step,
  // we supply a dummy price (e.g., "0.00") in Step 1.
  const getStepOnePayload = (): Partial<AddPropertyPayload> => {
    return {
      propertyCategory: selectedPropertyType,
      title,
      description,
      area: size,
      propertyAge: String(parseInt(propertyAge, 10)),
      propertyType,
      direction: direction as DirectionType,
      markerPosition,
      waterAccess: waterAccess === 'Yes',
      electricityAccess: electricityAccess === 'Yes',
      sewageSystem: sewageSystem === 'Yes',
      ownershipType,
      price: "0.00", // Dummy value to bypass required price field in Step 1
    };
  };

  // For Step 1, call addPropertyMutation with only the Step 1 payload.
  const handleNext = () => {
    if (step === 1) {
      const payload = getStepOnePayload();
      console.log('Step 1 payload:', payload);
      setIsLoading(true);
      addPropertyMutation(payload as AddPropertyPayload, {
        onSuccess: (data) => {
          setIsLoading(false);
          // Advance to Step 2 after creation.
          setStep(2);
        },
        onError: (error) => {
          setIsLoading(false);
          setErrorMessage(error.message || "An unexpected error occurred");
          setShowErrorModal(true);
        },
      });
    } else {
      setStep(prevStep => (prevStep < totalSteps ? prevStep + 1 : prevStep));
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    } else {
      navigation.navigate('BottomTabNavigator', { screen: 'CenterScreen' });
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

  // Final submission: build complete payload for final submission (for testing)
  const submitProperty = async () => {
    setIsLoading(true);
    try {
      let propertyData: AddPropertyPayload = {
        propertyCategory: selectedPropertyType,
        title,
        price,
        description,
        area: size,
        propertyAge: String(parseInt(propertyAge, 10)),
        propertyType,
        direction: direction as DirectionType,
        waterAccess: waterAccess === 'Yes',
        electricityAccess: electricityAccess === 'Yes',
        sewageSystem: sewageSystem === 'Yes',
        media,
        floorPlan,
        propertyFeature: selectedPropertyFeatures,
        markerPosition,
        ownershipType,
      };

      if (propertyType === 'rent') {
        propertyData = {
          ...propertyData,
          rentDuration,
          commission,
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
            direction: direction as DirectionType,
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
            direction: direction as DirectionType,
          };
          break;
        case 'Workers Residence':
          propertyData = {
            ...propertyData,
            bedrooms: beds,
            bathrooms: baths,
            direction: direction as DirectionType,
          };
          break;
        case 'Land':
          propertyData = {
            ...propertyData,
            direction: direction as DirectionType,
            numberOfStreets,
          };
          break;
        case 'Farmhouse':
          propertyData = {
            ...propertyData,
            bedrooms: beds,
            bathrooms: baths,
            livingRooms,
            direction: direction as DirectionType,
          };
          break;
        case 'Shop':
          propertyData = {
            ...propertyData,
            footTraffic,
            proximity,
          };
          break;
        case 'Chalet':
          propertyData = {
            ...propertyData,
            bedrooms: beds,
            bathrooms: baths,
            livingRooms,
            direction: direction as DirectionType,
          };
          break;
        case 'Office':
          propertyData = {
            ...propertyData,
            floors,
            parkingSpaces,
            direction: direction as DirectionType,
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
            direction: direction as DirectionType,
          };
          break;
        default:
          throw new Error('Invalid property type selected');
      }

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

      console.log('Submitting complete property data:', JSON.stringify(propertyData, null, 2));

      addPropertyMutation(propertyData, {
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
    submitProperty();
  };

  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Platform.OS === 'ios' ? 10 : 0 }}>
        <AddPropertyBack onPress={handleBack} />

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
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
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
            mainImageIndex={mainImageIndex}
            setMainImageIndex={setMainImageIndex}
            handleNext={handleNext}
            handleBack={handleBack}
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
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 7 && (
          <FinalStep
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
              price,
              rentDuration,
              commission,
              floorPlan,
              media,
              mainImageIndex,
              selectedPropertyFeatures,
              propertyFeature,
              markerPosition,
              ownershipType,
              selectedDOBs,
              independentFields,
              multipleOwnersFields,
              agencyFields,
              priceMeter,
              images,
            }}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
          />
        )}

        <ErrorModal
          visible={showErrorModal}
          message={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />
        {isLoading && <LoadingOverlay />}
        <TopSpace top={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProperties;
