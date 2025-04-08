import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Vibration,
} from 'react-native';
import {
  CustomButton,
  TopSpace,
  CustomCheckbox,
} from '@components';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { useIntl } from '@context';
import { useAddPropertiesProps } from '../useAddPropertiesProps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PropertyStep3 = ({
  waterAccess,
  setWaterAccess,
  electricityAccess,
  setElectricityAccess,
  sewageSystem,
  setSewageSystem,
  handleNext,
}: any) => {
  const { intl } = useIntl();
  const insets = useSafeAreaInsets();
  const [errors, setErrors] = useState<{ form?: string }>({});

  // Updated validate function:
  const validateAndProceed = () => {
    if (!waterAccess || !electricityAccess || !sewageSystem) {
      setErrors({ form: 'Please answer all questions.' });
      Vibration.vibrate(50);
    } else {
      setErrors({});
      handleNext();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopSpace top={10} />

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.screenTitle}>Utilities & Features</Text>
          <Text style={styles.screenExplanation}>
            Select the available utilities for your property.
          </Text>
        </View>

        {errors.form && <Text style={styles.errorText}>{errors.form}</Text>}

        {/* QUESTIONS */}
        <View style={styles.questionsContainer}>
          <View style={styles.questionItem}>
            <Text style={styles.questionText}>Water access?</Text>
            <Text style={styles.questionExplanation}>
              Do you have a reliable water source?
            </Text>
            <View style={styles.optionsRow}>
              <CustomCheckbox
                title="Yes"
                selectedOption={waterAccess}
                onValueChange={setWaterAccess}
              />
              <CustomCheckbox
                title="No"
                selectedOption={waterAccess}
                onValueChange={setWaterAccess}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.questionItem}>
            <Text style={styles.questionText}>Electricity access?</Text>
            <Text style={styles.questionExplanation}>
              Is there a stable electricity connection?
            </Text>
            <View style={styles.optionsRow}>
              <CustomCheckbox
                title="Yes"
                selectedOption={electricityAccess}
                onValueChange={setElectricityAccess}
              />
              <CustomCheckbox
                title="No"
                selectedOption={electricityAccess}
                onValueChange={setElectricityAccess}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.questionItem}>
            <Text style={styles.questionText}>Sewage system?</Text>
            <Text style={styles.questionExplanation}>
              Does the property have an efficient sewage system?
            </Text>
            <View style={styles.optionsRow}>
              <CustomCheckbox
                title="Yes"
                selectedOption={sewageSystem}
                onValueChange={setSewageSystem}
              />
              <CustomCheckbox
                title="No"
                selectedOption={sewageSystem}
                onValueChange={setSewageSystem}
              />
            </View>
          </View>
        </View>

        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={validateAndProceed}
          title="Next"
          showRightIconButton={true}
          style={styles.nextButton}
        />
      </ScrollView>
    </View>
  );
};

export default PropertyStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    textAlign: 'center',
    marginBottom: 15,
  },
  questionsContainer: {
    marginBottom: 25,
  },
  questionItem: {
    marginVertical: 10,
  },
  questionText: {
    fontSize: 18,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 3,
  },
  questionExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.textSecondary || '#555',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  nextButton: {
    marginTop: 10,
    marginBottom: 30,
  },
});
