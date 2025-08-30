// src/controllers/index.js

import db from '../model/index.js';
const {
  tutorial: Tutorial,
  topic: Topic,
  quiz: Quiz,
  feedback: Feedback,
  scenario: Scenario,
  virtualTrade: VirtualTrade,
  summary: Summary,
  progress: Progress,
  badge: Badge,
  achievement: Achievement,
  quizScore: QuizScore
} = db;

// =========================
// Virtual Trade Controller
// =========================
export async function createVirtualTrade(req, res) {
try {
const trade = await VirtualTrade.create(req.body);
res.status(201).json(trade);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getVirtualTrades(req, res) {
try {
const trades = await VirtualTrade.findAll();
res.json(trades);
} catch (err) {
res.status(500).json({ error: err.message });
}
}


// =========================
// Tutorial Controller
// =========================
export async function createTutorial(req, res) {
try {
const tutorial = await Tutorial.create(req.body);
res.status(201).json(tutorial);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getTutorials(req, res) {
try {
const tutorials = await Tutorial.findAll();
res.json(tutorials);
} catch (err) {
res.status(500).json({ error: err.message });
}
}



// =========================
// Topic Controller
// =========================
export async function createTopic(req, res) {
try {
const topic = await Topic.create(req.body);
res.status(201).json(topic);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getTopics(req, res) {
try {
const topics = await Topic.findAll();
res.json(topics);
} catch (err) {
res.status(500).json({ error: err.message });
}
}


// =========================
// Summary Controller
// =========================
export async function createSummary(req, res) {
try {
const summary = await Summary.create(req.body);
res.status(201).json(summary);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getSummaries(req, res) {
try {
const summaries = await Summary.findAll();
res.json(summaries);
} catch (err) {
res.status(500).json({ error: err.message });
}
}



// =========================
// Scenario Controller
// =========================
export async function createScenario(req, res) {
try {
const scenario = await Scenario.create(req.body);
res.status(201).json(scenario);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getScenarios(req, res) {
try {
const scenarios = await Scenario.findAll();
res.json(scenarios);
} catch (err) {
res.status(500).json({ error: err.message });
}
}


// =========================
// Quiz Score Controller
// =========================
export async function createQuizScore(req, res) {
try {
const score = await QuizScore.create(req.body);
res.status(201).json(score);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getQuizScores(req, res) {
try {
const scores = await QuizScore.findAll();
res.json(scores);
} catch (err) {
res.status(500).json({ error: err.message });
}
}

// =========================
// Quiz Controller
// =========================
export async function createQuiz(req, res) {
try {
const quiz = await Quiz.create(req.body);
res.status(201).json(quiz);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getQuizzes(req, res) {
try {
const quizzes = await Quiz.findAll();
res.json(quizzes);
} catch (err) {
res.status(500).json({ error: err.message });
}
}


// =========================
// Progress Controller
// =========================
export async function createProgress(req, res) {
try {
const progress = await Progress.create(req.body);
res.status(201).json(progress);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getProgress(req, res) {
try {
const progress = await Progress.findAll();
res.json(progress);
} catch (err) {
res.status(500).json({ error: err.message });
}
}

// =========================
// Feedback Controller
// =========================
export async function createFeedback(req, res) {
try {
const feedback = await Feedback.create(req.body);
res.status(201).json(feedback);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getFeedbacks(req, res) {
try {
const feedbacks = await Feedback.findAll();
res.json(feedbacks);
} catch (err) {
res.status(500).json({ error: err.message });
}
}

// =========================
// Badge Controller
// =========================
export async function createBadge(req, res) {
try {
const badge = await Badge.create(req.body);
res.status(201).json(badge);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getBadges(req, res) {
try {
const badges = await Badge.findAll();
res.json(badges);
} catch (err) {
res.status(500).json({ error: err.message });
}
}


// =========================
// Achievement Controller
// =========================
export async function createAchievement(req, res) {
try {
const achievement = await Achievement.create(req.body);
res.status(201).json(achievement);
} catch (err) {
res.status(400).json({ error: err.message });
}
}


export async function getAchievements(req, res) {
try {
const achievements = await Achievement.findAll();
res.json(achievements);
} catch (err) {
res.status(500).json({ error: err.message });
}
}
export { db };