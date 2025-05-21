const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const morgan = require("morgan");

function generateState(length = 8) {
  return crypto.randomBytes(length).toString("hex");
}

/* GitHub OAuth2 예제
 * 1. 사용자(Resource Owner)가 링크를 클릭하여 Authorization Server에 인증 요청
 */
router.get("/", function (req, res, next) {
  //generate state
  const state = generateState();
  const parameters = {
    client_id: process.env.GH_ID,
    redirect_url: process.env.HOST + process.env.REDIRECT_URL,
    scope: process.env.SCOPE,
    state: state,
  };
  console.log("state", state);
  //state를 세션에 저장
  req.session.state = state;
  res.render("index", parameters); //see views/index.handlebars
});

module.exports = router;

/* 2. callback URL
 * 깃헙에서 302 리다이렉트 시켜줌
 * auth code를 query string으로 줌
 */
router.get("/callback", (req, res, next) => {
  const authCode = req.query.code;
  const state = req.query.state;
  const sessionState = req.session.state;
  console.log("Auth Code", authCode);
  console.log(
    "State",
    state,
    sessionState,
    "sessionState",
    state === sessionState
  );
  res.render("callback", { authCode, state, sessionState });
});

/* 3. access token 요청
 * auth code를 이용해서 access token 요청
 * access token을 받으면 api를 호출할 수 있음
 */
router.get("/next", async (req, res, next) => {
  try {
    const result = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GH_ID,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
      }
    );

    const token = result.data.split("&")[0].split("=")[1];
    res.render("next", { token });
  } catch (err) {
    next(err);
  }
});

/* 4. access token으로 api 호출
 * access token을 이용해서 api를 호출
 * access token을 헤더에 넣어서 요청
 */
router.get("/user", async (req, res, next) => {
  const accessToken = req.query.token;
  try {
    const result = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = result.data;
    apiURL = "https://api.github.com/user";
    res.json({ accessToken, apiURL, data });
  } catch (err) {
    next(err);
  }
});
