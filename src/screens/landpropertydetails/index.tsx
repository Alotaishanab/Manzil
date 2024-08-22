/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {CustomButton, CustomMap, TopSpace} from '@components';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '@colors';
import {useIntl} from '@context';
import {styles} from './styles';
import {fonts} from '../../../src/assets/fonts';
import * as SVGs from '../../assets/svgs';
import {CloseIcon, MapLayerIcon} from '@svgs';
import LandImage from './components/LandImage';
import PriceSizeDetails from './components/PriceSizeDetails';
import MapSkeleton from './components/MapLoading';
import TitleValueRow from '../agencydetails/components/TitleValueRow';
import TitleArrowIconWrap from '../agencydetails/components/TitleArrowIconWrap';
import TransparentHeader from './components/TransparentHeader';
import FixedHeader from './components/FixedHeader';
import {floormap} from '@assets';
import {width} from '../../hooks/useDimension';

import {globalStyles} from '../../../src/styles/globalStyles';
export const LandPropertyDetails = () => {
  // console.log('route:', route);

  const {intl} = useIntl();

  const [isLoading, setIsLoading] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [showMore, setShowMore] = useState(false);
  const [mapType, setMapType] = useState('standard');
  const [showTransparentHeader, setShowTransparentHeader] = useState(true);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowTransparentHeader(scrollPosition < 100); // Toggle at 100px scroll
  };
  const propertiesFeatures = [
    {
      id: 4,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.gym',
      }),
      icon: 'GymIcon',
    },
    {
      id: 5,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.yard',
      }),
      icon: 'YardIcon',
    },
    {
      id: 2,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.swimming-pool',
      }),
      icon: 'SwimmingpoolIcon',
    },
    {
      id: 1,
      name: intl.formatMessage({
        id: 'addpropertyScreen.properties-type.parking',
      }),
      icon: 'ParkingIcon',
    },
  ];
  const renderPropertiesFeatures = ({item}: any) => {
    const Icon = SVGs[item?.icon];
    return (
      <Pressable style={styles.featuredPropertyCard}>
        <Icon width={30} height={30} />
        <Text style={styles.featuredPropertyCardText}>{item?.name}</Text>
      </Pressable>
    );
  };

  const handleVisit = () => {};
  const [showAuthorityInfo, setShowAuthorityInfo] = useState(true);

  return (
    <View style={styles.screenWrap}>
      {!showTransparentHeader && <FixedHeader />}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.mainWrap]}>
        {showTransparentHeader && <TransparentHeader />}
        <LandImage loading={isLoading} />
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <PriceSizeDetails loading={isLoading} />
        </View>
        <TopSpace top={5} />
        <View
          style={{
            backgroundColor: Colors.light.background,
            borderRadius: 10,
            padding: 10,
            width: width,
          }}>
          <Text style={styles.propertiesFeatues}>
            {intl.formatMessage({
              id: 'addpropertyScreen.property-features',
            })}
          </Text>

          <FlatList
            data={propertiesFeatures}
            horizontal
            contentContainerStyle={{marginVertical: 10}}
            renderItem={renderPropertiesFeatures}
          />

          <TopSpace top={15} />

          <Text style={styles.description}>
            {intl.formatMessage({
              id: 'sendFeedbackScreen.description',
            })}
          </Text>

          <TopSpace top={5} />
          <TextInput
            textAlignVertical="top"
            numberOfLines={8}
            style={{
              borderRadius: 10,
              backgroundColor: '#e4e7eb',
              paddingHorizontal: 20,
              fontFamily: fonts.primary.regular,
            }}
          />

          <Text style={styles.description}>
            {intl.formatMessage({
              id: 'addpropertyScreen.map',
            })}
          </Text>
          {isLoading ? (
            <MapSkeleton height={250} />
          ) : (
            <View>
              <CustomMap
                height={250}
                showHome={true}
                showMaximizeScreen={true}
                isAbsoluteFill={false}
                mapType={mapType}
              />
              <TouchableOpacity
                onPress={() => {
                  if (mapType === 'standard') {
                    setMapType('satellite');
                  } else {
                    setMapType('standard');
                  }
                }}
                style={styles.mapLayerBtn}>
                <MapLayerIcon width={30} height={30} />
              </TouchableOpacity>
            </View>
          )}

          <TopSpace top={15} />

          <Text style={styles.description}>
            {intl.formatMessage({
              id: 'addpropertyScreen.floor-plan',
            })}
          </Text>

          <Image
            source={floormap}
            resizeMode="stretch"
            style={{
              width: '100%',
              height: 350,
              // aspectRatio: 2 / 2,
            }}
          />
          <TopSpace top={15} />
        </View>
        <TopSpace top={15} />

        <View style={styles.roundedWrap}>
          <TitleArrowIconWrap
            showIcon={false}
            headingTitle={intl.formatMessage({
              id: 'agencyScreen.real-estate-authority-info',
            })}
            showRightArrowToggle={false}
            isVisible={showAuthorityInfo}
            setIsVisible={setShowAuthorityInfo}
          />

          <>
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.advertising-license-number',
              })}
              value={'321'}
            />
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.unified-number-establishment',
              })}
              value={'25'}
            />
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.fal-license-no',
              })}
              value={'7'}
            />

            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.date-registration',
              })}
              value={'2024/06/29'}
            />
          </>
        </View>
        <TopSpace top={15} />
        <View style={styles.roundedWrap}>
          <TitleArrowIconWrap
            showIcon={false}
            headingTitle={intl.formatMessage({
              id: 'agencyScreen.advertiser-information',
            })}
            showRightArrowToggle={false}
            isVisible={showAuthorityInfo}
            setIsVisible={setShowAuthorityInfo}
          />

          <TitleValueRow
            title={intl.formatMessage({
              id: 'agencyScreen.advertiser-name',
            })}
            value={'Savills Agency'}
          />
          <TitleValueRow
            title={intl.formatMessage({
              id: 'agencyScreen.advertiser-type',
            })}
            value={'Agency'}
          />
          <TitleValueRow
            title={intl.formatMessage({
              id: 'agencyScreen.advertiser-date-registration',
            })}
            value={'2024/06/29'}
          />

          <TopSpace top={20} />
          <View style={styles.savisWrap}>
            <Text style={styles.savisText}>savills</Text>
          </View>

          <TopSpace top={15} />
          <CustomButton
            btnWidth={'100%'}
            borderRadius={30}
            disabled={false}
            handleClick={handleVisit}
            title={intl.formatMessage({id: 'buttons.visit'})}
          />
          <TopSpace top={15} />
          <CustomButton
            btnWidth={'100%'}
            disabled={false}
            borderRadius={30}
            btnBg={Colors.light.background}
            textColor={Colors.light.headingTitle}
            borderColor={Colors.light.headingTitle}
            handleClick={toggleModal}
            title={intl.formatMessage({id: 'buttons.contacts'})}
            showRightIconButton={false}
            textButtonWithIcon={false}
          />
        </View>

        <Modal
          coverScreen={false}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
          collapsable
          deviceHeight={Dimensions.get('screen').height * 2}
          onBackdropPress={() => toggleModal()}
          onBackButtonPress={() => toggleModal()}
          isVisible={isModalVisible}>
          <View style={styles.modalInnerWrap}>
            <TopSpace top={30} />
            <View style={globalStyles.simpleRow}>
              <Text
                style={[
                  styles.guidePriceTitle,
                  {
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 18,
                    color: Colors.light.headingTitle,
                    fontFamily: fonts.primary.bold,
                  },
                ]}>
                {intl.formatMessage({
                  id: 'landPropertyDetailScreen.contacts',
                })}
              </Text>
              {/*  */}
              <Pressable
                onPress={toggleModal}
                style={
                  {
                    // alignSelf: 'flex-end',
                    // zIndex: 100,
                    // position: 'absolute',
                    // right: 20,
                  }
                }>
                <CloseIcon width={30} height={30} />
              </Pressable>
            </View>

            <TopSpace top={30} />
            <CustomButton
              btnWidth={'90%'}
              borderRadius={30}
              disabled={false}
              leftIconColor={Colors.light.background}
              iconName="EmailIcon"
              iconHeight={25}
              iconWidth={25}
              handleClick={toggleModal}
              title={intl.formatMessage({id: 'buttons.email'})}
              showRightIconButton={false}
              textButtonWithIcon={true}
            />
            <TopSpace top={30} />

            <CustomButton
              btnWidth={'90%'}
              disabled={false}
              borderRadius={30}
              iconName="CallIcon"
              iconHeight={20}
              iconWidth={20}
              leftIconColor={Colors.light.background}
              handleClick={toggleModal}
              title={intl.formatMessage({id: 'buttons.phone'})}
              showRightIconButton={false}
              textButtonWithIcon={true}
            />
            <TopSpace top={30} />

            <CustomButton
              btnWidth={'90%'}
              disabled={false}
              iconName="WhatsappIcon"
              iconHeight={20}
              borderRadius={30}
              iconWidth={20}
              title={intl.formatMessage({id: 'buttons.whatsapp'})}
              leftIconColor={Colors.light.background}
              handleClick={toggleModal}
              showRightIconButton={false}
              textButtonWithIcon={true}
            />
            <TopSpace top={30} />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};
