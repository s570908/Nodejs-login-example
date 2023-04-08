// Requiring modules
const express = require("express");
const bodyParser = require("body-parser");
//const url = require("url");
//const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookieParser middleware
app.use(cookieParser("secret"));
const cookieConfig = {
  //cookieConfig는 키, 밸류 외에 설정을 보낼 수 있다.
  maxAge: 3000000,
  //밀리초 단위로 들어가는데 30000을 설정하면 30초만료 쿠키를 생성한다.
  path: "/",
  httpOnly: true,
  //통신할때만 접속할 수 있다. 기본값은 false임
  signed: true,
  //쿠키를 암호화 시킨다.
};

// Route for setting the cookies
// /setcookie/?cookieName=whatToPlay&cookieValue=Tangja
app.get("/setcookie", function (req, res) {
  // Access the provided 'page' and 'limt' query parameters
  let cookieName = req.query.cookieName;
  let cookieValue = req.query.cookieValue;
  res.cookie(`${cookieName}`, `${cookieValue}`, cookieConfig);
  res.cookie(`${cookieName}-another`, `${cookieValue}-another`, cookieConfig);
  cookieConfig.signed
    ? res.send(`Signed Cookies added: ${JSON.stringify(req.signedCookies, null, 2)}`)
    : res.send(`Cookies added: ${JSON.stringify(req.cookies, null, 2)}`);
});

// Route for getting all the cookies
app.get("/getcookie", function (req, res) {
  cookieConfig.signed
    ? res.send(`Signed Cookies got: ${JSON.stringify(req.signedCookies, null, 2)}`)
    : res.send(`Cookies got: ${JSON.stringify(req.cookies, null, 2)}`);
});

// Server listens to port 3000
app.listen(3000, (err) => {
  if (err) throw err;
  console.log("server running on port 3000");
});
