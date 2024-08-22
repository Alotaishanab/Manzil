import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GenericModal} from './GenericModal';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import * as SVGs from '../../assets/svgs';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';

export const BuildingAmenities = ({
  isVisible,
  modalTitle,
  toggleModal = () => {},
  handleClick,
  data,
}: any) => {
  const {intl} = useIntl();
  const allPropertyType: any = [
    {
      id: '1',
      icon: 'HomeIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.houses',
      }),
    },
    {
      id: '2',
      icon: 'ApartmentIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.appartments',
      }),
    },
    {
      id: '3',
      icon: 'TowerIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.tower',
      }),
    },
    {
      id: '11',
      icon: 'ShopIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.shop',
      }),
    },
    {
      id: '4',
      icon: 'FarmHouseIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.farm-house',
      }),
    },

    {
      id: '5',
      icon: 'ChalatIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.chalet',
      }),
    },
    {
      id: '6',
      icon: 'OfficeIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.office',
      }),
    },
    {
      id: '7',
      icon: 'WarehouseIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.warehouse',
      }),
    },
    {
      id: '8',
      icon: 'WorkerWarehouseIcon',
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.worker-warehouse',
      }),
    },
  ];
  // console.log('data', data);
  const renderPropertyType = ({item}: any) => {
    const Icon = SVGs[item?.icon];
    return (
      <TouchableOpacity
        onPress={() => {
          handleClick(item?.name);
        }}
        style={globalStyles.propertTypeCard}>
        <Icon width={50} height={50} />
        <Text style={globalStyles.propertyTypeCardText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GenericModal
      isVisible={isVisible}
      modalTitle={intl.formatMessage({
        id: 'requestPropertyScreen.building-amenities',
      })} //
      centeredModal={false}
      toggleModal={toggleModal}>
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

export const BuildingAmenitiesModal = React.memo(BuildingAmenities);

const styles = StyleSheet.create({
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
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
  text: {
    fontFamily: fonts.primary.medium,
    fontSize: 10,
    color: Colors.light.headingTitle,
  },
});
