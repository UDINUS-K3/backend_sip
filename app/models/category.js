'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deleted_at: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'categories'
  });
  Category.associate = function (models) {
    // associations can be defined here
    Category.belongsToMany(models.Information, {
      through: models.CategoryInformation,
      as: 'category_informations',
      foreignKey: 'category_id'
    });
  };
  return Category;
};