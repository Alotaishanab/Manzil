import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {
  CustomButton,
  GenericModal,
  HeaderBackButtonTitle,
  PropertyCard,
  Screen,
  TopSpace,
} from '@components';
import {useIntl} from '@context';
import {globalStyles} from '@globalStyles';
import {ag1, InfoIcon} from '@assets';
import {width} from '@useDimension';
import {fonts} from '@fonts';
import {Colors} from '@colors';
import TitleArrowIconWrap from './components/TitleArrowIconWrap';
import TitleValueRow from './components/TitleValueRow';
import PromoteCard from '../promoteproperty/components/PromoteCard';
import {useNavigation} from '@react-navigation/native';

export const AgencyDetails = () => {
  const {intl} = useIntl();
  const navigation = useNavigation();
  const [showPropertiesList, setShowPropertiesLand] = useState(true);
  const handleConnect = () => {};
  const [showAuthorityInfo, setShowAuthorityInfo] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleCard = () => {
    navigation.navigate('PropertyScreen');
  };
  return (
    <Screen showKeyboardAware={false}>
      <HeaderBackButtonTitle
        text={intl.formatMessage({id: 'agencyScreen.header'})}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TopSpace top={10} />
        <Image source={ag1} style={styles.imgStyle} />
        <TopSpace top={10} />
        <Text style={styles.agencyTitle}>إيراد العقاريه</Text>
        <TopSpace top={10} />
        <CustomButton
          btnWidth={'100%'}
          disabled={false}
          borderRadius={30}
          handleClick={toggleModal}
          title={intl.formatMessage({id: 'buttons.contacts'})}
          showRightIconButton={false}
        />
        <TopSpace top={15} />

        <TitleArrowIconWrap
          showIcon={false}
          headingTitle={intl.formatMessage({
            id: 'agencyScreen.properties-listed',
          })}
          isVisible={showPropertiesList}
          setIsVisible={setShowPropertiesLand}
        />
        {showPropertiesList && (
          <>
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.homes-listed',
              })}
              value={'321'}
            />
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.lands-listed',
              })}
              value={'25'}
            />
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.other',
              })}
              value={'7'}
            />
          </>
        )}
        <TitleArrowIconWrap
          showIcon={true}
          headingTitle={intl.formatMessage({
            id: 'agencyScreen.real-estate-authority-info',
          })}
          isVisible={showAuthorityInfo}
          setIsVisible={setShowAuthorityInfo}
        />

        {showAuthorityInfo && (
          <>
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.advertising-license-number',
              })}
              value={'#123123123'}
            />
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.unified-number-establishment',
              })}
              value={'#123123123'}
            />
            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.fal-license-no',
              })}
              value={'#123123123'}
            />

            <TitleValueRow
              title={intl.formatMessage({
                id: 'agencyScreen.date-registration',
              })}
              value={'2024/06/29'}
            />
          </>
        )}
        <TopSpace top={10} />
        <TitleArrowIconWrap
          showIcon={false}
          showRightIconButton={false}
          headingTitle={intl.formatMessage({
            id: 'agencyScreen.properties',
          })}
        />

        <PropertyCard handleClick={handleCard} />
        <TopSpace top={100} />
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
        borderBottomLeftRadius={40}
        borderBottomRightRadius={40}
        modalBg={Colors.light.background}
        centeredModal={true}
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  agencyTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.light.headingTitle,
  },
  imgStyle: {
    height: 240,
    width: '100%',
    borderRadius: 10,
  },
});
