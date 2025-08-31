export default (sequelize, DataTypes) => {
const Tutorial = sequelize.define('tutorials', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
topic_id: { type: DataTypes.BIGINT, allowNull: false },
title: { type: DataTypes.STRING(200), allowNull: false },
content: { type: DataTypes.TEXT, allowNull: false },
extra: { type: DataTypes.JSONB, defaultValue: {} },
}, {
indexes: [
{ fields: ['topic_id'] },
{ unique: true, fields: ['topic_id', 'title'] },
],
});
return Tutorial;
};