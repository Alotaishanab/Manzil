import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Define available property types
const PROPERTY_TYPES = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Studio'];

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    propertyTypes: string[];
    priceMin: string;
    priceMax: string;
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, onApplyFilters }) => {
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [showPropertyTypes, setShowPropertyTypes] = useState<boolean>(false);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((item) => item !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      propertyTypes: selectedPropertyTypes,
      priceMin,
      priceMax,
    });
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedPropertyTypes([]);
    setPriceMin('');
    setPriceMax('');
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      onBackdropPress={onClose}
      style={styles.modal}
      propagateSwipe={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContent}>
          <View style={styles.handleArea}>
            <View style={styles.handle} />
          </View>

          {/* Close Icon */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={require('assets/images/close.png')} style={styles.closeIcon} />
          </TouchableOpacity>

          {/* Modal Title */}
          <Text style={styles.modalTitle}>Filter</Text>

          {/* Filter Options */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Property Type Section */}
            <TouchableOpacity
              style={styles.filterSection}
              onPress={() => setShowPropertyTypes(!showPropertyTypes)}
            >
              <Text style={styles.filterTitle}>Property Type</Text>
            </TouchableOpacity>

            {/* Property Type Options */}
            {showPropertyTypes && (
              <View style={styles.optionsContainer}>
                {PROPERTY_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.optionItem}
                    onPress={() => togglePropertyType(type)}
                  >
                    <Text style={styles.optionText}>
                      {selectedPropertyTypes.includes(type) ? '✔' : '○'} {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Price Range Section */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Price Range</Text>
            </View>

            {/* Price Inputs */}
            <View style={styles.priceContainer}>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceLabel}>Min</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="$0"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={priceMin}
                  onChangeText={setPriceMin}
                />
              </View>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceLabel}>Max</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="$0"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={priceMax}
                  onChangeText={setPriceMax}
                />
              </View>
            </View>
          </ScrollView>

          {/* Clear and Search Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchButton} onPress={handleApplyFilters}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  safeArea: {
    flex: 1,
  },
  modalContent: {
    height: screenHeight ,
    width: screenWidth,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 10,
    right: 15,
    zIndex: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  optionsContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priceInputContainer: {
    flex: 0.48,
  },
  priceLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  priceInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  clearButtonText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#008000', // Green color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FilterModal;
