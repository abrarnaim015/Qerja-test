"use strict";

module.exports = async (err, req, res, next) => {
  console.error(`### ERROR HANDLED ###\n`, err);
  if (err.name) return res.send(err);
  else
    return res
      .status(err.statusCode)
      .json({ error: true, message: err.message, data: err.data });
};
