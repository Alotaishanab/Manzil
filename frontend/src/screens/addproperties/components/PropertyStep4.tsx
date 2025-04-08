import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  ScrollView,
} from 'react-native';
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { useIntl } from '@context';
import { CustomButton, TopSpace, PropertyFeaturesModal } from '@components';
import { useAddPropertiesProps } from '../useAddPropertiesProps';
import { ArrowDownIcon } from '@svgs';

export const PropertyStep4 = ({
  title,
  setTitle,
  description,
  setDescription,
  selectedPropertyFeatures = [],
  setSelectedPropertyFeatures,
  handleNext,
}: any) => {
  const { intl } = useIntl();
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // Maximum character limits
  const TITLE_MAX = 100;
  const DESCRIPTION_MAX = 200;

  // Retrieve propertyFeatures via your hook (fallback to empty array)
  const { propertyFeatures } = useAddPropertiesProps() || { propertyFeatures: [] };

  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title.';
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = 'Please provide a description.';
      valid = false;
    }

    if (!valid) {
      Vibration.vibrate(50);
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleNext();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Render a chip for each selected feature.
  // When the chip is pressed, the feature is removed.
  const renderChip = (feature: string) => {
    return (
      <TouchableOpacity
        key={feature}
        style={styles.chip}
        onPress={() =>
          setSelectedPropertyFeatures((prev: string[]) =>
            prev.filter((f) => f !== feature)
          )
        }
      >
        <Text style={styles.chipText}>{feature}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopSpace top={10} />

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.screenTitle}>Ad Details</Text>
          <Text style={styles.screenExplanation}>
            Provide a catchy title, a brief description, and select the property features.
          </Text>
        </View>

        {/* Ad Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ad Title</Text>
          <Text style={styles.fieldExplanation}>
            Enter a short, engaging title.
          </Text>
          <TextInput
            placeholder="e.g. Spacious Family Home..."
            placeholderTextColor={Colors.light.textSecondary}
            style={[
              styles.textInputFullWidth,
              errors.title && styles.errorBorder,
            ]}
            value={title}
            onChangeText={setTitle}
            maxLength={TITLE_MAX}
          />
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              {title.length}/{TITLE_MAX}
            </Text>
          </View>
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>


        {/* Property Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Property Description</Text>
          <Text style={styles.fieldExplanation}>
            Describe your property briefly.
          </Text>
          <TextInput
            style={[
              styles.descriptionInput,
              errors.description && styles.errorBorder,
            ]}
            placeholder="Enter a brief description..."
            placeholderTextColor={Colors.light.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={DESCRIPTION_MAX}
          />
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              {description.length}/{DESCRIPTION_MAX}
            </Text>
          </View>
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>


        {/* Property Features Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Property Features</Text>
          <Text style={styles.fieldExplanation}>
            Select features that best describe your property.
          </Text>
          {/* Chip Container */}
          <View style={styles.chipContainer}>
            {selectedPropertyFeatures.map((feature) => renderChip(feature))}
            {/* Add Feature Chip */}
            <TouchableOpacity style={styles.addChip} onPress={toggleModal}>
              <Text style={styles.addChipText}>+ Add Feature</Text>
            </TouchableOpacity>
          </View>
        </View>



        {/* Submit Button */}
        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handleSubmit}
          title={intl.formatMessage({ id: 'buttons.next', defaultMessage: 'Next' })}
          showRightIconButton={true}
        />
      </ScrollView>

      {/* Property Features Modal */}
      <PropertyFeaturesModal
        isVisible={modalVisible}
        toggleModal={toggleModal}
        propertyFeatures={propertyFeatures}
        selectedPropertyFeatures={selectedPropertyFeatures}
        toggleFeature={(feature: string) => {
          setSelectedPropertyFeatures((prev: string[]) =>
            prev.includes(feature)
              ? prev.filter((f) => f !== feature)
              : [...prev, feature]
          );
        }}
      />
    </SafeAreaView>
  );
};

export default PropertyStep4;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  screenTitle: {
    fontSize: 26,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
  },
  screenExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 8,
  },
  fieldExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
    marginBottom: 10,
  },
  textInputFullWidth: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
  },
  descriptionInput: {
    height: 150,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 15,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  counterContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  counterText: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primaryBtnLight,
    borderColor: Colors.light.primaryBtn,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.primaryBtn,
  },
  addChip: {
    backgroundColor: Colors.light.inputBg,
    borderColor: Colors.light.inputBg,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  addChipText: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
  },
});
