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
      }
    }
  }
}

function goSearch() {
  var c1;
  var c2;
  var c3;
  var c4
  outer: for (var i = 1; i < width / 10; i++) {
    for (var j = 1; j < height / 10; j++) {

      if (mas[i][j] == 2) {
        var x2 = xxx2;
        var y2 = yyy2;
      }

      if (mas[i][j] == 3) {
        var x3 = xxx3;
        var y3 = yyy3;
        ii = i;
        jj = j;
      }
      var a = x2 - x3;
      var b = y2 - y3;
      var c = Math.sqrt(a * a + b * b);

      var xx = xxx2 - 1;
      var yy = yyy2;
      var aa = xx - x3;
      var bb = yy - y3;
      c1 = Math.sqrt(aa * aa + bb * bb);
      // console.log(mas[i-1][j]+' =rigth');

      var xx1 = xxx2 + 1;
      var yy1 = yyy2;
      var aa1 = xx1 - x3;
      var bb1 = yy1 - y3;
      c2 = Math.sqrt(aa1 * aa1 + bb1 * bb1);
      // console.log(mas[i+1][j]+' =left');

      var xx2 = xxx2;
      var yy2 = yyy2 + 1;
      var aa2 = xx2 - x3;
      var bb2 = yy2 - y3;
      c3 = Math.sqrt(aa2 * aa2 + bb2 * bb2);
      // console.log(mas[i][j+1]+' =up');

      var xx3 = xxx2;
      var yy3 = yyy2 - 1;
      var aa3 = xx3 - x3;
      var bb3 = yy3 - y3;
      c4 = Math.sqrt(aa3 * aa3 + bb3 * bb3);
      // console.log(mas[i][j-1]+' =bottom');

    }
  }
  if (mas[ii][jj+1] ==4 || mas[ii][jj+1] ==1 ) { // rigth
    c1 = 100;
    // console.log(mas[i-1][j]+' =rigth1');
  }
  if (mas[ii][jj-1] ==4 || mas[ii][jj-1] ==1 ) { //left
    c2 = 100;
    // console.log(mas[i+1][j]+' =left1');
  }
  if (mas[ii-1][jj] ==4 || mas[ii-1][jj] ==1 ) { // up
    c3 = 100;
    // console.log(mas[i][j+1]+' =up1');
  }
  if (mas[ii+1][jj] ==4 || mas[ii+1][jj] ==1 ) { // bottom
    c4 = 100;
    // console.log(mas[i][j-1]+' =bottom1');
  }
  // var min;
  // for(var minA = 0; minA <= 4;minA++){
  //   if(('c'+minA) != undefined){
  //     if(min<='c'+minA){
  //       min = 'c'+minA;
  //       console.log('c'+minA,min);
  //     }
  //   }
  // }
  if(c1 == c3||c2==c4 )
  var min = Math.min(c, c1, c2, c3, c4);
   console.log(c1, c2, c3, c4);

   console.log(min +'= min1');

  if (min == c1 ) {
    mas[ii][jj + 1] = 3;
    xxx3++;
    console.log('c1');
  } else if (min == c2  ) {
    mas[ii][jj - 1] = 3;
    xxx3--;
    console.log('c2');

  } else if (min == c3 ) {
    mas[ii - 1][jj] = 3;

    console.log('c3');
    yyy3--;
  } else if (min == c4 ) {
    mas[ii + 1][jj] = 3;
    console.log('c4');
    yyy3++;
  }
  mas[ii][jj] = 1;

  console.log(c1 + '= c1 (rigth)');
  console.log(c2 + '= c2 (left)');
  console.log(c3 + '= c3 (up)');
  console.log(c4 + '= c4 (bottom)');
  console.log(min +'= min');
  console.log(min +'= min');

  drawField();

  if (c !== c) {
    console.log('Цикл закончен')
  } else {
    timer = setTimeout(goSearch, 50);
  }
}

function fpm(i) {
  if (i == 0) return width;
  else return i;
}

function fpp(i) {
  if (i == width - 1) return -1;
  else return i;
}

document.onkeypress = function (event) {
  if (event.keyCode == 13) {
    console.log('Hello World!');
    goSearch();
  }
}
// document.onkeypress=function(event){
//   if(event.shiftKey){
//     for (var i = 0; i < width; i++) {
//       for (var j = 0; j < height; j++) {
//         if (mas[i-1][j] == 3){
//           console.log(mas, mas[i-1][j]);
//         }
//       }
//     }
//   }
// }
