export default (sequelize, DataTypes) => {
const Badge = sequelize.define('badges', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
description: { type: DataTypes.TEXT },
icon: { type: DataTypes.STRING(255) },
criteria: { type: DataTypes.JSONB, defaultValue: {} }, // rule engine input
}, { indexes: [{ unique: true, fields: ['name'] }] });
return Badge;
};