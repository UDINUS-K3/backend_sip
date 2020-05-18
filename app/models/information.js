"use strict";
module.exports = (sequelize, DataTypes) => {
  const Information = sequelize.define(
    "Information",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT("tiny"),
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      min_age: {
        type: DataTypes.DOUBLE,
        defaultValue: "0.0",
      },
      deleted_at: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      tableName: "informations",
    }
  );
  Information.associate = function (models) {
    // associations can be defined here
    Information.belongsToMany(models.Category, {
      through: models.CategoryInformation,
      as: "category_informations",
      foreignKey: "information_id",
    });
    Information.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Information.hasMany(models.Comment, {
      foreignKey: "information_id",
    });
  };
  return Information;
};
