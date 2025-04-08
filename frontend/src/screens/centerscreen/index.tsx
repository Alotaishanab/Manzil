import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { 
  emptyAnimation, 
  checkAnimation,
  waveBackground,
  boostRocket,
  newListing,
  documentAnimation,
  plusAnimation
} from '@assets';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const CenterScreen = ({ listings = [], requests = [] }) => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const cardScale = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const AnimatedCheck = () => (
    <LottieView
      source={checkAnimation}
      autoPlay
      loop={false}
      style={styles.checkAnimation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <LottieView
        source={waveBackground}
        autoPlay
        loop
        speed={0.5}
        style={styles.waveBackground}
      />

      <View style={styles.contentContainer}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Manzil</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.badgeText}>Premium</Text>
            <AnimatedCheck />
          </View>
        </Animated.View>

        <View style={styles.actionGrid}>
          <Animated.View style={{ transform: [{ scale: cardScale }] }}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('PromoteProperty')}
              activeOpacity={0.9}
            >
              <View style={styles.cardGradient}>
                <LottieView
                  source={boostRocket}
                  autoPlay
                  loop
                  style={styles.actionAnimation}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.actionCardTitle}>Boost Listing</Text>
                  <Text style={styles.actionCardSubtitle}>Maximize visibility</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: cardScale }] }}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Auth', { screen: 'AddProperties' })}
              activeOpacity={0.9}
            >
              <View style={[styles.cardGradient, styles.gradientSecondary]}>
                <LottieView
                  source={newListing}
                  autoPlay
                  loop
                  style={styles.actionAnimation}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.actionCardTitle}>New Listing</Text>
                  <Text style={styles.actionCardSubtitle}>Start selling</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Requests</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('RequestProperty')}
            >
              <LottieView
                source={plusAnimation}
                autoPlay
                loop={false}
                style={styles.plusAnimation}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.requestsContainer}>
            {requests.length > 0 ? (
              requests.slice(0, 3).map((request, index) => (
                <Animated.View 
                  key={request.id} 
                  style={[styles.requestCard, { 
                    opacity: fadeAnim,
                    transform: [{
                      translateX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50 * (index + 1), 0]
                      })
                    }]
                  }]}
                >
                  <LottieView
                    source={documentAnimation}
                    autoPlay
                    loop
                    style={styles.documentAnimation}
                  />
                  <View style={styles.requestContent}>
                    <Text 
                      style={styles.requestTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {request.title}
                    </Text>
                    <Text style={styles.requestDate}>Created 2 days ago</Text>
                  </View>
                  <View style={styles.progressPill}>
                    <Text style={styles.progressText}>In Review</Text>
                  </View>
                </Animated.View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <LottieView
                  source={emptyAnimation}
                  autoPlay
                  loop
                  style={styles.emptyAnimation}
                />
                <Text style={styles.emptyText}>No Active Requests</Text>
                <Text style={styles.emptySubtext}>Create your first request</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FDF9',
  },
  waveBackground: {
    position: 'absolute',
    width: screenWidth * 1.5,
    height: screenHeight * 0.6,
    opacity: 0.15,
    top: -50,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-ExtraBold',
    color: '#17301B',
    letterSpacing: -1.2,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(92,201,111,0.15)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    color: '#2E7D32',
    fontSize: 14,
  },
  checkAnimation: {
    width: 24,
    height: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    height: 160,
  },
  actionCard: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#5CC96F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  cardGradient: {
    flex: 1,
    backgroundColor: '#5CC96F',
    padding: 16,
  },
  gradientSecondary: {
    backgroundColor: '#4A90E2',
  },
  actionAnimation: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -10,
    top: -10,
    opacity: 0.8,
  },
  cardTextContainer: {
    marginTop: 'auto',
  },
  actionCardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  actionCardSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.95)',
    marginTop: 4,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A331E',
  },
  addButton: {
    backgroundColor: '#5CC96F',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusAnimation: {
    width: 20,
    height: 20,
  },
  requestsContainer: {
    flex: 1,
    maxHeight: screenHeight * 0.3,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EDF5EE',
  },
  documentAnimation: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  requestContent: {
    flex: 1,
    marginRight: 8,
  },
  requestTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1D3B21',
    marginBottom: 2,
  },
  requestDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#7A8D7E',
  },
  progressPill: {
    backgroundColor: 'rgba(92,201,111,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: '#5CC96F',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyAnimation: {
    width: 120,
    height: 120,
    opacity: 0.8,
  },
  emptyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#BFCEC1',
    marginTop: 12,
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#D0E0D3',
    marginTop: 2,
  },
});

export default CenterScreen;