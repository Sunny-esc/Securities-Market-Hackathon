export default (sequelize, DataTypes) => {
  const Summary = sequelize.define(
    "summaries",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      content_type: {
        type: DataTypes.ENUM("topic", "tutorial", "quiz", "scenario"),
        allowNull: false,
      },
      content_id: { type: DataTypes.BIGINT, allowNull: false },
      summary: { type: DataTypes.TEXT, allowNull: false },
      meta: { type: DataTypes.JSONB, defaultValue: {} },
    },
    {
      indexes: [
        { fields: ["content_type", "content_id"] },
        { unique: false, fields: ["content_type", "content_id"] },
      ],
    }
  );
  return Summary;
};
