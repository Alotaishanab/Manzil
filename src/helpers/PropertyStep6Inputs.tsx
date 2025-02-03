import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TopSpace } from '@components';
import { Colors } from '@colors';
import { fonts } from '@fonts';

export const renderInputFields = ({
  ownershipType,
  errors,
  independentFields,
  multipleOwnersFields,
  agencyFields,
  selectedDOBs,
  handleInputChange,
  showDatePicker,
}) => {
  switch (ownershipType) {
    case 'independent':
      return (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Instrument Number</Text>
            <Text style={styles.explanation}>
              Provide the unique instrument number from your property documents.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter instrument number"
              placeholderTextColor={Colors.light.black}
              style={[styles.textInputFullWidth, errors.instrumentNumber && styles.errorBorder]}
              value={independentFields.instrumentNumber}
              onChangeText={value => handleInputChange('instrumentNumber', value, 'independent')}
            />
            {errors.instrumentNumber && (
              <Text style={styles.errorText}>{errors.instrumentNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Owner ID Number</Text>
            <Text style={styles.explanation}>
              Enter your 10-digit national ID number.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter owner ID number"
              placeholderTextColor={Colors.light.black}
              keyboardType="numeric"
              maxLength={10}
              style={[styles.textInputFullWidth, errors.ownerIDNumber && styles.errorBorder]}
              value={independentFields.ownerIDNumber}
              onChangeText={value => handleInputChange('ownerIDNumber', value, 'independent')}
            />
            {errors.ownerIDNumber && (
              <Text style={styles.errorText}>{errors.ownerIDNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Owner DOB</Text>
            <Text style={styles.explanation}>
              Select your date of birth as per your official document.
            </Text>
            <TopSpace top={10} />
            <TouchableOpacity onPress={() => showDatePicker('independent')}>
              <View pointerEvents="none">
                <TextInput
                  placeholder="Select date of birth"
                  placeholderTextColor={Colors.light.black}
                  value={selectedDOBs.independent}
                  style={[styles.textInputFullWidth, errors.ownerDOB && styles.errorBorder]}
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
            <Text style={styles.explanation}>
              Provide the instrument number from your property documents.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter instrument number"
              placeholderTextColor={Colors.light.black}
              style={[styles.textInputFullWidth, errors.instrumentNumber && styles.errorBorder]}
              value={multipleOwnersFields.instrumentNumber}
              onChangeText={value => handleInputChange('instrumentNumber', value, 'multipleOwners')}
            />
            {errors.instrumentNumber && (
              <Text style={styles.errorText}>{errors.instrumentNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Owner ID Number (One Owner)</Text>
            <Text style={styles.explanation}>
              Enter the 10-digit ID number for one of the owners.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter owner ID number"
              placeholderTextColor={Colors.light.black}
              keyboardType="numeric"
              maxLength={10}
              style={[styles.textInputFullWidth, errors.ownerIDNumber && styles.errorBorder]}
              value={multipleOwnersFields.ownerIDNumber}
              onChangeText={value => handleInputChange('ownerIDNumber', value, 'multipleOwners')}
            />
            {errors.ownerIDNumber && (
              <Text style={styles.errorText}>{errors.ownerIDNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Agency Number</Text>
            <Text style={styles.explanation}>
              Provide the agency number associated with the property.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter agency number"
              placeholderTextColor={Colors.light.black}
              keyboardType="numeric"
              style={[styles.textInputFullWidth, errors.agencyNumber && styles.errorBorder]}
              value={multipleOwnersFields.agencyNumber}
              onChangeText={value => handleInputChange('agencyNumber', value, 'multipleOwners')}
            />
            {errors.agencyNumber && (
              <Text style={styles.errorText}>{errors.agencyNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Owner DOB (One Owner)</Text>
            <Text style={styles.explanation}>
              Select the date of birth for one of the owners.
            </Text>
            <TopSpace top={10} />
            <TouchableOpacity onPress={() => showDatePicker('multipleOwners')}>
              <View pointerEvents="none">
                <TextInput
                  placeholder="Select owner date of birth"
                  placeholderTextColor={Colors.light.black}
                  value={selectedDOBs.multipleOwners}
                  style={[styles.textInputFullWidth, errors.ownerDOB && styles.errorBorder]}
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
            <Text style={styles.explanation}>
              Provide the instrument number from your property documents.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter instrument number"
              placeholderTextColor={Colors.light.black}
              style={[styles.textInputFullWidth, errors.instrumentNumber && styles.errorBorder]}
              value={agencyFields.instrumentNumber}
              onChangeText={value => handleInputChange('instrumentNumber', value, 'agency')}
            />
            {errors.instrumentNumber && (
              <Text style={styles.errorText}>{errors.instrumentNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Commercial Registration Number</Text>
            <Text style={styles.explanation}>
              Enter the commercial registration number from your agency's documents.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter commercial registration number"
              placeholderTextColor={Colors.light.black}
              keyboardType="numeric"
              style={[styles.textInputFullWidth, errors.commercialRegNumber && styles.errorBorder]}
              value={agencyFields.commercialRegNumber}
              onChangeText={value => handleInputChange('commercialRegNumber', value, 'agency')}
            />
            {errors.commercialRegNumber && (
              <Text style={styles.errorText}>{errors.commercialRegNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Agent ID Number</Text>
            <Text style={styles.explanation}>
              Provide the 10-digit agent ID number.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter agent ID number"
              placeholderTextColor={Colors.light.black}
              keyboardType="numeric"
              maxLength={10}
              style={[styles.textInputFullWidth, errors.agentIDNumber && styles.errorBorder]}
              value={agencyFields.agentIDNumber}
              onChangeText={value => handleInputChange('agentIDNumber', value, 'agency')}
            />
            {errors.agentIDNumber && (
              <Text style={styles.errorText}>{errors.agentIDNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Agency Number</Text>
            <Text style={styles.explanation}>
              Enter the registered agency number.
            </Text>
            <TopSpace top={10} />
            <TextInput
              placeholder="Enter agency number"
              placeholderTextColor={Colors.light.black}
              keyboardType="numeric"
              style={[styles.textInputFullWidth, errors.agencyNumber && styles.errorBorder]}
              value={agencyFields.agencyNumber}
              onChangeText={value => handleInputChange('agencyNumber', value, 'agency')}
            />
            {errors.agencyNumber && (
              <Text style={styles.errorText}>{errors.agencyNumber}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Agent DOB</Text>
            <Text style={styles.explanation}>
              Select the agent's date of birth.
            </Text>
            <TopSpace top={10} />
            <TouchableOpacity onPress={() => showDatePicker('agency')}>
              <View pointerEvents="none">
                <TextInput
                  placeholder="Select agent date of birth"
                  placeholderTextColor={Colors.light.black}
                  value={selectedDOBs.agency}
                  style={[styles.textInputFullWidth, errors.agentDOB && styles.errorBorder]}
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

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  explanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
    marginBottom: 8,
  },
  textInputFullWidth: {
    height: 50,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: '#111827',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export { renderInputFields };
