// CenterScreen.js

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
import { Colors } from '@colors'; // Ensure this is correctly imported
import { fonts } from '@fonts';   // Ensure this is correctly imported
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { promotionAnimation, emptyAnimation } from '@assets'; // Ensure these are correctly imported
import { BlurView } from '@react-native-community/blur'; // Correct import for React Native CLI

const { width: screenWidth } = Dimensions.get('window');

export const CenterScreen = ({
  incompleteOrders = [],
  requestedProperties = [],
}) => {
  const navigation = useNavigation();

  const handleActionClick = (action) => {
    if (action === 'AddProperty') {
      navigation.navigate('Auth', { screen: 'AddProperties' });
    } else if (action === 'PromoteProperty') {
      navigation.navigate('Auth', { screen: 'PromoteProperty' });
    } else if (action === 'RequestProperty') {
      navigation.navigate('Auth', { screen: 'RequestProperty' });
    } else if (action === 'AddOrder') {
      navigation.navigate('Auth', { screen: 'AddOrder' }); // Ensure 'AddOrder' screen exists
    }
  };

  const renderNoData = (message) => (
    <View style={styles.noDataContainer}>
      <LottieView source={emptyAnimation} autoPlay loop style={styles.emptyAnimation} />
      <Text style={styles.noDataText}>{message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar for better appearance */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Manzil</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Promote Property Section */}
        <View style={styles.promoteContainer}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          <LottieView
            source={promotionAnimation}
            autoPlay
            loop
            style={styles.promotionAnimation}
          />
          <Text style={styles.promoteTitle}>Promote Your Property</Text>
          <Text style={styles.promoteDescription}>
            Boost your property's visibility and attract more potential buyers or renters.
          </Text>
          <TouchableOpacity
            style={styles.promoteButton}
            onPress={() => handleActionClick('PromoteProperty')}
          >
            <Text style={styles.promoteButtonText}>Promote Now</Text>
            <Icon name="rocket-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Orders Section */}
        <View style={styles.ordersContainer}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Orders</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleActionClick('AddOrder')}
            >
              <Icon name="add-circle-outline" size={24} color={Colors.light.primaryBtn} />
            </TouchableOpacity>
          </View>
          {incompleteOrders.length > 0 ? (
            incompleteOrders.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.orderCard}
                onPress={() =>
                  navigation.navigate('Auth', {
                    screen: 'OrderDetails',
                    params: { orderId: item.id },
                  })
                }
              >
                <Icon name="alert-circle" size={24} color={Colors.light.warning} />
                <Text style={styles.orderText}>{item.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            renderNoData('No orders')
          )}
        </View>

        {/* Requested Properties Section */}
        <View style={styles.requestedPropertiesContainer}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Requested Properties</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleActionClick('RequestProperty')}
            >
              <Icon name="add-circle-outline" size={24} color={Colors.light.primaryBtn} />
            </TouchableOpacity>
          </View>
          {requestedProperties.length > 0 ? (
            requestedProperties.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.orderCard}
                onPress={() =>
                  navigation.navigate('Auth', {
                    screen: 'PropertyRequestDetails',
                    params: { requestId: item.id },
                  })
                }
              >
                <Icon name="help-circle" size={24} color={Colors.light.primaryBtn} />
                <Text style={styles.orderText}>{item.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            renderNoData('No requested properties')
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background || '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.primary.bold || 'System',
    color: '#8B4513', // Brown color like palm tree
    fontWeight: '800',
  },
  mainContent: {
    flex: 1,
  },
  promoteContainer: {
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden', // Ensure content is clipped within rounded corners
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white overlay
    // Shadows
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  promotionAnimation: {
    width: 80,
    height: 80,
  },
  promoteTitle: {
    fontSize: 20,
    fontFamily: fonts.primary.bold || 'System',
    color: '#1D3557',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  promoteDescription: {
    fontSize: 14,
    fontFamily: fonts.primary.regular || 'System',
    color: '#457B9D',
    textAlign: 'center',
    marginVertical: 10,
  },
  promoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22', // Forest green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  promoteButtonText: {
    color: '#fff',
    fontFamily: fonts.primary.bold || 'System',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  ordersContainer: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // Shadows
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  requestedPropertiesContainer: {
    borderRadius: 20,
    padding: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // Shadows
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.bold || 'System',
    color: '#1D3557',
    fontWeight: '700',
  },
  addButton: {
    padding: 5,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(237, 242, 244, 0.9)',
    borderRadius: 15,
    padding: 10,
    marginBottom: 8,
  },
  orderText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.primary.medium || 'System',
    color: '#1D3557',
    fontWeight: '600',
    flexShrink: 1, // Ensure text wraps if too long
  },
  noDataContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  noDataText: {
    color: '#A8A8A8',
    fontFamily: fonts.primary.medium || 'System',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyAnimation: {
    width: 50,
    height: 50,
  },
});

export default CenterScreen;
