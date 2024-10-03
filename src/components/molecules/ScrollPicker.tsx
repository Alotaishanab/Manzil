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
  const ITEM_WIDTH = screenWidth * 0.35;  // Slightly larger items for better visibility

  // Smooth scrolling effect
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

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setValue(options[index]);
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
      outputRange: [0.9, 1.2, 1.5, 1.2, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollAnimatedValue.interpolate({
      inputRange,
      outputRange: [0.5, 0.8, 1, 0.8, 0.5],
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
          isSelected && styles.selectedItem,
          { width: ITEM_WIDTH },  // Ensure the itemContainer uses the dynamic width
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

  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.picker}>
        <IconComponent width={40} height={40} style={styles.icon} />
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
    width: '45%',  // Adjust width for each picker container
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  picker: {
    width: '100%',
    height: 160,
  },
  itemContainer: {
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#A0F0E0',
    borderRadius: 12,
    padding: 10,
    borderColor: '#00BFA6',
    borderWidth: 2,
  },
  itemText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
  },
  icon: {
    marginBottom: 15,
    width: 40,
    height: 40,
  },

});
