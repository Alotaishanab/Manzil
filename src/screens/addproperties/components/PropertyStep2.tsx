import React, { useState } from 'react';
import { CustomCheckbox } from '../../../../src/screens/requestproperty/components/CustomCheckbox';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton, TopSpace } from '@components';
import { globalStyles } from '@globalStyles';
import { Colors } from '@colors';
import { fonts } from '@fonts';

const PropertyStep2 = ({ handleNext }: any) => {
  // State for each checkbox group
  const [waterAccess, setWaterAccess] = useState('No');
  const [electricityAccess, setElectricityAccess] = useState('No');
  const [sewageSystem, setSewageSystem] = useState('No');

  // Handlers for changing checkbox values
  const onValueChangeWater = (val: React.SetStateAction<string>) => {
    setWaterAccess(val);
  };

  const onValueChangeElectricity = (val: React.SetStateAction<string>) => {
    setElectricityAccess(val);
  };

  const onValueChangeSewage = (val: React.SetStateAction<string>) => {
    setSewageSystem(val);
  };

  return (
    <View style={styles.container}>
      
      <TopSpace top={10} />

      {/* Checkboxes for Utilities */}
      <View style={styles.checkboxGroup}>
        <Text style={styles.wantText}>Water access?</Text>
        <View style={styles.centeredRow}>
          <CustomCheckbox
            title="Yes"
            selectedOption={waterAccess}
            onValueChange={onValueChangeWater}
          />
          <CustomCheckbox
            title="No"
            selectedOption={waterAccess}
            onValueChange={onValueChangeWater}
          />
        </View>
      </View>
      <TopSpace top={20} />

      <View style={styles.checkboxGroup}>
        <Text style={styles.wantText}>Electricity access?</Text>
        <View style={styles.centeredRow}>
          <CustomCheckbox
            title="Yes"
            selectedOption={electricityAccess}
            onValueChange={onValueChangeElectricity}
          />
          <CustomCheckbox
            title="No"
            selectedOption={electricityAccess}
            onValueChange={onValueChangeElectricity}
          />
        </View>
      </View>
      <TopSpace top={20} />

      <View style={styles.checkboxGroup}>
        <Text style={styles.wantText}>Sewage system?</Text>
        <View style={styles.centeredRow}>
          <CustomCheckbox
            title="Yes"
            selectedOption={sewageSystem}
            onValueChange={onValueChangeSewage}
          />
          <CustomCheckbox
            title="No"
            selectedOption={sewageSystem}
            onValueChange={onValueChangeSewage}
          />
        </View>
      </View>
      <TopSpace top={30} />

      {/* Next Button */}
      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleNext}
        title="Next"
        showRightIconButton={true}
      />
    </View>
  );
};

export default PropertyStep2;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.primary.regular,
    color: Colors.light.headingTitle,
    textAlign: 'left',
    marginVertical: 20,
  },
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 17,
    fontFamily: fonts.primary.regular,
    marginBottom: 10,
    textAlign: 'left',
  },
  checkboxGroup: {
    alignItems: 'left',
    marginBottom: 20,
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
