exports.generateBombs = function (bombArr, cellNum, bombNum) {
    console.log(cellNum, bombNum, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    while (bombNum !== 0) {
      const x = Math.floor(Math.random() * cellNum);
      const y = Math.floor(Math.random() * cellNum);
   
      if (bombArr[x][y] !== "X") {
        bombArr[x][y] = "X";
        bombNum--;
      }
    }
   
    for (let i = 0; i < cellNum; i++) {
      for (let j = 0; j < cellNum; j++) {
        if (bombArr[i][j] !== "X") {
          if (bombArr[i - 1] !== undefined && bombArr[i - 1][j] === "X") {
            bombArr[i][j] += 1;
          }
          if (bombArr[i + 1] !== undefined && bombArr[i + 1][j] === "X") {
            bombArr[i][j] += 1;
          }
          if (bombArr[i][j - 1] !== undefined && bombArr[i][j - 1] === "X") {
            bombArr[i][j] += 1;
          }
          if (bombArr[i][j + 1] !== undefined && bombArr[i][j + 1] === "X") {
            bombArr[i][j] += 1;
          }
          if (bombArr[i - 1] !== undefined && bombArr[i - 1][j - 1] === "X") {
            bombArr[i][j] += 1;
          }
          if (bombArr[i + 1] !== undefined && bombArr[i + 1][j + 1] === "X") {
            bombArr[i][j] += 1;
          }
          if (bombArr[i - 1] !== undefined && bombArr[i - 1][j + 1] === "X") {
            bombArr[i][j] += 1;
          }
          if (bombArr[i + 1] !== undefined && bombArr[i + 1][j - 1] === "X") {
            bombArr[i][j] += 1;
          }
        }
      }
    }
   
    return bombArr;
  };
   
  exports.defineBoardDifficulty = function (value, cellNum, bombNum) {
    let bombArr = Array(cellNum)
      .fill(0)
      .map((elem) => Array(cellNum).fill(0));
   
    switch (value) {
      case "easy":
        cellNum = 10;
        bombNum = 10;
        break;
   
      case "medium":
        cellNum = 50;
        bombNum = 50;
        break;
   
      case "hard":
        cellNum = 100;
        bombNum = 100;
        break;
    }
   
    bombArr = Array(cellNum)
          .fill(0)
          .map((elem) => Array(cellNum).fill(0))
   
    return { bombArr, cellNum, bombNum };
  };
   