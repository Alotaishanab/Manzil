import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Vibration,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { CustomButton, TopSpace, CustomCheckbox } from '@components';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { ArrowDownIcon } from '@svgs';
import { useIntl } from '@context';
import * as SVGs from '../../../assets/svgs';
import { useAddPropertiesProps } from '../useAddPropertiesProps';
import { globalStyles } from '@globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PropertyStep3 = ({
  waterAccess,
  setWaterAccess,
  electricityAccess,
  setElectricityAccess,
  sewageSystem,
  setSewageSystem,
  selectedPropertyFeatures = [],
  setSelectedPropertyFeatures,
  handleNext,
}: any) => {
  const { intl } = useIntl();
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const { propertyFeatures } = useAddPropertiesProps() || { propertyFeatures: [] };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleFeature = (feature: string) => {
    setSelectedPropertyFeatures((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature)
        : [...prevFeatures, feature]
    );
  };

  const validateAndProceed = () => {
    if (selectedPropertyFeatures.length === 0) {
      setErrors({ selectedPropertyFeatures: 'Please select at least one property feature.' });
      Vibration.vibrate(50);
    } else {
      setErrors({});
      handleNext();
    }
  };

  const renderPropertyType = ({ item }: any) => {
    const Icon = SVGs[item?.icon];
    const isSelected = selectedPropertyFeatures.includes(item?.name);
    return (
      <TouchableOpacity
        onPress={() => toggleFeature(item?.name)}
        style={[
          globalStyles.propertTypeCard,
          {
            borderColor: isSelected
              ? Colors.light.primaryBtn
              : Colors.light.propertyCardLine,
            backgroundColor: isSelected ? Colors.light.primaryBtnLight : '#fff',
            marginHorizontal: 8,
            marginVertical: 5,
          },
        ]}
      >
        <Icon width={50} height={50} />
        <Text numberOfLines={2} style={globalStyles.propertyTypeCardText}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TopSpace top={10} />

        {/* Access Options Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Water access?</Text>
          <View style={styles.centeredRow}>
            <CustomCheckbox
              title="Yes"
              selectedOption={waterAccess}
              onValueChange={setWaterAccess}
              highlightSelected
            />
            <CustomCheckbox
              title="No"
              selectedOption={waterAccess}
              onValueChange={setWaterAccess}
              highlightSelected
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Electricity access?</Text>
          <View style={styles.centeredRow}>
            <CustomCheckbox
              title="Yes"
              selectedOption={electricityAccess}
              onValueChange={setElectricityAccess}
              highlightSelected
            />
            <CustomCheckbox
              title="No"
              selectedOption={electricityAccess}
              onValueChange={setElectricityAccess}
              highlightSelected
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sewage system?</Text>
          <View style={styles.centeredRow}>
            <CustomCheckbox
              title="Yes"
              selectedOption={sewageSystem}
              onValueChange={setSewageSystem}
              highlightSelected
            />
            <CustomCheckbox
              title="No"
              selectedOption={sewageSystem}
              onValueChange={setSewageSystem}
              highlightSelected
            />
          </View>
        </View>

        {/* Property Features Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Property Features</Text>
          <TouchableOpacity
            style={styles.propertyTypeContainer}
            onPress={toggleModal}
          >
            <Text style={styles.propertyTypeText}>
              {selectedPropertyFeatures.length > 0
                ? 'Selected Features'
                : 'Select Property Features'}
            </Text>
            <ArrowDownIcon width={20} height={20} fill="black" />
          </TouchableOpacity>
          {errors.selectedPropertyFeatures && (
            <Text style={styles.errorText}>{errors.selectedPropertyFeatures}</Text>
          )}

          {/* Horizontal ScrollView for Selected Features */}
          {selectedPropertyFeatures.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScrollView}
            >
              {selectedPropertyFeatures.map((feature) => {
                const featureItem = propertyFeatures.find((item) => item?.name === feature);
                return (
                  <View key={feature} style={{ marginHorizontal: 5 }}>
                    {renderPropertyType({ item: featureItem })}
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={validateAndProceed}
          title="Next"
          showRightIconButton={true}
          style={styles.nextButton}
        />
      </ScrollView>

      {/* Modal for Selecting Features */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Close Icon inside modal */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalText}>Property Features</Text>
                  <TouchableOpacity
                    style={styles.closeButtonModal}
                    onPress={toggleModal}
                  >
                    <Image
                      source={require('../../../assets/images/close.png')}
                      style={styles.closeIconImage}
                    />
                  </TouchableOpacity>
                </View>

                {propertyFeatures.length > 0 ? (
                  <FlatList
                    data={propertyFeatures}
                    renderItem={renderPropertyType}
                    keyExtractor={(item) => item?.name}
                    numColumns={3}
                    contentContainerStyle={styles.flatListContainer}
                  />
                ) : (
                  <Text>No features available</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default PropertyStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    margin: 10,
    borderRadius: 30, // Updated to 30 for rounder borders
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderColor: '#ddd', // Optional: Adding border color for clarity
    borderWidth: 1, // Optional: Adjust to ensure the border looks smooth
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 0,
    paddingLeft: 15, // Added paddingLeft to move the title slightly to the right
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  propertyTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 30, // Updated to 30 for rounder borders
    backgroundColor: Colors.light.inputBg,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  propertyTypeText: {
    fontSize: 16,
    color: Colors.light.black,
    fontFamily: fonts.primary.regular,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  horizontalScrollView: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 30, // Updated to 30 for rounder borders
    alignSelf: 'center',
    marginBottom: 30,
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    textAlign: 'center',
  },
  closeButtonModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  nextButton: {
    margin: 20,
  },
});
