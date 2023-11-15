const { hashPassword, comparePassword } = require("../helpers/authHelper");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({
        error: "Заполните имя",
      });
    }
    if (!email) {
      return res.send({
        error: "Заполните email",
      });
    }
    if (!password) {
      return res.send({
        error: "Заполните пароль",
      });
    }
    if (!phone) {
      return res.send({
        error: "Заполните номер",
      });
    }

    if (!address) {
      return res.send({
        error: "Заполните адрес",
      });
    }
    if (!answer) {
      return res.send({
        error: "Заполните ответ",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        success: true,
        message: "Вы уже зарегистрировались",
      });
    }
    const hashpassword = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashpassword,
      phone,
      address,
      answer,
    });
    user.save();

    res.json({
      success: true,
      message: "Регистрация прошла успешно!",
      user,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Ошибка регистрации",
      e,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email не существует",
      });
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(200).send({
        success: false,
        message: "Ошибка пароли не совпадают",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Авторизация прошла успешно",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Ошибка при авторизации",
      e,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Требуется электронная почта " });
    }
    if (!answer) {
      res.status(400).send({ message: "Требуется ответ " });
    }
    if (!newPassword) {
      res.status(400).send({ message: "Требуется новый пароль " });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Ошибка электронная почти или ответ",
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Пароль сброшен успешно!",
    });
  } catch (e) {
    console.log(e);
    res.send(500).send({
      success: false,
      message: "Что-то пошло не так",
      e,
    });
  }
};

exports.test = (req, res) => {
  res.send("protected route");
};
exports.users = (req, res) => {
  res.status(200).send({ ok: true });
};
exports.admin = (req, res) => {
  res.status(200).send({ ok: true });
};
