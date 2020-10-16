/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let result = '';
  for (let user of users) { 
    if (user.age <= age) { 
      result += `${user.name}, ${user.balance}\n`;
    }
  }
  result = result.slice(0, -1);
  return result;
}
