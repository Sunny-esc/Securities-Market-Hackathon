export default (sequelize, DataTypes) => {
const Topic = sequelize.define('topics', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
description: { type: DataTypes.TEXT },
meta: { type: DataTypes.JSONB, defaultValue: {} },
}, { indexes: [{ unique: true, fields: ['name'] }] });
return Topic;
};