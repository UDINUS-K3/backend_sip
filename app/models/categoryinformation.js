'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryInformation = sequelize.define('CategoryInformation', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    category_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    information_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Information',
        key: 'id'
      }
    },
    deleted_at: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'category_informations'
  });
  CategoryInformation.associate = function (models) {
    // associations can be defined here
  };
  return CategoryInformation;
};