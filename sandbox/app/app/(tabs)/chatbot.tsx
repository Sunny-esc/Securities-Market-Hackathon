import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ChatMessage } from '../../services/api';
import { chatWithAI } from '../../services/api';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ChatbotScreen: React.FC = () => {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m FinanceBuddy AI, your personal finance learning assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Call the AI chat API
      const aiResponse = await chatWithAI(userMessage.content, language);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Show fallback message if AI fails
      const fallbackMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, or check your internet connection.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, fallbackMessage]);
      
      Alert.alert(
        'Connection Error',
        'Failed to get response from AI. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[
      styles.messageContainer,
      item.role === 'user' ? styles.userMessage : styles.assistantMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.role === 'user' ? styles.userBubble : styles.assistantBubble,
        item.role === 'assistant' && { borderColor: colors.border }
      ]}>
        <Text style={[
          styles.messageText,
          item.role === 'user' ? styles.userMessageText : { color: colors.text }
        ]}>
          {item.content}
        </Text>
        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const getSuggestedQuestions = () => [
    'What is a stock market?',
    'How does diversification work?',
    'What are the different types of bonds?',
    'How do I start investing?',
    'What is risk management in trading?',
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>FinanceBuddy AI</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your personal finance learning assistant</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => `${item.role}-${index}`}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner size="small" text="AI is thinking..." />
          </View>
        )}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <View style={[styles.suggestionsContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
            <Text style={[styles.suggestionsTitle, { color: colors.text }]}>Try asking:</Text>
            <View style={styles.suggestionsGrid}>
              {getSuggestedQuestions().map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.suggestionButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                  onPress={() => handleSuggestedQuestion(question)}
                >
                  <Text style={[styles.suggestionText, { color: colors.textSecondary }]}>{question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Input Section */}
        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.textInput,
                { 
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text
                }
              ]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about finance..."
              placeholderTextColor={colors.textSecondary}
              multiline
              maxLength={500}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: colors.primary },
                (!inputText.trim() || isLoading) && { backgroundColor: colors.border }
              ]}
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
            >
              <Text style={[
                styles.sendButtonText,
                (!inputText.trim() || isLoading) && { color: colors.textSecondary }
              ]}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderWidth: 1,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  suggestionsContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionsGrid: {
    gap: 8,
  },
  suggestionButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    padding: 12,
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatbotScreen; 