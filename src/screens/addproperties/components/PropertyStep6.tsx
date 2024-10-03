import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import {TopSpace, CustomButton} from '@components';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {useIntl} from '@context';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // DateTimePicker for DOB

const PropertyStep6 = ({
  ownershipType, // Current ownership type ('independent', 'multipleOwners', 'agency')
  setOwnershipType, // Function to set the ownership type
  selectedDOBs,
  setSelectedDOBs,
  independentFields,
  setIndependentFields,
  multipleOwnersFields,
  setMultipleOwnersFields,
  agencyFields,
  setAgencyFields,
  handleNext,
}) => {
  const [errors, setErrors] = useState({}); // To handle error messages
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // For DOB calendar
  const [dobFieldKey, setDobFieldKey] = useState(null); // To identify the current DOB field
  const {intl} = useIntl();

  // Show date picker and set the field key for identifying which DOB field to update
  const showDatePicker = key => {
    setDobFieldKey(key);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => setDatePickerVisibility(false);

  // Handle confirming the DOB
  const handleConfirmDOB = date => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    setSelectedDOBs(prev => ({...prev, [dobFieldKey]: formattedDate})); // Update the corresponding DOB
    setDatePickerVisibility(false);
  };

  // Handle input change
  const handleInputChange = (field, value, type) => {
    const onlyNumbers = value.replace(/[^0-9]/g, ''); // Restrict to numbers only for ID fields
    if (type === 'independent') {
      setIndependentFields({
        ...independentFields,
        [field]: field.includes('ID') ? onlyNumbers : value,
      });
    } else if (type === 'multipleOwners') {
      setMultipleOwnersFields({
        ...multipleOwnersFields,
        [field]: field.includes('ID') ? onlyNumbers : value,
      });
    } else {
      setAgencyFields({
        ...agencyFields,
        [field]: field.includes('ID') ? onlyNumbers : value,
      });
    }
  };

  // Validation logic
  const validateFields = () => {
    let currentErrors = {};
    let hasError = false;

    // Determine which fields to validate based on ownershipType
    const fieldsToValidate =
      ownershipType === 'independent'
        ? independentFields
        : ownershipType === 'multipleOwners'
        ? multipleOwnersFields
        : agencyFields;

    // Validation for required fields
    if (!fieldsToValidate.instrumentNumber) {
      currentErrors.instrumentNumber = 'Instrument number is required';
      hasError = true;
    }
    if (
      !fieldsToValidate.ownerIDNumber ||
      fieldsToValidate.ownerIDNumber.length !== 10
    ) {
      currentErrors.ownerIDNumber = 'Owner ID must be 10 digits';
      hasError = true;
    }
    if (ownershipType === 'multipleOwners' && !fieldsToValidate.agencyNumber) {
      currentErrors.agencyNumber = 'Agency number is required';
      hasError = true;
    }
    if (ownershipType === 'agency') {
      if (!fieldsToValidate.commercialRegNumber) {
        currentErrors.commercialRegNumber =
          'Commercial registration number is required';
        hasError = true;
      }
      if (
        !fieldsToValidate.agentIDNumber ||
        fieldsToValidate.agentIDNumber.length !== 10
      ) {
        currentErrors.agentIDNumber = 'Agent ID must be 10 digits';
        hasError = true;
      }
      if (!fieldsToValidate.agencyNumber) {
        currentErrors.agencyNumber = 'Agency number is required';
        hasError = true;
      }
      if (!selectedDOBs.agency) {
        currentErrors.agentDOB = 'Agent DOB is required'; // Added check for Agent DOB
        hasError = true;
      }
    }

    if (!selectedDOBs[ownershipType]) {
      currentErrors.ownerDOB = 'Date of birth is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(currentErrors);
      Vibration.vibrate(50); // Vibrate for 50ms on error
    } else {
      setErrors({});
      handleNext(); // Proceed to the next step if no errors
    }
  };

  const renderInputFields = () => {
    switch (ownershipType) {
      case 'independent':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Instrument Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter instrument number"
                placeholderTextColor={Colors.light.black}
                style={[
                  styles.textInputFullWidth,
                  errors.instrumentNumber && styles.errorBorder,
                ]}
                value={independentFields.instrumentNumber}
                onChangeText={value =>
                  handleInputChange('instrumentNumber', value, 'independent')
                }
              />
              {errors.instrumentNumber && (
                <Text style={styles.errorText}>{errors.instrumentNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Owner ID Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter owner ID number"
                placeholderTextColor={Colors.light.black}
                keyboardType="numeric"
                maxLength={10}
                style={[
                  styles.textInputFullWidth,
                  errors.ownerIDNumber && styles.errorBorder,
                ]}
                value={independentFields.ownerIDNumber}
                onChangeText={value =>
                  handleInputChange('ownerIDNumber', value, 'independent')
                }
              />
              {errors.ownerIDNumber && (
                <Text style={styles.errorText}>{errors.ownerIDNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Owner DOB</Text>
              <TopSpace top={10} />
              <TouchableOpacity onPress={() => showDatePicker('independent')}>
                <View pointerEvents="none">
                  <TextInput
                    placeholder="Select date of birth"
                    placeholderTextColor={Colors.light.black}
                    value={selectedDOBs.independent}
                    style={[
                      styles.textInputFullWidth,
                      errors.ownerDOB && styles.errorBorder,
                    ]}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
              {errors.ownerDOB && (
                <Text style={styles.errorText}>{errors.ownerDOB}</Text>
              )}
            </View>
          </>
        );

      case 'multipleOwners':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Instrument Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter instrument number"
                placeholderTextColor={Colors.light.black}
                style={[
                  styles.textInputFullWidth,
                  errors.instrumentNumber && styles.errorBorder,
                ]}
                value={multipleOwnersFields.instrumentNumber}
                onChangeText={value =>
                  handleInputChange('instrumentNumber', value, 'multipleOwners')
                }
              />
              {errors.instrumentNumber && (
                <Text style={styles.errorText}>{errors.instrumentNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Owner ID Number (One of the Owners)
              </Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter owner ID number"
                placeholderTextColor={Colors.light.black}
                keyboardType="numeric"
                maxLength={10}
                style={[
                  styles.textInputFullWidth,
                  errors.ownerIDNumber && styles.errorBorder,
                ]}
                value={multipleOwnersFields.ownerIDNumber}
                onChangeText={value =>
                  handleInputChange('ownerIDNumber', value, 'multipleOwners')
                }
              />
              {errors.ownerIDNumber && (
                <Text style={styles.errorText}>{errors.ownerIDNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Agency Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter agency number"
                placeholderTextColor={Colors.light.black}
                keyboardType="numeric"
                style={[
                  styles.textInputFullWidth,
                  errors.agencyNumber && styles.errorBorder,
                ]}
                value={multipleOwnersFields.agencyNumber}
                onChangeText={value =>
                  handleInputChange('agencyNumber', value, 'multipleOwners')
                }
              />
              {errors.agencyNumber && (
                <Text style={styles.errorText}>{errors.agencyNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Owner DOB (One of the Owners)</Text>
              <TopSpace top={10} />
              <TouchableOpacity
                onPress={() => showDatePicker('multipleOwners')}>
                <View pointerEvents="none">
                  <TextInput
                    placeholder="Select owner date of birth"
                    placeholderTextColor={Colors.light.black}
                    value={selectedDOBs.multipleOwners}
                    style={[
                      styles.textInputFullWidth,
                      errors.ownerDOB && styles.errorBorder,
                    ]}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
              {errors.ownerDOB && (
                <Text style={styles.errorText}>{errors.ownerDOB}</Text>
              )}
            </View>
          </>
        );

      case 'agency':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Instrument Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter instrument number"
                placeholderTextColor={Colors.light.black}
                style={[
                  styles.textInputFullWidth,
                  errors.instrumentNumber && styles.errorBorder,
                ]}
                value={agencyFields.instrumentNumber}
                onChangeText={value =>
                  handleInputChange('instrumentNumber', value, 'agency')
                }
              />
              {errors.instrumentNumber && (
                <Text style={styles.errorText}>{errors.instrumentNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Commercial Registration Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter commercial registration number"
                placeholderTextColor={Colors.light.black}
                keyboardType="numeric"
                style={[
                  styles.textInputFullWidth,
                  errors.commercialRegNumber && styles.errorBorder,
                ]}
                value={agencyFields.commercialRegNumber}
                onChangeText={value =>
                  handleInputChange('commercialRegNumber', value, 'agency')
                }
              />
              {errors.commercialRegNumber && (
                <Text style={styles.errorText}>
                  {errors.commercialRegNumber}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Agent ID Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter agent ID number"
                placeholderTextColor={Colors.light.black}
                keyboardType="numeric"
                maxLength={10}
                style={[
                  styles.textInputFullWidth,
                  errors.agentIDNumber && styles.errorBorder,
                ]}
                value={agencyFields.agentIDNumber}
                onChangeText={value =>
                  handleInputChange('agentIDNumber', value, 'agency')
                }
              />
              {errors.agentIDNumber && (
                <Text style={styles.errorText}>{errors.agentIDNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Agency Number</Text>
              <TopSpace top={10} />
              <TextInput
                placeholder="Enter agency number"
                placeholderTextColor={Colors.light.black}
                keyboardType="numeric"
                style={[
                  styles.textInputFullWidth,
                  errors.agencyNumber && styles.errorBorder,
                ]}
                value={agencyFields.agencyNumber}
                onChangeText={value =>
                  handleInputChange('agencyNumber', value, 'agency')
                }
              />
              {errors.agencyNumber && (
                <Text style={styles.errorText}>{errors.agencyNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Agent DOB</Text>
              <TopSpace top={10} />
              <TouchableOpacity onPress={() => showDatePicker('agency')}>
                <View pointerEvents="none">
                  <TextInput
                    placeholder="Select agent date of birth"
                    placeholderTextColor={Colors.light.black}
                    value={selectedDOBs.agency}
                    style={[
                      styles.textInputFullWidth,
                      errors.agentDOB && styles.errorBorder,
                    ]}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
              {errors.agentDOB && (
                <Text style={styles.errorText}>{errors.agentDOB}</Text>
              )}
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TopSpace top={20} />
      {/* Tabs for selecting Independent, Multiple Owners, or Agency */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setOwnershipType('independent')}>
          <Text
            style={
              ownershipType === 'independent' ? styles.tabActive : styles.tab
            }>
            Independent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOwnershipType('multipleOwners')}>
          <Text
            style={
              ownershipType === 'multipleOwners' ? styles.tabActive : styles.tab
            }>
            Multiple Owners
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOwnershipType('agency')}>
          <Text
            style={ownershipType === 'agency' ? styles.tabActive : styles.tab}>
            Agency
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      {renderInputFields()}

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDOB}
        onCancel={hideDatePicker}
      />

      {/* Next Button */}
      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={validateFields} // Validate before proceeding
        title={intl.formatMessage({id: 'buttons.submit'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF', // Gray color for inactive tab
    paddingBottom: 5,
  },
  tabActive: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937', // Darker color for active tab
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6', // Blue underline for active tab
    paddingBottom: 5,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
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
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default PropertyStep6;
