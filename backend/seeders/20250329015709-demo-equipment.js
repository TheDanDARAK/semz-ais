'use strict'
module.exports = {
  async up(q, S) {
    await q.bulkInsert('Equipment', [
      { name: 'Станок 1', type: 'токарный', status: 'idle' },
      { name: 'Станок 2', type: 'фрезерный', status: 'idle' },
      { name: 'Станок 3', type: 'сверлильный', status: 'idle' }
    ], {})
  },
  async down(q, S) {
    await q.bulkDelete('Equipment', null, {})
  }
}
