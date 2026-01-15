function rfp_vendorsModel(sequelize, DataTypes) {
  const rfp_vendors = sequelize.define(
    "rfp_vendors",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      rfp_id: {
        type: DataTypes.UUID,
        references: {
          model: "rfp",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      vendor_id: {
        type: DataTypes.UUID,
        references: {
          model: "vendors",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    { tableName: "rfp_vendors" }
  );
  return rfp_vendors;
}

module.exports = { rfp_vendorsModel };
