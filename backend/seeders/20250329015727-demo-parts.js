'use strict'
module.exports = {
  async up(q, S) {
    await q.bulkInsert('Parts', [
      { name: 'Деталь А', description: 'Корпус' },
      { name: 'Деталь Б', description: 'Крышка' }
    ], {})
  },
  async down(q, S) {
    await q.bulkDelete('Parts', null, {})
  }
}

