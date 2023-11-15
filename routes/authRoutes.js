const express = require("express");
const authController = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();
//Регистрация
router.post("/register", authController.register);
//Авторизация
router.post("/login", authController.login);
//Забыл Пароль
router.post("/forgot-password", authController.forgotPassword);
//Тест для админки
router.get("/test", requireSignIn, isAdmin, authController.test);
//Проверка на авторизацию юзера
router.get("/user-auth", requireSignIn, authController.users);
//Проверка на авторизацию Админа
router.get("/admin-auth", requireSignIn, isAdmin, authController.admin);

module.exports = router;
