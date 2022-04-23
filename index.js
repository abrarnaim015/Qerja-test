const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./router");
const ErrorHandler = require("./middlewares/ErrorHandler");
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route).use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
