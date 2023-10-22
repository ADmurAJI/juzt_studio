require("dotenv").config(); // Для считывания переменного окружения
const express = require("express"); // Фреймворк
const sequelize = require("./db"); // Имопрт объекта для связи системного кода с базами данных
const cors = require("cors"); // Для отправки запросов с браузера
const fileUpload = require("express-fileupload");
const router = require("./routes/index"); // Импортируем основной роутер
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 5000; // Порт приложения

const app = express(); // Объект для запуска
app.use(cors()); // Для отправки запросов с браузера
app.use(express.json()); // Для парса json-формата
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router); // Обработка роутера

app.use(errorHandler); // Обработка ошибок, последний Middleware

// Функция для подключения к базе данных
const start = async () => {
  try {
    await sequelize.authenticate(); // Устанавливаем подключение к базе данных
    await sequelize.sync(); // Сверяем состояние данных со схемой данных в models.js
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
