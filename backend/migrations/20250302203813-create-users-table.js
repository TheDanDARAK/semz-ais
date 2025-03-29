'use strict'
module.exports = {
  async up(q, S) {
    await q.createTable('Users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER },
      fullName: { type: S.STRING, allowNull: false },
      email: { type: S.STRING, unique: true, allowNull: false },
      passwordHash: { type: S.STRING, allowNull: false },
      role: { type: S.STRING, defaultValue: 'user' },
      createdAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') },
      updatedAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') }
    })
  },
  async down(q, S) {
    await q.dropTable('Users')
  }
}
