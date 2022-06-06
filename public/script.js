const socket = io("/");
const videGrid = document.getElementById("video-grid");
console.log(videGrid);
const myVideo = document.createElement("video");
myVideo.mute = true;

let myVideoStram;
// 사용자에게 장치 사용 권한 요청
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStram = stream;
    addVideoStream(myVideo, stream);
  });

socket.emit("join-room", ROOM_ID);

socket.on("user-connected", () => {
  connectToNewUser();
});

const connectToNewUser = () => {
  console.log("new user");
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videGrid.append(video);
};
