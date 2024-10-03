import React, {useRef, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
} from 'react-native';
import {Colors} from '@colors';
import {fonts} from '@fonts';
import * as SVGs from '../../assets/svgs'; // Ensure SVGs are correctly imported
import { useIntl } from '@context';
import { globalStyles } from '@globalStyles';
import { Easing } from 'react-native';

const {height: screenHeight} = Dimensions.get('window');

export const PropertyTypeModal = ({
  isVisible,
  toggleModal = () => {},
  handleClick,
}: any) => {
  const { intl } = useIntl();
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    easing: Easing.in(Easing.ease),
    useNativeDriver: true,
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { target } = evt.nativeEvent;

        // Ignore touches on buttons or interactive elements
        if (target && target.className === 'RCTText') {
          return false; // Don't allow PanResponder to intercept the gesture for buttons/texts
        }
        return gestureState.dy > 0; // Allow drag when swiping down
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 150) {
          closeAnim.start(() => toggleModal());
        } else {
          resetPositionAnim.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (isVisible) {
      resetPositionAnim.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      icon: 'ChalatIcon',
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

  const renderPropertyType = ({item}: any) => {
    console.log('Property type item', item);

    // @ts-ignore
    const Icon = SVGs[item?.icon];
    if (!Icon) {
      console.warn(`Icon ${item?.icon} is not found in SVGs.`);
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => handleClick(item?.name)}
        style={globalStyles.propertTypeCard}>
        <Icon width={50} height={50} />
        <Text style={globalStyles.propertyTypeCardText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{translateY: panY}],
              },
            ]}
            {...panResponder.panHandlers}>
            {/* Draggable Handle */}
            <View style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </View>

            {/* Modal Title */}
            <Text style={styles.modalTitle}>Property Type</Text>

            {/* Property Types List */}
            <FlatList
              data={allPropertyType}
              renderItem={renderPropertyType}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              ListFooterComponent={<View style={{marginBottom: 10}} />}
              ListFooterComponentStyle={{marginBottom: 20}}
              columnWrapperStyle={styles.propertyColumnWrap}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkens background for effect
  },
  modalContainer: {
    backgroundColor: Colors.light.offWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: screenHeight * 0.8, // Takes 80% of screen height
  },
  dragHandleContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'center',
    marginBottom: 10,
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  propertyType: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
  },
});

export default React.memo(PropertyTypeModal);
