'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parts extends Model {
    static associate(models) {
      // Если нужно связать Parts с другими моделями, делаем здесь.
      // Например: Parts.hasMany(models.Routes, { foreignKey: 'part_id' });
    }
  }
  Parts.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Parts',
    tableName: 'parts',
    timestamps: true
  });

  return Parts;
};
