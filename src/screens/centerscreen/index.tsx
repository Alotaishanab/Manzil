import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddedProperties } from '@screens';
import { TopSpace } from '@components'; // Import TopSpace

export const CenterScreen = () => {
  const navigation = useNavigation();

  // Sample data for incomplete and completed property orders
  const incompleteOrders = [
    { id: '1', title: 'Apartment in Jeddah' },
    { id: '2', title: 'Villa in Riyadh' },
  ];

  const completedOrders = [
    { id: '3', title: 'Shop in Dammam' },
    { id: '4', title: 'Warehouse in Makkah' },
  ];

  // Navigation handler for SimilarProperties clicks
  const handleCardClick = (propertyId: string) => {
    navigation.navigate('PropertyScreen', { propertyId }); // Navigate and pass property ID
  };

  const handleActionClick = (action) => {
    if (action === 'AddProperty') {
      navigation.navigate('AddProperties');
    } else if (action === 'PromoteProperty') {
      navigation.navigate('PromoteProperty');
    } else if (action === 'RequestProperty') {
      navigation.navigate('RequestProperty');
    }
  };

  const handleIncompleteOrderClick = (order) => {
    navigation.navigate('ContinueOrder', { orderId: order.id });
  };

  const handleCompletedOrderClick = (order) => {
    navigation.navigate('ViewOrder', { orderId: order.id });
  };

  const renderOrder = ({ item, type }) => (
    <TouchableOpacity
      style={[styles.orderCard, type === 'completed' ? styles.completedCard : {}]}
      onPress={() =>
        type === 'completed' ? handleCompletedOrderClick(item) : handleIncompleteOrderClick(item)
      }
    >
      <Text style={styles.orderText}>{item.title}</Text>
      <Text style={styles.continueText}>
        {type === 'completed' ? 'View Order' : 'Continue Order'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manzili</Text>

      {/* Incomplete Orders Section */}
      {incompleteOrders.length > 0 && (
        <View style={styles.ordersContainer}>
          <Text style={styles.subTitle}>Incomplete Orders</Text>
          <FlatList
            data={incompleteOrders}
            renderItem={({ item }) => renderOrder({ item, type: 'incomplete' })}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ordersList}
          />
          <TouchableOpacity onPress={() => handleActionClick('AddProperty')}>
            <Text style={styles.actionText}>Add Property</Text>
          </TouchableOpacity>
        </View>
      )}
      <TopSpace top={25} /> 

      {/* Completed Orders Section */}
      {completedOrders.length > 0 && (
        <View style={[styles.ordersContainer, styles.movedUpSection]}>
          <View style={styles.similarHomesSection}>
            <AddedProperties handleClick={handleCardClick} />
            <TouchableOpacity onPress={() => handleActionClick('PromoteProperty')}>
              <Text style={styles.promotetext}>Promote Property</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Requested Properties Section */}
      <View style={[styles.ordersContainer, styles.movedUpSection]}>
        <Text style={styles.subTitle}>Requested Properties</Text>
        <FlatList
          data={incompleteOrders}
          renderItem={({ item }) => renderOrder({ item, type: 'incomplete' })}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ordersList}
        />
        <TouchableOpacity onPress={() => handleActionClick('RequestProperty')}>
          <Text style={styles.actionText}>Request Property</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 10,
  },
  ordersContainer: {
    marginTop: -15,
  },
  movedUpSection: {
    marginTop: -20, // Move sections up by 20px
  },
  orderCard: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 220,
    justifyContent: 'center',
    elevation: 2,
  },
  completedCard: {
    backgroundColor: Colors.light.completedOrderBackground, // Color for completed orders
  },
  orderText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
    marginBottom: 8,
  },
  continueText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.primary.regular,
    color: '#000',
    marginBottom: 10,
  },
  similarHomesSection: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
  actionText: {
    fontSize: 18,
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.bold,
    marginVertical: 15,
    textDecorationLine: 'underline', // Style it like a link
    textAlign: 'center',
    
  },
  promotetext: {
    fontSize: 18,
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.bold,
    marginVertical: 15,
    textDecorationLine: 'underline', // Style it like a link
    textAlign: 'center',
    marginTop: -100, // Move title up by 20px

  },
});

export default CenterScreen;
