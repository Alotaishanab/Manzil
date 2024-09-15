import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet , Vibration, TouchableHighlight, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomButton, TopSpace, PropertyTypeModal, CompassDirectionModal, ScrollPicker , HouseComponent } from '@components';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { useIntl } from '@context';

const PropertyStep2 = ({ 
  selectedPropertyType,
   handleNext,
   title,
  setTitle,
  description,
  setDescription,
}: any) => {
  // State variables for common fields
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);
  const [floors, setFloors] = useState(1);
  const [livingRooms, setLivingRooms] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [direction, setDirection] = useState('North');
  const [numberOfStreets, setNumberOfStreets] = useState(1);
  const [footTraffic, setFootTraffic] = useState('Medium');
  const [floorNumber, setFloorNumber] = useState(1);
  const [numberOfGates, setNumberOfGates] = useState(1);
  const [loadingDocks, setLoadingDocks] = useState(1);
  const [storageCapacity, setStorageCapacity] = useState(100);
  const [numberOfUnits, setNumberOfUnits] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(1);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerData, setPickerData] = useState([]);
  const [currentField, setCurrentField] = useState(null);

  // Intl
  const { intl } = useIntl();

  // Errors 
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};
  
    if (!selectedPropertyType) {
      newErrors.propertyType = 'Please select a property type.';
      valid = false;
    }
  
    if (!title.trim()) {
      newErrors.title = 'Please enter a title.';
      valid = false;
    }
  
    if (!description) {
      newErrors.description = 'Please describe the property.';
      valid = false;
    }
  
    // Add validation for beds, baths, floors, and livingRooms
    if (selectedPropertyType === 'House') {
      if (!beds) {
        newErrors.beds = 'Please select the number of beds.';
        valid = false;
      }
      if (!baths) {
        newErrors.baths = 'Please select the number of baths.';
        valid = false;
      }
      if (!floors) {
        newErrors.floors = 'Please select the number of floors.';
        valid = false;
      }
      if (!livingRooms) {
        newErrors.livingRooms = 'Please select the number of living rooms.';
        valid = false;
      }
    }
  
    if (!valid) {
      Vibration.vibrate(50);
      setErrors(newErrors);
      return;
    }
  
    handleNext();
  };
  

  const handleTitleChange = (text: string) => {
    if (/[^a-zA-Z\s]/.test(text)) {
      setErrors((prev) => ({ ...prev, title: 'Title should not contain numbers or special characters.' }));
      return;
    }
    setTitle(text.slice(0, 50));
    setErrors((prev) => ({ ...prev, title: null }));
  };

  const handleDescriptionChange = (text: string) => {
    const minLength = 10;
    const maxLength = 200;
  
    // Check if the description is too short
    if (text.length < minLength) {
      setErrors((prev) => ({
        ...prev,
        description: `Description must be at least ${minLength} characters long.`,
      }));
      return;
    }
  
    // Check if the description is too long
    if (text.length > maxLength) {
      setErrors((prev) => ({
        ...prev,
        description: `Description cannot exceed ${maxLength} characters.`,
      }));
      return;
    }
  
    // Set the description and clear any previous errors
    setDescription(text);
    setErrors((prev) => ({ ...prev, description: null }));
  };
  

  

  // Function to open picker for a specific field
  const openPicker = (field, options, valueSetter) => {
    setCurrentField({ field, valueSetter });
    setPickerData(options);
    setPickerVisible(true);
  };

  const generateNumericOptions = (start, end) => {
    const items = [];
    for (let i = start; i <= end; i++) {
      items.push(i);
    }
    return items;
  };
  
  // Function to render fields dynamically based on selected property type
  const renderFieldsForPropertyType = () => {
    return (
      <View>
      

       
        {(() => {
          switch (selectedPropertyType) {
            // Using the ScrollPicker in the House case:

            case 'House':
              return (
                <View>
                  <HouseComponent
                    beds={beds}
                    setBeds={setBeds}
                    baths={baths}
                    setBaths={setBaths}
                    floors={floors}
                    setFloors={setFloors}
                    livingRooms={livingRooms}
                    setLivingRooms={setLivingRooms}
                    errors={errors}
                  />
                </View>
              );


            case 'Appartment':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('rooms', generateNumericOptions(1, 10), setRooms)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Rooms: {rooms}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('baths', generateNumericOptions(1, 5), setBaths)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Baths: {baths}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'floorNumber',
                        generateNumericOptions(1, 50),
                        setFloorNumber
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Floor Number: {floorNumber}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'livingRooms',
                        generateNumericOptions(1, 3),
                        setLivingRooms
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Number of Living Rooms: {livingRooms}
                    </Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Workers Residence':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('beds', generateNumericOptions(1, 20), setBeds)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Beds: {beds}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('baths', generateNumericOptions(1, 5), setBaths)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Baths: {baths}</Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Land':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'direction',
                        ['North', 'South', 'East', 'West'],
                        setDirection
                      )
                    }
                  >
                    <Text style={styles.pickerText}>Direction: {direction}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'numberOfStreets',
                        generateNumericOptions(1, 4),
                        setNumberOfStreets
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Number of Streets: {numberOfStreets}
                    </Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Farmhouse':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('beds', generateNumericOptions(1, 20), setBeds)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Beds: {beds}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('baths', generateNumericOptions(1, 5), setBaths)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Baths: {baths}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'livingRooms',
                        generateNumericOptions(1, 3),
                        setLivingRooms
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Number of Living Rooms: {livingRooms}
                    </Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Shop':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'footTraffic',
                        ['High', 'Medium', 'Low'],
                        setFootTraffic
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Foot Traffic: {footTraffic}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'proximity',
                        ['Near Main Road', 'Far from Main Road'],
                        setFootTraffic
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Proximity to Main Road: {footTraffic}
                    </Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Chalet':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('beds', generateNumericOptions(1, 20), setBeds)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Beds: {beds}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('baths', generateNumericOptions(1, 5), setBaths)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Baths: {baths}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'livingRooms',
                        generateNumericOptions(1, 3),
                        setLivingRooms
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Number of Living Rooms: {livingRooms}
                    </Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Office':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('floors', generateNumericOptions(1, 10), setFloors)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Floors: {floors}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('parkingSpaces', generateNumericOptions(0, 50), setParkingSpaces)
                    }
                  >
                    <Text style={styles.pickerText}>Available Parking Spaces: {parkingSpaces}</Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Warehouse':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'numberOfGates',
                        generateNumericOptions(1, 10),
                        setNumberOfGates
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Number of Gates: {numberOfGates}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'loadingDocks',
                        generateNumericOptions(0, 5),
                        setLoadingDocks
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Loading Docks: {loadingDocks}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker(
                        'storageCapacity',
                        generateNumericOptions(100, 10000, 100),
                        setStorageCapacity
                      )
                    }
                  >
                    <Text style={styles.pickerText}>
                      Storage Capacity (m³): {storageCapacity}
                    </Text>
                  </TouchableOpacity>
                </View>
              );

            case 'Tower':
              return (
                <View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('rooms', generateNumericOptions(1, 10), setRooms)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Rooms per Unit: {rooms}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('baths', generateNumericOptions(1, 5), setBaths)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Bathrooms per Unit: {baths}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('numberOfUnits', generateNumericOptions(1, 50), setNumberOfUnits)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Units: {numberOfUnits}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() =>
                      openPicker('floors', generateNumericOptions(1, 50), setFloors)
                    }
                  >
                    <Text style={styles.pickerText}>Number of Floors: {floors}</Text>
                  </TouchableOpacity>
                </View>
              );

            default:
              return (
                <Text style={styles.error}>Please select a valid property type</Text>
              );
          }
        })()}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
       {/* Ad Title */}
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Ad Title</Text>
        <TopSpace top={10} />
        <TextInput
          placeholder="Enter your property title here..."
          placeholderTextColor={Colors.light.black}
          style={[
            styles.textInputFullWidth,
            errors.title && styles.errorBorder,
          ]}
          value={title}
          onChangeText={handleTitleChange}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>


      {renderFieldsForPropertyType()}

      {/* Description Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Property Description</Text>
        <TextInput
          style={[
            styles.descriptionInput,
            errors.description && styles.errorBorder,
          ]}
          placeholder="Enter a brief description of the property"
          placeholderTextColor={Colors.light.black}
          value={description}
          onChangeText={handleDescriptionChange}
          multiline
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleSubmit}
        title={intl.formatMessage({ id: 'buttons.next' })}
        showRightIconButton={true}
      />    

      {/* Modal Picker */}
      <Modal
        visible={pickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currentField ? currentField.field : ''}
              onValueChange={(itemValue) => {
                if (currentField) {
                  currentField.valueSetter(itemValue);
                }
                setPickerVisible(false);
              }}
            >
              {pickerData.map((value, index) => (
                <Picker.Item label={String(value)} value={value} key={index} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#1F2937', // Dark text color
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
  descriptionInput: {
    height: 200,
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
  nextButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButton: {
    backgroundColor: '#3B82F6', // Blue button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  error: {
    color: '#EF4444', // Red color for errors
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 30,
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
    borderRadius: 30, // Makes the selected option more rounded
    backgroundColor: '#f0f0f0'
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
    borderRadius: 25, // Rounded arrows for a better look
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});


export default PropertyStep2;
