const express = require("express");
const app = express();
const server = require("http").Server(app);

// zoom에서 고유한 uuid값을 갖기 위해
const { v4: uuidv4 } = require("uuid");

// app.set("키","값")
// ejs를 사용하려면 view engine과 ejs를 설정
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // HTML 보기를 렌더링하고 렌더링된 HTML 데이터를 클라이언트에 보내는 데 사용되는 함수
  // ejs를 사용 할 때는 render사용
  //res.render("room");
  // redirect : 데이터 보내기
  //res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(3030);
