var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mas = [];
var width = 500;
var height = 500;

$(canvas).click(function (e) {
  var x = event.offsetX;
  var y = event.offsetY;
  x = Math.floor(x / 25);
  y = Math.floor(y / 25);
  if (e.ctrlKey) {
    mas[x,y] = 2;
  } else if (e.shiftKey) {
    mas[x,y] = 3;
  } else {
    mas[x,y] = 1;
  }
  fillRect(x, y);
});

function fillRect(x, y) {
  if (mas[x,y] == 1) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x * 25, y * 25, 25, 25);
  }
  if (mas[x,y] == 2) {
    ctx.fillStyle = 'lime';
    ctx.fillRect(x * 25, y * 25, 25, 25);
  }
  if (mas[x,y] == 3) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x * 25, y * 25, 25, 25);
  }
}

function goSearch() {
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      if(mas[i, j] == 1){
        ctx.fillStyle = 'lime';
        ctx.fillRect(i * 25, j * 25, 20, 20);
      }
    }
  }
}

function begin() {
  console.log('Hello World!');
}

$('body').keypress(function (e) {
  if (e.which == 13) {
    goSearch();
    console.log('Hello World!');
  }
});

// function getelem() {
//   for (var i = 0; i < width; i++) {
//     for (var j = 0; j < height; j++) {
//        ctx.fillStyle = 'black';
//        ctx.fillRect(i * 25, j * 25, 25, 25);
//     }
//   }
// }
