const express = require("express");
const app = express();
const config = require("./config/key");

// 클라이언트에서 보낸 데이터를 서버에서 해석할 수 있도록 해주는 모듈
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

// 쿠키를 사용하기 위해서 필요
app.use(cookieParser());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/users"));
app.use("/api/favorite", require("./routes/favorite"));

const port = 3010;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
