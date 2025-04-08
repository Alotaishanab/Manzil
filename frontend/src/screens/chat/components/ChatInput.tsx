// components/ChatInput.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { fonts } from '@fonts';

interface ChatInputProps {
  sending: boolean;
  onSend: (text: string, clearInput: () => void) => void;
}

const quickReplies = ["I'm interested…", 'Price?', 'Viewing?'];

export const ChatInput: React.FC<ChatInputProps> = ({ sending, onSend }) => {
  const [inputText, setInputText] = useState('');

  const clearInput = () => setInputText('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText, clearInput);
    }
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
    onSend(text, clearInput);
  };

  return (
    <>
      <View style={styles.quickReplies}>
        {quickReplies.map((txt, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.quickReplyButton}
            onPress={() => handleQuickReply(txt)}
            disabled={sending}
          >
            <Text style={styles.quickReplyButtonText}>{txt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#AAA"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleSend}
          disabled={sending || !inputText.trim()}
        >
          <Image
            source={require('../../../assets/images/send.png')}
            style={[
              styles.iconImage,
              (sending || !inputText.trim()) && { opacity: 0.5 },
            ]}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  quickReplies: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1c1c1e',
    paddingVertical: 8,
  },
  quickReplyButton: {
    backgroundColor: '#FF2D55',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  quickReplyButtonText: {
    fontSize: 13,
    color: '#FFF',
    fontFamily: fonts.primary.bold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  input: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#FFF',
    fontFamily: fonts.primary.regular,
  },
  iconButton: {
    marginLeft: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#FFF',
  },
});
