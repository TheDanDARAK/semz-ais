'use strict'
module.exports = {
  async up(q, S) {
    await q.createTable('Operations', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER },
      routeId: { type: S.INTEGER, references: { model: 'Routes', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      equipmentId: { type: S.INTEGER, references: { model: 'Equipment', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      stepNumber: { type: S.INTEGER, allowNull: false },
      description: { type: S.STRING },
      timeEstimate: { type: S.INTEGER },
      createdAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') },
      updatedAt: { allowNull: false, type: S.DATE, defaultValue: S.fn('NOW') }
    })
  },
  async down(q, S) {
    await q.dropTable('Operations')
  }
}
