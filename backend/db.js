const { Sequelize } = require('sequelize');

// Читаем конфигурацию (можно импортировать из config/config.json, либо задать вручную)
const sequelize = new Sequelize('semz_db', 'postgres', '123455', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false, // чтобы не было лишних логов
});

// Функция для проверки соединения
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, testConnection };
