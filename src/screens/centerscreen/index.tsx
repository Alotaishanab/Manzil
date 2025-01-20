import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

import LinearGradient from 'react-native-linear-gradient'; // Ensure you have react-native-linear-gradient installed
import { BlurView } from '@react-native-community/blur';

import { Colors } from '@colors'; // Ensure correct import
import { fonts } from '@fonts';   // Ensure correct import
import { promotionAnimation, emptyAnimation } from '@assets'; // Ensure correct imports

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const CenterScreen = ({
  incompleteOrders = [],
  requestedProperties = [],
}) => {
  const navigation = useNavigation();

  // -------------- NAVIGATION --------------
  const handleActionClick = (action) => {
    switch (action) {
      case 'PromoteProperty':
        navigation.navigate('Auth', { screen: 'PromoteProperty' });
        break;
      case 'AddProperty':
        navigation.navigate('Auth', { screen: 'AddProperties' });
        break;
      case 'AddOrder':
        navigation.navigate('Auth', { screen: 'AddOrder' });
        break;
      case 'RequestProperty':
        navigation.navigate('Auth', { screen: 'RequestProperty' });
        break;
      case 'OrderDetails':
        // navigation.navigate('Auth', { screen: 'OrderDetails', params: { orderId: someId } });
        break;
      default:
        break;
    }
  };

  // Render minimal "no data" view
  const renderNoData = (message) => (
    <View style={styles.noDataContainer}>
      <LottieView source={emptyAnimation} autoPlay loop style={styles.noDataAnimation} />
      <Text style={styles.noDataText}>{message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* GRADIENT BACKDROP: top half & bottom half */}
      <LinearGradient
        colors={['#a18cd1', '#fbc2eb']} // Purple to pink, adjustable
        style={styles.topGradient}
      />
      <LinearGradient
        colors={['#fbc2eb', '#a1c4fd']} // Pink to bluish, adjustable
        style={styles.bottomGradient}
      />

      {/* APP TITLE */}
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Manzil</Text>
      </View>

      {/* 2×2 GRID LAYOUT */}
      <View style={styles.gridContainer}>
        {/** 1) PROMOTE PROPERTY */}
        <View style={styles.gridItem}>
          <View style={styles.glassCard}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={15}
              reducedTransparencyFallbackColor="#fff"
            />
            <LottieView
              source={promotionAnimation}
              autoPlay
              loop
              style={styles.animMedium}
            />
            <Text style={styles.cardTitle}>Promote</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleActionClick('PromoteProperty')}
            >
              <Text style={styles.actionButtonText}>Boost</Text>
              <Icon name="rocket-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/** 2) ADD PROPERTY */}
        <View style={styles.gridItem}>
          <View style={styles.glassCard}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={15}
              reducedTransparencyFallbackColor="#fff"
            />
            <Icon name="home-outline" size={50} color="#fff" style={styles.bigIcon} />
            <Text style={styles.cardTitle}>Add Property</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleActionClick('AddProperty')}
            >
              <Text style={styles.actionButtonText}>Add</Text>
              <Icon name="add-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/** 3) ORDERS */}
        <View style={styles.gridItem}>
          <View style={styles.glassCard}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={15}
              reducedTransparencyFallbackColor="#fff"
            />
            <Text style={styles.cardTitle}>Orders</Text>
            <TouchableOpacity
              style={[styles.actionButton, { alignSelf: 'center', marginBottom: 6 }]}
              onPress={() => handleActionClick('AddOrder')}
            >
              <Text style={styles.actionButtonText}>New Order</Text>
              <Icon name="add-circle-outline" size={20} color="#fff" />
            </TouchableOpacity>

            {incompleteOrders.length > 0 ? (
              incompleteOrders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  style={styles.itemRow}
                  onPress={() =>
                    navigation.navigate('Auth', {
                      screen: 'OrderDetails',
                      params: { orderId: order.id },
                    })
                  }
                >
                  <Icon name="alert-circle" size={18} color={Colors.light.warning} />
                  <Text style={styles.itemRowText}>{order.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              renderNoData('No orders')
            )}
          </View>
        </View>

        {/** 4) REQUESTED PROPERTIES */}
        <View style={styles.gridItem}>
          <View style={styles.glassCard}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={15}
              reducedTransparencyFallbackColor="#fff"
            />
            <Text style={styles.cardTitle}>Requests</Text>
            <TouchableOpacity
              style={[styles.actionButton, { alignSelf: 'center', marginBottom: 6 }]}
              onPress={() => handleActionClick('RequestProperty')}
            >
              <Text style={styles.actionButtonText}>Ask</Text>
              <Icon name="help-circle" size={20} color="#fff" />
            </TouchableOpacity>

            {requestedProperties.length > 0 ? (
              requestedProperties.map((req) => (
                <TouchableOpacity
                  key={req.id}
                  style={styles.itemRow}
                  onPress={() =>
                    navigation.navigate('Auth', {
                      screen: 'PropertyRequestDetails',
                      params: { requestId: req.id },
                    })
                  }
                >
                  <Icon name="help-circle" size={18} color={Colors.light.primaryBtn} />
                  <Text style={styles.itemRowText}>{req.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              renderNoData('No requests')
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

/* ------------------- STYLES ------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  headerWrapper: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: fonts.primary.bold || 'System',
    color: '#ffffff',
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  /* 2×2 GRID LAYOUT */
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', // allows wrapping into 2 rows
  },
  gridItem: {
    width: '50%',
    height: '50%',
    padding: 10,
  },

  /* GLASSMORPHISM CARD */
  glassCard: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  /* Titles & Subtitles */
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 6,
    fontFamily: fonts.primary.bold || 'System',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  /* Buttons */
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7F50', // Coral accent
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
    fontFamily: fonts.primary.bold || 'System',
    fontWeight: '700',
  },

  /* For animations and icons */
  animMedium: {
    width: 70,
    height: 70,
  },
  bigIcon: {
    marginVertical: 5,
  },

  /* Orders / Requests items */
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 6,
    marginVertical: 4,
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  itemRowText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
    fontFamily: fonts.primary.medium || 'System',
    flexShrink: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },

  /* NO DATA */
  noDataContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  noDataAnimation: {
    width: 40,
    height: 40,
  },
  noDataText: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: fonts.primary.medium || 'System',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});

export default CenterScreen;
