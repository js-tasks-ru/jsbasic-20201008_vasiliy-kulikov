/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    let rowsArray = rows.map((item) => {
      let row = `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</button></td>
        </tr>
      `;
      return row;
    });

    let table = `
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${rowsArray.join('')}
          </tbody>
        </table>
    `;

    let block = document.createElement('div');
    block.classList.add('table');
    block.innerHTML = table;
    block.addEventListener('click', (evt) => { 
      if (evt.target.tagName === 'BUTTON') { 
        let trForDelete = evt.target.closest('tr');
        trForDelete.remove();
      }
    });
    
    this.elem = block;
  }

}
