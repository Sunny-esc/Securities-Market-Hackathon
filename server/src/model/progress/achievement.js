export default (sequelize, DataTypes) => {
const Achievement = sequelize.define('achievements', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
user_id: { type: DataTypes.BIGINT, allowNull: false },
badge_id: { type: DataTypes.BIGINT, allowNull: false },
awarded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
meta: { type: DataTypes.JSONB, defaultValue: {} },
}, { indexes: [{ unique: true, fields: ['user_id', 'badge_id'] }] });
return Achievement;
};