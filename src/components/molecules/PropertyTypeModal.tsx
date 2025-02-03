import React, { useRef, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Modal,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import * as SVGs from '../../assets/svgs';
import { useIntl } from '@context';

const { height: screenHeight } = Dimensions.get('window');

export const PropertyTypeModal = ({
  isVisible,
  onRequestClose = () => {},
  handleClick,
}: any) => {
  const { intl } = useIntl();
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const SWIPE_CLOSE_THRESHOLD = 150;

  // Open animation (200ms)
  const openAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 200,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  });

  // Close animation (200ms)
  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 200,
    easing: Easing.in(Easing.quad),
    useNativeDriver: true,
  });

  // PanResponder attached to the entire modal container
  const containerPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        // Allow dragging down only
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_CLOSE_THRESHOLD) {
          closeAnim.start(() => onRequestClose());
        } else {
          openAnim.start();
        }
      },
    })
  ).current;

  // When modal becomes visible, animate it into view
  useEffect(() => {
    if (isVisible) {
      openAnim.start();
    }
  }, [isVisible]);

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
      id: '9',
      icon: 'LandIcon',
      name: intl.formatMessage({
        id: 'requestPropertyScreen.properties-type.land',
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
      icon: 'ChaletIcon',
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

  const renderPropertyType = ({ item }: any) => {
    const Icon = SVGs[item?.icon];
    if (!Icon) {
      console.warn(`Icon ${item?.icon} is not found in SVGs.`);
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => handleClick(item?.name)}
        style={styles.propertyTypeCard}
      >
        <Icon width={40} height={40} />
        <Text style={styles.propertyTypeText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modalOverlay}>
          {/* Tapping outside the modal closes it */}
          <View style={styles.outsideArea} />
          <TouchableWithoutFeedback>
            <Animated.View
              {...containerPanResponder.panHandlers}
              style={[styles.modalContainer, { transform: [{ translateY: panY }] }]}
            >
              {/* Header area with drag handle and header text */}
              <View style={styles.headerWrapper}>
                <View style={styles.dragHandleContainer}>
                  <View style={styles.dragHandle} />
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.modalTitle}>Property Type</Text>
                  <Text style={styles.modalExplanation}>
                    Select the type that best describes your property.
                  </Text>
                </View>
              </View>
              {/* Property Types List */}
              <FlatList
                data={allPropertyType}
                renderItem={renderPropertyType}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                columnWrapperStyle={styles.propertyColumnWrap}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default React.memo(PropertyTypeModal);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  outsideArea: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: screenHeight * 0.8,
  },
  headerWrapper: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  dragHandleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  dragHandle: {
    width: 60,
    height: 4,
    backgroundColor: '#CCC',
    borderRadius: 2,
  },
  headerTextContainer: {
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.darkText || '#000',
    marginBottom: 4,
  },
  modalExplanation: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.textSecondary || '#555',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  propertyTypeCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flex: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  propertyTypeText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.darkText || '#000',
    textAlign: 'center',
  },
});
