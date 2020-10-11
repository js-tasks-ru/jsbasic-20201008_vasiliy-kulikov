/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  if (str.toLowerCase().includes('1xbet')) return true;
  if (str.toLowerCase().includes('xxx')) return true;
  return false;
}
