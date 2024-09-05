/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { Fragment, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomButton, CustomMap, DropDownPicker, TopSpace } from '@components';
import ImageCorouselPicker from './ImageCorouselPicker'; // Ensure this is the correct import path
import { fonts } from '@fonts';
import { Colors } from '@colors';
import { globalStyles } from '@globalStyles';
import { useIntl } from '@context';
import * as SVGs from '../../../assets/svgs';
import { AreaIcon, DoubleTcIcon } from '@svgs';
import BedroomView from '../../../../src/screens/filterproperty/components/BedroomView'; // Ensure this is the correct import path
import { useAddPropertiesProps } from '../useAddPropertiesProps';
import { useNavigation } from '@react-navigation/native';

const PropertyStep5 = ({ selectedType, handleNext, handleBack }) => {
  const navigation = useNavigation();
  const { intl } = useIntl();
  const { propertyFeatures } = useAddPropertiesProps();
  const [propertyFeature, setPropertyFeature] = useState<string | null>(null);
  const [bedroomCount, setBedroomCount] = useState<number | string | null>(null);
  const [bathroomCount, setBathroomCount] = useState<number | string | null>(null);
  const [valueFloor, setValueFloor] = useState<string>('');
  const [isFocusFloor, setIsFocusFloor] = useState<boolean>(false);
  const [priceMeter, setPriceMeter] = useState<string | null>(null);
  const [isFocusPriceMeter, setIsFocusPriceMeter] = useState<boolean>(false);
  const [images, setImages] = useState<Array<any>>([]); // Assuming an array of images
  const [mapType, setMapType] = useState<string>('standard');
  const [description, setDescription] = useState<string>('');
  const [floor, setFloor] = useState<any>(null); // Assuming `floor` can be an image or any other type

  const bedrooms = [1, 2, 3, '4+'];
  const data = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
  ];

  const handlePicker = (selectedImages: Array<any>) => {
    setImages(selectedImages);
  };

  const handleAddFloorPicker = () => {
    // Implement logic to add floor plan (e.g., opening image picker)
  };

  const renderPropertyType = ({ item }: any) => {
    const Icon = SVGs[item?.icon];
    return (
      <TouchableOpacity
        onPress={() => setPropertyFeature(item?.name)}
        style={[
          globalStyles.propertTypeCard,
          {
            borderColor:
              propertyFeature === item?.name
                ? Colors.light.primaryBtn
                : Colors.light.propertyCardLine,
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

  const ListFooter = () => (
    <>
      <TopSpace top={10} />

      {/* Description Input */}
      <Text style={styles.selectPrice}>
        {intl.formatMessage({ id: 'requestPropertyScreen.add-description' })}
      </Text>
      <TextInput
        placeholder={intl.formatMessage({
          id: 'requestPropertyScreen.add-description-placeholder',
        })}
        textAlignVertical="top"
        numberOfLines={10}
        multiline={true}
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
      />

      {/* Address and Map */}
      <TopSpace top={10} />
      <Text style={styles.selectPrice}>Address</Text>
      <TopSpace top={5} />
      <View>
        <CustomMap
          height={250}
          showHome={true}
          showMaximizeScreen={true}
          isAbsoluteFill={false}
          mapType={mapType}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setMapType(prevType => (prevType === 'standard' ? 'satellite' : 'standard'))}
          style={styles.mapToggleButton}
        >
          <SVGs.MapLayerIcon width={25} height={25} />
        </TouchableOpacity>
      </View>

      {/* Floor Plan Input */}
      <TopSpace top={10} />
      <TouchableOpacity
        onPress={handleAddFloorPicker}
        activeOpacity={0.8}
        style={styles.addFloorplanBtn}
      >
        {floor ? (
          <Image
            source={floor}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          <View style={globalStyles.simpleRow}>
            <SVGs.MultiWindowAddIcon width={45} height={45} />
            <Text style={styles.addImageText}>
              {intl.formatMessage({
                id: 'addpropertyScreen.feature-property.add-floor-plan',
              })}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TopSpace top={20} />

      {/* Next Button */}
      <CustomButton
        btnWidth={'100%'}
        borderRadius={30}
        disabled={false}
        handleClick={handleNext}
        title={intl.formatMessage({ id: 'buttons.next' })}
        showRightIconButton={true}
      />
    </>
  );

  return (
    <Fragment>
      {/* Image Carousel Picker */}
      <ImageCorouselPicker images={images} handlePicker={handlePicker} />

      {/* Description, Price, and Size Input */}
      <TopSpace top={10} />
      <View style={globalStyles.simpleRow}>
        <View style={{ flex: 1 }}>
          <View style={globalStyles.simpleRow}>
            <Text style={styles.selectPrice}>
              {intl.formatMessage({ id: 'requestPropertyScreen.select-price' })}
            </Text>
            <DoubleTcIcon width={20} height={20} />
          </View>
          <TextInput placeholder="E.g 500,000 SAR" style={styles.textInputRow} />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={globalStyles.simpleRow}>
            <AreaIcon width={30} height={30} />
            <Text style={styles.selectPrice}>
              {intl.formatMessage({ id: 'requestPropertyScreen.size' })}
            </Text>
          </View>
          <TextInput placeholder="E.g 500,000 SAR" style={styles.textInputRow} />
        </View>
      </View>

      {/* Rooms, Bedrooms, and Price Inputs */}
      <View style={styles.bedroomBathroomContent}>
        {selectedType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.office' }) ? (
          <BedroomView
            selectedOption={bedroomCount}
            setSelectedOption={setBedroomCount}
            iconName="BedIcon"
            data={bedrooms}
            title={intl.formatMessage({ id: 'addpropertyScreen.rooms' })}
          />
        ) : selectedType !== intl.formatMessage({ id: 'requestPropertyScreen.properties-type.land' }) ? (
          <>
            <BedroomView
              selectedOption={bedroomCount}
              setSelectedOption={setBedroomCount}
              iconName="BedIcon"
              data={bedrooms}
              title={intl.formatMessage({ id: 'filterPropertyScreen.bedrooms' })}
            />
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={styles.selectPrice}>
              {intl.formatMessage({ id: 'landPropertyDetailScreen.price-one-meter' })}
            </Text>

            <DropDownPicker
              placeholder="Select"
              value={priceMeter}
              dropdownWidth={'95%'}
              data={data}
              borderRadius={30}
              isFocus={isFocusPriceMeter}
              setIsFocus={setIsFocusPriceMeter}
              labelField="label"
              valueField="value"
              onChange={setPriceMeter}
            />
          </View>
        )}

        {/* Bathrooms or Direction Input */}
        {selectedType !== intl.formatMessage({ id: 'requestPropertyScreen.properties-type.land' }) ? (
          <BedroomView
            iconName="BathroomIcon"
            data={bedrooms}
            title={intl.formatMessage({ id: 'filterPropertyScreen.bathrooms' })}
            selectedOption={bathroomCount}
            setSelectedOption={setBathroomCount}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={styles.selectPrice}>
              {intl.formatMessage({ id: 'landPropertyDetailScreen.direction' })}
            </Text>

            <DropDownPicker
              placeholder="Select"
              value={valueFloor}
              data={data}
              dropdownWidth={'95%'}
              borderRadius={30}
              isFocus={isFocusFloor}
              setIsFocus={setIsFocusFloor}
              labelField="label"
              valueField="value"
              onChange={setValueFloor}
            />
          </View>
        )}
      </View>

      {/* Floor Level for Office Properties */}
      {selectedType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.office' }) && (
        <>
          <Text style={styles.selectPrice}>
            {intl.formatMessage({ id: 'addpropertyScreen.feature-property.floor-level' })}
          </Text>

          <DropDownPicker
            placeholder="Select"
            value={valueFloor}
            data={data}
            borderRadius={30}
            isFocus={isFocusFloor}
            setIsFocus={setIsFocusFloor}
            labelField="label"
            valueField="value"
            onChange={setValueFloor}
          />
        </>
      )}

      {/* Property Features */}
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.featuredPropertyText}>Properties Features</Text>
      </View>
      <FlatList
        data={propertyFeatures}
        showsVerticalScrollIndicator={false}
        renderItem={renderPropertyType}
        numColumns={3}
        horizontal={false}
        keyboardShouldPersistTaps="always"
        columnWrapperStyle={styles.propertyColumnWrap}
        ListFooterComponent={ListFooter}
      />
    </Fragment>
  );
};

export default PropertyStep5;

const styles = StyleSheet.create({
  selectPrice: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 5,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: Colors.light.inputBg,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    height: 150,
    backgroundColor: Colors.light.inputBg,
  },
  textInputRow: {
    height: 50,
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 5,
    backgroundColor: Colors.light.inputBg,
    color: Colors.light.headingTitle,
  },
  bedroomBathroomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
  },
  featuredPropertyText: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
  },
  addFloorplanBtn: {
    borderWidth: 1,
    borderColor: Colors.light.inputBg,
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Colors.light.inputBg,
  },
  addImageText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginLeft: 10,
  },
  mapToggleButton: {
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 8,
    right: 10,
    position: 'absolute',
    top: 80,
    alignSelf: 'flex-end',
  },
});
