'use strict'
module.exports = (s, D) => {
  const Equipment = s.define('Equipment', {
    name: { type: D.STRING, allowNull: false },
    type: { type: D.STRING, allowNull: false },
    status: { type: D.STRING, defaultValue: 'idle' }
  }, {})
  Equipment.associate = m => {
    Equipment.hasMany(m.Operation, { foreignKey: 'equipmentId' })
  }
  return Equipment
}
