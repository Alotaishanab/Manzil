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
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { MessagingWebSocketManager, usehideChat, usepinConversation  } from '@services';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import AsyncHelper from '../../helpers/asyncHelper';
import { CustomButton, SearchBar } from '@components';
import { Colors } from '@colors';
import { fonts, messageAnimation, launchScreen } from '@assets';
import { UserIcon, PinIcon } from '@svgs';

// Types for your conversation items
export interface ConversationSnippet {
  partner_id: number;
  partner_name: string;
  partner_profile_picture: string | null;
  last_message_body: string;
  last_message_timestamp: string;
  last_message_status: string;
  pinned: boolean;
}

// Example fetch function, adjusted for the new shape
import { fetchConversationList } from '@services';
// ^ This should call your updated endpoint that returns the new JSON structure

interface MessagesProps {
  navigation: any;
}

export const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  const [token, setToken] = useState<string | null>(null);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<ConversationSnippet[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const backgroundScale = useRef(new Animated.Value(0.5)).current;
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add filtered conversations
  const filteredConversations = conversations.filter(conv => 
    conv.partner_name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );





  useEffect(() => {
    // handleNewMessage => updates or inserts a snippet
    const handleNewMessage = (msg: {
      sender: { user_id: number; name?: string; profile_picture?: string | null };
      receiver: { user_id: number; name?: string; profile_picture?: string | null } | number;
      body: string; 
      timestamp: string; 
      status: string; 
    }) => {
      let partnerId: number;
      // If I'm the sender, the partner is msg.receiver.user_id
      // If I'm the receiver, the partner is msg.sender.user_id
      if (msg.sender.user_id === myUserId) {
        // "other user" is the receiver
        if (typeof msg.receiver === 'object') {
          partnerId = msg.receiver.user_id;
        } else {
          partnerId = msg.receiver; // if it's just a number
        }
      } else {
        // I'm the receiver, so partner is the sender
        partnerId = msg.sender.user_id;
      }

      setConversations((prev) => {
        const updated = [...prev];
        const index = updated.findIndex((conv) => conv.partner_id === partnerId);

        if (index > -1) {
          // Update existing snippet
          updated[index] = {
            ...updated[index],
            last_message_body: msg.body,
            last_message_timestamp: msg.timestamp,
            last_message_status: msg.status,
          };
        } else {
          // Insert a new snippet at the top
          updated.unshift({
            partner_id: partnerId,
            partner_name: msg.sender.name || 'User',
            partner_profile_picture: msg.sender.profile_picture || null,
            last_message_body: msg.body,
            last_message_timestamp: msg.timestamp,
            last_message_status: msg.status,
          });
        }
        return updated;
      });
    };

    MessagingWebSocketManager.on('new_message', handleNewMessage);
    return () => {
      MessagingWebSocketManager.off('new_message', handleNewMessage);
    };
  }, [myUserId]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        // read token & user ID
        const tk = await AsyncHelper.getToken();
        const uid = await AsyncHelper.getUserId();
        setToken(tk || null);
        setMyUserId(uid ? parseInt(uid, 10) : null);

        if (!tk) {
          setConversations([]);
          setLoading(false);
          return;
        }
        try {
          const data = await fetchConversationList(tk);
          setConversations(data);
        } catch (err) {
          console.error('[Messages] Error loading conversation list:', err);
        }
        setLoading(false);
      };
      loadData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (!token) {
      setRefreshing(false);
      return;
    }
    fetchConversationList(token)
      .then((data) => setConversations(data))
      .catch((err) => console.error(err))
      .finally(() => setRefreshing(false));
  }, [token]);

  const handlePressConversation = (item: ConversationSnippet) => {
    navigation.navigate('Auth', {
      screen: 'ChatScreen',
      params: {
        partnerId: item.partner_id,
        partnerName: item.partner_name,
        partnerPic: item.partner_profile_picture,
      },
    });
  };

  const handleDelete = async (partnerId: number) => {
    try {
      await usehideChat(partnerId, token!);
      setConversations(prev => prev.filter(c => c.partner_id !== partnerId));
    } catch (error) {
      console.error('Error hiding chat:', error);
    }
  };
  
  const handlePin = async (partnerId: number, isPinned: boolean) => {
    try {
      await usepinConversation(partnerId, token!);
      setConversations(prev => prev.map(c => 
        c.partner_id === partnerId ? {...c, pinned: !isPinned} : c
      ));
    } catch (error) {
      console.error('Error pinning conversation:', error);
    }
  };

  // Render a skeleton row
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
      </View>
    </SkeletonPlaceholder>
  );

  

  // Renders each conversation row
  const renderItem = ({ item }: { item: ConversationSnippet }) => {
    const partnerPic = item.partner_profile_picture;
    const partnerName = item.partner_name || 'Unknown';

    // Format the date/time
    const dateObj = new Date(item.last_message_timestamp);
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

    // Example "unread" check if status is "sent"
    const isUnread = item.last_message_status === 'sent';
    // Replace existing containerStyle definition with:
    const containerStyle = [
      styles.messageItem, 
      isUnread && styles.unreadItem,
      { marginHorizontal: 0 } // 👈 Remove horizontal margins
    ];

    const renderRightActions = () => (
      <View style={{ flexDirection: 'row', width: 160 }}>
        <RectButton
          style={[styles.swipeAction, styles.pinAction]}
          onPress={() => handlePin(item.partner_id, item.pinned)}>
          <Text style={styles.swipeActionText}>
            {item.pinned ? 'Unpin' : 'Pin'}
          </Text>
        </RectButton>
        <RectButton
          style={[styles.swipeAction, styles.deleteAction]}
          onPress={() => handleDelete(item.partner_id)}>
          <Text style={styles.swipeActionText}>Delete</Text>
        </RectButton>
      </View>
    );
    return (
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
      >
        <TouchableOpacity
          style={containerStyle}
          onPress={() => handlePressConversation(item)}
        >
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
              {/* Add pin indicator */}
              {item.pinned && (
                <PinIcon 
                  width={24} 
                  height={24} 
                  style={styles.pinIndicator} 
                />
              )}
            </View>
            <Text style={styles.snippetText} numberOfLines={2}>
              {item.last_message_body}
            </Text>
            <Text style={styles.timestampText}>{`${dateString} • ${timeString}`}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  // Show skeleton if still loading and not refreshing
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

  // If no token => user isn’t logged in
  if (!token || token.trim().length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Messages</Text>
          </View>
          <View style={styles.notLoggedInContainer}>
            <Text style={styles.emptyText}>
              Log in to contact and message property owners.
            </Text>
            <Text style={styles.subEmptyText}>
              Sign in to access exclusive features and start a conversation.
            </Text>
            <View style={{ marginTop: 20 }}>
              <CustomButton
                btnWidth="100%"
                disabled={false}
                textSize={16}
                borderRadius={30}
                title="Sign In"
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

  // If logged in but no data, show empty state
  const showBackground = conversations.length > 0;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Optional background image animation */}
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

        {/* Search Bar - Only show when logged in */}
        {token && (
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search by name"
              showFilterBtn={false}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(_, idx) => String(idx)} 
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Message real estate owners and agencies to find your property!
              </Text>
              <Text style={styles.subEmptyText}>
                Start a conversation today to unlock exclusive property details.
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
  
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
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
    paddingVertical: 16, // 👈 Change from padding to vertical only
    paddingHorizontal: 16, // 👈 Add horizontal padding
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%', // 👈 Ensure full width
  },
  listContent: {
    padding: 0, // Remove padding
  },
  separator: {
    height: 1, // 👈 Make separators thinner
    backgroundColor: '#f0f0f0',
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
  pinIndicator: {
    marginLeft: 8,
    position: 'relative', // Changed from absolute
    top: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Changed from space-between
    alignItems: 'center', // Added for vertical alignment
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
  swipeAction: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  deleteAction: {
    backgroundColor: '#ff4444',
  },
  pinAction: {
    backgroundColor: '#ffc107',
  },
  swipeActionText: {
    color: 'white',
    fontWeight: 'bold',
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
  pinIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
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