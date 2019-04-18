var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas = [];
var mas2 = [];
var count = 0;
var timer;
var width = 300;
var height = 300;
var fps = document.getElementById('range');
var xxx2 = 0;
var yyy2 = 0;
var xxx3 = 0;
var yyy3 = 0;

canvas.onclick = function (event) {
  var x = event.offsetX;
  var y = event.offsetY;
  console.log(x);
  console.log(y);
  x = Math.floor(x / 10);
  y = Math.floor(y / 10);
  xxx = x;
  yyy = y;
  if (event.ctrlKey) {
    mas[y][x] = 2;
    xxx2 = x;
    yyy2 = y;
  } else if (event.shiftKey) {
    mas[y][x] = 3;
    xxx3 = x;
    yyy3 = y;
  } else {
    mas[y][x] = 1;
    xxx = x;
    yyy = y;
  }
  console.log(mas);
  drawField();
}

function goLife() {
  var n = width,
    m = height;
  for (var i = 0; i < n; i++) {
    mas[i] = [];
    for (var j = 0; j < m; j++) {
      mas[i][j] = 0;
    }
  }
}
goLife();

function drawField() {
  for (var i = 0; i < width / 10; i++) {
    for (var j = 0; j < height / 10; j++) {
      if (mas[i][j] == 1) {
        ctx.fillStyle = 'lime';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 2) {
        ctx.fillStyle = 'hsl(0, 0%, 15%)';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 3) {
        ctx.fillStyle = 'rgb(255, 128, 0)';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 4) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      }
    }
  }
}

function startLife() {
  var mas2 = [];
  outer: for (var i = 0; i < width / 10; i++) {
    mas2[i] = [];
    for (var j = 0; j < height / 10; j++) {
      if (mas[i][j] == 2) {
        var x2 = xxx2;
        var y2 = yyy2;
        console.log(x2, y2);
      }
      if (mas[i][j] == 3) {
        var x3 = xxx3;
        var y3 = yyy3;
        console.log(x3, y3);
      }
      var a = x2 - x3;
      var b = y2 - y3;
      var c = Math.sqrt(a * a + b * b);
      if (mas[fpm(i) - 1][j] == 0) { // rigth
        var xx = xxx2 - 1;
        var yy = yyy2;
        var aa = xx - x3;
        var bb = yy - y3;
        var c1 = Math.sqrt(aa * aa + bb * bb);
      }
      if (mas[fpp(i) + 1][j] == 0) { //left
        var xx1 = xxx2 + 1;
        var yy1 = yyy2;
        var aa1 = xx1 - x3;
        var bb1 = yy1 - y3;
        var c2 = Math.sqrt(aa1 * aa1 + bb1 * bb1);
      }
      if (mas[i][fpp(j) + 1] == 0) { // up
        var xx2 = xxx2;
        var yy2 = yyy2 + 1;
        var aa2 = xx2 - x3;
        var bb2 = yy2 - y3;
        var c3 = Math.sqrt(aa2 * aa2 + bb2 * bb2);
      }
      if (mas[i][fpm(j) - 1] == 0) { // bottom
        var xx3 = xxx2;
        var yy3 = yyy2 - 1;
        var aa3 = xx3 - x3;
        var bb3 = yy3 - y3;
        var c4 = Math.sqrt(aa3 * aa3 + bb3 * bb3);
      }
      var min = Math.min(c, c1, c2, c3, c4);
      // if(mas[i][j] == 3) mas[i][j] = mas2[i][j];
      if (mas[i][j] == 3) {
        for (var i1 = i; i1 < width ; i1++) {
            mas[i1] = 4;
        }
      }
      if (min == c1) {

        mas[i][j + 1] = 4;
        // console.log(mas);
        console.log(i, j);
        console.log('c1');
        break outer;
      } else if (min == c2) {

        mas[i][j - 1] = 4;
        console.log('c2');
        break outer;
      } else if (min == c3) {

        console.log('c3');
        mas[i - 1][j] = 4;
        break outer;
      } else if (min == c4) {

        console.log('c4');
        mas[i + 1][j] = 4;
        break outer;
      } else if (min == c) {
        console.log('End.');
        break outer;

      }
    }
  }
  // mas = mas2;
  console.log(mas + '= mas2');
  console.log(c1 + '= c1 (rigth)');
  console.log(c2 + '= c2 (left)');
  console.log(c3 + '= c3 (up)');
  console.log(c4 + '= c4 (Bottom)');
  console.log(min);
  if (min == c3) console.log(' min is c3');
  if (min == c4) console.log(' min is c4');
  drawField();
  // timer = setTimeout(startLife, 100);
}

function fpm(i) {
  if (i == 0) return width;
  else return i;
}

function fpp(i) {
  if (i == width - 1) return -1;
  else return i;
}
document.getElementById('start').onclick = startLife;

// function reset() {
//   count++;
//   p.innerHTML = fps.value - 1;
// }
// function stopLife() {
//   clearTimeout(timer);
// }
// function stroke() {
//   for (var x = 0.5; x <= width; x += 10) {
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, width);
//   }
//   for (var y = 0.5; y <= width; y += 10) {
//     ctx.moveTo(0, y);
//     ctx.lineTo(width, y);
//   }
//   ctx.strokeStyle = 'black';
//   ctx.stroke();
// }
// document.getElementById('count').innerHTML = count;
// var speed = range.value;
// var fps = document.getElementById('range');
// console.log(fps);
// var p = document.getElementById('p');
//
// function resetLife() {
//   ctx.clearRect(0, 0, width, height);
//   var n = width;
//   var m = height;
//   for (var i = 0; i < n; i++) {
//     for (var j = 0; j < m; j++) {
//       mas[i][j] = 0;
//     }
//   }
//   count = 0;
//   document.getElementById('count').innerHTML = count;
//   stopLife();
//   console.log('Reset');
// }
//
// function randLife() {
//   resetLife();
//
//   for (var i = 0; i < width; i++) {
//     for (var j = 0; j < height; j++) {
//       var randInt = Math.floor(Math.random() * 2) + 0;
//       mas[i][j] = randInt;
//       if (mas[i][j] == 1) {
//         ctx.fillStyle = 'lime';
//         ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
//       }
//     }
//   }
//   stroke();
// }

// document.getElementById('stop').onclick = stopLife;
// document.getElementById('res').onclick = resetLife;
// document.getElementById('rand').onclick = randLife;
