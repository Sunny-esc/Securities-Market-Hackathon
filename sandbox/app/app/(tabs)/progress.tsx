import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { UserProgress, Module } from '../../services/api';
import { dummyModules } from '../../data/dummyData';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProgressScreen: React.FC = () => {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would call the API here
      // const userProgress = await getUserProgress();
      // const apiModules = await getModules();
      
      // For now, using dummy data
      const dummyProgress: UserProgress = {
        completedModules: ['basics'],
        quizScores: {
          'basics': 85,
          'risk': 92,
        },
        totalQuizzesTaken: 2,
        averageScore: 88.5,
      };
      
      setProgress(dummyProgress);
      setModules(dummyModules);
    } catch (err) {
      setError('Failed to load progress. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProgress();
    setRefreshing(false);
  };

  const getModuleProgress = (moduleId: string) => {
    if (!progress) return 0;
    
    if (progress.completedModules.includes(moduleId)) {
      return 100;
    }
    
    // In a real app, you might have more granular progress tracking
    return progress.quizScores[moduleId] ? 50 : 0;
  };

  const getModuleStatus = (moduleId: string) => {
    if (!progress) return 'not-started';
    
    if (progress.completedModules.includes(moduleId)) {
      return 'completed';
    }
    
    if (progress.quizScores[moduleId]) {
      return 'in-progress';
    }
    
    return 'not-started';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'in-progress':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading progress..." />;
  }

  if (!progress) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>No progress data available</Text>
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
      
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Track your learning journey</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error && (
          <View style={[styles.errorContainer, { backgroundColor: '#F8D7DA', borderColor: '#F5C6CB' }]}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Overall Stats */}
        <Card style={styles.statsCard}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>Overall Performance</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{progress.totalQuizzesTaken}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Quizzes Taken</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{progress.averageScore}%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Average Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{progress.completedModules.length}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Modules Completed</Text>
            </View>
          </View>
        </Card>

        {/* Module Progress */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Module Progress</Text>
          {modules.map((module) => {
            const status = getModuleStatus(module.id);
            const statusColor = getStatusColor(status);
            const moduleProgress = getModuleProgress(module.id);
            const quizScore = progress.quizScores[module.id];
            
            return (
              <Card key={module.id} style={styles.moduleCard}>
                <View style={styles.moduleHeader}>
                  <Text style={styles.moduleIcon}>{module.icon}</Text>
                  <View style={styles.moduleInfo}>
                    <Text style={[styles.moduleTitle, { color: colors.text }]}>{module.title}</Text>
                    <Text style={[styles.moduleDescription, { color: colors.textSecondary }]}>{module.description}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                      <Text style={styles.statusText}>{getStatusText(status)}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${moduleProgress}%`, backgroundColor: statusColor }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.progressText, { color: colors.textSecondary }]}>{moduleProgress}%</Text>
                </View>
                
                {quizScore && (
                  <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>Quiz Score:</Text>
                    <Text style={[styles.scoreValue, { color: colors.primary }]}>{quizScore}%</Text>
                  </View>
                )}
              </Card>
            );
          })}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
          <Card style={styles.activityCard}>
            <Text style={[styles.activityText, { color: colors.text }]}>
              {progress.completedModules.length > 0 
                ? `Completed ${progress.completedModules.length} module(s)`
                : 'No modules completed yet'
              }
            </Text>
            <Text style={[styles.activitySubtext, { color: colors.textSecondary }]}>
              Keep learning to unlock more achievements!
            </Text>
          </Card>
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
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  errorContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  moduleCard: {
    marginBottom: 16,
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  statusContainer: {
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 40,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  scoreLabel: {
    fontSize: 14,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityCard: {
    alignItems: 'center',
    padding: 20,
  },
  activityText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  activitySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProgressScreen; 