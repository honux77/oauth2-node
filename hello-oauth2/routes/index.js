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

router.get("/callback", (req, res, next) => {
  const authCode = req.query.code;
  res.render("callback", { authCode });
});

router.get("/next", (req, res, next) => {
  req.authCode = req.query.code;
  const payload = {
    accessToken: "아직 없음",
    refreshToken: "아직 없음",
  };
  //TODO: Implement
  res.render("next", payload);
});
