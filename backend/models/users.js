'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Здесь можно описать связи, если нужны
    }
  }

  User.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'technologist'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // должно совпадать с названием таблицы в миграции
    timestamps: true    // включает поля createdAt, updatedAt
  });

  return User;
};
