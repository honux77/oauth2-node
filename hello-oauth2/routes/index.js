const express = require("express");
const { eventNames } = require("../app");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  const parameters = {
    client_id: process.env.GH_ID,
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

router.get("/next", async (req, res, next) => {
  try {
    const result = 
    await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GH_ID,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
      }
    );

    const token = result.data.split('&')[0].split('=')[1];
    res.render("next", {token});
  } catch (err) {
    next(err);
  }
});

//get user from github
router.get("/user", (req, res, next) => {
  const accessToken = req.query.token;
  res.json({accessToken});
});
