'use strict'
module.exports = {
  async up(q, S) {
    await q.createTable('Routes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER },
      partId: { type: S.INTEGER, references: { model: 'Parts', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE', allowNull: false },
      name: { type: S.STRING, allowNull: false },
      createdAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') },
      updatedAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') }
    })
  },
  async down(q, S) {
    await q.dropTable('Routes')
  }
}
