import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { QuizQuestion, QuizResult } from '../../services/api';
import { getQuizQuestionsForModule } from '../../data/dummyData';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import NotificationBanner from '../../components/ui/NotificationBanner';

const QuizScreen: React.FC = () => {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const router = useRouter();
  const { language } = useLanguage();
  const { colors } = useTheme();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [moduleId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch questions from the API
      const quizQuestions = getQuizQuestionsForModule(moduleId || 'basics');
      setQuestions(quizQuestions);
      setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
      setStartTime(new Date());
    } catch (error) {
      Alert.alert('Error', 'Failed to load quiz questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = async () => {
    if (selectedAnswers.includes(-1)) {
      Alert.alert(
        'Incomplete Quiz',
        'Please answer all questions before finishing the quiz.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setSubmitting(true);
      
      // Calculate results
      const results: QuizResult[] = questions.map((question, index) => {
        const selectedAnswer = selectedAnswers[index];
        const isCorrect = selectedAnswer === question.correctAnswer;
        const timeTaken = startTime ? new Date().getTime() - startTime.getTime() : 0;
        
        return {
          questionId: question.id,
          selectedAnswer,
          isCorrect,
          timeTaken,
        };
      });

      // In a real app, submit to backend
      // await submitQuizResults(moduleId, results);
      
      setShowResults(true);
      
      // Show success notification
      setShowNotification(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit quiz results');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const getModuleTitle = () => {
    const moduleTitles: Record<string, string> = {
      'basics': 'Market Basics',
      'risk': 'Risk Management',
      'algo': 'Algorithmic Trading',
      'portfolio': 'Portfolio Diversification'
    };
    return moduleTitles[moduleId || 'basics'] || 'Quiz';
  };

  if (loading) {
    return <LoadingSpinner text="Loading quiz..." />;
  }

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Quiz Results</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{getModuleTitle()}</Text>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <Card style={styles.resultCard}>
            <Text style={[styles.scoreText, { color: colors.textSecondary }]}>Your Score</Text>
            <Text style={[styles.scoreValue, { color: colors.primary }]}>{score}%</Text>
            <Text style={[styles.scoreDetails, { color: colors.textSecondary }]}>
              {correctAnswers} out of {questions.length} correct
            </Text>
          </Card>

          <View style={styles.questionsReview}>
            <Text style={[styles.reviewTitle, { color: colors.text }]}>Question Review</Text>
            {questions.map((question, index) => {
              const selectedAnswer = selectedAnswers[index];
              const isCorrect = selectedAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} style={styles.questionReviewCard}>
                  <Text style={[styles.questionNumber, { color: colors.primary }]}>Question {index + 1}</Text>
                  <Text style={[styles.questionText, { color: colors.text }]}>{question.question}</Text>
                  
                  <View style={styles.answerReview}>
                    {question.options.map((option, optionIndex) => (
                      <View key={optionIndex} style={styles.answerOption}>
                        <Text style={[
                          styles.optionText,
                          optionIndex === question.correctAnswer && styles.correctAnswer,
                          optionIndex === selectedAnswer && !isCorrect && styles.wrongAnswer,
                          optionIndex === selectedAnswer && styles.selectedAnswer
                        ]}>
                          {option}
                        </Text>
                        {optionIndex === question.correctAnswer && (
                          <Text style={styles.correctIndicator}>✓</Text>
                        )}
                        {optionIndex === selectedAnswer && !isCorrect && (
                          <Text style={styles.wrongIndicator}>✗</Text>
                        )}
                      </View>
                    ))}
                  </View>
                  
                  {question.explanation && (
                    <Text style={[styles.explanation, { backgroundColor: '#E7F3FF', color: '#0056B3' }]}>
                      {question.explanation}
                    </Text>
                  )}
                </Card>
              );
            })}
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <Button
            title="Back to Home"
            onPress={() => router.push('/')}
            variant="primary"
            size="large"
          />
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>{getModuleTitle()}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.primary }]}>{Math.round(progress)}%</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.questionCard}>
          <Text style={[styles.questionText, { color: colors.text }]}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { borderColor: colors.border, backgroundColor: colors.surface },
                  selectedAnswers[currentQuestionIndex] === index && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(index)}
              >
                <Text style={[
                  styles.optionText,
                  { color: colors.text },
                  selectedAnswers[currentQuestionIndex] === index && styles.selectedOptionText
                ]}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={styles.navigationButtons}>
          <Button
            title="Previous"
            onPress={handlePreviousQuestion}
            variant="outline"
            size="medium"
            disabled={currentQuestionIndex === 0}
            style={styles.navButton}
          />
          
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              title="Next"
              onPress={handleNextQuestion}
              variant="primary"
              size="medium"
              disabled={selectedAnswers[currentQuestionIndex] === -1}
              style={styles.navButton}
            />
          ) : (
            <Button
              title="Finish Quiz"
              onPress={handleFinishQuiz}
              variant="primary"
              size="medium"
              disabled={selectedAnswers.includes(-1) || submitting}
              style={styles.navButton}
            />
          )}
        </View>
      </View>

      {/* Quiz Completion Notification */}
      <NotificationBanner
        message={`🎉 Quiz completed! Your score: ${calculateScore()}%`}
        type="success"
        visible={showNotification}
        onHide={() => setShowNotification(false)}
        duration={4000}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  questionCard: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  optionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
  resultCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreDetails: {
    fontSize: 16,
  },
  questionsReview: {
    gap: 16,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  questionReviewCard: {
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  answerReview: {
    marginTop: 16,
    gap: 8,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
  },
  correctAnswer: {
    color: '#28A745',
    fontWeight: '600',
  },
  wrongAnswer: {
    color: '#DC3545',
    fontWeight: '600',
  },
  selectedAnswer: {
    fontWeight: '600',
  },
  correctIndicator: {
    color: '#28A745',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrongIndicator: {
    color: '#DC3545',
    fontSize: 18,
    fontWeight: 'bold',
  },
  explanation: {
    marginTop: 16,
    padding: 12,
    borderRadius: 6,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default QuizScreen; 