'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Routes extends Model {
    static associate(models) {
      // Связь с Parts: каждая маршрутная карта относится к одной детали
      // Routes.belongsTo(models.Parts, { foreignKey: 'part_id' });
    }
  }

  Routes.init({
    // Внешний ключ на таблицу parts
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Название маршрутной карты (опционально, если нужно)
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Routes',
    tableName: 'routes',
    timestamps: true
  });

  return Routes;
};
