import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { theme, toggleTheme, colors } = useTheme();
  const { language, setLanguage, getLanguageName } = useLanguage();
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logout();
              router.replace('/intro');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  const handleLanguageChange = () => {
    // Cycle through languages
    const languages: Array<keyof typeof getLanguageName> = ['en', 'hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  if (isLoading || isLoggingOut) {
    return <LoadingSpinner text={isLoggingOut ? "Logging out..." : "Loading profile..."} />;
  }

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Manage your account settings
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* User Info Card */}
        <Card style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user.email}</Text>
          </View>
        </Card>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          {/* Theme Toggle */}
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Switch between light and dark themes
                </Text>
              </View>
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.surface}
              />
            </View>
          </Card>

          {/* Language Selector */}
          <Card style={styles.settingCard}>
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={handleLanguageChange}
            >
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Language</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Choose your preferred language
                </Text>
              </View>
              <View style={styles.languageValue}>
                <Text style={[styles.languageText, { color: colors.primary }]}>
                  {getLanguageName(language)}
                </Text>
                <Text style={[styles.changeText, { color: colors.textSecondary }]}>
                  Tap to change
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          {/* Edit Profile */}
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Edit Profile</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Update your personal information
                </Text>
              </View>
              <Text style={[styles.arrowText, { color: colors.textSecondary }]}>→</Text>
            </TouchableOpacity>
          </Card>

          {/* Change Password */}
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Change Password</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Update your account password
                </Text>
              </View>
              <Text style={[styles.arrowText, { color: colors.textSecondary }]}>→</Text>
            </TouchableOpacity>
          </Card>

          {/* Privacy Settings */}
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Privacy Settings</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Manage your privacy preferences
                </Text>
              </View>
              <Text style={[styles.arrowText, { color: colors.textSecondary }]}>→</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          {/* Help & FAQ */}
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Help & FAQ</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Get help and find answers
                </Text>
              </View>
              <Text style={[styles.arrowText, { color: colors.textSecondary }]}>→</Text>
            </TouchableOpacity>
          </Card>

          {/* Contact Support */}
          <Card style={styles.settingCard}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Contact Support</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Get in touch with our team
                </Text>
              </View>
              <Text style={[styles.arrowText, { color: colors.textSecondary }]}>→</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            size="large"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  userCard: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingCard: {
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  languageValue: {
    alignItems: 'flex-end',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  changeText: {
    fontSize: 12,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '300',
  },
  logoutContainer: {
    marginTop: 20,
  },
  logoutButton: {
    borderColor: '#DC3545',
  },
});

export default ProfileScreen; 