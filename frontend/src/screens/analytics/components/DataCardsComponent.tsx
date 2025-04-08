import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from '@svgs';

interface DataCardProps {
  data: {
    id: number;
    name: string;
    value: string;
    icon: JSX.Element;
    increase: boolean;
    percent: string;
    style: any;
  }[];
  daysRange: number;
}

const DataCardsComponent: React.FC<DataCardProps> = ({ data, daysRange }) => (
  <View>
    {data.map(item => (
      <View key={item.id} style={item.style}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>{item.icon}</View>
          <View style={styles.textContent}>
            <Text style={styles.metricName}>{item.name}</Text>
            <Text style={styles.metricValue}>{item.value}</Text>
            <View style={styles.metricChange}>
              {item.increase ? (
                <ArrowUpIcon width={14} height={14} color="#28a745" />
              ) : (
                <ArrowDownIcon width={14} height={14} color="#dc3545" />
              )}
              <Text style={[styles.metricPercent, { color: item.increase ? '#28a745' : '#dc3545' }]}>
                {item.percent}%
              </Text>
              <Text style={styles.metricPeriod}>In last {daysRange} days</Text>
            </View>
          </View>
        </View>
      </View>
    ))}
  </View>
);

export default DataCardsComponent;
