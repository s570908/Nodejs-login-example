const express = require("express");
const session = require("express-session");
const port = 3000;

const app = express();
app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/makeSession", (req, res) => {
  if (req.session.test) {
    res.send("세션이 이미 존재");
  } else {
    req.session.test = "test string";
    res.send("세션 생성");
  }
});

app.get("/confirmSession", (req, res) => {
  if (req.session.test) {
    console.log(req.session);
    res.send(`세션 있습니다: ${JSON.stringify(req.session, null, 2)}`);
  } else {
    console.log("no session");
    res.send("세션 없습니다.");
  }
});

app.get("/deleteSession", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.send("제거할 세션이 없습니다.");
  }
});

app.listen(port, () => {
  console.log(`session 테스트용 앱 http://localhost:${port}`);
});
