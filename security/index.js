const bcrypt = require('bcryptjs');

class Bcrypt {
  static async bcryptPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      return hashPassword;
    } catch (error) {
      return error;
    }
  }
  static async dcryptPassword(userPassword, dbPassword) {
    try {
      const validPassword = await bcrypt.compare(userPassword, dbPassword);
      return validPassword;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Bcrypt;
