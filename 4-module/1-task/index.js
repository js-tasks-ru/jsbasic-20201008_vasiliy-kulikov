/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  friends.forEach( (friend) => { 
    let li = document.createElement('li');
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ul.append(li);
  })

  return ul;
}
