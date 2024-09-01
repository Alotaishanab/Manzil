import React, { useRef, useState } from 'react';
import { View, Text, PanResponder, Dimensions, Animated } from 'react-native';
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
  setSelectedData: React.Dispatch<React.SetStateAction<{ value: number; label: string }>>;
  setSelectedDataLineX: React.Dispatch<React.SetStateAction<number | null>>;
  selectedDataLineX: number | null;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  chartData,
  setSelectedData,
  setSelectedDataLineX,
  selectedDataLineX,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = 300; // Adjusted height for better visualization
  const [scrollX] = useState(new Animated.Value(0)); // State for horizontal scrolling

  // PanResponder to handle horizontal scrolling
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        scrollX.setOffset(scrollX._value); // Initialize offset
      },
      onPanResponderMove: (e, gestureState) => {
        const chartWidth = screenWidth - 40; // Subtract padding/margin if necessary
        const index = Math.min(
          chartData.labels.length - 1,
          Math.max(0, Math.floor((gestureState.moveX / chartWidth) * chartData.labels.length))
        );

        // Update selected data dynamically
        setSelectedData({
          value: chartData.datasets[0].data[index],
          label: `Views on ${chartData.labels[index]}`,
        });

        // Update the vertical line position
        setSelectedDataLineX(gestureState.moveX - 20); // Adjust the X offset as needed
      },
      onPanResponderRelease: () => {
        scrollX.flattenOffset(); // Reset scroll offset after release
      },
    })
  ).current;

  return (
    <View style={styles.fullWidthCard}>
      <Text style={[styles.chartTitle, { marginLeft: 40 }]}>Views</Text>
      <View {...panResponder.panHandlers}>
        <LineChart
          data={chartData}
          width={screenWidth} // Full width of the screen
          height={chartHeight} // Increased height of the chart
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            fillShadowGradient: '#e0ffeb', // Light green for the chart background
            fillShadowGradientOpacity: 1,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // Matching theme green color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForBackgroundLines: {
              strokeDasharray: '', // solid background lines with no dashes
              strokeWidth: 0.5,
              color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#228B22', // Dark green color for the dots
            },
            propsForLabels: {
              fontSize: 10,
              fontWeight: 'bold',
              color: '#000',
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
          formatXLabel={(value) => `${value}`}
          onDataPointClick={({ value, index, x, y }) => {
            setSelectedData({ value: chartData.datasets[0].data[index], label: `Views on ${chartData.labels[index]}` });

            // Adding a vertical line on data point click
            setSelectedDataLineX(x);
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: -20,
          }}
        />
        {/* Vertical Line Decorator */}
        {selectedDataLineX !== null && (
          <View
            style={{
              position: 'absolute',
              left: selectedDataLineX,
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: '#228B22',
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ChartComponent;
