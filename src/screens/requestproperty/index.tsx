import React, {useState} from 'react';
import {HeaderBackButtonTitle, TopSpace} from '@components';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useIntl} from '@context';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import Step1 from './components/Step1';
import Step2 from './components/Step2';

export const RequestProperty = () => {
  const {intl} = useIntl();
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(2);
  };
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <SafeAreaView style={[globalStyles.wrapScreen, {}]}>
      <HeaderBackButtonTitle text={''} />
      <TopSpace top={10} />

      {/* Request Propery step content starts */}
      <View style={globalStyles.rowSpaceBetween}>
        <Text style={styles.heading}>
          {intl.formatMessage({id: 'requestPropertyScreen.header'})}
        </Text>

        <View style={globalStyles.simpleRow}>
          <Text style={styles.stepText}>
            {intl.formatMessage({id: 'requestPropertyScreen.step'})}{' '}
            {step === 1
              ? intl.formatMessage({id: 'requestPropertyScreen.step-1'})
              : intl.formatMessage({id: 'requestPropertyScreen.step-2'})}{' '}
            {'/'}
            {intl.formatMessage({id: 'requestPropertyScreen.step-2'})}
          </Text>
        </View>
      </View>
      {/* Request Propery step content ends */}
      <TopSpace top={10} />
      {step === 1 && (
        <Step1
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          handleNext={handleNext}
        />
      )}
      {step === 2 && <Step2 selectedProperty={selectedProperty} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {backgroundColor: Colors.light.background, flex: 1, padding: 24},
  heading: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 20,
    // fontSize:fonts
  },
  stepText: {
    color: Colors.light.primaryBtn,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  propertyType: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
  },
  propertTypeCard: {
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 5,
    borderColor: Colors.light.greyDescription,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
