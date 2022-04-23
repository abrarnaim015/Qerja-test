"use strict";
const router = require(`express`).Router();
const { userController, jobsController } = require("../controller");
const { checktoken } = require("../middlewares/authorization");

router
  .get("/", (req, res) => res.json({ message: "PONG!!!" }))
  .post("/register", userController.registeruser)
  .post("/login", userController.loginuser)
  .get("/allusers", checktoken, userController.getalluser)
  .get("/alljobs", checktoken, jobsController.alljobs)
  .get("/jobssearch", checktoken, jobsController.jobssearch);

module.exports = router;
