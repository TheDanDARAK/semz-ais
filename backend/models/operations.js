'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Operations extends Model {
    static associate(models) {
      // Каждая операция относится к маршрутной карте
      Operations.belongsTo(models.Routes, { foreignKey: 'route_id' });
      // Каждая операция может быть связана с оборудованием (не обязательно)
      Operations.belongsTo(models.Equipment, { foreignKey: 'equipment_id' });
    }
  }

  Operations.init({
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipment_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    step_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    time_estimate: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Operations',
    tableName: 'operations',
    timestamps: true
  });

  return Operations;
};
