import React from 'react';
import { CustomCheckbox } from '../../../components/atoms/CustomCheckbox';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton, TopSpace } from '@components';
import { globalStyles } from '@globalStyles';
import { Colors } from '@colors';
import { fonts } from '@fonts';

const PropertyStep3 = ({
  waterAccess,
  setWaterAccess,
  electricityAccess,
  setElectricityAccess,
  sewageSystem,
  setSewageSystem,
  handleNext,
}: any) => {
  return (
    <View style={styles.container}>
      <TopSpace top={10} />

      {/* Water Access */}
      <View style={styles.checkboxGroup}>
        <Text style={styles.wantText}>Water access?</Text>
        <View style={styles.centeredRow}>
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
      <TopSpace top={20} />

      {/* Electricity Access */}
      <View style={styles.checkboxGroup}>
        <Text style={styles.wantText}>Electricity access?</Text>
        <View style={styles.centeredRow}>
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
      <TopSpace top={20} />

      {/* Sewage System */}
      <View style={styles.checkboxGroup}>
        <Text style={styles.wantText}>Sewage system?</Text>
        <View style={styles.centeredRow}>
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

export default PropertyStep3;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 17,
    fontFamily: fonts.primary.regular,
    marginBottom: 10,
    textAlign: 'left',
  },
  checkboxGroup: {
    marginBottom: 20,
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
