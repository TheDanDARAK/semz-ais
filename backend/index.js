const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { testConnection } = require('./db');

// Перед запуском сервера проверим соединение с БД
testConnection();

// Middleware для парсинга JSON в теле запроса
app.use(express.json());

// Подключаем роутер для /users (пример)
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Пример простого маршрута
app.get('/', (req, res) => {
  res.send('Hello, world! This is the backend of semz-ais.');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
