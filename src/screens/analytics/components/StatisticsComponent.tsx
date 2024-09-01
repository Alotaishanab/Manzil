// components/StatisticsComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface StatisticsComponentProps {
  selectedData: { value: number; label: string };
  totalViews: number;
}

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({ selectedData, totalViews }) => (
  <View style={styles.totalViewsContainer}>
    <View style={{ alignItems: 'center' }}>
      <Text style={[styles.metricValue, { fontSize: 24, color: 'green', fontWeight: 'bold' }]}>
        {selectedData.value}
      </Text>
      <Text style={[styles.metricName, { fontSize: 18, color: 'black' }]}>{selectedData.label}</Text>
    </View>
    <View style={{ alignItems: 'center' }}>
      <Text style={[styles.metricValue, { fontSize: 24, color: 'green', fontWeight: 'bold' }]}>{totalViews}</Text>
      <Text style={[styles.metricName, { fontSize: 18, color: 'black' }]}>Total Views</Text>
    </View>
  </View>
);

export default StatisticsComponent;
