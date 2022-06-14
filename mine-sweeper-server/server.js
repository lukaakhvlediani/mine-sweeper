const express = require("express");
const app = express();
const http = require("http");
const { generateBombs, defineBoardDifficulty } = require("./helper");
const server = http.createServer(app);
const { Server } = require("socket.io");
 
const io = new Server(server, {
  cors: {
    origins: ["*"],
  },
});
 
io.on("connection", (socket) => {
  console.log("a user connected");
 
  socket.on("disconnect", () => {
    console.log("user disconnected", 1233);
  });
  socket.on("generateBoard", (value) => {
    generateBoard(value);
    console.log("generateBoard", this.bombs, this.visited);
    io.emit("boardUpdate", { bombs: this.bombs, visited: this.visited });
  });
 
  socket.on("onclick", (data) => {
    console.log("onclick", data);
    visitCell(data.i, data.j);
 
    io.emit("boardUpdate", { bombs: this.bombs, visited: this.visited });
  });
});
 
server.listen(4000, () => {
  console.log("listening on *:4000");
});
 
const setBombs = (bombArr) => {
  this.bombs = bombArr;
};
 
const setVisited = (cover) => {
  this.visited = cover;
};
 
let bombNum = 10;
let cellNum = 10;
 
const generateBoard = (value) => {
 
  let boardInfo = defineBoardDifficulty(value, cellNum, bombNum);
  bombNum = boardInfo.bombNum;
  cellNum = boardInfo.cellNum;
  bombArr = boardInfo.bombArr;
 
  bombArr = generateBombs(bombArr, cellNum, bombNum);
  setBombs(bombArr);
 
  this.visited = Array(cellNum)
    .fill(0)
    .map((elem) => Array(cellNum).fill(0))
};
 
const Cells = (i, j) => {
  if (
    i < 0 ||
    i > this.visited.length - 1 ||
    j < 0 ||
    j > this.visited[0].length - 1 ||
    this.visited[i][j] === 1 ||
    this.bombs[i][j] === "X"
  )
    return;
 
  this.visited[i][j] = 1;
 
  setVisited([...this.visited]);
  if (this.bombs[i][j] < 1) {
    Cells(i + 1, j);
    Cells(i - 1, j);
    Cells(i, j + 1);
    Cells(i, j - 1);
  }
};
 
const visitCell = (i, j) => {
  if (this.bombs[i][j] === "X") {
    io.emit("onLost");
  }
  Cells(i, j);
  this.visited[i][j] = 1;
  setVisited([...this.visited]);
};
 