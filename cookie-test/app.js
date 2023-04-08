const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieConfig = {
  //cookieConfig는 키, 밸류 외에 설정을 보낼 수 있다.
  maxAge: 30000,
  //밀리초 단위로 들어가는데 30000을 설정하면 30초만료 쿠키를 생성한다.
  path: "/",
  httpOnly: true,
  //통신할때만 접속할 수 있다. 기본값은 false임
  //signed: true,
  //쿠키를 암호화 시킨다.
};

app.get("/", (req, res) => {
  //req.session.name = "홍길동";
  res.cookie("key", "value", cookieConfig);
  res.cookie("key1", "value1", cookieConfig);
  res.cookie("key2", "value2", cookieConfig);
  res.render("index");
});

app.listen(8000, () => {
  console.log("Server : ", 8000);
});
