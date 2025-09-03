import axios from 'axios';
import { Language } from '../contexts/LanguageContext';

// Configure axios base URL - update this to match your backend
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add language header
api.interceptors.request.use((config) => {
  // You can add auth token here if needed
  return config;
});

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  progress: number;
}

export interface UserProgress {
  completedModules: string[];
  quizScores: Record<string, number>;
  totalQuizzesTaken: number;
  averageScore: number;
}

// Chat API
export const chatWithAI = async (message: string, language: Language = 'en'): Promise<string> => {
  try {
    const response = await api.post('/chat', {
      message,
      language
    });
    return response.data.response || response.data.message;
  } catch (error) {
    console.error('Chat API error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
};

// Translation API
export const translateText = async (text: string, targetLanguage: Language): Promise<string> => {
  try {
    const response = await api.post('/translate', {
      text,
      targetLanguage
    });
    return response.data.translatedText || response.data.text;
  } catch (error) {
    console.error('Translation API error:', error);
    throw new Error('Translation failed. Please try again.');
  }
};

// Quiz API
export const submitQuizResults = async (quizId: string, results: QuizResult[]): Promise<{ score: number; totalQuestions: number }> => {
  try {
    const response = await api.post('/quiz/submit', {
      quizId,
      results
    });
    return response.data;
  } catch (error) {
    console.error('Quiz submission error:', error);
    throw new Error('Failed to submit quiz results. Please try again.');
  }
};

// Progress API
export const getUserProgress = async (): Promise<UserProgress> => {
  try {
    const response = await api.get('/user/progress');
    return response.data;
  } catch (error) {
    console.error('Progress API error:', error);
    throw new Error('Failed to fetch progress. Please try again.');
  }
};

// Modules API
export const getModules = async (): Promise<Module[]> => {
  try {
    const response = await api.get('/modules');
    return response.data;
  } catch (error) {
    console.error('Modules API error:', error);
    throw new Error('Failed to fetch modules. Please try again.');
  }
};

export default api; 