"use strict";
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define(
    "Admin",
    {
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          msg: "This Username already exists",
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "/images/placeholders/admin-placeholder.jpg",
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "admin",
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Admin;
};
