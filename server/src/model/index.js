// app/models/index.js
import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import UserModel from "./user.model.js";
import RoleModel from "./role.model.js";
// Educational content
import TopicModel from "./educational/topic.js";
import TutorialModel from "./educational/tutorial.js";
import QuizModel from "./educational/quiz.js";
import FeedbackModel from "./educational/feedback.js";
import ScenarioModel from "./educational/scenario.js";
import VirtualTradeModel from "./educational/virtualtrade.js";
//mport TranslationModel from "./educational/translation.js";
import SummaryModel from "./educational/summary.js";

// Progress/Badges
import ProgressModel from "./progress/progress.js";
import BadgeModel from "./progress/badge.js";
import AchievementModel from "./progress/achievement.js";
import QuizScoreModel from "./progress/quiz.score.js";


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
});


 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);
 

// Educational content models
db.topic = TopicModel(sequelize, Sequelize);
db.tutorial = TutorialModel(sequelize, Sequelize);
db.quiz = QuizModel(sequelize, Sequelize);
db.feedback = FeedbackModel(sequelize, Sequelize);
db.scenario = ScenarioModel(sequelize, Sequelize);
db.virtualTrade = VirtualTradeModel(sequelize, Sequelize);
//db.translation = TranslationModel(sequelize, Sequelize);
db.summary = SummaryModel(sequelize, Sequelize);

// Progress/Badges models
db.progress = ProgressModel(sequelize, Sequelize);
db.badge = BadgeModel(sequelize, Sequelize);
db.achievement = AchievementModel(sequelize, Sequelize);
db.quizScore = QuizScoreModel(sequelize, Sequelize);

// User/Role association
db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles", as: "roles" });
db.ROLES = ["user", "admin", "moderator"];
// -------------------- Associations --------------------
// Educational content
db.topic.hasMany(db.tutorial, { foreignKey: 'topic_id', onDelete: 'CASCADE' });
db.tutorial.belongsTo(db.topic, { foreignKey: 'topic_id' });

db.topic.hasMany(db.quiz, { foreignKey: 'topic_id', onDelete: 'CASCADE' });
db.quiz.belongsTo(db.topic, { foreignKey: 'topic_id' });

// Feedback associations
db.topic.hasMany(db.feedback, { foreignKey: 'topic_id', onDelete: 'CASCADE' });
db.feedback.belongsTo(db.topic, { foreignKey: 'topic_id' });

db.user.hasMany(db.feedback, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.feedback.belongsTo(db.user, { foreignKey: 'user_id' });

db.tutorial.hasMany(db.feedback, { foreignKey: 'tutorial_id', onDelete: 'SET NULL' });
db.feedback.belongsTo(db.tutorial, { foreignKey: 'tutorial_id' });

db.quiz.hasMany(db.feedback, { foreignKey: 'quiz_id', onDelete: 'SET NULL' });
db.feedback.belongsTo(db.quiz, { foreignKey: 'quiz_id' });

// Progress tracking
db.user.hasMany(db.progress, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.progress.belongsTo(db.user, { foreignKey: 'user_id' });

db.topic.hasMany(db.progress, { foreignKey: 'topic_id', onDelete: 'CASCADE' });
db.progress.belongsTo(db.topic, { foreignKey: 'topic_id' });

// Badges/Achievements
db.badge.hasMany(db.achievement, { foreignKey: 'badge_id', onDelete: 'CASCADE' });
db.achievement.belongsTo(db.badge, { foreignKey: 'badge_id' });

db.user.hasMany(db.achievement, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.achievement.belongsTo(db.user, { foreignKey: 'user_id' });

// Quiz scores
db.user.hasMany(db.quizScore, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.quizScore.belongsTo(db.user, { foreignKey: 'user_id' });

db.quiz.hasMany(db.quizScore, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
db.quizScore.belongsTo(db.quiz, { foreignKey: 'quiz_id' });

// Simulated trading
db.scenario.hasMany(db.virtualTrade, { foreignKey: 'scenario_id', onDelete: 'CASCADE' });
db.virtualTrade.belongsTo(db.scenario, { foreignKey: 'scenario_id' });

db.user.hasMany(db.virtualTrade, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.virtualTrade.belongsTo(db.user, { foreignKey: 'user_id' });

// Translations/Summaries: no FK, handled in app logic

export default db;



