import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();  

    this.buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.buttonRight = this.elem.querySelector('.ribbon__arrow_right');

    this.buttonLeft.addEventListener('click', () => this.clickLeft());
    this.buttonRight.addEventListener('click', () => this.clickRight());

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.ribbonInner.onscroll = this.scrollMenu; 

    this.links = this.elem.querySelectorAll('.ribbon__item');

    this.clickLink();
    
  }
  
  clickLeft() { 
    this.ribbonInner.scrollBy(-350, 0);
  }

  clickRight() { 
    this.ribbonInner.scrollBy(350, 0);  
  }

  filterCategory(link) { 
    let categoryId = link.dataset.id;

    let customEvent = new CustomEvent('ribbon-select', {
      detail: categoryId,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }

  clickLink() { 
      for (let link of this.links) { 
        link.addEventListener('click', (evt) => { 
          evt.preventDefault();

          for (let item of this.links) { 
            item.classList.remove('ribbon__item_active');
          }

          link.classList.add('ribbon__item_active');

          this.filterCategory(link);
        })
      }    
  }

  scrollMenu = () => { 
    let ribbonClientWidth = this.ribbonInner.clientWidth;
    let ribbonScrollLeft = this.ribbonInner.scrollLeft;
    let ribbonScrollWidth = this.ribbonInner.scrollWidth;

    let ribbonScrollRight = ribbonScrollWidth - ribbonScrollLeft - ribbonClientWidth;

    if (ribbonScrollLeft > 0) {
      this.buttonLeft.classList.add('ribbon__arrow_visible');
    }

    if (ribbonScrollLeft === 0) { 
      this.buttonLeft.classList.remove('ribbon__arrow_visible');
    }

    if (ribbonScrollRight > 0) { 
      this.buttonRight.classList.add('ribbon__arrow_visible');
    }

    if (ribbonScrollRight === 0) { 
      this.buttonRight.classList.remove('ribbon__arrow_visible');
    }
  }

  render() { 
    let linksHtml = this.categories.map((item) => {
      if (item.name === 'All') { 
        return `<a href="#" class="ribbon__item ribbon__item_active" data-id="${item.id}">${item.name}</a>`;
      }
      return `
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `
    });

    let menuHtml = `
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${linksHtml.join('')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    `;

    let menu = document.createElement('div');
    menu.classList.add('ribbon');
    menu.innerHTML = menuHtml;

    this.elem = menu;
  }
}
