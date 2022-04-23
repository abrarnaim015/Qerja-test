"use strict";
const { User } = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  registeruser: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userDB = await User.create({ name, email, password });
      if (!userDB)
        throw {
          name: "Error Database",
          statusCode: 400,
          data: req.body,
        };
      const result = {
        meta: { statusCode: 201, message: `SUCCESS`, time: new Date() },
        data: userDB,
      };
      res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  },

  loginuser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user)
        throw {
          name: "Error Database user Not Fount",
          statusCode: 400,
          data: req.body,
        };
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, "mySecret");
        const result = {
          meta: { statusCode: 200, message: `SUCCESS`, time: new Date() },
          data: { ...user.toJSON(), token },
        };
        res.status(200).json(result);
      } else throw new Error();
    } catch (e) {
      return next(e);
    }
  },

  getalluser: async (req, res, next) => {
    try {
      const users = await User.findAll();
      if (!users)
        throw {
          name: "Error Database",
          statusCode: 400,
          data: req.body,
        };
      const result = {
        meta: { statusCode: 200, message: `SUCCESS`, time: new Date() },
        data: users,
      };
      res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  },
};
