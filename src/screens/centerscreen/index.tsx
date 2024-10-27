// CenterScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@colors'; // Ensure this is correctly imported
import { fonts } from '@fonts';   // Ensure this is correctly imported
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddedProperties } from '@screens';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.8;

export const CenterScreen = ({
  incompleteOrders = [],
  completedOrders = [],
  properties = [],
  requestedProperties = [],
}) => {
  const navigation = useNavigation();

  const handleCardClick = (propertyId) => {
    navigation.navigate('Auth', { screen: 'PropertyScreen', params: { propertyId } });
  };

  const handleActionClick = (action) => {
    if (action === 'AddProperty') {
      navigation.navigate('Auth', { screen: 'AddProperties' });
    }
  };

  const renderOrder = ({ item, type }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('Auth', { screen: 'OrderDetails', params: { orderId: item.id } })
      }
      style={styles.orderCard}
    >
      <Text style={styles.orderText}>{item.title}</Text>
      <Text style={styles.continueText}>
        {type === 'completed' ? 'View Order' : 'Continue Order'}
      </Text>
    </TouchableOpacity>
  );

  const renderPlaceholderPropertyCard = () => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => handleActionClick('AddProperty')}
      style={styles.placeholderPropertyCard}
    >
      <Text style={styles.placeholderText}>Add Property</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar for better appearance */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />

      <Text style={styles.title}>Manzil</Text>

      {/* Incomplete Orders Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subTitle}>Incomplete Orders</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Auth', { screen: 'ViewAllIncompleteOrders' })
            }
          >
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        {incompleteOrders.length > 0 ? (
          <FlatList
            data={incompleteOrders}
            renderItem={({ item }) =>
              renderOrder({ item, type: 'incomplete' })
            }
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ordersList}
          />
        ) : (
          <Text style={styles.noOrdersText}>
            You do not have any incomplete orders
          </Text>
        )}
      </View>

      {/* Your Properties Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subTitle}>Your Properties</Text>
          {properties.length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Auth', { screen: 'ViewAllProperties' })}
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          )}
        </View>
        {properties.length > 0 ? (
          <AddedProperties handleClick={handleCardClick} />
        ) : (
          renderPlaceholderPropertyCard()
        )}
      </View>

      {/* Requested Properties Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.subTitle}>Requested Properties</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Auth', { screen: 'ViewAllRequestedProperties' })
            }
          >
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        {requestedProperties.length > 0 ? (
          <FlatList
            data={requestedProperties}
            renderItem={({ item }) =>
              renderOrder({ item, type: 'requested' })
            }
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ordersList}
          />
        ) : (
          <Text style={styles.noOrdersText}>
            You do not have any requested properties
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background || '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: screenWidth * 0.08,
    fontFamily: fonts.primary.bold || 'System',
    color: Colors.light.primary || '#1D3557',
    marginBottom: 25,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: screenWidth * 0.05,
    fontFamily: fonts.primary.medium || 'System',
    color: Colors.light.headingTitle || '#1D3557',
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllText: {
    color: Colors.light.primaryBtn || '#457B9D',
    fontFamily: fonts.primary.regular || 'System',
    fontSize: screenWidth * 0.04,
    textDecorationLine: 'underline',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  noOrdersText: {
    color: Colors.light.textMuted || '#A8A8A8',
    fontFamily: fonts.primary.medium || 'System',
    fontSize: screenWidth * 0.045,
    textAlign: 'center',
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: Colors.light.cardBackground || '#F1FAEE',
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    width: screenWidth * 0.6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  orderText: {
    color: Colors.light.headingTitle || '#1D3557',
    fontFamily: fonts.primary.medium || 'System',
    fontSize: screenWidth * 0.045,
    marginBottom: 8,
  },
  continueText: {
    color: Colors.light.primaryBtn || '#E63946',
    fontFamily: fonts.primary.regular || 'System',
    fontSize: screenWidth * 0.04,
    textDecorationLine: 'underline',
  },
  placeholderPropertyCard: {
    backgroundColor: Colors.light.cardBackground || '#F1FAEE',
    borderRadius: 20,
    padding: 20,
    width: ITEM_WIDTH,
    height: 275,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  placeholderText: {
    color: Colors.light.primaryBtn || '#E63946',
    fontFamily: fonts.primary.bold || 'System',
    fontSize: 22,
  },
  ordersList: {
    alignItems: 'center',
    paddingLeft: 5,
  },
});

export default CenterScreen;
