/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  const array = str.split('-');
  let result = [];
  result.push(array[0]);

  for (let i = 1; i < array.length; i++) { 
    let element = array[i];
    element = element[0].toUpperCase() + element.slice(1);
    result.push(element);
  }

  return result.join('');
}
