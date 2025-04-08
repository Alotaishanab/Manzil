// components/ModalComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import { modalStyles } from '../styles';

interface ModalComponentProps {
  modalVisible: boolean;
  hideModal: () => void;
  handleDaysRangeChange: (range: number) => void;
  slideAnim: Animated.Value;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  modalVisible,
  hideModal,
  handleDaysRangeChange,
  slideAnim,
}) => (
  modalVisible && (
    <TouchableWithoutFeedback onPress={hideModal}>
      <View style={modalStyles.overlay}>
        <Animated.View style={[modalStyles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={modalStyles.modalHandle} />
          <Text style={modalStyles.modalTitle}>Select Date Range</Text>
          <View style={modalStyles.modalOptionsContainer}>
            <TouchableOpacity onPress={() => handleDaysRangeChange(7)} style={modalStyles.modalOptionCircle}>
              <Text style={modalStyles.modalOptionText}>7 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDaysRangeChange(14)} style={modalStyles.modalOptionCircle}>
              <Text style={modalStyles.modalOptionText}>14 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDaysRangeChange(30)} style={modalStyles.modalOptionCircle}>
              <Text style={modalStyles.modalOptionText}>30 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDaysRangeChange(60)} style={modalStyles.modalOptionCircle}>
              <Text style={modalStyles.modalOptionText}>60 Days</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
);

export default ModalComponent;
