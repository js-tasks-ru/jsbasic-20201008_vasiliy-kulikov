/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

export default function promiseClick(button) {
  /*button.addEventListener("click", (evt) => {
    return new Promise(function(resolve) {
      resolve(evt);
    });
  },
  { once: true })*/
  return new Promise(function (resolve) { 
    button.addEventListener('click', evt => resolve(evt), { once: true });
  })
}
