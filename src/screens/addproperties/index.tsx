/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Colors} from '@colors';
import {HeaderBackButtonTitle, TopSpace} from '@components';
import {fonts} from '@fonts';
import {globalStyles} from '@globalStyles';
import {useIntl} from '@context';
import PropertyStep1 from './components/PropertyStep1';
import PropertyStep2 from './components/PropertyStep2';

export const AddProperties = () => {
  const [step, setStep] = React.useState(1);
  const [photos, setPhotos] = React.useState([]);
  const [floor, setFloor] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const {intl} = useIntl();
  const handleNext = () => {
    setStep(2);
  };
  const handlePicker = async () => {
    try {
      const res: any = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: false,
      });
      if (res?.didCancel) {
        // throw 'user canceled the action';
        console.log('user canceled the action');
      } else if (Array.isArray(res.assets)) {
        // Ensure res.assets is an array
        const selectedImages: any = res.assets.map((asset: any) => ({
          uri: asset.uri,
        }));
        setPhotos((prevPhotos: any) => [...prevPhotos, ...selectedImages]);
      } else {
        console.log('No images selected or response format is incorrect');
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const handleAddFloorPicker = async () => {
    try {
      const res: any = await launchImageLibrary({
        mediaType: 'photo',
        // selectionLimit: 0,
        includeBase64: false,
      });
      if (res?.didCancel) {
        console.log('User canceled the action');
      } else if (Array.isArray(res.assets)) {
        // setFloor(res?.assets[0]?.uri);
      } else {
        console.log('No images selected or response format is incorrect');
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const farmhouseFeatures = [
    {
      id: 1,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.parking',
      }),
      icon: 'ParkingIcon',
    },
    {
      id: 2,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.swimming-pool',
      }),
      icon: 'SwimmingpoolIcon',
    },
    {
      id: 3,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.balacony',
      }),
      icon: 'BalaconyIcon',
    },
    {
      id: 4,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.gym',
      }),
      icon: 'GymIcon',
    },
    {
      id: 8,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.basement',
      }),
      icon: 'HomeIcon',
    },
    {
      id: 12,
      name: intl.formatMessage({
        id: 'filterPropertyScreen.reception',
      }),
      icon: 'ReceptionIcon',
    },
  ];
  // console.log('photos', photos);
  //   const handleNext=()=>{}
  return (
    <SafeAreaView style={globalStyles.wrapScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // flexGrow: 1,
          paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <HeaderBackButtonTitle text={''} />
        <TopSpace top={10} />
        {/* Request Propery step content starts */}
        <View style={globalStyles.rowSpaceBetween}>
          <Text style={styles.heading}>
            {intl.formatMessage({id: 'addpropertyScreen.header'})}
          </Text>

          <View style={globalStyles.simpleRow}>
            <Text style={styles.stepText}>
              {intl.formatMessage({id: 'addpropertyScreen.step'})}{' '}
              {step === 1
                ? intl.formatMessage({id: 'addpropertyScreen.step-1'})
                : intl.formatMessage({id: 'addpropertyScreen.step-2'})}{' '}
              {'/'}
              {intl.formatMessage({id: 'addpropertyScreen.step-2'})}
            </Text>
          </View>
        </View>

        <TopSpace top={10} />
        {step === 1 && (
          <PropertyStep1
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <PropertyStep2
            selectedType={selectedPropertyType}
            images={photos}
            floor={floor}
            handleAddFloorPicker={handleAddFloorPicker}
            handlePicker={handlePicker}
          />
        )}

        <TopSpace top={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {backgroundColor: Colors.light.background, flex: 1, padding: 24},
  heading: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.semiBold,
    fontSize: 20,
    // fontSize:fonts
  },
  stepText: {
    color: Colors.light.primaryBtn,
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
  wantText: {
    color: Colors.light.headingTitle,
    fontSize: 14,
    fontFamily: fonts.primary.regular,
  },
  propertyType: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.semiBold,
  },
  propertTypeCard: {
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 5,
    borderColor: Colors.light.greyDescription,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyColumnWrap: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
