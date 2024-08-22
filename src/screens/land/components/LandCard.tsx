import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Share from 'react-native-share';
import {globalStyles} from '../../../styles/globalStyles';
import {fonts} from '../../../assets/fonts';
import {Colors} from '@colors';
import {TopSpace} from '@components';
import {AreaIcon, FavoriteIcon, ShareIcon} from '@svgs';
import {building} from '@assets';
import {useIntl} from '@context';

const LandCard = ({handleClick}: any) => {
  const {intl} = useIntl();
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
  return (
    <TouchableOpacity onPress={handleClick} style={styles.mainWrapper}>
      <ImageBackground
        source={building}
        imageStyle={{
          borderRadius: 10,
        }}
        style={styles.imageBgStyle}>
        <TouchableOpacity>
          <FavoriteIcon
            // fill={Colors.light.primaryButton}
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </ImageBackground>
      <TopSpace top={10} />
      <Text style={styles.serialNoText}>
        {intl.formatMessage({
          id: 'landScreen.sr-no',
        })}
        {/* SR 799,997 */}
      </Text>
      <Text style={styles.descriptionText}>
        {intl.formatMessage({
          id: 'landScreen.residential-land',
        })}
      </Text>
      {/* <Text style={styles.placeText}> Riyadh, Saudi Arabia</Text> */}

      <TopSpace top={10} />
      <View style={styles.footerWrap}>
        <View style={styles.footerLeftView}>
          <View style={globalStyles.simpleRow}>
            <AreaIcon width={32} height={32} />
            <Text style={styles.countText}>129,800m²</Text>
          </View>
        </View>

        <View style={styles.footerRightView}>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
      </View>
      <TopSpace top={10} />
      <Text style={styles.dateText}>
        {intl.formatMessage({
          id: 'landScreen.added-on',
        })}{' '}
        09/05/2024
      </Text>
    </TouchableOpacity>
  );
};

export default LandCard;

const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 15,
    paddingBottom: 10,
    // borderBottomLeftRadius: 5,
    borderRadius: 10,
    // borderBottomRightRadius: 5,
    shadowColor: '#000',
    backgroundColor: Colors.light.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBgStyle: {
    height: 270,
    alignItems: 'flex-end',
    padding: 5,
  },
  placeText: {
    color: Colors.light.headingTitle,
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    fontWeight: '600',
  },
  serialNoText: {
    color: Colors.light.serialNoGreen,
    fontSize: 24,
    fontFamily: fonts.primary.mediumItalic,
  },
  descriptionText: {
    fontSize: 12,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
  },
  countText: {
    marginLeft: 5,
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
  footerWrap: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  footerLeftView: {
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerRightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateText: {
    color: Colors.light.headingTitle,
    fontSize: 10,
    fontFamily: fonts.primary.medium,
  },
});
