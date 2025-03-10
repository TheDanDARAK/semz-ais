'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    // Здесь можно определить ассоциации, если они понадобятся
    static associate(models) {
      // Например: Equipment.hasMany(models.Operation, { foreignKey: 'equipment_id' });
    }
  }
  Equipment.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'idle'  // 'idle' означает, что оборудование свободно
    },
  }, {
    sequelize,
    modelName: 'Equipment',
    tableName: 'equipment', // Должно совпадать с названием таблицы в миграции
    timestamps: true        // Добавляет поля createdAt и updatedAt
  });
  return Equipment;
};
