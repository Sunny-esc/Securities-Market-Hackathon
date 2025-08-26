<!--
Project: Securities-Market-Hackathon

This repository contains the source code for an educational platform focused on investor education, featuring a React Native mobile client and a Node.js/Express backend with MongoDB.

## Structure Overview

- **InvestorEduApp/**
    - **client/**: React Native app (Expo) for end-users, featuring screens for quizzes, tutorials, trading simulation, and user profiles. Organized into components, screens, navigation, services, context, utilities, and styles.
    - **server/**: Node.js backend using Express and MongoDB. Handles authentication, quiz and tutorial management, trading simulation, and user data. Organized into configuration, models, routes, controllers, middleware, and utility helpers.

## Key Features

- **Client**
    - Modular UI components for quizzes, tutorials, language selection, and progress tracking.
    - Multiple screens for core app functionality.
    - Centralized navigation and API service layer.
    - Context for global state management (authentication, progress).
    - Internationalization support via i18next.
    - Theming and global styles.

- **Server**
    - RESTful API endpoints for authentication, quizzes, tutorials, and trading.
    - Mongoose models for structured data storage.
    - Controllers for business logic.
    - Middleware for authentication and validation.
    - Utility helpers for scoring and mock stock data.

## Usage

- Start the client and server independently.
- Configure environment variables in `server/.env` for database and JWT secrets.
- Extend functionality by adding new components, screens, routes, or models as needed.

-->
# Securities-Market-Hackathon

InvestorEduApp/
│── README.md
│── .gitignore
│── package.json               # optional root scripts (e.g., start:all)
│── docker-compose.yml         # Postgres + pgAdmin (local dev)
│── .env.example               # root env references
│
├── docs/                      # Documentation for submission/demo
│   ├── api.md                 # API endpoints spec
│   ├── data-model.md          # DB schema & relations
│   └── screenshots/           # Screenshots for demo
│
├── client/                    # React Native (Expo) app
│   │── app.json
│   │── package.json
│   │── babel.config.js
│   │── .env.example           # EXPO_PUBLIC_API_URL, etc.
│   │── assets/
│   │── App.js
│   └── src/
│       ├── components/
│       ├── screens/
│       │   ├── HomeScreen.js
│       │   ├── TutorialScreen.js
│       │   ├── QuizScreen.js
│       │   ├── TradingScreen.js
│       │   ├── ProfileScreen.js
│       │   └── LoginScreen.js
│       ├── navigation/AppNavigator.js
│       ├── services/api.js
│       ├── context/AuthContext.js
│       ├── utils/i18n.js
│       └── styles/theme.js
│
└── server/                    # Node.js + Express + Postgres
    │── package.json
    │── .env.example           # DATABASE_URL, JWT_SECRET, CORS_ORIGIN
    │── server.js              # Express bootstrap
    │
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    │
    └── src/
        ├── config/
        │   ├── prismaClient.js
        │   └── cors.js
        ├── middleware/
        │   └── auth.js
        ├── models/            # (optional) domain mappers/helpers
        ├── controllers/
        │   ├── authController.js
        │   ├── quizController.js
        │   ├── tutorialController.js
        │   └── tradeController.js
        ├── routes/
        │   ├── authRoutes.js
        │   ├── quizRoutes.js
        │   ├── tutorialRoutes.js
        │   └── tradeRoutes.js
        ├── services/
        │   ├── quizService.js
        │   ├── tutorialService.js
        │   └── tradeService.js
        ├── utils/
        │   ├── scoring.js
        │   └── seedData.js
        └── scripts/
            ├── seed.js
            └── loadMockPrices.js


1. Clone the Repository
```git clone https://github.com/your-username/Securities-Market-Hackathon.git
cd Securities-Market-Hackathon```

2. Server Setup
```cd server```
```cp .env.example .env   # configure DATABASE_URL, JWT_SECRET, etc.```
```npm install```
``npx prisma migrate dev```
```npm run dev```

3. Client Setup
```cd client
cp .env.example .env   # set EXPO_PUBLIC_API_URL
npm install
npx expo start```

4. Optional: Run with Docker (Postgres + pgAdmin)
docker-compose up -d
