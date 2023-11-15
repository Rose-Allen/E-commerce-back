const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  try {
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (e) {
    console.log(e);
  }
};

exports.comparePassword = async (password, hashPassword) => {
  try {
    const comparePassword = await bcrypt.compare(password, hashPassword);
    return comparePassword;
  } catch (e) {
    console.log(e);
  }
};
