/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  CustomButton,
  CustomMap,
  GenericModal,
  ReportAdModal,
  TopSpace,
} from '@components';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Share from 'react-native-share';

import {Colors} from '@colors';
import {useIntl} from '@context';
import {styles} from './styles';
import {fonts} from '../../../src/assets/fonts';
import * as SVGs from '../../assets/svgs';

import {MapLayerIcon} from '@svgs';
import LandImage from './components/LandImage';
import PriceSizeDetails from './components/PriceSizeDetails';
import MapSkeleton from './components/MapLoading';
import TransparentHeader from './components/TransparentHeader';
import FixedHeader from './components/FixedHeader';
import {floormap} from '@assets';
import TitleArrowIconWrap from '../agencydetails/components/TitleArrowIconWrap';
import TitleValueRow from '../agencydetails/components/TitleValueRow';
import {useNavigation} from '@react-navigation/native';

export const ExploreProperty = () => {
  const {intl} = useIntl();
  const navigation: any = useNavigation();
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
  const [showReportAd, setShowReportAd] = useState(false);
  const toggleReportAd = () => {
    setShowReportAd(!showReportAd);
  };
  const [mapType, setMapType] = useState('standard');
  const [showTransparentHeader, setShowTransparentHeader] = useState(true);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowTransparentHeader(scrollPosition < 100); // Toggle at 100px scroll
  };

  const handleShare = () => {
    const options = {
      title: 'Here is title',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
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

  const handleVisit = () => {
    navigation.navigate('AgencyDetails');
  };
  const [showAuthorityInfo, setShowAuthorityInfo] = useState(true);
  return (
    <View
      style={[
        styles.screenWrap,
        {
          paddingTop: Platform.OS === 'android' ? 0 : 30,
        },
      ]}>
      {!showTransparentHeader && <FixedHeader handleShare={handleShare} />}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.mainWrap]}>
        {showTransparentHeader && (
          <TransparentHeader
            handleReport={toggleReportAd}
            handleShare={handleShare}
          />
        )}
        <LandImage loading={isLoading} />

        <PriceSizeDetails
          loading={isLoading}
          propertiesFeatures={propertiesFeatures}
          renderPropertyFeatures={renderPropertiesFeatures}
        />
        <TopSpace top={8} />
        <View
          style={{
            paddingHorizontal: 15,
          }}>
          <Text style={[styles.description, {fontSize: 22}]}>
            {intl.formatMessage({
              id: 'sendFeedbackScreen.description',
            })}
          </Text>

          <TextInput
            editable={false}
            textAlignVertical="top"
            numberOfLines={15}
            style={{
              borderRadius: 30,
              backgroundColor: Colors.light.background,
              paddingHorizontal: 20,
              fontFamily: fonts.primary.regular,
            }}
          />
          <TopSpace top={8} />
          <Text style={[styles.description, {fontSize: 22}]}>
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
                activeOpacity={0.8}
                onPress={() => {
                  if (mapType === 'standard') {
                    setMapType('satellite');
                  } else {
                    setMapType('standard');
                  }
                }}
                style={styles.mapLayerBtn}>
                <MapLayerIcon width={25} height={25} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TopSpace top={8} />

        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 20,
            borderRadius: 30,
            backgroundColor: Colors.light.background,
          }}>
          <Text style={styles.description}>
            {intl.formatMessage({
              id: 'addpropertyScreen.floor-plan',
            })}
          </Text>
          <TopSpace top={10} />
          <Image
            source={floormap}
            resizeMode="stretch"
            style={{
              width: '100%',
              height: 400,
              // tintColor: Colors.light.background,
              // aspectRatio: 2 / 2,
            }}
          />
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

          <TopSpace top={25} />
          <CustomButton
            btnWidth={'100%'}
            disabled={false}
            handleClick={handleVisit}
            borderRadius={30}
            showRightIconButton={true}
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
        <TopSpace top={15} />
      </ScrollView>
      <GenericModal
        isVisible={isModalVisible}
        modalTitle={intl.formatMessage({
          id: 'landPropertyDetailScreen.contacts',
        })}
        showCloseButton={false}
        centerText={true}
        borderTopLeftRadius={40}
        borderTopRightRadius={40}
        modalBg={Colors.light.background}
        centeredModal={true}
        borderBottomLeftRadius={40}
        borderBottomRightRadius={40}
        toggleModal={toggleModal}>
        <TopSpace top={15} />
        <CustomButton
          btnWidth={'90%'}
          disabled={false}
          leftIconColor={Colors.light.background}
          iconName="EmailIcon"
          iconHeight={25}
          borderRadius={30}
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
          iconName="CallIcon"
          iconHeight={20}
          iconWidth={20}
          borderRadius={30}
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
          iconWidth={20}
          title={intl.formatMessage({id: 'buttons.whatsapp'})}
          leftIconColor={Colors.light.background}
          handleClick={toggleModal}
          showRightIconButton={false}
          borderRadius={30}
          textButtonWithIcon={true}
        />
        <TopSpace top={30} />
      </GenericModal>

      <ReportAdModal isVisible={showReportAd} toggleVisible={toggleReportAd} />
    </View>
  );
};
