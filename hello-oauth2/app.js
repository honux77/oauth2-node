require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var session = require("express-session"); // express-session 추가

var indexRouter = require("./routes/index");

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // 환경 변수로 비밀 키 설정
    resave: false, // 세션이 수정되지 않아도 저장 여부
    saveUninitialized: true, // 초기화되지 않은 세션 저장 여부
    cookie: { secure: false }, // HTTPS를 사용하는 경우 true로 설정
  })
);

app.use("/", indexRouter);

module.exports = app;
