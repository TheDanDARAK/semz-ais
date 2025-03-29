'use strict'
module.exports = (s, D) => {
  const User = s.define('User', {
    fullName: { type: D.STRING, allowNull: false },
    email: { type: D.STRING, unique: true, allowNull: false },
    passwordHash: { type: D.STRING, allowNull: false },
    role: { type: D.STRING, defaultValue: 'user' }
  }, {})
  User.associate = m => {}
  return User
}
