/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GenericModal} from './GenericModal';
import {useIntl} from '@context';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import * as SVGs from '../../assets/svgs';
import {globalStyles} from '@globalStyles';

export const PropertiesFeature = ({
  isVisible,
  toggleModal,
  setPropertyFeature,
  selectedProperties,
  handleSelectAmenities,
  data,
}: any) => {
  const {intl} = useIntl();
  const propertiesFeatures = [
    {
      id: 1,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.parking',
      }),
      icon: 'ParkingIcon',
    },
    {
      id: 2,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.swimming-pool',
      }),
      icon: 'SwimmingpoolIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.balcony',
      }),
      icon: 'BalconyIcon',
    },

    {
      id: 4,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.gym',
      }),
      icon: 'GymIcon',
    },
    {
      id: 5,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.yard',
      }),
      icon: 'YardIcon',
    },
    {
      id: 6,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.pets'}),
      icon: 'PetsIcon',
    },
    {
      id: 7,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.cctv'}),
      icon: 'CctvIcon',
    },
    {
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 9,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.smoking-permitted',
      }),
      icon: 'SmokingIcon',
    },
    {
      id: 10,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.elevator',
      }),
      icon: 'ElevatorIcon',
    },
    {
      id: 11,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.maid-room',
      }),
      icon: 'MaidIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.driver-room',
      }),
      icon: 'DriverIcon',
    },
  ];

  const renderPropertyType = ({item}: any) => {
    const Icon = SVGs[item?.icon];
    console.log('selectedProperties', selectedProperties);
    const isSelected = selectedProperties?.includes(item?.name);

    return (
      <TouchableOpacity
        onPress={() => {
          console.log('item?.name', item?.name);
          handleSelectAmenities(item?.name);
          setPropertyFeature(item?.name);
          // toggleModal();
        }}
        style={[
          globalStyles.propertTypeCard,
          {
            borderColor: isSelected
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
    <GenericModal
      isVisible={isVisible}
      modalTitle={intl.formatMessage({
        id: 'addpropertyScreen.property-features',
      })}
      showCloseButton={false}
      centerText={true}
      centeredModal={false}
      borderTopLeftRadius={40}
      borderTopRightRadius={40}
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
      toggleModal={toggleModal}>
      <TouchableOpacity onPress={toggleModal}>
        <SVGs.Close width={20} height={20} />
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderPropertyType}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        // style={{marginHorizontal: 6}}
        // ListHeaderComponent={ListHeader}
        ListFooterComponent={<View style={{marginBottom: 10}} />}
        ListFooterComponentStyle={{marginBottom: 20}}
        columnWrapperStyle={styles.propertyColumnWrap}
      />
    </GenericModal>
  );
};

export const PropertiesFeaturesModal = React.memo(PropertiesFeature);

const styles = StyleSheet.create({
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  title: {
    fontFamily: fonts.secondary.bold,
    fontSize: 10,
    color: Colors.light.headingTitle,
  },
  propertTypeCard: {
    // borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 5,
    borderColor: Colors.light.greyDescription,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  propertyType: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
  },
});
