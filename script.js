// Работает криво, но работает!
var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas = []; // Осн. массив, в котором будет создаваться вся движуха
var timer; // Тайер для перемены скорости работы.
var width = 300; // ширина
var height = 300; //высота
var xxx2 = 0; // Высота расположения для точки финиша
var yyy2 = 0; // Расстояние от лева для точки финиша
var xxx3 = 0; // Высота расположения для точки начала
var yyy3 = 0; // Расстояние от лева для точки начала
var ii; // Высота расположения для будущей главной точки
var jj; // Растояние

function goLife() {
  for (var i = 0; i < width; i++) {
    mas[i] = [];
    for (var j = 0; j < height; j++) {
      mas[i][j] = 0; // Нужно для заполнения массива нулями
    }
  }
}
goLife();

canvas.onclick = function (event) {
  var x = event.offsetX; // Получаем координату клика
  var y = event.offsetY;
  x = Math.floor(x / 10); // делю на 10, тк одна клетка - 10px
  y = Math.floor(y / 10);
  console.log(x); // вывод, ради интереса
  console.log(y);
  if (event.ctrlKey) {
    mas[y][x] = 2; // нажатие на ctrl задает финишную точку
    xxx2 = x; // Вовожу в глобальную переменную ее координаты
    yyy2 = y;
  } else if (event.shiftKey) {
    mas[y][x] = 3; // Нажатие на shift задает начальную точку
    xxx3 = x; // Вовожу в глобальную переменную ее координаты
    yyy3 = y;
  } else {
    mas[y][x] = 4; // В противном случае просто ставится препятствие
  }
  if (event.altKey) {
    mas[y][x] = 5; // нажатие на альт - стерка
  }
  drawField(); // Функция отрисовки всей этой хни
}

function drawField() {
  // Собственно, вот она.
  for (var i = 0; i < width / 10; i++) {
    for (var j = 0; j < height / 10; j++) {
      if (mas[i][j] == 1) {
        ctx.fillStyle = 'lime'; // Путь клетки
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 2) {
        ctx.fillStyle = 'black'; // Финиш
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 3) {
        ctx.fillStyle = 'orange'; // "Голова"
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 4) {
        ctx.fillStyle = 'red'; // Препятствие
        ctx.fillRect(j * 10, i * 10, 9.9, 9.9);
      } else if (mas[i][j] == 5) {
        mas[i][j] = 0; // Стерка
        ctx.clearRect(j * 10, i * 10, 9.9, 9.9);
      }
    }
  }
}

//Алгаритм поиска пути
function goSearch() {
  // Цикл, находящий точку "голову"
  for (var i = 1; i < width / 10; i++) {
    for (var j = 1; j < height / 10; j++) {
      if (mas[i][j] == 3) {
        mas[i][j] = 1; //Задает на ее месте след
        ii = i; // выводит ее координаты в глобальную переменную
        jj = j;
      }
    }
  }

  // Поиск расстояния от самой точки до финиша
  var a = xxx2 - xxx3; // по иксу будет расстояние конечной точки отнять расстояние для этой точки
  var b = yyy2 - yyy3; // по игрику та же история
  var c = Math.sqrt(a * a + b * b); // теорема Пифагора в действии

  // Поиск расстояния от точки правее (для этого я отнял еденицу от позиции по иксу) до финиша
  var aa = xxx2 - xxx3 - 1;
  var bb = yyy2 - yyy3;
  var c1 = Math.sqrt(aa * aa + bb * bb);

  // Поиск расстояния от точки левее (для этого я прибавил еденицу к позиции по иксу) до финиша
  var aa1 = xxx2 - xxx3 + 1;
  var bb1 = yyy2 - yyy3;
  var c2 = Math.sqrt(aa1 * aa1 + bb1 * bb1);

  // Поиск расстояния от точки ниже (для этого я прибавил еденицу к позиции по игрику) до финиша
  var aa2 = xxx2 - xxx3;
  var bb2 = yyy2 - yyy3 + 1;
  var c3 = Math.sqrt(aa2 * aa2 + bb2 * bb2);

  // Поиск расстояния от точки выше (для этого я отнял еденицу от позиции по игрику) до финиша
  var aa3 = xxx2 - xxx3;
  var bb3 = yyy2 - yyy3 - 1;
  var c4 = Math.sqrt(aa3 * aa3 + bb3 * bb3);

  //Проверка каждой клетки на случай, если она находится на препятствие или на пройденом пути
  if (mas[ii][jj + 1] == 4 || mas[ii][jj + 1] == 1 || mas[ii][jj + 1] !== mas[ii][jj + 1]) { // правая
    //Приравниваю ей 100-ку, чтоб она не стала минимальной, что делает ее выбор запрещенным
    c1 = 100;
  }
  if (mas[ii][jj - 1] == 4 || mas[ii][jj - 1] == 1 || mas[ii][jj - 1] !== mas[ii][jj - 1]) { // левая
    c2 = 100;
  }
  if (mas[ii - 1][jj] == 4 || mas[ii - 1][jj] == 1 || mas[ii - 1][jj] !== mas[ii - 1][jj]) { // верхняя
    c3 = 100;
  }
  if (mas[ii + 1][jj] == 4 || mas[ii + 1][jj] == 1 || mas[ii + 1][jj] !== mas[ii + 1][jj]) { // нижняя
    c4 = 100;
  }

  //Это нужно если точки равны между собой (Правая и левая), а одна из двух других - препятствие,
  //то он рандомом выберет одну из них, тем,что отнимет от ее дальности еденицу, что застваит алгаритм по нахождению минимальной ее выбрать.
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
  // Здесь то же самое, только с точками выше и ниже
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

  // Выберает самый короткий путь (самую ближайшую точку)
  var min = Math.min(c1, c2, c3, c4);

  // Если кратчайший путь соответствует такой-то точке, то присваевает этой точке 3-ку (Голова)
  if (min == c1) {
    mas[ii][jj + 1] = 3;
    xxx3++; //Тк точка правая, то еще и нужно прибавить к начальной позиции еденицу, чтоб отсчет шел оттуда.
    console.log('rigth (c1)');
    // То же самое с остальными точками
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

  // Вывод всех путей и минимального
  console.log('rigth (c1) =  ' + c1);
  console.log('left (c2) =   ' + c2);
  console.log('up (c3) =     ' + c3);
  console.log('bottom (c4) = ' + c4);
  console.log('min =         ' + min);

  // Оставновка цикла, если минимальное равно нулю
  if (min == 0) {
    console.log('Цикл закончен')
  } else {
    // В противном случае запускает заново алгоритм, с интервалом в 50 миллисек
    timer = setTimeout(goSearch, 50);
  }
  drawField(); // отрисовка этого дерьма
  console.log('<=============================>'); // разделитель для консоли, чтоб было смотрибельно

}

//Если нажать Enter, то запустится алгаритм
document.onkeypress = function (event) {
  if (event.keyCode == 13) {
    console.log('Hello World!');
    goSearch();
  }
}
