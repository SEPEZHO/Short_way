var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas = [];
var timer;
var width = 300;
var height = 300;
var xxx2 = 0;
var yyy2 = 0;
var xxx3 = 0;
var yyy3 = 0;
var ii;
var jj;

function goLife() {
  for (var i = 0; i < width; i++) {
    mas[i] = [];
    for (var j = 0; j < height; j++) {
      mas[i][j] = 0;
    }
  }
}
goLife();

canvas.onclick = function (event) {
  var x = event.offsetX;
  var y = event.offsetY;
  x = Math.floor(x / 10);
  y = Math.floor(y / 10);
  console.log(x);
  console.log(y);
  if (event.ctrlKey) {
    mas[y][x] = 2;
    xxx2 = x;
    yyy2 = y;
  } else if (event.shiftKey) {
    mas[y][x] = 3;
    xxx3 = x;
    yyy3 = y;
  } else {
    mas[y][x] = 4;
  }
  if (event.altKey) {
    console.log('asas');
    mas[y][x] = 5;
  }
  drawField();
}

function drawField() {
  for (var i = 0; i < width / 10; i++) {
    for (var j = 0; j < height / 10; j++) {
      if (mas[i][j] == 1) {
        ctx.fillStyle = 'lime';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 2) {
        ctx.fillStyle = 'black';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 3) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 4) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 5) {
        mas[i][j] = 0;
        ctx.clearRect(j * 10, i * 10, 9.9, 9.9);
      }
    }
  }
}

function goSearch() {
  var c1;
  var c2;
  var c3;
  var c4;
  outer: for (var i = 1; i < width / 10; i++) {
    for (var j = 1; j < height / 10; j++) {

      if (mas[i][j] == 3) {
        mas[i][j] = 1;
        ii = i;
        jj = j;
      }
    }
  }

  var a = xxx2 - xxx3;
  var b = yyy2 - yyy3;
  var c = Math.sqrt(a * a + b * b);

  var xx = xxx2 - 1;
  var aa = xx - xxx3;
  var bb = yyy2 - yyy3;
  c1 = Math.sqrt(aa * aa + bb * bb);

  var xx1 = xxx2 + 1;
  var aa1 = xx1 - xxx3;
  var bb1 = yyy2 - yyy3;
  c2 = Math.sqrt(aa1 * aa1 + bb1 * bb1);


  var yy2 = yyy2 + 1;
  var aa2 = xxx2 - xxx3;
  var bb2 = yy2 - yyy3;
  c3 = Math.sqrt(aa2 * aa2 + bb2 * bb2);


  var yy3 = yyy2 - 1;
  var aa3 = xxx2 - xxx3;
  var bb3 = yy3 - yyy3;
  c4 = Math.sqrt(aa3 * aa3 + bb3 * bb3);


  if (mas[ii][jj + 1] == 4 || mas[ii][jj + 1] == 1 || mas[ii][jj + 1] !== mas[ii][jj + 1]) { // rigth
    c1 = 100;
  }
  if (mas[ii][jj - 1] == 4 || mas[ii][jj - 1] == 1 || mas[ii][jj - 1] !== mas[ii][jj - 1]) { //left
    c2 = 100;
  }
  if (mas[ii - 1][jj] == 4 || mas[ii - 1][jj] == 1 || mas[ii - 1][jj] !== mas[ii - 1][jj]) { // up
    c3 = 100;
  }
  if (mas[ii + 1][jj] == 4 || mas[ii + 1][jj] == 1 || mas[ii + 1][jj] !== mas[ii + 1][jj]) { // bottom
    c4 = 100;
  }

  if (c1 == c2 && (c3 == 100 || c4 == 100)) {
    var arr = [c1, c2];
    var ran = Math.floor(Math.random() * (2 - 1 + 2)) + 1;
    ran = ran - 1;
    if (arr[ran] == c1) {
      c2 = c2 - 1;
    } else {
      c1 = c1 - 1;
    }
  }
  if (c3 == c4 && (c1 == 100 || c2 == 100)) {
    var arr = [c3, c4];
    var ran = Math.floor(Math.random() * (2 - 1 + 2)) + 1;
    ran = ran - 1;
    if (arr[ran] == c3) {
      c3 = c3 - 1;
    } else {
      c4 = c4 - 1;
    }
  }
  var min = Math.min(c1, c2, c3, c4);

  var minOld = min;
  if (min == c1) {
    mas[ii][jj + 1] = 3;
    xxx3++;
    console.log('rigth (c1)');
  } else if (min == c2) {
    mas[ii][jj - 1] = 3;
    xxx3--;
    console.log('left (c2)');
  } else if (min == c3) {
    mas[ii - 1][jj] = 3;
    yyy3--;
    console.log('up (c3)');
  } else if (min == c4) {
    mas[ii + 1][jj] = 3;
    yyy3++;
    console.log('bottom (c4)');
  }

  console.log('rigth (c1) =  ' + c1);
  console.log('left (c2) =   ' + c2);
  console.log('up (c3) =     ' + c3);
  console.log('bottom (c4) = ' + c4);
  console.log('min =         ' + min);

  if (min == 0) {
    console.log('Цикл закончен')
  } else {
    timer = setTimeout(goSearch, 50);
  }
  drawField();
  console.log('<=============================>');

}

document.onkeypress = function (event) {
  if (event.keyCode == 13) {
    console.log('Hello World!');
    goSearch();
  }
}
