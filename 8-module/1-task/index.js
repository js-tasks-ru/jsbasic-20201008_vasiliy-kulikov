import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    this.container = document.body.querySelector('.container');
    if (!this.container) {
      return;
    };
    this.containerSize = this.container.getBoundingClientRect();

    if (this.elem.offsetWidth === 0 || this.elem.offsetHeight === 0) return; 

    if (window.innerWidth <= 767) return;

    if (window.pageYOffset >= parseInt(getComputedStyle(this.elem).top)) this.positionFixed();
    
    if (window.pageYOffset <= this.elem.getBoundingClientRect().top) this.positionAbsolute();
  }

  positionFixed() { 
    this.elem.style.position = 'fixed';
    this.elem.style.zIndex = 1000;
    this.elem.style.left = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + "px";
  }

  positionAbsolute() { 
    this.elem.style = '';
  }
}
