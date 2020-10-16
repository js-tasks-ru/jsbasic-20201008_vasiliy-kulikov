/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  let objEmpty = true;
  for (let key in obj) { 
    objEmpty = false;
    break;
  }
  return objEmpty;
}
