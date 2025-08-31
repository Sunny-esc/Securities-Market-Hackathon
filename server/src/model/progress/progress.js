export default (sequelize, DataTypes) => {
const Progress = sequelize.define('progress', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
user_id: { type: DataTypes.BIGINT, allowNull: false },
topic_id: { type: DataTypes.BIGINT, allowNull: false },
progress: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 0.0 }, // 0-100
last_seen_tutorial_id: { type: DataTypes.BIGINT, allowNull: true },
last_activity_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
indexes: [
{ unique: true, fields: ['user_id', 'topic_id'] },
{ fields: ['last_activity_at'] },
],
});
return Progress;
};