import {createVirtualTrade,createTutorial,createTopic,createSummary,createScenario,createQuizScore,createQuiz,createProgress,createFeedback,createBadge,createAchievement }  from "../controllers/index.js";
import { Router } from "express";
const prouter = Router();

// Virtual Trade Routes
prouter.post("/virtual-trades", createVirtualTrade);
prouter.post("/tutorials", createTutorial);
prouter.post("/topics", createTopic);
prouter.post("/summaries", createSummary);
prouter.post("/scenarios", createScenario);
prouter.post("/quiz-scores", createQuizScore);
prouter.post("/quizzes", createQuiz);
prouter.post("/progress", createProgress);
prouter.post("/feedback", createFeedback);
prouter.post("/achievements", createAchievement);
prouter.post("/badges", createBadge);

export default prouter;