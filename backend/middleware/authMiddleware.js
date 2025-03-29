const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (req, res, next) => {
  const h = req.headers['authorization']
  if (!h) return res.status(401).json({ error: 'No token' })
  const t = h.split(' ')[1]
  if (!t) return res.status(401).json({ error: 'Invalid token' })
  jwt.verify(t, process.env.JWT_SECRET || 'secret_key', (e, d) => {
    if (e) return res.status(403).json({ error: 'Auth failed' })
    req.user = d
    next()
  })
}
