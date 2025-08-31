import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Module } from '../../services/api';
import { dummyModules } from '../../data/dummyData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { language, setLanguage, getLanguageName } = useLanguage();
  const { colors } = useTheme();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      setLoading(true);
      // In a real app, you would call the API here
      // const apiModules = await getModules();
      // setModules(apiModules);
      
      // For now, using dummy data
      setModules(dummyModules);
      setError(null);
    } catch (err) {
      setError('Failed to load modules. Please try again.');
      // Fallback to dummy data
      setModules(dummyModules);
    } finally {
      setLoading(false);
    }
  };

  const handleModulePress = (moduleId: string) => {
    router.push(`/quiz/${moduleId}`);
  };

  const handleLanguageChange = () => {
    // Cycle through languages
    const languages: Array<keyof typeof getLanguageName> = ['en', 'hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const renderModuleItem = ({ item }: { item: Module }) => (
    <TouchableOpacity onPress={() => handleModulePress(item.id)}>
      <Card style={styles.moduleCard}>
        <View style={styles.moduleHeader}>
          <Text style={styles.moduleIcon}>{item.icon}</Text>
          <View style={styles.moduleInfo}>
            <Text style={[styles.moduleTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.moduleDescription, { color: colors.textSecondary }]}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.moduleFooter}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${item.progress}%` }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>{item.progress}%</Text>
          </View>
          <Button
            title={item.isCompleted ? "Review" : "Start"}
            onPress={() => handleModulePress(item.id)}
            variant={item.isCompleted ? "outline" : "primary"}
            size="small"
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingSpinner text="Loading modules..." />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Securities Market Learning</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Master the fundamentals of trading</Text>
        
        <View style={styles.languageContainer}>
          <Text style={[styles.languageLabel, { color: colors.textSecondary }]}>Language:</Text>
          <Button
            title={getLanguageName(language)}
            onPress={handleLanguageChange}
            variant="outline"
            size="small"
            style={styles.languageButton}
          />
        </View>
      </View>

      {error && (
        <View style={[styles.errorContainer, { backgroundColor: '#F8D7DA', borderColor: '#F5C6CB' }]}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Retry"
            onPress={loadModules}
            variant="secondary"
            size="small"
          />
        </View>
      )}

      <FlatList
        data={modules}
        renderItem={renderModuleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageLabel: {
    fontSize: 14,
  },
  languageButton: {
    minWidth: 80,
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  errorText: {
    color: '#721C24',
    marginBottom: 12,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  moduleCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moduleIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  moduleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28A745',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
  },
});

export default HomeScreen;
