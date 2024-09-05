import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from '../styles';

interface ChartComponentProps {
  chartData: {
    labels: string[];
    datasets: Array<{
      data: number[];
      color: (opacity?: number) => string;
      strokeWidth: number;
    }>;
  };
  setSelectedData: (data: { value: number; label: string }) => void;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  chartData,
  setSelectedData,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = 300; // Adjusted height for better visualization
  const chartWidth = screenWidth - 40; // Chart width minus padding/margin
  const totalDays = chartData.labels.length; // Total days based on labels length
  const stepWidth = chartWidth / (totalDays - 1); // Width per day segment

  // State to track the indicator position
  const [indicatorPosition, setIndicatorPosition] = useState<{ x: number; y: number } | null>(null);

  // Generate a full date range based on the labels
  const fullDateRange = chartData.labels;

  // Function to update selected data and indicator position
  const updateSelection = (x: number) => {
    const boundedX = Math.max(0, Math.min(chartWidth, x)); // Keep within chart bounds

    // Calculate the corresponding date index
    const exactIndex = (boundedX / chartWidth) * (fullDateRange.length - 1);
    const nearestIndex = Math.round(exactIndex); // Find the nearest index

    // Find the date and value corresponding to the nearest index
    const selectedDate = fullDateRange[nearestIndex];
    const selectedValue = chartData.datasets[0].data[nearestIndex];

    // Update the selected data
    setSelectedData({
      value: selectedValue,
      label: `Views on ${selectedDate}`,
    });

    // Update indicator position
    const yValue = chartHeight - (selectedValue / Math.max(...chartData.datasets[0].data)) * chartHeight;
    setIndicatorPosition({ x: boundedX, y: yValue });
  };

  // Function to handle chart tap
  const handleTapOnChart = (e: any) => {
    const xPosition = e.nativeEvent.locationX - 20; // Adjust for padding/margin
    updateSelection(xPosition);
  };

  return (
    <View style={styles.fullWidthCard}>
      <Text style={[styles.chartTitle, { marginLeft: 40 }]}>Views</Text>
      <TouchableWithoutFeedback onPress={handleTapOnChart}>
        <View style={{ position: 'relative' }}>
          <LineChart
            data={{
              labels: fullDateRange,
              datasets: [
                {
                  data: chartData.datasets[0].data,
                  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={chartWidth} // Set chart width correctly
            height={chartHeight}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForBackgroundLines: {
                strokeDasharray: '',
                strokeWidth: 0.5,
                color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
              },
              propsForDots: {
                r: '0', // Remove default dots
                strokeWidth: '0',
                stroke: '#228B22',
              },
            }}
            bezier
            verticalLabelRotation={0}
            withHorizontalLabels={true}
            withVerticalLines={false}
            withOuterLines={false}
            xLabelsOffset={-10}
            yLabelsOffset={5}
            segments={5}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginLeft: -20,
            }}
          />
          {/* Indicator for the selected point */}
          {indicatorPosition && (
            <View
              style={{
                position: 'absolute',
                left: indicatorPosition.x,
                top: indicatorPosition.y,
                width: 10,
                height: 10,
                backgroundColor: 'red',
                borderRadius: 5,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ChartComponent;
