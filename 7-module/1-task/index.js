import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    
    let links = categories.map((item) => {
      if (item.name === 'All') { 
        return `<a href="#" class="ribbon__item ribbon__item_active" data-id="${item.id}">${item.name}</a>`;
      }
      return `
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `
    });

    let menuHtml = `
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${links.join('')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    `;

    let menu = document.createElement('div');
    menu.classList.add('ribbon');
    menu.innerHTML = menuHtml;

    this.elem = menu;

    this.buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    this.buttonLeft.addEventListener('click', () => this.clickLeft());
    this.buttonRight.addEventListener('click', () => this.clickRight());
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    console.log(this.ribbonInner);
  }
  
  clickLeft() { 
    this.ribbonInner.scrollBy(-350, 0);
  }

  clickRight() { 
    this.ribbonInner.scrollBy(350, 0);
  }
}
