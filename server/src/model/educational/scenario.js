export default (sequelize, DataTypes) => {
const Scenario = sequelize.define('scenarios', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
description: { type: DataTypes.TEXT },
rules: { type: DataTypes.JSONB, defaultValue: {} }, // e.g., starting cash, restrictions
}, { indexes: [{ unique: true, fields: ['name'] }] });
return Scenario;
};