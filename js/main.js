
// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomIntFromRange(min, max) {
  if (min < 0 || max <= min) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
alert(getRandomIntFromRange(1, 100));


function getFloatFromRange(min, max, range) {
  if (range < 0 || min >=max) {
    return false;
  }
  const randomNumber = (Math.random() * (max - min + 1) + min);
  return randomNumber.toFixed(range);
}
alert(getFloatFromRange(0, 100, 3));

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://schoolsw3.com/jsref/jsref_tofixed.php
