import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '@colors';
import { fonts } from '@fonts';

interface CompassDirectionModalProps {
  isVisible: boolean;
  onDirectionSelect: (direction: string) => void;
  panY: Animated.Value;
  panResponder: any;
  onRequestClose: () => void;
}

export const CompassDirectionModal: React.FC<CompassDirectionModalProps> = ({
  isVisible,
  onDirectionSelect,
  panY,
  panResponder,
  onRequestClose,
}) => {
  return isVisible ? (
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: panY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.title}>Select Direction</Text>
          <View style={styles.compassContainer}>
            <TouchableOpacity
              style={[styles.directionButton, styles.north]}
              onPress={() => onDirectionSelect('North')}
            >
              <Text style={styles.directionText}>North</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.directionButton, styles.east]}
              onPress={() => onDirectionSelect('East')}
            >
              <Text style={styles.directionText}>East</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.directionButton, styles.south]}
              onPress={() => onDirectionSelect('South')}
            >
              <Text style={styles.directionText}>South</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.directionButton, styles.west]}
              onPress={() => onDirectionSelect('West')}
            >
              <Text style={styles.directionText}>West</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.light.offWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    marginBottom: 20,
    textAlign: 'center',
  },
  compassContainer: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  directionButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    borderRadius: 40,
    position: 'absolute',
  },
  north: {
    top: 0,
    left: '50%',
    marginLeft: -40, // Half of button width to center it horizontally
  },
  east: {
    top: '50%',
    right: 0,
    marginTop: -40, // Half of button height to center it vertically
  },
  south: {
    bottom: 0,
    left: '50%',
    marginLeft: -40, // Half of button width to center it horizontally
  },
  west: {
    top: '50%',
    left: 0,
    marginTop: -40, // Half of button height to center it vertically
  },
  directionText: {
    fontSize: 16,
    color: Colors.light.white,
    fontFamily: fonts.primary.bold,
  },
});

export default CompassDirectionModal;
