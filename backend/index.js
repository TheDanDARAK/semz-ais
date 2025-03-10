// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { testConnection } = require('./db');

// Проверяем соединение с БД
testConnection();

// Middleware для парсинга JSON
app.use(express.json());

// Подключение роутов
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const equipmentRouter = require('./routes/equipment');
app.use('/equipment', equipmentRouter);

const partsRouter = require('./routes/parts');
app.use('/parts', partsRouter);

const routesRouter = require('./routes/routes');
app.use('/routes', routesRouter);

const operationsRouter = require('./routes/operations');
app.use('/operations', operationsRouter);

// Подключаем аутентификацию
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Hello, world! This is the backend of semz-ais.');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
