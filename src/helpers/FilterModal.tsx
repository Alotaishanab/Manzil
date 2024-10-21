import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you are using Ionicons or adjust accordingly
import Colors from '../constants/Colors'; // Adjust path if Colors is defined elsewhere

const { height: screenHeight } = Dimensions.get('window');

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close-outline" size={24} color="#000" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.modalTitle}>Filter</Text>

          {/* Your filter content goes here */}
          <View style={styles.contentContainer}>
            {/* Example placeholder for filter options */}
            <Text style={styles.placeholderText}>Filter options will appear here...</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: screenHeight * 0.9, // 90% of the screen height
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'Jost',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
});

export default FilterModal;
