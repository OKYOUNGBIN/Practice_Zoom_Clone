const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

// npm install peer : free webRTC서버
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// zoom에서 고유한 uuid값을 갖기 위해
// v4 : 랜덤값을 기반으로 생성
const { v4: uuidv4 } = require("uuid");

// app.set("키","값")
// ejs를 사용하려면 view engine과 ejs를 설정
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  // HTML 보기를 렌더링하고 렌더링된 HTML 데이터를 클라이언트에 보내는 데 사용되는 함수
  // ejs를 사용 할 때는 render사용
  //res.render("room");
  // redirect : 데이터 보내기
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

server.listen(process.env.PORT || 3030);
