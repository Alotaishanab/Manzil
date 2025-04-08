/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Vibration,
} from 'react-native';
import { CustomButton, TopSpace } from '@components';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { useIntl } from '@context';
import { RenderPropertyFields } from '@helpers';

export const PropertyStep2 = ({
  selectedPropertyType,
  handleNext,
  beds,
  setBeds,
  baths,
  setBaths,
  floors,
  setFloors,
  livingRooms,
  setLivingRooms,
  rooms,
  setRooms,
  direction,
  setDirection,
  numberOfStreets,
  setNumberOfStreets,
  footTraffic,
  setFootTraffic,
  proximity,
  setProximity,
  floorNumber,
  setFloorNumber,
  numberOfGates,
  setNumberOfGates,
  loadingDocks,
  setLoadingDocks,
  storageCapacity,
  setStorageCapacity,
  numberOfUnits,
  setNumberOfUnits,
  parkingSpaces,
  setParkingSpaces,
}: any) => {
  const { intl } = useIntl();

  // Errors state for validations
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!selectedPropertyType) {
      newErrors.propertyType = 'Please select a property type.';
      valid = false;
    }

    // Validation logic based on property type
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
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        break;

      case 'Appartment':
        if (!rooms || rooms <= 0) {
          newErrors.rooms = 'Please select the number of rooms.';
          valid = false;
        }
        if (!baths || baths <= 0) {
          newErrors.baths = 'Please select the number of baths.';
          valid = false;
        }
        if (!floorNumber || floorNumber <= 0) {
          newErrors.floorNumber = 'Please select the floor number.';
          valid = false;
        }
        if (!livingRooms || livingRooms <= 0) {
          newErrors.livingRooms = 'Please select the number of living rooms.';
          valid = false;
        }
        if (!floors || floors <= 0) {
          newErrors.floors = 'Please select the number of floors.';
          valid = false;
        }
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        break;

      case 'Workers Residence':
        if (!beds || beds <= 0) {
          newErrors.beds = 'Please select the number of beds.';
          valid = false;
        }
        if (!baths || baths <= 0) {
          newErrors.baths = 'Please select the number of baths.';
          valid = false;
        }
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        break;

      case 'Land':
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        if (!numberOfStreets || numberOfStreets <= 0) {
          newErrors.numberOfStreets = 'Please select the number of streets.';
          valid = false;
        }
        break;

      case 'Farmhouse':
        if (!beds || beds <= 0) {
          newErrors.beds = 'Please select the number of beds.';
          valid = false;
        }
        if (!baths || baths <= 0) {
          newErrors.baths = 'Please select the number of baths.';
          valid = false;
        }
        if (!livingRooms || livingRooms <= 0) {
          newErrors.livingRooms = 'Please select the number of living rooms.';
          valid = false;
        }
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        break;

      case 'Shop':
        if (!footTraffic) {
          newErrors.footTraffic = 'Please select the foot traffic level.';
          valid = false;
        }
        if (!proximity) {
          newErrors.proximity = 'Please select the proximity to main road.';
          valid = false;
        }
        break;

      case 'Chalet':
        if (!beds || beds <= 0) {
          newErrors.beds = 'Please select the number of beds.';
          valid = false;
        }
        if (!baths || baths <= 0) {
          newErrors.baths = 'Please select the number of baths.';
          valid = false;
        }
        if (!livingRooms || livingRooms <= 0) {
          newErrors.livingRooms = 'Please select the number of living rooms.';
          valid = false;
        }
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        break;

      case 'Office':
        if (!floors || floors <= 0) {
          newErrors.floors = 'Please select the number of floors.';
          valid = false;
        }
        if (parkingSpaces === undefined || parkingSpaces < 0) {
          newErrors.parkingSpaces = 'Please select the number of parking spaces.';
          valid = false;
        }
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        break;

      case 'Warehouse':
        if (!numberOfGates || numberOfGates <= 0) {
          newErrors.numberOfGates = 'Please select the number of gates.';
          valid = false;
        }
        if (loadingDocks < 0) {
          newErrors.loadingDocks = 'Loading docks cannot be negative.';
          valid = false;
        }
        if (storageCapacity === undefined || storageCapacity < 0) {
          newErrors.storageCapacity = 'Please select the storage capacity.';
          valid = false;
        }
        break;

      case 'Tower':
        if (!rooms || rooms <= 0) {
          newErrors.rooms = 'Please select the number of rooms per unit.';
          valid = false;
        }
        if (!baths || baths <= 0) {
          newErrors.baths = 'Please select the number of bathrooms per unit.';
          valid = false;
        }
        if (!numberOfUnits || numberOfUnits <= 0) {
          newErrors.numberOfUnits = 'Please select the number of units.';
          valid = false;
        }
        if (!floors || floors <= 0) {
          newErrors.floors = 'Please select the number of floors.';
          valid = false;
        }
        if (!direction) {
          newErrors.direction = 'Please select a direction.';
          valid = false;
        }
        break;

      default:
        break;
    }

    console.log('newErrors on Step2', newErrors);

    if (!valid) {
      Vibration.vibrate(50);
      setErrors(newErrors);
      return;
    }

    handleNext();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title and Explanation Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Property Details</Text>
        <Text style={styles.screenExplanation}>
          Please provide additional details about your property.
        </Text>
      </View>

      <RenderPropertyFields
        selectedPropertyType={selectedPropertyType}
        errors={errors}
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
        direction={direction}
        setDirection={setDirection}
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
      />

      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleSubmit}
        title={intl.formatMessage({ id: 'buttons.next' })}
        showRightIconButton={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: Colors.light.background || '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: Colors.darkText || '#000',
    marginBottom: 8,
  },
  screenExplanation: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.textSecondary || '#555',
  },
  // ... (other styles remain unchanged)
  pickerContainer: {
    width: '45%',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  input: {
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
  pickerTrigger: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  error: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  squareContainer: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  scrollPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  option: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  optionSelected: {
    borderColor: '#4caf50',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
  },
  textSelected: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  arrowButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PropertyStep2;
