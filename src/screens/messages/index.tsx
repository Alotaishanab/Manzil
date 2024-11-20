// src/screens/Messages.tsx

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
} from 'react-native';
import { Colors } from '@colors'; // Ensure this path is correct
import { fonts } from '@fonts'; // Ensure this path is correct
import { useIntl } from '@context'; // Ensure this path is correct
import { Ads, CustomButton } from '@components'; // Import CustomButton from @components
import { AsyncHelper } from '@helpers'; // Import AsyncHelper from @helpers
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have installed react-native-vector-icons
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios'; // Ensure axios is installed

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string; // Optional avatar URL
  subject: string;
  snippet: string;
  timestamp: string;
}

interface MessagesProps {
  navigation: any; // Replace with appropriate navigation type
}

export const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  const { intl } = useIntl();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Function to fetch messages from API
  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const token = await AsyncHelper.getToken();
      if (!token) {
        setIsLoggedIn(false);
        setMessages([]);
        return;
      }

      // Example API call using axios
      const response = await axios.get<Message[]>('YOUR_API_ENDPOINT/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle specific error cases if needed
      setIsLoggedIn(false);
      setMessages([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMessages();
  }, []);

  const handleMessagePress = (message: Message) => {
    // Navigate to a detailed message screen if available
    navigation.navigate('MessageDetail', { message });
    // console.log('Message pressed:', message);
  };

  const handleLoginPress = () => {
    navigation.navigate('Auth', { screen: 'Login' }); // Adjust based on your navigation structure
  };

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={styles.messageItem}>
        <View style={styles.avatarSkeleton} />
        <View style={styles.messageContent}>
          <View style={styles.messageHeaderSkeleton}>
            <View style={styles.senderSkeleton} />
            <View style={styles.timestampSkeleton} />
          </View>
          <View style={styles.subjectSkeleton} />
          <View style={styles.snippetSkeleton} />
        </View>
        <View style={styles.iconSkeleton} />
      </View>
    </SkeletonPlaceholder>
  );

  const renderItem = ({ item, index }: { item: Message; index: number }) => (
    <>
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() => handleMessagePress(item)}
        accessibilityLabel={`Message from ${item.sender}`}
      >
        {item.senderAvatar ? (
          <Image source={{ uri: item.senderAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Icon name="person-circle-outline" size={48} color={Colors.light.greyDescription} />
          </View>
        )}
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={styles.senderText}>{item.sender}</Text>
            <Text style={styles.timestampText}>{item.timestamp}</Text>
          </View>
          <Text style={styles.subjectText}>{item.subject}</Text>
          <Text style={styles.snippetText} numberOfLines={2}>
            {item.snippet}
          </Text>
        </View>

        {/* Chevron Icon */}
        <Icon name="chevron-forward" size={20} color={Colors.light.icon} />
      </TouchableOpacity>
      {index === 0 && <Ads style={styles.ad} />}
    </>
  );

  const keyExtractor = (item: Message) => item.id;

  if (loading && !refreshing) {
    // Display skeleton loaders
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
            <TouchableOpacity
              onPress={() => {
                // Handle new message action
                console.log('New message button pressed');
              }}
              accessibilityLabel="Compose new message"
            >
              <Icon name="create-outline" size={24} color={Colors.light.onPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.listContent}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={index}>{renderSkeleton()}</View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
            <TouchableOpacity
              onPress={() => {
                // Handle new message action
                console.log('New message button pressed');
              }}
              accessibilityLabel="Compose new message"
            >
              <Icon name="create-outline" size={24} color={Colors.light.onPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.notLoggedInContainer}>
            <Text style={styles.notLoggedInText}>
              {intl.formatMessage({
                id: 'messagesScreen.loginPrompt',
                defaultMessage: 'Log in to contact and message property owners.',
              })}
            </Text>
            
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity
            onPress={() => {
              // Handle new message action
              console.log('New message button pressed');
            }}
            accessibilityLabel="Compose new message"
          >
            <Icon name="create-outline" size={24} color={Colors.light.onPrimary} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="chatbubble-ellipses-outline" size={64} color={Colors.light.greyDescription} />
              <Text style={styles.emptyText}>
                {intl.formatMessage({
                  id: 'messagesScreen.noMessages',
                  defaultMessage: 'You have no messages. Contact property owners to start a conversation.',
                })}
              </Text>
            </View>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.primaryButton, // Green background for SafeAreaView
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background, // White background for the main content
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.primaryButton, // Green background for header
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: Colors.light.onPrimary, // White text on green background
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.cardBackground, // Light gray for message items
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: Colors.light.greyBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.primaryButton, // Dark green for sender's name
  },
  timestampText: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyDescription, // Gray for timestamp
  },
  subjectText: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle, // Black for subject
    marginBottom: 2,
  },
  snippetText: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyDescription, // Gray for snippet
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 32,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyDescription, // Gray text
  },
  ad: {
    marginVertical: 16,
    alignSelf: 'center',
  },
  separator: {
    height: 12,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  notLoggedInText: {
    fontSize: 18,
    fontFamily: fonts.primary.medium,
    color: Colors.light.headingTitle, // Black text
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    color: Colors.light.headingTitle,
    textAlign: 'left',
  },
  avatarSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderSkeleton: {
    width: '40%',
    height: 16,
    borderRadius: 4,
  },
  timestampSkeleton: {
    width: '20%',
    height: 12,
    borderRadius: 4,
  },
  subjectSkeleton: {
    width: '60%',
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  snippetSkeleton: {
    width: '80%',
    height: 12,
    borderRadius: 4,
  },
  iconSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
