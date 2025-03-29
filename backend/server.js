const app = require('./app')
const db = require('./models')
const port = process.env.PORT || 3001
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('Server on port', port)
  })
}).catch(err => {
  console.log('DB error', err)
})
