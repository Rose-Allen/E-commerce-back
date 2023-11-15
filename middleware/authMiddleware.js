const jwt = require("jsonwebtoken");
const User = require("../models/User");

// exports.requireSignIn = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const decode = jwt.verify(
//       req.headers.authorization,
//       process.env.SECRET_KEY
//     );
//     console.log("token v1", token);
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenv2 = req.headers.authorization;
    console.log(token);
    console.log("tokenv2", tokenv2);
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (e) {
    console.log(e);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Вы не админ",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      success: false,
      message: "Нет прав админа",
      e,
    });
  }
};
