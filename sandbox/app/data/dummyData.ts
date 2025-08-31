import { Module, QuizQuestion } from '../services/api';

export const dummyModules: Module[] = [
  {
    id: 'basics',
    title: 'Market Basics',
    description: 'Learn fundamental concepts of securities markets',
    icon: '📚',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'risk',
    title: 'Risk Management',
    description: 'Understand risk assessment and mitigation strategies',
    icon: '⚠️',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'algo',
    title: 'Algorithmic Trading',
    description: 'Explore automated trading strategies and systems',
    icon: '🤖',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'portfolio',
    title: 'Portfolio Diversification',
    description: 'Learn how to build balanced investment portfolios',
    icon: '📊',
    isCompleted: false,
    progress: 0
  }
];

export const dummyQuizQuestions: Record<string, QuizQuestion[]> = {
  basics: [
    {
      id: 1,
      question: 'What is a stock?',
      options: [
        'A type of bond',
        'A share of ownership in a company',
        'A government security',
        'A type of mutual fund'
      ],
      correctAnswer: 1,
      explanation: 'A stock represents ownership in a company and gives shareholders a claim on part of the company\'s assets and earnings.'
    },
    {
      id: 2,
      question: 'What does IPO stand for?',
      options: [
        'Initial Public Offering',
        'International Portfolio Option',
        'Investment Portfolio Order',
        'Individual Purchase Order'
      ],
      correctAnswer: 0,
      explanation: 'IPO stands for Initial Public Offering, which is when a private company first sells shares to the public.'
    },
    {
      id: 3,
      question: 'What is market capitalization?',
      options: [
        'The total value of all stocks in the market',
        'The price of a single share',
        'The total value of a company\'s shares',
        'The daily trading volume'
      ],
      correctAnswer: 2,
      explanation: 'Market capitalization is calculated by multiplying the current share price by the total number of outstanding shares.'
    }
  ],
  risk: [
    {
      id: 1,
      question: 'What is systematic risk?',
      options: [
        'Risk specific to individual companies',
        'Risk that affects the entire market',
        'Risk from poor management decisions',
        'Risk from company-specific events'
      ],
      correctAnswer: 1,
      explanation: 'Systematic risk affects the entire market and cannot be eliminated through diversification.'
    },
    {
      id: 2,
      question: 'What is the primary purpose of diversification?',
      options: [
        'To increase returns',
        'To reduce risk',
        'To avoid taxes',
        'To follow market trends'
      ],
      correctAnswer: 1,
      explanation: 'Diversification helps reduce risk by spreading investments across different assets, sectors, or markets.'
    }
  ],
  algo: [
    {
      id: 1,
      question: 'What is high-frequency trading?',
      options: [
        'Trading with high volumes',
        'Trading with high leverage',
        'Trading at very fast speeds',
        'Trading expensive stocks'
      ],
      correctAnswer: 2,
      explanation: 'High-frequency trading uses computer algorithms to execute trades at extremely high speeds.'
    }
  ],
  portfolio: [
    {
      id: 1,
      question: 'What is asset allocation?',
      options: [
        'The process of buying and selling assets',
        'The distribution of investments across different asset classes',
        'The selection of individual stocks',
        'The timing of market entry and exit'
      ],
      correctAnswer: 1,
      explanation: 'Asset allocation is the strategy of dividing investments among different asset categories like stocks, bonds, and cash.'
    }
  ]
};

export const getQuizQuestionsForModule = (moduleId: string): QuizQuestion[] => {
  return dummyQuizQuestions[moduleId] || [];
}; 