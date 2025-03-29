'use strict'
module.exports = {
  async up(q, S) {
    await q.createTable('Parts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER },
      name: { type: S.STRING, allowNull: false },
      description: { type: S.STRING },
      createdAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') },
      updatedAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') }
    })
  },
  async down(q, S) {
    await q.dropTable('Parts')
  }
}
