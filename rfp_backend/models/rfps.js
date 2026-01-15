function rfpsModel(sequelize, DataTypes) {
  const rfps = sequelize.define(
    "rfps",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      raw: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rfpBody: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      message_id : {
        type : DataTypes.TEXT ,
        allowNull : false ,
        unique : true 
      }
    },
    { tableName: "rfp" }
  );
  return rfps;
}

module.exports = { rfpsModel };
