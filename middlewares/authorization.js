const { User } = require("../database/models");
const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  checktoken: async (req, res, next) => {
    const { headers } = req;

    const token = (headers && headers.authorization) || "";
    const user = await verifyToken(token);
    console.log({ ...user.dataValues });
    req.user = user;
    next();
  },
};
