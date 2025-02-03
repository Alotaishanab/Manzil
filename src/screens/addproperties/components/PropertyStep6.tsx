import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TopSpace, CustomButton } from '@components';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { useIntl } from '@context';
import { renderInputFields } from '@helpers';

const PropertyStep6 = ({
  ownershipType, // 'independent', 'multipleOwners', 'agency'
  setOwnershipType,
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
  const [errors, setErrors] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dobFieldKey, setDobFieldKey] = useState(null);
  const { intl } = useIntl();

  const showDatePicker = key => {
    setDobFieldKey(key);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirmDOB = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setSelectedDOBs(prev => ({ ...prev, [dobFieldKey]: formattedDate }));
    setDatePickerVisibility(false);
  };

  const handleInputChange = (field: string, value: string, type: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, '');
    if (type === 'independent') {
      setIndependentFields({ ...independentFields, [field]: field.includes('ID') ? onlyNumbers : value });
    } else if (type === 'multipleOwners') {
      setMultipleOwnersFields({ ...multipleOwnersFields, [field]: field.includes('ID') ? onlyNumbers : value });
    } else {
      setAgencyFields({ ...agencyFields, [field]: field.includes('ID') ? onlyNumbers : value });
    }
  };

  const validateFields = () => {
    let currentErrors: Record<string, string> = {};
    let hasError = false;

    const fieldsToValidate =
      ownershipType === 'independent'
        ? independentFields
        : ownershipType === 'multipleOwners'
        ? multipleOwnersFields
        : agencyFields;

    if (!fieldsToValidate.instrumentNumber) {
      currentErrors.instrumentNumber = 'Instrument number is required';
      hasError = true;
    }
    if (!fieldsToValidate.ownerIDNumber || fieldsToValidate.ownerIDNumber.length !== 10) {
      currentErrors.ownerIDNumber = 'Owner ID must be 10 digits';
      hasError = true;
    }
    if (ownershipType === 'multipleOwners' && !fieldsToValidate.agencyNumber) {
      currentErrors.agencyNumber = 'Agency number is required';
      hasError = true;
    }
    if (ownershipType === 'agency') {
      if (!fieldsToValidate.commercialRegNumber) {
        currentErrors.commercialRegNumber = 'Commercial registration number is required';
        hasError = true;
      }
      if (!fieldsToValidate.agentIDNumber || fieldsToValidate.agentIDNumber.length !== 10) {
        currentErrors.agentIDNumber = 'Agent ID must be 10 digits';
        hasError = true;
      }
      if (!fieldsToValidate.agencyNumber) {
        currentErrors.agencyNumber = 'Agency number is required';
        hasError = true;
      }
      if (!selectedDOBs.agency) {
        currentErrors.agentDOB = 'Agent DOB is required';
        hasError = true;
      }
    }

    if (!selectedDOBs[ownershipType]) {
      currentErrors.ownerDOB = 'Date of birth is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(currentErrors);
      Vibration.vibrate(50);
    } else {
      setErrors({});
      handleNext();
    }
  };

  return (
    <View style={styles.container}>
      <TopSpace top={20} />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Ownership & Verification</Text>
        <Text style={styles.screenSubtitle}>
          Please provide the necessary ownership details for your property.
        </Text>
      </View>

      {/* Revolut-inspired Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            ownershipType === 'independent' ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => setOwnershipType('independent')}
        >
          <Text
            style={ownershipType === 'independent' ? styles.tabTextActive : styles.tabTextInactive}
          >
            Independent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            ownershipType === 'multipleOwners' ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => setOwnershipType('multipleOwners')}
        >
          <Text
            style={ownershipType === 'multipleOwners' ? styles.tabTextActive : styles.tabTextInactive}
          >
            Multiple Owners
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            ownershipType === 'agency' ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => setOwnershipType('agency')}
        >
          <Text
            style={ownershipType === 'agency' ? styles.tabTextActive : styles.tabTextInactive}
          >
            Agency
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render Input Fields */}
      {renderInputFields({
        ownershipType,
        errors,
        independentFields,
        multipleOwnersFields,
        agencyFields,
        selectedDOBs,
        handleInputChange,
        showDatePicker,
      })}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDOB}
        onCancel={hideDatePicker}
      />

      <CustomButton
        btnWidth="100%"
        borderRadius={30}
        disabled={false}
        handleClick={validateFields}
        title={intl.formatMessage({ id: 'buttons.next', defaultMessage: 'Next' })}
        showRightIconButton
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  screenTitle: {
    fontSize: 26,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
  },
  screenSubtitle: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,      // a bit more vertical padding for a substantial feel
    paddingHorizontal: 10,    // added horizontal padding for balanced spacing
    borderRadius: 20,         // a modern, rounded rectangle rather than an overly pill-like shape
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#2E7D32', // deep, rich green remains unchanged
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,             // enhanced elevation for a more prominent raised effect
  },
  tabButtonInactive: {
    backgroundColor: '#E8F5E9', // very light green for inactive state
    borderWidth: 1,
    borderColor: '#A5D6A7',     // soft medium green border for subtle definition
  },
  tabTextActive: {
    color: '#FFFFFF',         // white text on the active green background
    fontSize: 16,
    fontWeight: '600',
  },
  tabTextInactive: {
    color: '#2E7D32',         // deep green text for inactive buttons
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PropertyStep6;
