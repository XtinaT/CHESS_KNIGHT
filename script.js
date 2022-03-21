"use strict";
let size = 8;
let pictureWidth = 54;
let moves = [];
let board = [];

for (let i = 0; i < size; i++) {
  board[i] = [];
  for (let j = 0; j < size; j++) {
    board[i][j] = 0;
  }
}

function buildBoard(size) {
  let table = document.getElementById("CHESSTABLE");
  table.style.position = "relative";
  for (let i = 0; i < size; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

buildBoard(size);

chooseStartPosition();

function randomDiap(n,m) {
  return Math.floor(Math.random()*(m-n+1))+n;
}
function chooseStartPosition () {
  let startPosition = randomDiap(1,4);
  switch (startPosition) {
    case 1: 
      moves.push([0,0]);
      break;

    case 2: 
      moves.push([0,7]);
      break; 

    case 3: 
      moves.push([7,0]);
      break; 

    case 4: 
      moves.push([7,7]);
      break;          
  }
}

let i = moves[0][0];
let j = moves[0][1];

let possibleMoves = [
  [i-1,j+2],
  [i+1,j+2],
  [i+2,j+1],
  [i+2,j-1],
  [i+1,j-2],
  [i-1,j-2],
  [i-2,j-1],
  [i-2,j+1],
];

 function findPossibleMoves(v,i,a) {
   return (v[0]>=0&&v[0]<size&&v[1]>=0&&v[1]<size&&board[v[0]][v[1]]!=1);
 }

 function countNextMoves(array) {
    return array.length
 }

 let nextMoves;
 let nextCoords;


 function tryMove() {
  board[i][j] = 1;
  nextMoves = possibleMoves.filter(findPossibleMoves);
  let numberOfNextMoves = [];
  let nextVars;
  function whatToDoNext() {
    for (let i=0;i<nextMoves.length;i++) {
      let nextX = nextMoves[i][1];
      let nextY = nextMoves[i][0];
      nextVars = [
        [nextY-1,nextX+2],
        [nextY+1,nextX+2],
        [nextY+2,nextX+1],
        [nextY+2,nextX-1],
        [nextY+1,nextX-2],
        [nextY-1,nextX-2],
        [nextY-2,nextX-1],
        [nextY-2,nextX+1],
      ];
      let nextNextMoves = nextVars.filter(findPossibleMoves);
      console.log(nextNextMoves);
      numberOfNextMoves.push(nextNextMoves.length);
    }
    return numberOfNextMoves;
  }
  numberOfNextMoves = whatToDoNext();
  console.log(numberOfNextMoves);

  let length =  numberOfNextMoves.length;
  let min = numberOfNextMoves[0];
  let index = 0;
  while(length--) {
    if(numberOfNextMoves[length] < min) {
      min = numberOfNextMoves[length];
      index = length;
    }
  }
  console.log(numberOfNextMoves[index]);

  //board[nextVars[index][0]][nextVars[index][1]] = 1;
}

tryMove();
console.log(board);
//console.log(board);
//console.log(nextMoves);

//console.log(moves);
//console.log(possibleMoves);
//console.log(nextMoves);

/*function findSolution(i) {
  for (let j = 0; j < size; j++) {
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
findSolution(0);*/

/*function tryQueen(i, j) {
  let x = i - j;
  let y = i + j;
  for (let k = 0; k < size; k++) {
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

/*function removeQueen(i, j) {
  let x = i - j;
  let y = i + j;
  for (let k = 0; k < size; k++) {
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
}*/
let table = document.getElementById("CHESSTABLE");
let knight = {
  size: 54,
  position: "absolute",
  src: "knight.png",
  id: "knight",
  posX: moves[0][1],
  posY: moves[0][0],
  isCreated: false,
  create: function () {
    if (!this.isCreated) {
      let img = document.createElement("img");
      img.setAttribute("src", this.src);
      img.setAttribute("id", this.id);
      img.style.position = this.position;
      table.appendChild(img);
    }
    this.isCreated = true;
  },
  set: function () {
    let img = document.getElementById("knight");
    img.style.left = this.size * this.posX + "px";
    img.style.top = this.size * this.posY + "px";
  },
};
knight.create();
knight.set();
let timer = 0;
let k = 0;
function showMoves(e) {
  e = e || window.event;
  e.preventDefault();
  

    if (timer) {
      clearInterval(timer);
      timer = 0;
    }
    timer = setInterval(move, 500); 
    
    function move() {
      if (k==moves.length-1) {
        clearInterval(timer);
        timer = 0;
      };
      knight.posX = moves[k][1];
      knight.posY = moves[k][0];
      console.log(knight.posY, knight.posX);
      table.rows[knight.posY].cells[knight.posX].textContent = `${k + 1}`;
      knight.set();
      k++;
    } 
}



