'use strict'
module.exports = {
  async up(q, S) {
    await q.bulkInsert('Routes', [
      { partId: 1, name: 'Маршрут А1' },
      { partId: 2, name: 'Маршрут Б1' }
    ], {})
  },
  async down(q, S) {
    await q.bulkDelete('Routes', null, {})
  }
}
