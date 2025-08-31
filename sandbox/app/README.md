# Securities Market Learning App

A React Native mobile application for learning about securities markets, featuring interactive quizzes, AI-powered chatbot assistance, and progress tracking.

## Features

### 🏠 Home Screen
- **Module List**: View available learning modules (Basics, Risk Management, Algorithmic Trading, Portfolio Diversification)
- **Progress Tracking**: See completion status and progress for each module
- **Language Switcher**: Toggle between multiple languages (English, Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi)

### 📝 Quiz System
- **Interactive Quizzes**: Multiple-choice questions for each module
- **Real-time Feedback**: Immediate scoring and explanations
- **Progress Tracking**: Monitor quiz performance and completion rates
- **Navigation**: Easy navigation between questions with progress indicators

### 📊 Progress Dashboard
- **Overall Statistics**: View total quizzes taken, average scores, and completed modules
- **Module Status**: Track progress for each learning module
- **Performance Metrics**: Detailed breakdown of quiz scores and achievements
- **Recent Activity**: Monitor learning milestones and accomplishments

### 🤖 AI Chatbot (FinanceBuddy)
- **Intelligent Assistance**: Get answers to finance-related questions
- **Multi-language Support**: Chat in your preferred language
- **Suggested Questions**: Quick access to common finance topics
- **Real-time Responses**: Instant AI-powered answers and explanations

## Technical Architecture

### Frontend
- **React Native + Expo**: Cross-platform mobile development
- **TypeScript**: Type-safe development with interfaces
- **Context API**: State management for language preferences
- **React Navigation**: Tab-based navigation with dynamic routing

### Backend Integration
- **RESTful APIs**: Communication with Node.js backend
- **Axios**: HTTP client for API requests
- **Error Handling**: Graceful fallbacks and user feedback
- **Loading States**: Smooth user experience during API calls

### Key Components
- **LanguageContext**: Manages multi-language support across the app
- **API Service**: Centralized backend communication layer
- **UI Components**: Reusable Button, Card, and LoadingSpinner components
- **Dummy Data**: Sample content for development and testing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- React Native development environment

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Configuration
1. Update the API base URL in `services/api.ts` to match your backend
2. Configure language preferences in the LanguageContext
3. Customize quiz questions and module content in `data/dummyData.ts`

## API Endpoints

The app expects the following backend endpoints:

- `POST /api/chat` - AI chatbot responses
- `POST /api/translate` - Text translation service
- `POST /api/quiz/submit` - Submit quiz results
- `GET /api/user/progress` - Fetch user progress
- `GET /api/modules` - Get available learning modules

## Project Structure

```
app/
├── app/                    # Expo Router screens
│   ├── (tabs)/           # Tab navigation
│   │   ├── index.tsx     # Home screen
│   │   ├── progress.tsx  # Progress dashboard
│   │   └── chatbot.tsx   # AI chatbot
│   ├── quiz/             # Quiz screens
│   │   └── [moduleId].tsx # Dynamic quiz routing
│   └── _layout.tsx       # Root layout
├── components/            # Reusable UI components
│   └── ui/               # Basic UI components
├── contexts/              # React Context providers
├── data/                  # Dummy data and sample content
├── services/              # API services and utilities
└── README.md             # This file
```

## Development Notes

### State Management
- Uses React Context for language preferences
- Local state for component-specific data
- API integration with loading and error states

### Styling
- StyleSheet for consistent styling
- Responsive design with proper spacing
- Color scheme following iOS/Android guidelines

### Error Handling
- Graceful fallbacks for API failures
- User-friendly error messages
- Loading indicators for better UX

## Future Enhancements

- **Offline Support**: Cache content for offline learning
- **Push Notifications**: Reminders and progress updates
- **Social Features**: Leaderboards and peer learning
- **Advanced Analytics**: Detailed learning insights
- **Content Management**: Admin panel for updating content

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a hackathon submission for educational purposes.

---

**Built with ❤️ using React Native and Expo**
