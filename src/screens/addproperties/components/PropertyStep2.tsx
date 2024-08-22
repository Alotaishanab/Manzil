/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useState} from 'react';
import {CustomButton, CustomMap, DropDownPicker, TopSpace} from '@components';
import ImageCarouselPicker from './ImageCorouselPicker';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import {globalStyles} from '@globalStyles';
import {useIntl} from '@context';
import * as SVGs from '../../../assets/svgs';
import {AreaIcon, DoubleTcIcon} from '@svgs';
import BedroomView from '../../../../src/screens/filterproperty/components/BedroomView';
import {useAddPropertiesProps} from '../useAddPropertiesProps';
import {map} from '@assets';
import MapSkeleton from 'src/screens/exploreproperties/components/MapLoading';
import {useNavigation} from '@react-navigation/native';

const PropertyStep2 = ({
  floor,
  handleAddFloorPicker,
  selectedType,
  images,
  handlePicker,
}: any) => {
  const navigation = useNavigation();
  const {intl} = useIntl();
  const {propertyFeatures} = useAddPropertiesProps();
  const [propertyFeature, setPropertyFeature] = useState(null);
  const [bedroomCount, setBedroomCount] = React.useState(null);
  const [bathroomCount, setBathroomCount] = React.useState(null);
  const bedrooms = [1, 2, 3, '4+'];
  const [priceMeter, setPriceMeter] = useState(null);
  const [isFocusPriceMeter, setIsFocusPriceMeter] = React.useState(false);

  const renderPropertyType = ({item}: any) => {
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
        ]}>
        <Icon width={50} height={50} />
        <Text numberOfLines={2} style={globalStyles.propertyTypeCardText}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const [valueFloor, setValueFloor] = React.useState<any>('');

  const [isFocusFloor, setIsFocusFloor] = React.useState(false);
  const data: any = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
  ];
  const [mapType, setMapType] = useState('standard');

  const handleNext = () => {
    navigation.navigate('Checkout', {type: 'pay'});
  };

  const ListFooter = () => {
    return (
      <>
        <TopSpace top={10} />

        <Text style={styles.selectPrice}>
          {intl.formatMessage({id: 'requestPropertyScreen.add-description'})}
        </Text>
        <TextInput
          placeholder={intl.formatMessage({
            id: 'requestPropertyScreen.add-description-placeholder',
          })}
          textAlignVertical="top"
          numberOfLines={10}
          multiline={true}
          style={styles.descriptionInput}
        />
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
            onPress={() => {
              if (mapType === 'standard') {
                setMapType('satellite');
              } else {
                setMapType('standard');
              }
            }}
            style={{
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
            }}>
            <SVGs.MapLayerIcon width={25} height={25} />
          </TouchableOpacity>
        </View>

        <TopSpace top={10} />

        <TouchableOpacity
          onPress={handleAddFloorPicker}
          activeOpacity={0.8}
          style={styles.addFloorplanBtn}>
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

        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handleNext}
          title={intl.formatMessage({id: 'buttons.next'})}
          showRightIconButton={true}
        />
      </>
    );
  };
  return (
    <Fragment>
      <ImageCarouselPicker images={images} handlePicker={handlePicker} />
      <TopSpace top={10} />
      <View style={globalStyles.simpleRow}>
        <View style={{flex: 1}}>
          <View style={globalStyles.simpleRow}>
            <Text style={styles.selectPrice}>
              {intl.formatMessage({id: 'requestPropertyScreen.select-price'})}
            </Text>
            <DoubleTcIcon width={20} height={20} />
          </View>
          <TextInput
            placeholder="E.g 500,000 SAR"
            style={styles.textInputRow}
          />
        </View>

        <View style={{flex: 1, marginLeft: 10}}>
          <View style={globalStyles.simpleRow}>
            <AreaIcon width={30} height={30} />
            <Text style={styles.selectPrice}>
              {intl.formatMessage({id: 'requestPropertyScreen.size'})}
            </Text>
          </View>
          <TextInput
            placeholder="E.g 500,000 SAR"
            style={styles.textInputRow}
          />
        </View>
      </View>

      {/* rooms bedrooms price  */}

      <View style={styles.bedroomBathroomContent}>
        {selectedType ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.office',
        }) ? (
          <BedroomView
            selectedOption={bedroomCount}
            setSelectedOption={setBedroomCount}
            iconName="BedIcon"
            data={bedrooms}
            title={intl.formatMessage({
              id: 'addpropertyScreen.rooms',
            })}
          />
        ) : selectedType !==
          intl.formatMessage({
            id: 'requestPropertyScreen.properties-type.land',
          }) ? (
          <>
            <BedroomView
              selectedOption={bedroomCount}
              setSelectedOption={setBedroomCount}
              iconName="BedIcon"
              data={bedrooms}
              title={intl.formatMessage({
                id: 'filterPropertyScreen.bedrooms',
              })}
            />
          </>
        ) : (
          <View style={{flex: 1}}>
            <Text style={styles.selectPrice}>
              {intl.formatMessage({
                id: 'landPropertyDetailScreen.price-one-meter',
              })}
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
              onChange={value => {
                setPriceMeter(value);
              }}
            />
          </View>
        )}

        {/* second view */}
        {selectedType !==
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.land',
        }) ? (
          <BedroomView
            iconName="BathroomIcon"
            data={bedrooms}
            title={intl.formatMessage({
              id: 'filterPropertyScreen.bathrooms',
            })}
            selectedOption={bathroomCount}
            setSelectedOption={setBathroomCount}
          />
        ) : (
          <View style={{flex: 1}}>
            <Text style={styles.selectPrice}>
              {intl.formatMessage({
                id: 'landPropertyDetailScreen.direction',
              })}
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
              onChange={value => {
                setValueFloor(value);
              }}
            />
          </View>
        )}
      </View>

      {/*  */}
      <TopSpace top={10} />
      {selectedType ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.office',
        }) && (
        <>
          <Text style={styles.selectPrice}>
            {intl.formatMessage({
              id: 'addpropertyScreen.feature-property.floor-level',
            })}
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
            onChange={value => {
              setValueFloor(value);
            }}
          />
        </>
      )}

      <View style={{marginVertical: 10}}>
        <Text style={styles.featuredPropertyText}>Properties Features</Text>
      </View>
      <FlatList
        data={propertyFeatures}
        showsVerticalScrollIndicator={false}
        renderItem={renderPropertyType}
        numColumns={3}
        horizontal={false}
        keyboardShouldPersistTaps="always"
        // ListHeaderComponentStyle={{zIndex: 100}}
        // ListHeaderComponent={ListHeader}
        columnWrapperStyle={styles.propertyColumnWrap}
        ListFooterComponent={ListFooter}
        ListFooterComponentStyle={
          {
            // paddingBottom: 100,
          }
        }
      />
    </Fragment>
  );
};

export default PropertyStep2;

const styles = StyleSheet.create({
  selectPrice: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginRight: 10,
  },
  rowInput: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputRow: {
    height: 45,
    borderColor: Colors.light.inputBg,
    width: '100%',
    paddingHorizontal: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    borderWidth: 0.5,
    backgroundColor: Colors.light.inputBg,
    borderRadius: 30,
  },
  bedroomBathroomContent: {
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderTopColor: Colors.light.greyDescription,
    borderBottomColor: Colors.light.greyDescription,
    paddingVertical: 10,
  },
  featuredPropertyText: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 1,
  },
  propertTypeCard: {
    // borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 5,
    // borderColor: Colors.light.greyDescription,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  propertyCardText: {
    textAlign: 'center',
    width: '80%',
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    flexWrap: 'wrap',
    fontSize: 11,
  },
  descriptionInput: {
    backgroundColor: Colors.light.inputBg,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  addImageText: {
    fontSize: 24,
    marginLeft: 5,
    fontFamily: fonts.primary.regular,
    color: Colors.light.headingTitle,
  },
  addFloorplanBtn: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
  },
});
