'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    information_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    deleted_at: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'comments'
  });
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Information, {
      foreignKey: 'information_id'
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Comment;
};