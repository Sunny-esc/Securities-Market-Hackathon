export default (sequelize, DataTypes) => {
const Feedback = sequelize.define('feedback', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
user_id: { type: DataTypes.BIGINT, allowNull: false },
topic_id: { type: DataTypes.BIGINT, allowNull: false },
tutorial_id: { type: DataTypes.BIGINT, allowNull: true },
quiz_id: { type: DataTypes.BIGINT, allowNull: true },
feedback: { type: DataTypes.TEXT, allowNull: false },
rating: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 1, max: 5 } },
}, { indexes: [{ fields: ['user_id'] }, { fields: ['topic_id'] }] });
return Feedback;
};