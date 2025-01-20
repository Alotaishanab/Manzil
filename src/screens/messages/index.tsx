import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { useIntl } from '@context';
import { useFocusEffect } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import AsyncHelper from '../../helpers/asyncHelper';
import { MessagingWebSocketManager, Message, fetchChats } from '@services';
import { CustomButton } from '@components';
import { Colors } from '@colors';
import { fonts, messageAnimation, launchScreen } from '@assets';
import { UserIcon } from '@svgs';

interface MessagesProps {
  navigation: any;
}

export const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  const { intl } = useIntl();
  const [localToken, setLocalToken] = useState<string | null>(null);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [groupedChats, setGroupedChats] = useState<Record<string, Message>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // WebSocket manager
  const messagingWS = MessagingWebSocketManager;

  // Animated background values
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const backgroundScale = useRef(new Animated.Value(0.5)).current;

  // Animate background only if user is logged in & has messages
  const shouldAnimateBackground =
    !!localToken && localToken.trim().length > 0 && Object.keys(groupedChats).length > 0;

  useEffect(() => {
    if (shouldAnimateBackground) {
      Animated.parallel([
        Animated.timing(backgroundOpacity, {
          toValue: 0.1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(backgroundScale, {
          toValue: 1,
          friction: 4,
          tension: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      backgroundOpacity.setValue(0);
      backgroundScale.setValue(0.5);
    }
  }, [shouldAnimateBackground]);

  // Replace with your actual logic; for demo purposes, returning 7.
  const getCurrentUserId = async (): Promise<number | null> => {
    return 7;
  };

  // Updated loadChats that receives the userId as a parameter
  const loadChats = async (token: string, currentUserId: number) => {
    try {
      const response = await fetchChats(token);
      console.log('[Messages] Retrieved chats:', JSON.stringify(response, null, 2));
      const chats = Array.isArray(response) ? response : [];

      // Group messages by the "other user" in each conversation.
      // Convert partnerKey to string for consistency.
      const grouped: Record<string, Message> = {};
      chats.forEach((msg) => {
        const isMeSender = msg.sender?.user_id === currentUserId;
        const partnerKey = isMeSender ? msg.receiver?.user_id : msg.sender?.user_id;
        if (partnerKey != null) {
          const key = String(partnerKey);
          // Use the most recent message for the conversation
          if (
            !grouped[key] ||
            new Date(msg.timestamp) > new Date(grouped[key].timestamp)
          ) {
            grouped[key] = msg;
          }
        }
      });
      setGroupedChats(grouped);
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };

  // Focus effect: fetch token, userId, and then load chats
  useFocusEffect(
    useCallback(() => {
      const updateTokenAndLoadChats = async () => {
        const tokenFromStorage = await AsyncHelper.getToken();
        const userIdFromStorage = await getCurrentUserId();
        setMyUserId(userIdFromStorage);
        console.log('[Messages] Token from storage:', tokenFromStorage);
        setLocalToken(tokenFromStorage);

        if (tokenFromStorage && tokenFromStorage.trim().length > 0 && userIdFromStorage) {
          messagingWS.setToken(tokenFromStorage);
          await loadChats(tokenFromStorage, userIdFromStorage);
        } else {
          messagingWS.setToken(null);
          setGroupedChats({});
        }
        setLoading(false);
      };
      updateTokenAndLoadChats();
    }, [])
  );

  // Pull-to-refresh logic
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (localToken && localToken.trim().length > 0 && myUserId) {
      loadChats(localToken, myUserId).finally(() => setRefreshing(false));
    } else {
      setRefreshing(false);
    }
  }, [localToken, myUserId]);

  // Navigate to chat screen
  const handleMessagePress = (message: Message) => {
    navigation.navigate('Auth', { screen: 'ChatScreen', params: { message } });
  };

  // Skeleton for loading
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

  // Identify the "other" user in a chat
  const getChatPartner = (msg: Message) => {
    const isMeSender = msg.sender?.user_id === myUserId;
    return isMeSender ? msg.receiver : msg.sender;
  };

  // Render a chat item
  const renderItem = ({ item }: { item: Message }) => {
    const partner = getChatPartner(item);
    const partnerPic = partner?.profile_picture;
    const partnerName = partner?.name || 'Unknown';

    // Format date/time: "Jan 17, 2025 • 13:16"
    const dateObj = new Date(item.timestamp);
    const dateString = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeString = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    // Highlight if status is "sent" (assumed to be unread)
    const isUnread = item.status === 'sent';
    const containerStyle = [
      styles.messageItem,
      isUnread && styles.unreadItem,
    ];

    return (
      <TouchableOpacity style={containerStyle} onPress={() => handleMessagePress(item)}>
        {partnerPic ? (
          <Image source={{ uri: partnerPic }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <UserIcon width={32} height={32} /> 
          </View>
        )}
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={styles.senderText}>{partnerName}</Text>
          </View>
          <Text style={styles.snippetText} numberOfLines={2}>
            {item.body}
          </Text>
          <Text style={styles.timestampText}>
            {`${dateString} • ${timeString}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: Message) => item.id;
  // Flatten the grouped chats into a list
  const chatList = Object.values(groupedChats);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <View style={styles.listContent}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <View key={idx}>{renderSkeleton()}</View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!localToken || localToken.trim().length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <View style={styles.notLoggedInContainer}>
            <Text style={styles.emptyText}>
              {intl.formatMessage({
                id: 'messagesScreen.loginHeading',
                defaultMessage: 'Log in to contact and message property owners.',
              })}
            </Text>
            <Text style={styles.subEmptyText}>
              {intl.formatMessage({
                id: 'messagesScreen.loginSubText',
                defaultMessage: 'Sign in to access exclusive features and start a conversation.',
              })}
            </Text>
            <View style={{ marginTop: 20 }}>
              <CustomButton
                btnWidth="100%"
                disabled={false}
                textSize={16}
                borderRadius={30}
                title={intl.formatMessage({ id: 'buttons.signIn', defaultMessage: 'Sign In' })}
                showSocialButton={false}
                showRightIconButton={true}
                textButtonWithIcon
                iconName="UserIcon"
                handleClick={() => navigation.navigate('Auth', { screen: 'Login' })}
              />
            </View>
            <LottieView source={messageAnimation} style={styles.animation} autoPlay loop />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Show a background only if there are messages
  const showBackground = chatList.length > 0;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showBackground && (
          <View style={StyleSheet.absoluteFillObject}>
            <Animated.Image
              source={launchScreen}
              style={[
                styles.manzilBackground,
                {
                  opacity: backgroundOpacity,
                  transform: [{ scale: backgroundScale }],
                },
              ]}
            />
          </View>
        )}
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
        </View>
        <FlatList
          data={chatList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {intl.formatMessage({
                  id: 'messagesScreen.noMessages',
                  defaultMessage: 'Message real estate owners and agencies to find your property!',
                })}
              </Text>
              <Text style={styles.subEmptyText}>
                {intl.formatMessage({
                  id: 'messagesScreen.noMessagesSubText',
                  defaultMessage: 'Start a conversation today to unlock exclusive property details.',
                })}
              </Text>
              <LottieView source={messageAnimation} style={styles.animation} autoPlay loop />
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
    backgroundColor: Colors.light.primaryButton,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.primaryButton,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: Colors.light.onPrimary,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  manzilBackground: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 32,
    paddingTop: 40,
  },
  emptyContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 22,
    fontFamily: fonts.primary.bold,
    color: Colors.light.headingTitle,
  },
  subEmptyText: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: '#8B4513',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.cardBackground,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  unreadItem: {
    backgroundColor: '#E2F9E5',
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.primaryButton,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.light.primaryButton,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  senderText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.primaryButton,
  },
  snippetText: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyDescription,
    marginBottom: 4,
  },
  timestampText: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: Colors.light.greyDescription,
  },
  separator: {
    height: 12,
  },
  // Skeleton styles
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
  animation: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
});
