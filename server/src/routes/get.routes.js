import { getVirtualTrades, getTutorials, getTopics, getSummaries, getScenarios, getQuizScores, getQuizzes, getProgress, getFeedbacks, getBadges, getAchievements } from "../controllers/index.js";
import { Router } from "express";
const grouter = Router();
grouter.get("/virtual-trades", getVirtualTrades);
grouter.get("/tutorials", getTutorials); 
grouter.get("/topics", getTopics);   
grouter.get("/summaries", getSummaries);
grouter.get("/scenarios", getScenarios);
grouter.get("/quiz-scores", getQuizScores);
grouter.get("/quizzes", getQuizzes);
grouter.get("/progress", getProgress);
grouter.get("/feedback", getFeedbacks);
grouter.get("/badges", getBadges);
grouter.get("/achievements", getAchievements);

export default grouter;