/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */

function getMinMax(str) {
  let array = str.split(' ');
  let arrayWithoutSymbols = [];
  let arrayWordsAndNumbers = [];
  let numbers = [];
  let result = {};
  
  for (let elem of array) { 
    elem = elem.split(',');
    arrayWithoutSymbols.push(...elem);
  }
  
  for (let elem of arrayWithoutSymbols) {
    if (elem !== '') arrayWordsAndNumbers.push(elem);
  }
  
  for (let elem of arrayWordsAndNumbers) {
    if (isFinite(elem)) numbers.push(+elem);
  }
  
  result.min = Math.min.apply(null, numbers);
  result.max = Math.max.apply(null, numbers);

  return result;
}

