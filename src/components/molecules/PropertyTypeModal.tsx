import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GenericModal} from './GenericModal';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import * as SVGs from '../../assets/svgs';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';

export const PropertyType = ({
  isVisible,
  modalTitle,
  toggleModal = () => {},
  selectedPropertyType,
  handleClick,
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
  console.log('PropertyType selectedPropertyType::', selectedPropertyType);
  const renderPropertyType = ({item}: any) => {
    const Icon = SVGs[item?.icon];
    return (
      <TouchableOpacity
        onPress={() => handleClick(item?.name)}
        style={globalStyles.propertTypeCard}>
        <Icon width={50} height={50} />
        <Text style={globalStyles.propertyTypeCardText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <GenericModal
      isVisible={isVisible}
      modalTitle={modalTitle}
      centeredModal={false}
      borderTopLeftRadius={40}
      showCloseButton={false}
      centerText={true}
      borderTopRightRadius={40}
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
      toggleModal={toggleModal}>
      <FlatList
        data={allPropertyType}
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

export const PropertyTypeModal = React.memo(PropertyType);

const styles = StyleSheet.create({
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },

  propertyType: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
  },
});
