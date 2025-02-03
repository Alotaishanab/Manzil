import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import * as SVGs from '@svgs';
import { globalStyles } from '@globalStyles';

type PropertyFeaturesModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  propertyFeatures: any[];
  selectedPropertyFeatures: string[];
  toggleFeature: (feature: string) => void;
};

export const PropertyFeaturesModal: React.FC<PropertyFeaturesModalProps> = ({
  isVisible,
  toggleModal,
  propertyFeatures,
  selectedPropertyFeatures,
  toggleFeature,
}) => {
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
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Property Features</Text>
                <TouchableOpacity
                  style={styles.closeButtonModal}
                  onPress={toggleModal}
                >
                  <Image
                    source={require('../../assets/images/close.png')}
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
                <Text style={{ padding: 20 }}>No features available</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PropertyFeaturesModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 30,
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
});
