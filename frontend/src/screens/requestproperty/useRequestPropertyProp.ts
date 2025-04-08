import {useIntl} from '@context';

export const useRequestPropertyProps = () => {
  const {intl} = useIntl();
  const propertyTypes: any = [
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
      icon: 'TowerIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.tower',
      }),
    },
  ];
  return {propertyTypes};
};
