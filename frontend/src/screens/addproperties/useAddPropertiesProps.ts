import {useIntl} from '@context';

export const useAddPropertiesProps = () => {
  const {intl} = useIntl();
  // const allPropertyType = [
  //   {
  //     id: '1',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.houses',
  //     }),
  //   },
  //   {
  //     id: '2',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.appartments',
  //     }),
  //   },
  //   {
  //     id: '3',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.land',
  //     }),
  //   },
  //   {
  //     id: '4',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.villa',
  //     }),
  //   },
  //   {
  //     id: '5',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.farm-house',
  //     }),
  //   },
  //   {
  //     id: '6',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.chalet',
  //     }),
  //   },
  //   {
  //     id: '7',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.office',
  //     }),
  //   },
  //   {
  //     id: '8',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.warehouse',
  //     }),
  //   },
  //   {
  //     id: '9',
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.tower',
  //     }),
  //   },
  // ];

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
      icon: 'LandIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.land',
      }),
    },
    {
      id: '4',
      icon: 'VillaIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.villa',
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
      icon: 'TowerIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.tower',
      }),
    },
  ];

  const propertyFeatures = [
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
      id: 3,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.balacony',
      }),
      icon: 'BalaconyIcon',
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

  return {allPropertyType, propertyFeatures};
};
