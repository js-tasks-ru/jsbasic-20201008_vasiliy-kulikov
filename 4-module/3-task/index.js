/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    let tbody = table.querySelector('tbody');
    for (let row of tbody.rows) {

        if (+row.cells[1].textContent < 18) row.style.textDecoration = 'line-through';

        (row.cells[2].textContent === 'm') ? row.classList.add('male') : row.classList.add('female');

        if (row.cells[3].dataset.available === "true") {
            row.classList.add('available');
        } else if (row.cells[3].dataset.available === "false") {
            row.classList.add('unavailable');
        } else { 
            row.hidden = true;
        }
    }
}
