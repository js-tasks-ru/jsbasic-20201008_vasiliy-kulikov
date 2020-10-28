function toggleText() {
  let button = document.querySelector('.toggle-text-button'); 
  let text = document.querySelector('#text');
  button.addEventListener('click', () => { 
    ( text.hasAttribute('hidden') ) ? text.removeAttribute('hidden') : text.hidden = true;
  })
}
