/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Colors} from '@colors';
import {CustomButton, DropDownPicker, TopSpace} from '@components';
import {useIntl} from '@context';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import {
  AreaIcon,
  BathroomIcon,
  BedIcon,
  DoubleTcIcon,
  LocationPinIcon,
} from '@svgs';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

const Step2 = ({selectedProperty}) => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
  const [value, setValue] = useState<any>('');
  const [isFocus, setIsFocus] = useState(false);
  const [valueCity, setValueCity] = useState<any>('');
  const [valueBedroom, setValueBedroom] = useState<any>('');
  const [isFocusBedroom, setIsFocusBedroom] = useState(false);
  const [isFocusCity, setIsFocusCity] = useState(false);
  const [valueArea, setValueArea] = useState<any>('');
  const [isFocusArea, setIsFocusArea] = useState(false);
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
  const [direction, setDirection] = useState(null);
  const [isFocusMax, setIsFocusMax] = useState(false);
  const allDirections = [
    {label: 'South', value: 'South'},
    {label: 'North', value: 'North'},
    {label: 'West', value: 'West'},
    {label: 'East', value: 'East'},
  ];
  const cities = [
    {label: 'Mansehra', value: '1'},
    {label: 'Abbottabad', value: '2'},
    {label: 'Lahore', value: '3'},
    {label: 'Islaambad', value: '4'},
    {label: 'Karachi', value: '5'},
    {label: 'Haripur', value: '6'},
    {label: 'Taxila', value: '7'},
  ];
  const handleSendRequest = () => {
    navigation.navigate('PropertiesRequestStatus');
  };
  console.log('Step 2:', selectedProperty);
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.simpleRow}>
        <Text style={[styles.selectPrice, {}]}>
          {intl.formatMessage({id: 'requestPropertyScreen.select-price'})}
        </Text>
        <DoubleTcIcon width={20} height={20} />
      </View>
      <TopSpace top={10} />
      <View style={styles.rowInput}>
        <TextInput
          placeholder="E.g 500,000 SAR"
          placeholderTextColor={Colors.light.headingTitle}
          style={styles.priceInput}
        />

        <TextInput
          placeholder="E.g 10,000,000 SAR"
          placeholderTextColor={Colors.light.headingTitle}
          style={styles.rightPriceInput}
        />
      </View>
      <TopSpace top={10} />

      {selectedProperty !==
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.land',
        }) &&
        selectedProperty !==
          intl.formatMessage({
            id: 'requestPropertyScreen.properties-type.shop',
          }) && (
          <View style={globalStyles.simpleRow}>
            <View style={{flex: 1}}>
              <View style={globalStyles.simpleRow}>
                <BathroomIcon width={30} height={30} />
                <Text
                  style={[
                    styles.headingTitle,
                    {
                      marginLeft: 5,
                    },
                  ]}>
                  {intl.formatMessage({id: 'requestPropertyScreen.bathrooms'})}
                </Text>
              </View>

              <DropDownPicker
                placeholder="Select"
                value={value}
                data={data}
                isFocus={isFocus}
                borderRadius={30}
                setValue={setValue}
                dropdownWidth={String(Dimensions.get('screen').width / 3)}
                setIsFocus={setIsFocus}
                labelField="label"
                valueField="value"
                onChange={value => {
                  setValue(value);
                  //   console.log("pharmacy on change", value);
                }}
              />
            </View>

            <View style={{flex: 1, marginLeft: 10}}>
              <View style={globalStyles.simpleRow}>
                <BedIcon width={30} height={30} />
                <Text
                  style={[
                    styles.headingTitle,
                    {
                      marginLeft: 5,
                    },
                  ]}>
                  {intl.formatMessage({id: 'requestPropertyScreen.bedrooms'})}
                </Text>
              </View>
              <DropDownPicker
                placeholder="Select.."
                value={valueBedroom}
                data={data}
                borderRadius={30}
                isFocus={isFocusBedroom}
                setValue={setValueBedroom}
                dropdownWidth={String(Dimensions.get('screen').width / 3)}
                setIsFocus={setIsFocusMax}
                labelField="label"
                valueField="value"
                onChange={value => {
                  setValueBedroom(value);
                  //   console.log("pharmacy on change", value);
                }}
              />
            </View>
          </View>
        )}

      {selectedProperty ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.land',
        }) && (
        <>
          <Text style={styles.headingTitle}>
            {intl.formatMessage({id: 'requestPropertyScreen.direction'})}
          </Text>

          <DropDownPicker
            placeholder="Select"
            value={value}
            data={allDirections}
            isFocus={isFocus}
            borderRadius={30}
            setValue={setValue}
            dropdownWidth={String(Dimensions.get('screen').width / 3)}
            setIsFocus={setIsFocus}
            labelField="label"
            valueField="value"
            onChange={value => {
              setValue(value);
              //   console.log("pharmacy on change", value);
            }}
          />
        </>
      )}
      {selectedProperty ===
        intl.formatMessage({
          id: 'requestPropertyScreen.properties-type.shop',
        }) && (
        <>
          <Text style={styles.headingTitle}>
            {intl.formatMessage({
              id: 'requestPropertyScreen.properties-type.floor',
            })}
          </Text>

          <DropDownPicker
            placeholder="Select"
            value={value}
            data={data}
            isFocus={isFocus}
            borderRadius={30}
            setValue={setValue}
            dropdownWidth={String(Dimensions.get('screen').width / 3)}
            setIsFocus={setIsFocus}
            labelField="label"
            valueField="value"
            onChange={value => {
              setValue(value);
              //   console.log("pharmacy on change", value);
            }}
          />
        </>
      )}
      <TopSpace top={10} />
      <View style={globalStyles.simpleRow}>
        <AreaIcon width={30} height={30} />
        <Text style={styles.headingTitle}>
          {intl.formatMessage({id: 'requestPropertyScreen.size'})}
        </Text>
      </View>
      <TextInput
        placeholder="E.g 1300M"
        style={[
          styles.sizeInputField,
          {
            height: 50,
          },
        ]}
      />
      <TopSpace top={10} />

      <View style={globalStyles.simpleRow}>
        <LocationPinIcon width={20} height={20} />
        <Text style={styles.addressTitle}>
          {intl.formatMessage({id: 'requestPropertyScreen.address'})}
        </Text>
      </View>

      <TopSpace top={10} />
      <Text style={styles.headingTitle}>
        {intl.formatMessage({id: 'requestPropertyScreen.city'})}
      </Text>
      {/*  */}
      <DropDownPicker
        placeholder="Select City"
        value={valueCity}
        borderRadius={30}
        data={cities}
        isFocus={isFocusCity}
        setValue={setValueCity}
        dropdownWidth={String(Dimensions.get('screen').width - 80)}
        setIsFocus={setIsFocusCity}
        labelField="label"
        valueField="value"
        containerWidth={'90%'}
        onChange={value => {
          console.log('value:', value);

          setValueCity(value);
          //   console.log("pharmacy on change", value);
        }}
      />

      <TopSpace top={10} />
      <Text style={styles.headingTitle}>
        {intl.formatMessage({id: 'requestPropertyScreen.area'})}
      </Text>
      <DropDownPicker
        placeholder="Select Area"
        value={valueArea}
        data={data}
        borderRadius={30}
        isFocus={isFocusArea}
        setValue={setValueArea}
        dropdownWidth={String(Dimensions.get('screen').width - 80)}
        setIsFocus={setIsFocusArea}
        containerWidth={'90%'}
        labelField="label"
        valueField="value"
        onChange={value => {
          setValueArea(value);
          //   console.log("pharmacy on change", value);
        }}
      />

      <TopSpace top={10} />
      <Text style={styles.addressTitle}>
        {/* Add Description */}
        {intl.formatMessage({id: 'requestPropertyScreen.description'})}
      </Text>
      <TextInput
        multiline={true}
        textAlignVertical="top"
        numberOfLines={10}
        placeholder={intl.formatMessage({
          id: 'requestPropertyScreen.description.placeholder',
        })}
        style={[
          styles.sizeInputField,
          {
            paddingTop: 15,
            paddingHorizontal: 20,
            height: 180,
          },
        ]}
      />
      <TopSpace top={15} />
      <CustomButton
        btnWidth={'100%'}
        disabled={false}
        borderRadius={30}
        handleClick={handleSendRequest}
        title={intl.formatMessage({id: 'buttons.send-request'})}
        showRightIconButton={false}
      />
    </KeyboardAwareScrollView>
  );
};

export default Step2;

const styles = StyleSheet.create({
  selectPrice: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    marginRight: 10,
    fontSize: 18,
  },
  rowInput: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    height: '100%',
    fontFamily: fonts.primary.regular,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  rightPriceInput: {
    flex: 1,
    marginLeft: 10,
    height: '100%',
    fontFamily: fonts.primary.regular,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  sizeInputField: {
    backgroundColor: Colors.light.inputBg,
    color: Colors.light.headingTitle,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  addressTitle: {
    fontSize: 16,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
  },
  headingTitle: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
  },
});
