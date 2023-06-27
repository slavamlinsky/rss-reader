require("dotenv").config();
const Router = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User");

const router = new Router();

// генерируем новый токен (в котором спрятан id пользователя)
const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.secretKey, { expiresIn: "5h" });
};

// POST @/api/auth/registration - регистрация нового пользователя
router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check("password", "Password should have from 4 to 10 symbols.").isLength({
      min: 4,
      max: 10,
    }),
  ],
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // проверяем существование такого email в БД
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: `User already exists` });
      }

      // валидация входящих данных (простая проверка Email)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }

      // генерируем Hash для пароля
      const hashPassword = await bcrypt.hash(password, 5);

      // корректируем дату на часовой пояс
      const date = Date.now();
      const offset = new Date(date).getTimezoneOffset();
      const correctDate = date - offset * 60 * 1000;

      // добавляем нового юзера в базу данных в таблицу User
      const user = new User({
        name,
        email,
        password: hashPassword,
        date: correctDate,
      });
      await user.save();

      // возвращаем сообщение об успешной регистрации
      return res.json({
        message: "User was successfully created",
      });
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }
);

// POST @/api/auth/login - авторизация пользователя
router.post(
  "/login",
  [check("email", "Uncorrect email").isEmail()],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // валидация входящих данных (простая проверка Email)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect Email", errors });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return res.status(404).json({ message: "Invalid password" });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          isActivated: user.isActivated,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.error(e);
      res.send({ message: "Server Error" });
    }
  }
);

// GET @/api/auth/auth - проверка авторизации по существующему токену (в localStorage - действует 5 часов)
router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const token = generateAccessToken(user._id, user.roles);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    res.send({ message: "Server Error" });
  }
});

module.exports = router;
