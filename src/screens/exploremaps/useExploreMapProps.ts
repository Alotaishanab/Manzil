import {useIntl} from '@context';
import {useNavigation} from '@react-navigation/native';

export const useExploreMapProps = () => {
  const navigation: any = useNavigation();
  const {intl} = useIntl();
  const handleFilter = () => {
    navigation.navigate('FilterProperty');
  };
  const onFocusInput = () => {
    navigation.navigate('ExploreSearch');
  };

  const markers = [
    {
      id: 1,
      latitude: 37.7881,
      longitude: -122.4304,
      title: 'SR 5,253',
      description: 'Description 1',
    },
    {
      id: 2,
      latitude: 37.7885,
      longitude: -122.4344,
      title: 'SR 5.9',
      description: 'Description 2',
    },
    {
      id: 3,
      latitude: 37.78835,
      longitude: -122.4384,
      title: 'SR 55',
      description: 'Description 3',
    },
    {
      id: 4,
      latitude: 37.797,
      longitude: -122.4284,
      title: 'SR 3',
      description: 'Description 4',
    },
  ];

  const apartmentAmenities = [
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
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
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
  ];

  const towerAmenities = [
    // {
    //   id: 20,
    //   name: intl.formatMessage({
    //     id: 'addpropertyScreen.properties-type.yard',
    //   }),
    //   icon: 'YardIcon',
    // },

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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
    {
      id: 57,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.cctv'}),
      icon: 'CctvIcon',
    },
    {
      id: 86,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.pets'}),
      icon: 'PetsIcon',
    },
    {
      id: 99,
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
  const shopAmenities = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
    {
      id: 57,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.cctv'}),
      icon: 'CctvIcon',
    },
    {
      id: 57,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.rooftop',
      }),
      icon: 'RooftopIcon',
    },
  ];

  const farmhouseAmenities = [
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
        id: 'filterPropertyScreen.storage',
      }),
      icon: 'StorageIcon',
    },
    {
      id: 3,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.water',
      }),
      icon: 'WaterIcon',
    },
    {
      id: 4,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.electricity',
      }),
      icon: 'ElectricityIcon',
    },
    {
      id: 5,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.wifi',
      }),
      icon: 'WifiIcon',
    },
  ];

  const chaletAmenities = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
  ];

  // const officeAmenities = [
  //   {
  //     id: 1,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.parking',
  //     }),
  //     icon: 'ParkingIcon',
  //   },
  //   {
  //     id: 2,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.swimming-pool',
  //     }),
  //     icon: 'SwimmingpoolIcon',
  //   },
  //   {
  //     id: 3,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.balacony',
  //     }),
  //     icon: 'BalaconyIcon',
  //   },
  //   {
  //     id: 8,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.basement',
  //     }),
  //     icon: 'HomeIcon',
  //   },
  //   {
  //     id: 12,
  //     name: intl.formatMessage({
  //       id: 'filterPropertyScreen.reception',
  //     }),
  //     icon: 'ReceptionIcon',
  //   },
  //   {
  //     id: 12,
  //     name: intl.formatMessage({
  //       id: 'filterPropertyScreen.water-front-access',
  //     }),
  //     icon: 'SurfingIcon',
  //   },
  // ];
  const apartmentFeatures = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 6,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.yard'}),
      icon: 'YardIcon',
    },

    {
      id: 9,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.smoking-permitted',
      }),
      icon: 'SmokingIcon',
    },
    {
      id: 7,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.cctv'}),
      icon: 'CctvIcon',
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
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
    {
      id: 6,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.pets'}),
      icon: 'PetsIcon',
    },
  ];

  const towerFeatures = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
    {
      id: 57,
      name: intl.formatMessage({id: 'addpropertyScreen.properties-type.cctv'}),
      icon: 'CctvIcon',
    },

    {
      id: 57,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.rooftop',
      }),
      icon: 'RooftopIcon',
    },
    {
      id: 10,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.elevator',
      }),
      icon: 'ElevatorIcon',
    },
  ];

  const officeWorkerFeatures = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
  ];

  const shopWarehouseFeatures = [
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
        id: 'filterPropertyScreen.storage',
      }),
      icon: 'StorageIcon',
    },
    {
      id: 3,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.water',
      }),
      icon: 'WaterIcon',
    },
    {
      id: 4,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.electricity',
      }),
      icon: 'ElectricityIcon',
    },
    {
      id: 5,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.wifi',
      }),
      icon: 'WifiIcon',
    },
  ];
  const farmhouseFeatures = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
  ];

  const chaletFeatures = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.water-front-access',
      }),
      icon: 'SurfingIcon',
    },
  ];
  const officeAmenities = [
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
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.water-front-access',
      }),
      icon: 'SurfingIcon',
    },
  ];

  // const apartmentAmenities = [
  //   {
  //     id: 1,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.parking',
  //     }),
  //     icon: 'ParkingIcon',
  //   },
  //   {
  //     id: 2,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.swimming-pool',
  //     }),
  //     icon: 'SwimmingpoolIcon',
  //   },
  //   {
  //     id: 3,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.balacony',
  //     }),
  //     icon: 'BalaconyIcon',
  //   },
  //   {
  //     id: 4,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.gym',
  //     }),
  //     icon: 'GymIcon',
  //   },

  //   {
  //     id: 6,
  //     name: intl.formatMessage({id: 'addpropertyScreen.properties-type.pets'}),
  //     icon: 'PetsIcon',
  //   },
  //   {
  //     id: 7,
  //     name: intl.formatMessage({id: 'addpropertyScreen.properties-type.cctv'}),
  //     icon: 'CctvIcon',
  //   },
  //   {
  //     id: 8,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.basement',
  //     }),
  //     icon: 'HomeIcon',
  //   },
  //   {
  //     id: 9,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.smoking-permitted',
  //     }),
  //     icon: 'SmokingIcon',
  //   },

  //   {
  //     id: 10,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.elevator',
  //     }),
  //     icon: 'ElevatorIcon',
  //   },
  //   {
  //     id: 11,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.maid-room',
  //     }),
  //     icon: 'MaidIcon',
  //   },
  //   {
  //     id: 12,
  //     name: intl.formatMessage({
  //       id: 'addpropertyScreen.properties-type.driver-room',
  //     }),
  //     icon: 'DriverIcon',
  //   },
  //   {
  //     id: 12,
  //     name: intl.formatMessage({
  //       id: 'filterPropertyScreen.reception',
  //     }),
  //     icon: 'ReceptionIcon',
  //   },
  //   {
  //     id: 6,
  //     name: intl.formatMessage({id: 'addpropertyScreen.properties-type.pets'}),
  //     icon: 'PetsIcon',
  //   },
  //   {
  //     id: 7,
  //     name: intl.formatMessage({id: 'addpropertyScreen.properties-type.cctv'}),
  //     icon: 'CctvIcon',
  //   },
  // ];

  return {
    handleFilter,
    onFocusInput,
    markers,

    towerFeatures,
    apartmentFeatures,
    officeWorkerFeatures,
    shopWarehouseFeatures,
    farmhouseFeatures,
    chaletFeatures,
  };
};
