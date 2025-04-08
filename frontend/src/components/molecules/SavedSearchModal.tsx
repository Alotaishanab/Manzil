import React, { useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity, PanResponder, Animated } from 'react-native';

export const SavedSearchModal = ({ isVisible, toggleVisible, onSelectOption }: any) => {
  const searchOptions: any = [
    { label: 'Most Recent', value: 'Most Recent' },
    { label: 'Least Recent', value: 'Least Recent' },
    { label: 'Most Expensive', value: 'Most Expensive' },
    { label: 'Least Expensive', value: 'Least Expensive' },
  ];

  const handleSelection = (value: string) => {
    onSelectOption(value); // Call the parent function to handle selection
    toggleVisible(); // Close modal after selection
  };

  // Draggable modal implementation
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0,
      onPanResponderMove: Animated.event([null, { dy: panY }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          toggleVisible(); // Close the modal if dragged down sufficiently
        } else {
          Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start(); // Spring back if not dragged enough
        }
      },
    })
  ).current;

  const modalTranslateY = panY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 300],
    extrapolate: 'clamp',
  });

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={toggleVisible}
    >
      <TouchableWithoutFeedback onPress={toggleVisible}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.modalContent,
          { transform: [{ translateY: modalTranslateY }] },
        ]}
        {...panResponder.panHandlers} // Attach pan responder to the entire modal content
      >
        <Text style={styles.modalTitle}>Sort Options</Text>

        {/* Render sorting options as minimalistic text-based buttons */}
        <View style={styles.optionsContainer}>
          {searchOptions.map((option: any) => (
            <TouchableOpacity
              key={option.value}
              underlayColor="#f0f0f0" // Highlight effect when pressed
              onPress={() => handleSelection(option.value)}
              style={styles.optionButton}
            >
              <View>
                <Text style={styles.optionText}>{option.label}</Text>
                <View style={styles.divider} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff', // Standard white background
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Standard dark text
    marginBottom: 15,
    textAlign: 'left',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333', // Standard dark text color
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc', // Light gray divider
    marginTop: 8,
  },
});

export default SavedSearchModal;
