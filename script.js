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



 function findPossibleMoves(v,i,a) {
   return (v[0]>=0&&v[0]<size&&v[1]>=0&&v[1]<size&&board[v[0]][v[1]]!=1);
 }


 let nextMoves;
 let nextCoords;
 let nextX;
 let nextY;
 let nextNextMoves;
 let i = moves[0][0];
 let j = moves[0][1];
 board[i][j] = 1;

 function tryMove() {
  let index = 0;
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
  nextMoves = possibleMoves.filter(findPossibleMoves);
  let numberOfNextMoves = [];
  let nextVars;
  function testNextMoves() {
    for (let i=0;i<nextMoves.length;i++) {
      nextX = nextMoves[i][1];
      nextY = nextMoves[i][0];
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
      nextNextMoves = nextVars.filter(findPossibleMoves);
      numberOfNextMoves.push(nextNextMoves.length);
    }
    return numberOfNextMoves;
  }
  numberOfNextMoves = testNextMoves();

  let count =  numberOfNextMoves.length;
  let min = numberOfNextMoves[0];
  
  while(count--) {
    if(numberOfNextMoves[count] < min) {
      min = numberOfNextMoves[count];
      index = count;
    }
  }

  board[nextMoves[index][0]][nextMoves[index][1]] = 1;
  moves.push(nextMoves[index]);
  nextX = nextMoves[index][1];
  nextY = nextMoves[index][0];
  i = moves[moves.length-1][0];
  j = moves[moves.length-1][1];
}

tryMove();

while (nextNextMoves.length>0) {
  tryMove();
}


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
  if (moves.length==64) {
    alert ('Путь найден!');
  } else alert ('Неудача! Попробуйте еще раз!');

    if (timer) {
      clearInterval(timer);
      timer = 0;
    }
    timer = setInterval(move, 200); 
    
    function move() {
      if (k==moves.length-1) {
        clearInterval(timer);
        timer = 0;
      };
      knight.posX = moves[k][1];
      knight.posY = moves[k][0];
      table.rows[knight.posY].cells[knight.posX].textContent = `${k + 1}`;
      table.rows[knight.posY].cells[knight.posX].style.backgroundColor = '#FAFBC5';
      knight.set();
      k++;
    } 
}



