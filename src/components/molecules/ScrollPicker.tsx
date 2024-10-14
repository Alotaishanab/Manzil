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
  const ITEM_WIDTH = screenWidth * 0.25; // Adjusted for a smaller, compact design

  // Circular scroll logic
  const totalOptions = options.length;
  const extendedOptions = [...options, ...options, ...options]; // Extend the array to loop

  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = options.indexOf(currentValue);
    if (index >= 0 && flatListRef.current) {
      // Start from the middle to allow infinite loop-like scroll behavior
      flatListRef.current.scrollToOffset({
        offset: (index + totalOptions) * ITEM_WIDTH, 
        animated: false,
      });
    }
  }, [currentValue, options]);

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
    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
      (index + 2) * ITEM_WIDTH,
    ];

    const scale = scrollAnimatedValue.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.2, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollAnimatedValue.interpolate({
      inputRange,
      outputRange: [0.5, 0.8, 1, 0.8, 0.5],
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
        style={[
          styles.itemContainer,
          { width: ITEM_WIDTH },
        ]}
      >
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Text style={styles.itemText}>{item}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.picker}>
        <IconComponent width={30} height={60} style={styles.icon} />
        <Animated.FlatList
          ref={flatListRef}
          data={extendedOptions} // Use the extended list for circular effect
          keyExtractor={(item, index) => `${item}-${index}`} // Unique key
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
  pickerContainer: {
    width: '20%',  // Wider container for better visibility
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingVertical: 20,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
  },
  picker: {
    width: '100%',
    height: 160,
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
    color: '#333',
    paddingHorizontal: 10,
  },
  icon: {
    marginBottom: 15,
    width: 30,
    height: 30,
    tintColor: '#007AFF',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: Dimensions.get('window').width * 0.35,
    width: Dimensions.get('window').width * 0.3,
    height: '100%',
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 12,
  },
});
