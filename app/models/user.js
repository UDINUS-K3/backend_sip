"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        required: true,
        unique: {
          args: true,
          msg: "username already in use!",
        },
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: {
          args: true,
          msg: "Email already in use!",
        },
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      last_password: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      birthday: {
        defaultValue: "1990-01-01",
        type: DataTypes.DATE,
      },
      is_admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tableName: "users",
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Information, {
      foreignKey: "user_id",
    });
    User.hasMany(models.Comment, {
      foreignKey: "user_id",
    });
  };
  return User;
};
