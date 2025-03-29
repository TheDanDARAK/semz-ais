'use strict'
module.exports = (s, D) => {
  const Part = s.define('Part', {
    name: { type: D.STRING, allowNull: false },
    description: { type: D.STRING }
  }, {})
  Part.associate = m => {
    Part.hasMany(m.Route, { foreignKey: 'partId' })
  }
  return Part
}
