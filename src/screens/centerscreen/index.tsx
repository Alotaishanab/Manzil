import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import LottieView from 'lottie-react-native';
import { emptyAnimation, checkAnimation } from '@assets';

const { width: screenWidth } = Dimensions.get('window');

export const CenterScreen = ({ listings = [], requests = [] }) => {
  const navigation = useNavigation();

  // Beautiful animated checkmark component
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
      
      {/* Floating Background Elements */}
      <View style={styles.backgroundPattern}>
        <View style={styles.circleAccent} />
        <View style={styles.diagonalLine} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Elevated Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Manzil</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.badgeText}>Premium</Text>
            <AnimatedCheck />
          </View>
        </View>

        {/* Action Grid */}
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, styles.promoteCard]}
            onPress={() => navigation.navigate('PromoteProperty')}
          >
            <BlurView
              style={styles.blurBackground}
              blurType="light"
              blurAmount={Platform.OS === 'ios' ? 30 : 15}
              overlayColor="rgba(255,255,255,0.15)"
            >
              <Icon name="rocket" size={28} color="#FFF" />
              <Text style={styles.actionCardTitle}>Boost Listing</Text>
              <Text style={styles.actionCardSubtitle}>Reach more buyers</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, styles.listCard]}
            onPress={() => navigation.navigate('AddProperties')}
          >
            <BlurView
              style={styles.blurBackground}
              blurType="light"
              blurAmount={Platform.OS === 'ios' ? 30 : 15}
              overlayColor="rgba(255,255,255,0.15)"
            >
              <Icon name="home" size={28} color="#FFF" />
              <Text style={styles.actionCardTitle}>New Listing</Text>
              <Text style={styles.actionCardSubtitle}>Sell your property</Text>
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Requests Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Requests</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('RequestProperty')}
            >
              <Icon name="add" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          {requests.length > 0 ? (
            requests.map((request) => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestIcon}>
                  <Icon name="document-text" size={18} color="#4CAF50" />
                </View>
                <View style={styles.requestContent}>
                  <Text style={styles.requestTitle}>{request.title}</Text>
                  <Text style={styles.requestDate}>Created 2 days ago</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#BDBDBD" />
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <LottieView
                source={emptyAnimation}
                autoPlay
                loop
                style={styles.emptyAnimation}
              />
              <Text style={styles.emptyText}>No active requests</Text>
              <Text style={styles.emptySubtext}>Create your first request to get started</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Ultra-Polished Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8F5E9',
    opacity: 0.3,
  },
  circleAccent: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(76,175,80,0.1)',
  },
  diagonalLine: {
    position: 'absolute',
    bottom: -300,
    left: -150,
    width: 600,
    height: 600,
    transform: [{ rotate: '-30deg' }],
    backgroundColor: 'rgba(104,159,56,0.05)',
  },
  scrollContainer: {
    paddingTop: 44,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 38,
    fontFamily: 'Inter-ExtraBold',
    color: '#1B5E20',
    letterSpacing: -1.2,
    textShadowColor: 'rgba(76,175,80,0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76,175,80,0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    color: '#2E7D32',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  checkAnimation: {
    width: 24,
    height: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  actionCard: {
    flex: 1,
    height: 180,
    borderRadius: 28,
    overflow: 'hidden',
  },
  promoteCard: {
    backgroundColor: 'rgba(46,125,50,0.9)',
  },
  listCard: {
    backgroundColor: 'rgba(33,150,83,0.9)',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
  },
  actionCardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFF',
    marginTop: 'auto',
    lineHeight: 24,
  },
  actionCardSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  sectionContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 28,
    padding: 20,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1B5E20',
    letterSpacing: -0.5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  requestIcon: {
    backgroundColor: 'rgba(76,175,80,0.1)',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  requestContent: {
    flex: 1,
  },
  requestTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  requestDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#757575',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyAnimation: {
    width: 160,
    height: 160,
    opacity: 0.8,
  },
  emptyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#BDBDBD',
    marginTop: 16,
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 4,
  },
});

export default CenterScreen;