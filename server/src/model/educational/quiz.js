
export default (sequelize, DataTypes) => {
const Quiz = sequelize.define('quizzes', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
topic_id: { type: DataTypes.BIGINT, allowNull: false },
question: { type: DataTypes.TEXT, allowNull: false },
answer: { type: DataTypes.TEXT, allowNull: false },
options: { type: DataTypes.JSONB, defaultValue: null }, // optional MCQ options
difficulty: { type: DataTypes.ENUM('easy', 'medium', 'hard'), defaultValue: 'easy' },
}, { indexes: [{ fields: ['topic_id'] }] });
return Quiz;
};