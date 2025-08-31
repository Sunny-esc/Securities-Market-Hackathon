import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';

const IntroScreen: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const handleGetStarted = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <View style={styles.content}>
        {/* Logo/Image Section */}
        <View style={styles.logoContainer}>
          <View style={[styles.logoPlaceholder, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>📈</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>
            Securities Market Learning App
          </Text>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Learn about stock markets, risks, diversification, and more with FinanceBuddy AI
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={[styles.featureIcon, { color: colors.primary }]}>📚</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              Interactive Learning Modules
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={[styles.featureIcon, { color: colors.primary }]}>🧠</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              AI-Powered FinanceBuddy
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={[styles.featureIcon, { color: colors.primary }]}>📊</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              Progress Tracking & Analytics
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={[styles.featureIcon, { color: colors.primary }]}>🌍</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              Multi-Language Support
            </Text>
          </View>
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            size="large"
            style={styles.getStartedButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 34,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 300,
  },
  featuresContainer: {
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 30,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  getStartedButton: {
    width: '100%',
  },
});

export default IntroScreen; 