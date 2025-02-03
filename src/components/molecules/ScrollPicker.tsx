import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';

export const ScrollPicker = ({
  title,
  currentValue,
  setValue,
  options,
  IconComponent,
}) => {
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const ITEM_WIDTH = screenWidth * 0.2; // Adjusted for a compact, modern look
  const totalOptions = options.length;
  // Extend the options array to mimic an infinite loop
  const extendedOptions = [...options, ...options, ...options];

  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = options.indexOf(currentValue);
    if (index >= 0 && flatListRef.current) {
      // Scroll to the middle copy of the list for looping effect
      flatListRef.current.scrollToOffset({
        offset: (index + totalOptions) * ITEM_WIDTH,
        animated: false,
      });
    }
  }, [currentValue, options, ITEM_WIDTH]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollAnimatedValue } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH) % totalOptions;
    const validIndex = index >= 0 ? index : totalOptions + index;
    setValue(options[validIndex]);
    HapticFeedback.trigger('selection');
  };

  const renderItem = ({ item, index }) => {
    // Create an input range for scaling and opacity transitions
    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
      (index + 2) * ITEM_WIDTH,
    ];

    const scale = scrollAnimatedValue.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollAnimatedValue.interpolate({
      inputRange,
      outputRange: [0.6, 0.8, 1, 0.8, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => {
          flatListRef.current.scrollToOffset({
            offset: index * ITEM_WIDTH,
            animated: true,
          });
          setValue(item);
          HapticFeedback.trigger('selection');
        }}
        style={[styles.itemContainer, { width: ITEM_WIDTH }]}
      >
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Text style={styles.itemText}>{item}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.pickerWrapper}>
        {IconComponent && <IconComponent width={30} height={30} style={styles.icon} />}
        <Animated.FlatList
          ref={flatListRef}
          data={extendedOptions}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          bounces={false}
          onScroll={onScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          contentContainerStyle={{
            paddingHorizontal: (screenWidth - ITEM_WIDTH) / 2,
          }}
        />
        <View style={styles.highlight} pointerEvents="none" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 15,
    // Subtle shadow for a modern feel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#4CAF50', // Use your green theme here
    textAlign: 'center',
  },
  pickerWrapper: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513', // Warm brown for item text
    paddingHorizontal: 10,
  },
  icon: {
    marginBottom: 10,
    tintColor: '#4CAF50',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: '35%',
    width: '30%',
    height: '100%',
    borderColor: '#4CAF50', // Green highlight border
    borderWidth: 2,
    borderRadius: 12,
  },
});

export default ScrollPicker;
