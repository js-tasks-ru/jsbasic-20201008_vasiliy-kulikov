import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
          <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${product.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
    `;

    const button = card.querySelector('.card__button');
    button.addEventListener('click', () => { 
      const customEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: product.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      button.dispatchEvent(customEvent);
    })

    card.addEventListener('product-add', () => {

    });

    this.elem = card;
  }
}
