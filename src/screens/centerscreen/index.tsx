import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@colors';
import { fonts } from '@fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddedProperties } from '@screens';
import { TopSpace, CustomButton } from '@components'; 

const { width: screenWidth } = Dimensions.get('window');

export const CenterScreen = () => {
  const navigation = useNavigation();

  const incompleteOrders = [
    { id: '1', title: 'Apartment in Jeddah' },
    { id: '2', title: 'Villa in Riyadh' },
  ];

  const completedOrders = [
    { id: '3', title: 'Shop in Dammam' },
    { id: '4', title: 'Warehouse in Makkah' },
  ];

  const handleCardClick = (propertyId: string) => {
    navigation.navigate('PropertyScreen', { propertyId });
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
    <View
      style={[styles.orderCard, type === 'completed' ? styles.completedCard : {}]}
    >
      <Text style={styles.orderText}>{item.title}</Text>
      <Text style={styles.continueText}>
        {type === 'completed' ? 'View Order' : 'Continue Order'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manzil</Text>

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
          {/* Custom Add Property Button */}
          <CustomButton
            btnWidth={'50%'}
            borderRadius={30}
            disabled={false}
            handleClick={() => handleActionClick('AddProperty')}
            title={'Add Property'}
            showRightIconButton={false}
          />
        </View>
      )}

      {/* Completed Orders Section */}
      {completedOrders.length > 0 && (
        <View style={styles.ordersContainer}>
          <View style={styles.similarHomesSection}>
            <AddedProperties handleClick={handleCardClick} />
            {/* Custom Promote Property Button */}
            <CustomButton
              btnWidth={'50%'}
              borderRadius={30}
              disabled={false}
              handleClick={() => handleActionClick('PromoteProperty')}
              title={'Promote Property'}
              showRightIconButton={false}
            />
          </View>
        </View>
      )}

      {/* Requested Properties Section */}
      <View style={styles.ordersContainer}>
        <Text style={styles.subTitle}>Requested Properties</Text>
        <FlatList
          data={incompleteOrders}
          renderItem={({ item }) => renderOrder({ item, type: 'incomplete' })}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ordersList}
        />
        {/* Custom Request Property Button */}
        <CustomButton
          btnWidth={'50%'}
          borderRadius={30}
          disabled={false}
          handleClick={() => handleActionClick('RequestProperty')}
          title={'Request Property'}
          showRightIconButton={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,  // Reduced padding for more space
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: screenWidth * 0.055,  // Smaller title size for better fit
    fontFamily: fonts.primary.bold,
    color: 'green',
    marginBottom: 10,  // Reduced margin
    textAlign: 'center',
  },
  subTitle: {
    fontSize: screenWidth * 0.045,  // Slightly smaller subtitle size
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle,
    marginBottom: 5,  // Reduced margin
  },
  ordersContainer: {
    marginBottom: 10,  // Reduced margins between sections
  },
  orderCard: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 8,  // Reduced border radius
    padding: 10,  // Reduced padding inside the cards
    marginRight: 8,  // Reduced margin between cards
    width: screenWidth * 0.4,  // Smaller card width for better fit
    justifyContent: 'center',
    elevation: 2,
  },
  completedCard: {
    backgroundColor: Colors.light.completedOrderBackground,
  },
  orderText: {
    color: Colors.light.headingTitle,
    fontFamily: fonts.primary.medium,
    fontSize: screenWidth * 0.04,  // Responsive font size
    marginBottom: 5,  // Reduced margin
  },
  continueText: {
    color: Colors.light.primaryBtn,
    fontFamily: fonts.primary.regular,
    fontSize: screenWidth * 0.035,  // Responsive font size
    textDecorationLine: 'underline',  // Underline for "Continue Order"
  },
  similarHomesSection: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
});

export default CenterScreen;
