import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomButton, TopSpace} from '@components';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import {useIntl} from '@context';
import * as SVGs from '../../../assets/svgs';
import {useRequestPropertyProps} from '../useRequestPropertyProp';
import {CustomCheckbox} from '../../../components/atoms/CustomCheckbox';
import {globalStyles} from '@globalStyles';

const Step1 = ({selectedProperty, setSelectedProperty, handleNext}: any) => {
  const {intl} = useIntl();
  const {propertyTypes} = useRequestPropertyProps();
  const [propertyType, setPropertyType] = useState(
    intl.formatMessage({id: 'requestPropertyScreen.rent'}),
  );
  const onValueChange = (val: any) => {
    setPropertyType(val);
  };

  const renderPropertyType = ({item}: any) => {
    const Icon = SVGs[item?.icon];
    return (
      <TouchableOpacity
        onPress={() => setSelectedProperty(item?.name)}
        style={[
          globalStyles.propertTypeCard,
          {
            borderColor:
              selectedProperty === item?.name
                ? Colors.light.primaryBtn
                : Colors.light.propertyCardLine,
          },
        ]}>
        <Icon width={50} height={50} />
        <Text style={globalStyles.propertyTypeCardText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Text style={styles.wantText}>
        {intl.formatMessage({id: 'requestPropertyScreen.want-to'})}
      </Text>
      <TopSpace top={10} />
      {/* Sell Rent */}
      <View style={globalStyles.simpleRow}>
        <CustomCheckbox
          title={intl.formatMessage({id: 'requestPropertyScreen.rent'})}
          selectedOption={propertyType}
          onValueChange={onValueChange}
        />
        {/* // "requestPropertyScreen.buy": "Buy", */}
        <CustomCheckbox
          // title={'Rent'}
          title={intl.formatMessage({id: 'requestPropertyScreen.buy'})}
          selectedOption={propertyType}
          onValueChange={onValueChange}
        />
      </View>
      {/* Sell Rent */}
      <TopSpace top={15} />
      <Text style={styles.propertyType}>
        {intl.formatMessage({id: 'requestPropertyScreen.properties-type'})}
      </Text>
      <TopSpace top={10} />

      <FlatList
        data={propertyTypes}
        renderItem={renderPropertyType}
        numColumns={3}
        horizontal={false}
        columnWrapperStyle={styles.propertyColumnWrap}
      />

      <TopSpace top={20} />

      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleNext}
        title={intl.formatMessage({id: 'buttons.next'})}
        showRightIconButton={true}
      />
    </>
  );
};

export default Step1;

const styles = StyleSheet.create({
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
