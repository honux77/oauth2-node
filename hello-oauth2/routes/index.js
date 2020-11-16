require("dotenv").config();
const express = require("express");
const { eventNames } = require("../app");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const parameters = {
    client_id: process.env.GITHUB,
    redirect_url: process.env.HOST + process.env.REDIRECT_URL,
    scope: process.env.SCOPE,
  };
  res.render("index", parameters);
});

module.exports = router;
