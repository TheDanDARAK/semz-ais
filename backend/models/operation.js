'use strict'
module.exports = (s, D) => {
  const Operation = s.define('Operation', {
    routeId: { type: D.INTEGER },
    equipmentId: { type: D.INTEGER },
    stepNumber: { type: D.INTEGER, allowNull: false },
    description: { type: D.STRING },
    timeEstimate: { type: D.INTEGER }
  }, {})
  Operation.associate = m => {
    Operation.belongsTo(m.Route, { foreignKey: 'routeId', onDelete: 'CASCADE' })
    Operation.belongsTo(m.Equipment, { foreignKey: 'equipmentId', onDelete: 'SET NULL' })
  }
  return Operation
}
