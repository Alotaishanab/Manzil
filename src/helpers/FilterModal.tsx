import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as SVGs from '@assets';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import Modal from 'react-native-modal';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FilterModal = ({ isVisible, onClose, onApplyFilters }) => {
  const { intl } = useIntl();
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [isPropertyDetailsOpen, setIsPropertyDetailsOpen] = useState(false);
  const [isSpecificDetailsOpen, setIsSpecificDetailsOpen] = useState(false);
  const [isAdditionalDetailsOpen, setIsAdditionalDetailsOpen] = useState(false);

  const allPropertyType = [
    { id: '1', icon: 'HomeIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.houses' }) },
    { id: '2', icon: 'ApartmentIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.appartments' }) },
    { id: '9', icon: 'LandIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.land' }) },
    { id: '3', icon: 'TowerIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.tower' }) },
    { id: '11', icon: 'ShopIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.shop' }) },
    { id: '4', icon: 'FarmHouseIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.farm-house' }) },
    { id: '5', icon: 'ChaletIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.chalet' }) },
    { id: '6', icon: 'OfficeIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.office' }) },
    { id: '7', icon: 'WarehouseIcon', name: intl.formatMessage({ id: 'requestPropertyScreen.properties-type.warehouse' }) },
    { id: '8', icon: 'WorkerWarehouseIcon', name: intl.formatMessage({ id: 'addpropertyScreen.properties-type.worker-warehouse' }) },
  ];

  const handleSelectPropertyType = (typeId) => {
    setSelectedPropertyType(typeId);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      propertyType: selectedPropertyType,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    });
    onClose();
  };

  const togglePropertyDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPropertyDetailsOpen(!isPropertyDetailsOpen);
  };

  const toggleSpecificDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSpecificDetailsOpen(!isSpecificDetailsOpen);
  };

  const toggleAdditionalDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsAdditionalDetailsOpen(!isAdditionalDetailsOpen);
  };

  const renderPropertyType = ({ item }) => {
    const Icon = SVGs[item.icon];
    const isSelected = selectedPropertyType === item.id;

    return (
      <TouchableOpacity
        onPress={() => handleSelectPropertyType(item.id)}
        style={[
          globalStyles.propertTypeCard,
          styles.propertyTypeCard,
          isSelected && styles.selectedPropertyTypeItem,
        ]}
        accessibilityLabel={`Property type ${item.name}`}
      >
        {Icon && <Icon width={50} height={50} />}
        <Text style={globalStyles.propertyTypeCardText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.5}
      propagateSwipe
      avoidKeyboard
      useNativeDriver
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContent}>
          <View style={styles.dragIndicator} />

          <Text style={styles.modalTitle}>Filter</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Property Types Section */}
            <Text style={styles.filterTitle}>Property Type</Text>
            <FlatList
              data={allPropertyType}
              renderItem={renderPropertyType}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.propertyTypeList}
            />
            <View style={styles.separator} />

            {/* Property Details Section */}
            <TouchableOpacity
              onPress={togglePropertyDetails}
              style={styles.dropdownHeader}
              accessibilityLabel="Toggle Property Details"
            >
              <Text style={styles.dropdownTitle}>Property Details</Text>
              <Text style={styles.dropdownIndicator}>
                {isPropertyDetailsOpen ? '-' : '+'}
              </Text>
            </TouchableOpacity>
            {isPropertyDetailsOpen && (
              <View style={styles.dropdownContent}>
                <Text style={styles.filterSubtitle}>
                  Price Range (£{priceRange[0]} - £{priceRange[1]})
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1000}
                  step={10}
                  value={priceRange[0]}
                  onValueChange={(value) =>
                    setPriceRange([value, priceRange[1]])
                  }
                  minimumTrackTintColor="#008000"
                  thumbTintColor="#008000"
                  accessibilityLabel="Minimum Price Slider"
                />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1000}
                  step={10}
                  value={priceRange[1]}
                  onValueChange={(value) =>
                    setPriceRange([priceRange[0], value])
                  }
                  minimumTrackTintColor="#008000"
                  thumbTintColor="#008000"
                  accessibilityLabel="Maximum Price Slider"
                />
                <Text style={styles.filterSubtitle}>Property Age</Text>
                {/* Additional fields for Property Age, Size, etc. */}
              </View>
            )}
            <View style={styles.separator} />

            {/* Specific Property Details Section */}
            <TouchableOpacity
              onPress={toggleSpecificDetails}
              style={styles.dropdownHeader}
              accessibilityLabel="Toggle Specific Property Details"
            >
              <Text style={styles.dropdownTitle}>Specific Property Details</Text>
              <Text style={styles.dropdownIndicator}>
                {isSpecificDetailsOpen ? '-' : '+'}
              </Text>
            </TouchableOpacity>
            {isSpecificDetailsOpen && (
              <View style={styles.dropdownContent}>
                {selectedPropertyType === '1' && (
                  <>
                    <Text style={styles.filterSubtitle}>Bedrooms</Text>
                    <Text style={styles.filterSubtitle}>Bathrooms</Text>
                    {/* Add additional fields specific to houses */}
                  </>
                )}
                {selectedPropertyType === '6' && (
                  <>
                    <Text style={styles.filterSubtitle}>Number of Floors</Text>
                    {/* Add fields specific to offices */}
                  </>
                )}
                {/* Add conditional fields for other property types */}
              </View>
            )}
            <View style={styles.separator} />

            {/* Additional Details Section */}
            <TouchableOpacity
              onPress={toggleAdditionalDetails}
              style={styles.dropdownHeader}
              accessibilityLabel="Toggle Additional Details"
            >
              <Text style={styles.dropdownTitle}>Additional Details</Text>
              <Text style={styles.dropdownIndicator}>
                {isAdditionalDetailsOpen ? '-' : '+'}
              </Text>
            </TouchableOpacity>
            {isAdditionalDetailsOpen && (
              <View style={styles.dropdownContent}>
                <Text style={styles.filterSubtitle}>Amenities</Text>
                <Text style={styles.filterSubtitle}>Pet Policy</Text>
                {/* Add additional fields for amenities, pet policies, etc. */}
              </View>
            )}
          </ScrollView>
          <View style={styles.separator} />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSelectedPropertyType(null);
                setPriceRange([50, 500]);
                setIsPropertyDetailsOpen(false);
                setIsSpecificDetailsOpen(false);
                setIsAdditionalDetailsOpen(false);
              }}
              accessibilityLabel="Clear All Filters"
            >
              <Text style={styles.clearButtonText}>Clear all</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewResultsButton}
              onPress={handleApplyFilters}
              accessibilityLabel="View Results"
            >
              <Text style={styles.viewResultsButtonText}>View Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    alignItems: 'center', // Centers the modal content horizontally
  },
  modalContent: {
    height: screenHeight * 0.95, // Set to 85% of screen height
    width: screenWidth,
    borderRadius: 30, // Applies 30 radius to all corners
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
    color: Colors.light.headingTitle,
    marginVertical: 10,
  },
  propertyTypeList: {
    paddingVertical: 10,
  },
  propertyTypeCard: {
    height: 105,
    paddingVertical: 5,
    marginHorizontal: 8,
  },
  selectedPropertyTypeItem: {
    borderColor: '#008000',
    borderWidth: 2,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  dropdownTitle: {
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
    color: '#333',
    flex: 1,
    textDecorationLine: 'underline',
  },
  dropdownIndicator: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  dropdownContent: {
    paddingLeft: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  filterSubtitle: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: '#666',
    marginVertical: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#F5F5F5',
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  clearButtonText: {
    color: 'red',
    fontSize: 16,
  },
  viewResultsButton: {
    backgroundColor: '#008000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  viewResultsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FilterModal;
