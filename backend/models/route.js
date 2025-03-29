'use strict'
module.exports = (s, D) => {
  const Route = s.define('Route', {
    partId: { type: D.INTEGER, allowNull: false },
    name: { type: D.STRING, allowNull: false }
  }, {})
  Route.associate = m => {
    Route.belongsTo(m.Part, { foreignKey: 'partId', onDelete: 'CASCADE' })
    Route.hasMany(m.Operation, { foreignKey: 'routeId' })
  }
  return Route
}
