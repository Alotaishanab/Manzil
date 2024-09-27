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
  const ITEM_WIDTH = 60; // Smaller for better design
  const { width } = Dimensions.get('window');

  // Scroll animation
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = options.indexOf(currentValue);
    if (index >= 0 && flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: index * ITEM_WIDTH,
        animated: true,
      });
    }
  }, [currentValue, options]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollAnimatedValue } } }],
    { useNativeDriver: false }
  );

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
      outputRange: [0.8, 1.2, 1.4, 1.2, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollAnimatedValue.interpolate({
      inputRange,
      outputRange: [0.3, 0.6, 1, 0.6, 0.3],
      extrapolate: 'clamp',
    });

    const isSelected = currentValue === item;

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
          isSelected && styles.selectedItem, // Highlight selected item
        ]}
      >
        <Animated.Text
          style={[
            styles.itemText,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          {item}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setValue(options[index]);
    HapticFeedback.trigger('selection');
  };

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.picker}>
        <IconComponent width={30} height={30} style={styles.icon} />
        <Animated.FlatList
          ref={flatListRef}
          data={options}
          keyExtractor={(item) => item.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          bounces={false}
          onScroll={onScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          contentContainerStyle={{
            paddingHorizontal: (width - ITEM_WIDTH) / 2,
          }}
        />
        {/* Overlay to highlight the selected item */}
        <View style={styles.highlight} pointerEvents="none" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 12,
    elevation: 4, // Subtle shadow for depth
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  picker: {
    width: '100%',
    height: 150,
  },
  itemContainer: {
    width: 50,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#E6F4F1', // Subtle highlight for selected item
    borderRadius: 8,
    padding: 5,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  icon: {
    marginBottom: 10,
  },
  highlight: {
    position: 'absolute',
    top: 60,
    bottom: 60,
    left: 0,
    right: 0,
    borderColor: '#00BFA6',
    borderWidth: 1,
  },
});
