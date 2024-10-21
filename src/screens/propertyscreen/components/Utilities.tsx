import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../assets/fonts/index'; // Import fonts
import { WaterIcon, ElectricityIcon, SewageIcon } from '@assets'; // Custom icons from your assets

// Example utility data (replace with actual data from backend)
const utilities = {
  water: true,
  electricity: true,
  sewageSystem: false,
};

const Utilities: React.FC = () => {
  return (
  <View style={styles.outerContainer}>
    <View style={styles.utilityContainer}>
      <Text style={styles.utilityTitle}>Utilities</Text>
      
      <View style={styles.utilityCardWrapper}>
        {/* Water */}
        <View style={styles.utilityCardContainer}>
          <View style={[styles.statusIndicator, utilities.water ? styles.statusAvailable : styles.statusUnavailable]} />
          <View style={[styles.utilityCard, utilities.water ? styles.utilityWaterAvailable : styles.utilityWaterUnavailable]}>
            <WaterIcon width={24} height={24} color={utilities.water ? "#fff" : "#000"} />
            <Text style={styles.utilityCardText}>Water</Text>
          </View>
          <Text style={[styles.statusText, utilities.water ? styles.textAvailable : styles.textUnavailable]}>
            {utilities.water ? "Available" : "Unavailable"}
          </Text>
        </View>

        {/* Electricity */}
        <View style={styles.utilityCardContainer}>
          <View style={[styles.statusIndicator, utilities.electricity ? styles.statusAvailable : styles.statusUnavailable]} />
          <View style={[styles.utilityCard, utilities.electricity ? styles.utilityElectricityAvailable : styles.utilityElectricityUnavailable]}>
            <ElectricityIcon width={24} height={24} color={utilities.electricity ? "#fff" : "#000"} />
            <Text style={styles.utilityCardText}>Electricity</Text>
          </View>
          <Text style={[styles.statusText, utilities.electricity ? styles.textAvailable : styles.textUnavailable]}>
            {utilities.electricity ? "Available" : "Unavailable"}
          </Text>
        </View>

        {/* Sewage */}
        <View style={styles.utilityCardContainer}>
          <View style={[styles.statusIndicator, utilities.sewageSystem ? styles.statusAvailable : styles.statusUnavailable]} />
          <View style={[styles.utilityCard, utilities.sewageSystem ? styles.utilitySewageAvailable : styles.utilitySewageUnavailable]}>
            <SewageIcon width={24} height={24} color={utilities.sewageSystem ? "#fff" : "#000"} />
            <Text style={styles.utilityCardText}>Sewage</Text>
          </View>
          <Text style={[styles.statusText, utilities.sewageSystem ? styles.textAvailable : styles.textUnavailable]}>
            {utilities.sewageSystem ? "Available" : "Unavailable"}
          </Text>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  utilityContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 10,
    width: '97%',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginVertical: 10,
    overflow: 'hidden',
  },
  utilityTitle: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.primary.bold,
    marginBottom: 10,
    textAlign: 'center',
  },
  utilityCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  utilityCardContainer: {
    alignItems: 'center',
    width: '30%',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    top: -5, // Adjusted for smaller gap
    right: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusAvailable: {
    backgroundColor: '#34A853', // Green for available
  },
  statusUnavailable: {
    backgroundColor: '#EA4335', // Red for unavailable
  },
  utilityCard: {
    width: 100,
    height: 90, // Set uniform card size
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  // Water card styles
  utilityWaterAvailable: {
    backgroundColor: '#007AFF', // Bright Blue for available water
  },
  utilityWaterUnavailable: {
    backgroundColor: '#CCE5FF', // Light Blue for unavailable water
  },
  // Electricity card styles
  utilityElectricityAvailable: {
    backgroundColor: '#FFC107', // Bright Yellow for available electricity
  },
  utilityElectricityUnavailable: {
    backgroundColor: '#FFF8E1', // Light Cream for unavailable electricity
  },
  // Sewage card styles
  utilitySewageAvailable: {
    backgroundColor: '#388E3C', // Dark Green for available sewage
  },
  utilitySewageUnavailable: {
    backgroundColor: '#F0F0F0', // Light Gray for unavailable sewage
  },
  utilityCardText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    marginTop: 5,
  },
  textAvailable: {
    color: 'green',
  },
  textUnavailable: {
    color: 'red',
  },
});

export default Utilities;
