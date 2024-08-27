import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import * as SVGs from '../../../assets/svgs';
import { useIntl } from '@context';
import { styles } from '../styles';

const PropertyFeatures: React.FC = () => {
  const { intl } = useIntl();

  const propertiesFeatures = [
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
      id: 2,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.swimming-pool',
      }),
      icon: 'SwimmingpoolIcon',
    },
    {
      id: 1,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.parking',
      }),
      icon: 'ParkingIcon',
    },
  ];

  const renderPropertiesFeatures = ({ item }: any) => {
    const Icon = SVGs[item?.icon];
    return (
      <Pressable style={styles.featuredPropertyCard}>
        <Icon width={30} height={30} />
        <Text style={styles.featuredPropertyCardText}>{item?.name}</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={propertiesFeatures}
        horizontal
        contentContainerStyle={{ marginVertical: 10 }}
        renderItem={renderPropertiesFeatures}
      />
    </View>
  );
};

export default PropertyFeatures;
