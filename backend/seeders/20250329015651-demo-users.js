'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  async up(q, S) {
    const p1 = await bcrypt.hash('admin123', 10)
    const p2 = await bcrypt.hash('user123', 10)
    await q.bulkInsert('Users', [
      { fullName: 'Администратор', email: 'admin@semz.test', passwordHash: p1, role: 'admin' },
      { fullName: 'Иван Технолог', email: 'ivan@semz.test', passwordHash: p2, role: 'user' }
    ], {})
  },
  async down(q, S) {
    await q.bulkDelete('Users', null, {})
  }
}

