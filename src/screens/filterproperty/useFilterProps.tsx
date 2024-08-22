import {useIntl} from '@context';
import {useState} from 'react';

export const useFilterProps = () => {
  const {intl} = useIntl();

  const [selectedHouseType, setSelectedHouseType] = useState('All');
  const [bedroomCount, setBedroomCount] = useState(null);
  const [bathroomCount, setBathroomCount] = useState(null);
  const bedrooms = [1, 2, 3, '4+'];

  const houseTypes = [
    {
      id: 1,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.all',
      }),
      icon: 'AllHousesIcon',
    },
    {
      id: 2,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.houses',
      }),
      icon: 'HousesIcon',
    },
    {
      id: 3,

      name: intl.formatMessage({
        id: 'filterPropertyScreen.apartments',
      }),
      icon: 'BuildingIcon',
    },
    {
      id: 4,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.land',
      }),
      icon: 'LandTabIcon',
    },
  ];

  return {
    houseTypes,
    bedroomCount,
    bathroomCount,
    setBathroomCount,
    setBedroomCount,
    selectedHouseType,
    setSelectedHouseType,
    bedrooms,
  };
};
