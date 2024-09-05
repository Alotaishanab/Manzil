import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler } from 'react-native-reanimated';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import * as SVGs from '../../../assets/svgs';
import { useIntl } from '@context';
import { globalStyles } from '@globalStyles';

const screenHeight = Dimensions.get('window').height;

export const TypeModal = ({
  isVisible,
  toggleModal = () => {},
  handleClick,
}: any) => {
  const { intl } = useIntl();

  // Initialize translateY to screen height so it starts off-screen
  const translateY = useSharedValue(screenHeight);

  // Effect to handle modal visibility
  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0); // Animate modal into view
    } else {
      translateY.value = withSpring(screenHeight); // Animate modal out of view
    }
  }, [isVisible]);

  // Gesture handler for dragging the modal
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      if (translateY.value > screenHeight / 3) {
        translateY.value = withSpring(screenHeight); // Move off screen
        setTimeout(() => toggleModal(), 300); // Close modal with a delay to allow animation
      } else {
        translateY.value = withSpring(0); // Reset position with animation
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // All property types with their corresponding icons and names
  const allPropertyType = [
    {
      id: '1',
      icon: 'HomeIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.houses',
      }),
    },
    {
      id: '2',
      icon: 'ApartmentIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.appartments',
      }),
    },
    {
      id: '3',
      icon: 'TowerIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.tower',
      }),
    },
    {
      id: '11',
      icon: 'ShopIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.shop',
      }),
    },
    {
      id: '4',
      icon: 'FarmHouseIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.farm-house',
      }),
    },
    {
      id: '5',
      icon: 'ChaletIcon', // Corrected icon name to ChaletIcon
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.chalet',
      }),
    },
    {
      id: '6',
      icon: 'OfficeIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.office',
      }),
    },
    {
      id: '7',
      icon: 'WarehouseIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.warehouse',
      }),
    },
    {
      id: '8',
      icon: 'WorkerWarehouseIcon',
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.worker-warehouse',
      }),
    },
  ];

  // Function to render each property type item
  const renderPropertyType = ({ item }: any) => {
    const Icon = SVGs[item?.icon];
    if (!Icon) {
      console.error(`Icon component not found for ${item.icon}`);
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => handleClick(item?.name)}
        style={styles.propertyTypeCard}>
        <Icon width={50} height={50} />
        <Text style={styles.propertyTypeCardText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return isVisible ? (
    <View style={styles.overlay}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Select Property Type</Text>
          </View>
          <FlatList
            data={allPropertyType}
            renderItem={renderPropertyType}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.propertyColumnWrap}
            ListFooterComponent={<View style={{ height: 20 }} />}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  ) : null;
};

export default React.memo(TypeModal);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.light.offWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    height: '60%', // Adjust height as needed
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? fonts.tertiary.bold : fonts.secondary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'center',
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  propertyTypeCard: {
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    ...globalStyles.shadowStyle,
  },
  propertyTypeCardText: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
    marginTop: 10,
    textAlign: 'center',
  },
});
