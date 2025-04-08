import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface StatisticsComponentProps {
  selectedData: { value: number; label: string };
  totalViews: number;
}

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({ selectedData, totalViews }) => (
  <View style={styles.statisticsContainer}>
    <View style={styles.selectedDataContainer}>
      <Text style={styles.selectedDataValue}>{selectedData.value}</Text>
      <Text style={styles.selectedDataLabel}>{selectedData.label}</Text>
    </View>
    <View style={styles.totalViewsContainer}>
      <Text style={styles.totalViewsValue}>{totalViews}</Text>
      <Text style={styles.totalViewsLabel}>Total Views</Text>
    </View>
  </View>
);

export default StatisticsComponent;
