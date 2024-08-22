import React, {useState} from 'react';
import {useIntl} from '@context';
import {CustomCheckbox} from '../../../../src/screens/requestproperty/components/CustomCheckbox';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomButton, TopSpace} from '@components';
import {globalStyles} from '@globalStyles';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import * as SVGs from '../../../assets/svgs';

import {useAddPropertiesProps} from '../useAddPropertiesProps';

const PropertyStep1 = ({
  selectedPropertyType,
  setSelectedPropertyType,
  handleNext,
}: any) => {
  const {intl} = useIntl();
  const {allPropertyType} = useAddPropertiesProps();
  const [propertyType, setPropertyType] = React.useState(
    intl.formatMessage({id: 'addpropertyScreen.sell'}),
  );

  const onValueChange = (val: any) => {
    setPropertyType(val);
  };

  const [boost, setBoost] = useState(intl.formatMessage({id: 'buttons.yes'}));

  const onValueChangeBoost = (val: React.SetStateAction<string>) => {
    setBoost(val);
  };

  const renderPropertyType = ({item}: any) => {
    const Icon = SVGs[item?.icon];
    return (
      <TouchableOpacity
        onPress={() => setSelectedPropertyType(item?.name)}
        style={[
          globalStyles.propertTypeCard,
          {
            borderColor:
              selectedPropertyType == item?.name
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
    <View style={{flexGrow: 1}}>
      <Text style={styles.wantText}>
        {intl.formatMessage({id: 'addpropertyScreen.want-to'})}
      </Text>
      <TopSpace top={10} />
      {/* Sell Rent */}
      <View style={globalStyles.simpleRow}>
        <CustomCheckbox
          title={intl.formatMessage({id: 'addpropertyScreen.sell'})}
          selectedOption={propertyType}
          onValueChange={onValueChange}
        />
        <CustomCheckbox
          // title={'Rent'}
          title={intl.formatMessage({id: 'addpropertyScreen.rent'})}
          selectedOption={propertyType}
          onValueChange={onValueChange}
        />
      </View>
      <TopSpace top={10} />
      <Text style={styles.wantText}>
        {intl.formatMessage({id: 'addpropertyScreen.feature-property'})}
      </Text>

      <Text style={styles.boost}>
        {intl.formatMessage({id: 'addpropertyScreen.boost-property'})}
      </Text>
      <TopSpace top={20} />
      <View style={globalStyles.simpleRow}>
        <CustomCheckbox
          title={intl.formatMessage({id: 'buttons.yes'})}
          selectedOption={boost}
          onValueChange={onValueChangeBoost}
        />
        <CustomCheckbox
          // title={'Rent'}
          title={intl.formatMessage({id: 'buttons.no'})}
          selectedOption={boost}
          onValueChange={onValueChangeBoost}
        />
      </View>
      <TopSpace top={10} />
      <Text style={styles.wantText}>
        {intl.formatMessage({id: 'addpropertyScreen.properties-type'})}
      </Text>
      <FlatList
        data={allPropertyType}
        renderItem={renderPropertyType}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        contentContainerStyle={{flexGrow: 1}}
        // ListHeaderComponent={ListHeader}
        columnWrapperStyle={styles.propertyColumnWrap}
      />
      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleNext}
        title={intl.formatMessage({id: 'buttons.next'})}
        showRightIconButton={true}
      />
      {/* <TopSpace top={30} /> */}
    </View>
  );
};

export default PropertyStep1;

const styles = StyleSheet.create({
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 17,
    fontFamily: fonts.primary.regular,
  },
  propertyType: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
  },
  boost: {
    fontSize: 10,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
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
