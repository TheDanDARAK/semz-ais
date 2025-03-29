'use strict'
module.exports = {
  async up(q, S) {
    await q.bulkInsert('Operations', [
      { routeId: 1, equipmentId: 1, stepNumber: 1, description: 'Обработка А', timeEstimate: 20 },
      { routeId: 1, equipmentId: 2, stepNumber: 2, description: 'Фрезеровка А', timeEstimate: 15 },
      { routeId: 2, equipmentId: 3, stepNumber: 1, description: 'Сверление Б', timeEstimate: 10 }
    ], {})
  },
  async down(q, S) {
    await q.bulkDelete('Operations', null, {})
  }
}
