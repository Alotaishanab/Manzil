// src/components/AgentDetails.tsx
import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useIntl } from '@context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fonts } from '../../../assets/fonts/index';
import { UserIcon } from '@assets'; // Default user icon component
import { AuthContext } from '@context';
import { GenericModal, CustomButton } from '@components';
import AsyncHelper from '../../../helpers/asyncHelper';
import { formatDate } from '@helpers'; // Your imported helper (not used below to force locale)

interface TitleValueRowProps {
  title: string;
  value: string;
  onPress?: () => void;
  style?: { titleStyle?: any; valueStyle?: any };
}

const TitleValueRow: React.FC<TitleValueRowProps> = ({
  title,
  value,
  onPress,
  style,
}) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
    <Text style={[styles.titleText, style?.titleStyle]}>{title}</Text>
    <Text style={[styles.valueText, style?.valueStyle]}>{value}</Text>
  </TouchableOpacity>
);

interface TitleArrowIconWrapProps {
  headingTitle: string;
  showIcon?: boolean;
  style?: any;
}

const TitleArrowIconWrap: React.FC<TitleArrowIconWrapProps> = ({
  headingTitle,
  showIcon = true,
  style,
}) => (
  <View style={styles.titleWrap}>
    <Text style={[styles.title, style]}>{headingTitle}</Text>
    {showIcon && (
      <Image
        source={require('../../../assets/images/authorityIcon.png')}
        style={styles.headingIcon}
      />
    )}
  </View>
);

interface AgentDetailsProps {
  property: any; // Expected to contain { property_details, lister_info }
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ property }) => {
  // Destructure the nested objects from property
  const { property_details, lister_info } = property;
  // Use ownership type from property_details
  const isIndependent = property_details?.ownership_type === 'independent';

  const navigation = useNavigation();
  const { token, loadingAuth } = useContext(AuthContext);
  const [localToken, setLocalToken] = useState<string | null>(token);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const refreshToken = async () => {
        const storedToken = await AsyncHelper.getToken();
        console.log('[AgentDetails] Fetched token from storage:', storedToken);
        setLocalToken(storedToken);
      };
      refreshToken();
    }, [])
  );

  if (loadingAuth) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  const handleVisitPress = () => {
    navigation.navigate('AgencyDetails');
  };

  const handleContactPress = () => {
    if (localToken && localToken.trim().length > 0) {
      navigation.navigate('ChatScreen', { property });
    } else {
      setShowLoginModal(true);
    }
  };

  // Force 'en-US' locale for the registration date.
  const registrationDate = lister_info?.lister_registration_date
    ? new Date(lister_info.lister_registration_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <TitleArrowIconWrap
            headingTitle="Advertiser Information"
            showIcon={false}
            style={styles.titleStyle}
          />

          {/* Render the lister image or fallback */}
          <View style={styles.iconWrapper}>
            {lister_info?.lister_profile_picture && lister_info.lister_profile_picture.trim() !== '' ? (
              <Image
                source={{ uri: lister_info.lister_profile_picture }}
                style={styles.listerImage}
              />
            ) : isIndependent ? (
              <UserIcon width={75} height={75} fill="#fff" />
            ) : (
              <Image
                source={require('../../../assets/images/agencies/ag1.png')}
                style={styles.agencyImage}
              />
            )}
          </View>

          <TitleValueRow
            title="Lister Name:"
            value={lister_info?.lister_name || 'N/A'}
            style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }}
          />
          <TitleValueRow
            title="Registered On:"
            value={registrationDate}
            style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }}
          />
          <TitleValueRow
            title="Type:"
            value={isIndependent ? 'Independent' : 'Agency'}
            style={{ titleStyle: styles.titleText, valueStyle: styles.valueText }}
          />

          {/* Visit and Contact buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.visitButton}
              onPress={handleVisitPress}
              activeOpacity={0.7}
            >
              <Text style={styles.visitButtonText}>Visit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactPress}
              activeOpacity={0.7}
            >
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showLoginModal && (
        <GenericModal
          isVisible={showLoginModal}
          toggleModal={() => setShowLoginModal(false)}
          modalTitle="Sign In Required"
        >
          <Text style={styles.modalText}>
            Sign in to talk to property listers and agencies.
          </Text>
          <CustomButton
            btnWidth="100%"
            disabled={false}
            textSize={16}
            borderRadius={30}
            title="Sign In"
            showSocialButton={false}
            showRightIconButton={true}
            textButtonWithIcon
            iconName="UserIcon"
            handleClick={() => {
              setShowLoginModal(false);
              navigation.navigate('Auth', { screen: 'Login' });
            }}
          />
          <TouchableOpacity
            onPress={() => setShowLoginModal(false)}
            style={styles.notNowContainer}
          >
            <Text style={styles.notNowText}>Not Now</Text>
          </TouchableOpacity>
        </GenericModal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  titleWrap: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headingIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    width: '100%',
  },
  titleText: {
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.primary.regular,
    flex: 1,
    paddingHorizontal: 10,
  },
  valueText: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.primary.bold,
    textAlign: 'right',
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  visitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  visitButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  contactButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  contactButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  iconWrapper: {
    marginVertical: 15,
    alignItems: 'center',
  },
  agencyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  modalText: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  notNowContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  notNowText: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: 'red',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  listerImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    resizeMode: 'cover', // Ensure the image fills the space
    backgroundColor: '#eee', // Optional: a background color while loading
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgentDetails;
