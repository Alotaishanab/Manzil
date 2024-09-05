import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CustomButton, TopSpace } from '@components'; 
import { useIntl } from '@context';
import { globalStyles } from '@globalStyles';
import { Colors } from '@colors';
import { fonts } from '@fonts';

const PropertyStep4 = ({ selectedPropertyType, handleNext }: any) => {
  const { intl } = useIntl();
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [floor, setFloor] = useState('');
  const [area, setArea] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let valid = true;
    const newErrors: any = {};

    if (selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.houses' }) ||
        selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.appartments' }) ||
        selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.tower' })) {
      if (!beds) {
        newErrors.beds = 'Please enter the number of beds.';
        valid = false;
      }

      if (!baths) {
        newErrors.baths = 'Please enter the number of baths.';
        valid = false;
      }
    }

    if (selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.office' }) ||
        selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.tower' })) {
      if (!floor) {
        newErrors.floor = 'Please enter the floor level.';
        valid = false;
      }
    }

    if (selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.land' }) ||
        selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.farm-house' }) ||
        selectedPropertyType === intl.formatMessage({ id: 'requestPropertyScreen.properties-type.chalet' })) {
      if (!area) {
        newErrors.area = 'Please enter the area size.';
        valid = false;
      }
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    handleNext();
  };

  const renderFieldsByPropertyType = () => {
    switch (selectedPropertyType) {
      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.houses' }):
      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.appartments' }):
      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.tower' }):
        return (
          <>
            {/* Beds Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {intl.formatMessage({ id: 'addpropertyScreen.beds' })}
              </Text>
              <TextInput
                placeholder="Number of beds"
                style={[styles.textInput, errors.beds && styles.errorBorder]}
                keyboardType="numeric"
                value={beds}
                onChangeText={(text) => {
                  setBeds(text);
                  setErrors((prev) => ({ ...prev, beds: null }));
                }}
              />
              {errors.beds && <Text style={styles.errorText}>{errors.beds}</Text>}
            </View>

            {/* Baths Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {intl.formatMessage({ id: 'addpropertyScreen.baths' })}
              </Text>
              <TextInput
                placeholder="Number of baths"
                style={[styles.textInput, errors.baths && styles.errorBorder]}
                keyboardType="numeric"
                value={baths}
                onChangeText={(text) => {
                  setBaths(text);
                  setErrors((prev) => ({ ...prev, baths: null }));
                }}
              />
              {errors.baths && <Text style={styles.errorText}>{errors.baths}</Text>}
            </View>
          </>
        );

      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.office' }):
      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.tower' }):
        return (
          <>
            {/* Floor Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {intl.formatMessage({ id: 'addpropertyScreen.floor' })}
              </Text>
              <TextInput
                placeholder="Floor level"
                style={[styles.textInput, errors.floor && styles.errorBorder]}
                keyboardType="numeric"
                value={floor}
                onChangeText={(text) => {
                  setFloor(text);
                  setErrors((prev) => ({ ...prev, floor: null }));
                }}
              />
              {errors.floor && <Text style={styles.errorText}>{errors.floor}</Text>}
            </View>
          </>
        );

      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.land' }):
      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.farm-house' }):
      case intl.formatMessage({ id: 'requestPropertyScreen.properties-type.chalet' }):
        return (
          <>
            {/* Area Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {intl.formatMessage({ id: 'addpropertyScreen.area' })}
              </Text>
              <TextInput
                placeholder="Area size (sqm)"
                style={[styles.textInput, errors.area && styles.errorBorder]}
                keyboardType="numeric"
                value={area}
                onChangeText={(text) => {
                  setArea(text);
                  setErrors((prev) => ({ ...prev, area: null }));
                }}
              />
              {errors.area && <Text style={styles.errorText}>{errors.area}</Text>}
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Property Type Display */}
        <Text style={styles.title}>
         
        </Text>
        <Text style={styles.selectedPropertyType}>{selectedPropertyType}</Text>

        {renderFieldsByPropertyType()}

        <TopSpace top={20} />

        <CustomButton
          btnWidth={'100%'}
          borderRadius={30}
          disabled={false}
          handleClick={handleSubmit}
          title={intl.formatMessage({ id: 'buttons.next' })}
          showRightIconButton={true}
        />
      </View>
    </ScrollView>
  );
};

export default PropertyStep4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    marginVertical: 20,
  },
  selectedPropertyType: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyDescription,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    borderColor: Colors.light.inputBg,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.light.inputBg,
    fontFamily: fonts.primary.regular,
    color: Colors.light.headingTitle,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
