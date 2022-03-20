"use strict";
var size = 8;
var pictureWidth = 54;
var moves = [
  [0,0],
  [0,1],
  [0,2],
];
var board = [];

for (var i = 0; i < size; i++) {
  board[i] = [];
  for (var j = 0; j < size; j++) {
    board[i][j] = 0;
  }
}

function buildBoard(size) {
  var table = document.getElementById("CHESSTABLE");
  table.style.position = "relative";
  for (var i = 0; i < size; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < size; j++) {
      var td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

buildBoard(size);

/*function writeDownSolutions() {
  var arr = [];
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (board[i][j] == -1) {
        arr.push([i, j]);
      }
    }
  }
  solutions.push(arr);
}

function findSolution(i) {
  for (var j = 0; j < size; j++) {
    if (board[i][j] == 0) {
      tryQueen(i, j);

      if (i == size - 1) {
        writeDownSolutions();
        removeQueen(i, j);
      } else {
        findSolution(i + 1);
        removeQueen(i, j);
      }
    }
  }
}
findSolution(0);

function tryQueen(i, j) {
  var x = i - j;
  var y = i + j;
  for (var k = 0; k < size; k++) {
    board[i][k] += 1;
    board[k][j] += 1;
    if (k + x >= 0 && k + x < size) {
      board[k + x][k] += 1;
    }
    if (y - k >= 0 && y - k < size) {
      board[y - k][k] += 1;
    }
  }
  board[i][j] = -1;
}

function removeQueen(i, j) {
  var x = i - j;
  var y = i + j;
  for (var k = 0; k < size; k++) {
    board[i][k] -= 1;
    board[k][j] -= 1;
    if (k + x >= 0 && k + x < size) {
      board[k + x][k] -= 1;
    }
    if (y - k >= 0 && y - k < size) {
      board[y - k][k] -= 1;
    }
  }
  board[i][j] = 0;
}

function showSolutions(e) {
  e = e || window.event;
  e.preventDefault();
  var span1 = document.getElementById("span1");
  var div = document.getElementById("div");
  div.style.display = "block";
  var string = "";
  for (var i = 0; i < solutions.length; i++) {
    var str = "";
    for (var j = 0; j < size; j++) {
      str += `(${solutions[i][j]})`;
    }
    string += `<br/> ${i + 1}) ${str}`;
  }
  span1.textContent = `Количество найденных вариантов:\n ${solutions.length}`;
  div.innerHTML = string;
}*/
let table = document.getElementById("CHESSTABLE");
function showMoves(e) {
  e = e || window.event;
  e.preventDefault();
  createKnight();
  setKnight();
  /*for (let k = 0; k < size; k++) {
    for (let l = 0; l < size; l++) {
      var td = table.rows[k].cells[l];
      td.style.backgroundColor = "";
    }*/
  }
  
  
  function createKnight() {
    let img = document.createElement("img");
    img.setAttribute("src", "knight.png");
    img.setAttribute("id", "knight");
    img.style.position = "absolute";
    table.appendChild(img);
  }

  function setKnight() {
    let img = document.getElementById("knight");
    img.style.left = pictureWidth * moves[0][1] + "px";
    img.style.top = pictureWidth * moves[0][0] + "px";
  }

   let knight = {
     size:54,
     position:absolute,
     posX:moves[1],
     posY:moves[0],
    

   } 
/* function showThreatPlaces(e) {
  e = e || window.event;
  e.preventDefault();
  var self = this;
  var j = self.offsetLeft / pictureWidth;
  var i = self.offsetTop / pictureWidth;
  var x = i - j;
  var y = i + j;
  var table = document.getElementById("CHESSTABLE");
  for (var k = 0; k < size; k++) {
    for (var l = 0; l < size; l++) {
      var td = table.rows[k].cells[l];
      td.style.backgroundColor = "";
    }
  }
  for (var k = 0; k < size; k++) {
    var tdh = table.rows[i].cells[k];
    var tdv = table.rows[k].cells[j];
    tdh.style.backgroundColor = "#A9CCEE";
    tdv.style.backgroundColor = "#A9CCEE";
    if (k + x >= 0 && k + x < size) {
      var diag1 = table.rows[k + x].cells[k];
    }
    if (y - k >= 0 && y - k < size) {
      var diag2 = table.rows[y - k].cells[k];
    }
    if (diag1) diag1.style.backgroundColor = "#A9CCEE";
    if (diag2) diag2.style.backgroundColor = "#A9CCEE";
  }

}*/

