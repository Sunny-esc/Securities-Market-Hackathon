# Securities Market Hackathon - Server

This is the backend server for the Securities Market Hackathon project. It is built with Node.js, Express, Sequelize (PostgreSQL), and provides a modular API for authentication, user management, educational content, quizzes, feedback, achievements, and more.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [API Routes](#api-routes)
- [Authentication](#authentication)
- [Setup & Run](#setup--run)

---

## Project Structure

```
server/
├── .env
├── jest.config.js
├── package.json
├── prisma/
├── src/
│   ├── app.js
│   ├── index.js
│   ├── bin/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   └── utils/
└── readme.md
```

---

## Database Models

- **User**: Authentication and profile
- **Role**: User roles (user, admin, moderator)
- **Topic**: Educational topics
- **Tutorial**: Tutorials under topics
- **Quiz**: Quizzes under topics
- **Feedback**: User feedback on topics, tutorials, quizzes
- **Scenario**: Market simulation scenarios
- **VirtualTrade**: Simulated trading sessions
- **Summary**: Summaries for topics, tutorials, quizzes, scenarios
- **Progress**: User progress tracking
- **Badge**: Achievement badges
- **Achievement**: User achievements
- **QuizScore**: User quiz scores

---

## API Routes

### Authentication & User
- `POST   /api/auth/signup` — Register a new user
- `POST   /api/auth/signin` — Login and get JWT
- `GET    /api/test/all` — Public content
- `GET    /api/test/user` — User content (auth required)
- `GET    /api/test/mod` — Moderator content (auth required)
- `GET    /api/test/admin` — Admin content (auth required)

### Educational Content & Progress

#### POST (Create)
- `/api/proute/virtual-trades` — Create a virtual trade
- `/api/proute/tutorials` — Create a tutorial
- `/api/proute/topics` — Create a topic
- `/api/proute/summaries` — Create a summary
- `/api/proute/scenarios` — Create a scenario
- `/api/proute/quiz-scores` — Create a quiz score
- `/api/proute/quizzes` — Create a quiz
- `/api/proute/progress` — Create a progress record
- `/api/proute/feedback` — Create feedback
- `/api/proute/achievements` — Create an achievement
- `/api/proute/badges` — Create a badge

#### GET (Read)
- `/api/groute/virtual-trades` — List all virtual trades
- `/api/groute/tutorials` — List all tutorials
- `/api/groute/topics` — List all topics
- `/api/groute/summaries` — List all summaries
- `/api/groute/scenarios` — List all scenarios
- `/api/groute/quiz-scores` — List all quiz scores
- `/api/groute/quizzes` — List all quizzes
- `/api/groute/progress` — List all progress records
- `/api/groute/feedback` — List all feedback
- `/api/groute/badges` — List all badges
- `/api/groute/achievements` — List all achievements

---

## Authentication
- JWT-based authentication for protected routes
- Role-based access for user, moderator, and admin endpoints

---

## Setup & Run

1. **Install dependencies:**
	```sh
	npm install
	```
2. **Configure environment:**
	- Set your database credentials in `.env` and `src/config/db.config.js`
3. **Run the server:**
	```sh
	npm run dev
	# or
	node src/index.js
	```
4. **Test endpoints:**
	- Use Postman or curl with the routes above

---

## Notes
- Ensure you create parent records (e.g., topics) before creating child records (e.g., tutorials) that reference them.
- All POST endpoints expect `Content-Type: application/json`.
- Foreign key and not-null errors indicate missing or invalid references.

---

For more details, see the code in `src/controllers/`, `src/model/`, and `src/routes/`.
