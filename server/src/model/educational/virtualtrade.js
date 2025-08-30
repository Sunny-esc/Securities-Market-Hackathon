export default (sequelize, DataTypes) => {
const VirtualTrade = sequelize.define('virtual_trades', {
id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
user_id: { type: DataTypes.BIGINT, allowNull: false },
scenario_id: { type: DataTypes.BIGINT, allowNull: false },
trades: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] }, // array of trade objects
pnl: { type: DataTypes.DECIMAL(18, 2), defaultValue: 0 },
started_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
ended_at: { type: DataTypes.DATE, allowNull: true },
}, { indexes: [{ fields: ['user_id'] }, { fields: ['scenario_id'] }] });
return VirtualTrade;
};