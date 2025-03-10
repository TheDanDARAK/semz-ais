const jwt = require('jsonwebtoken');

// В реальном приложении секретный ключ следует хранить в переменных окружения
const secretKey = 'your_secret_key';

function authenticateToken(req, res, next) {
  // Токен обычно передаётся в заголовке Authorization в формате: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Отсутствует токен, авторизация не выполнена' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Неверный или просроченный токен' });
    }
    // Привязываем информацию о пользователе к запросу
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
