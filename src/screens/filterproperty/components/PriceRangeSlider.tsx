import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
// import MultiSlider from 'react-native-multi-slider';
import {Svg, Rect} from 'react-native-svg';
import {Colors} from '@colors'; // Adjust the import path according to your project structure
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useIntl} from '@context';
import {fonts} from '../../../../src/assets/fonts';

const PriceRangeSlider = () => {
  const {intl} = useIntl();
  const [range, setRange] = useState([50, 150]);
  //   const [twoWayValue, setTwoWayValue] = useState([10, 30]);

  const {width} = Dimensions.get('window');
  const numberOfBars = 40;
  const barWidth = width / numberOfBars;

  const handleValuesChange = values => {
    setRange(values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {' '}
        {intl.formatMessage({
          id: 'filterPropertyScreen.price-range',
        })}
      </Text>
      <Text style={styles.subtitle}>
        {intl.formatMessage({
          id: 'filterPropertyScreen.price-fees',
        })}
      </Text>

      <Svg height="100" width="100%" style={styles.histogram}>
        {Array.from({length: numberOfBars}).map((_, index) => (
          <Rect
            key={index}
            x={index * 20}
            y={Math.random() * 50}
            width={'15'}
            height={Math.random() * 50 + 15}
            fill={
              index * (200 / numberOfBars) >= range[0] &&
              index * (200 / numberOfBars) <= range[1]
                ? 'black'
                : 'grey'
            }
          />
        ))}
      </Svg>

      <MultiSlider
        values={range}
        onValuesChange={handleValuesChange}
        sliderLength={300}
        min={0}
        max={100}
        trackStyle={{
          backgroundColor: 'red',
        }}
        step={1}
        allowOverlap={true}
        snapped={true}
        markerStyle={{backgroundColor: Colors.light.unselectBtn}}
        selectedStyle={{backgroundColor: Colors.light.primaryBtn}}
        unselectedStyle={{backgroundColor: 'silver'}}
      />

      {/* <View style={styles.priceRange}>
        <Text style={styles.priceText}>${range[0]}</Text>
        <Text style={styles.priceText}>${range[1]}</Text>
      </View> */}
    </View>
  );
};

PriceRangeSlider.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number),
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 16,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  histogram: {
    marginVertical: 20,
  },
  slider: {
    alignSelf: 'center',
  },
  priceRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default React.memo(PriceRangeSlider);
