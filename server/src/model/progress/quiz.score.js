export default (sequelize, DataTypes) => {
const QuizScore = sequelize.define('quiz_scores', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
user_id: { type: DataTypes.BIGINT, allowNull: false },
quiz_id: { type: DataTypes.BIGINT, allowNull: false },
score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
attempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
taken_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
details: { type: DataTypes.JSONB, defaultValue: {} }, // per-question breakdown
}, { indexes: [{ unique: true, fields: ['user_id', 'quiz_id'] }] });
return QuizScore;
};