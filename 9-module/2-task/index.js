import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.carouselContainer = document.body.querySelector('[data-carousel-holder]');
    this.carouselContainer.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    this.ribbonMenuContainer = document.body.querySelector('[data-ribbon-holder]');
    this.ribbonMenuContainer.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.stepSliderContainer = document.body.querySelector('[data-slider-holder]');
    this.stepSliderContainer.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    this.cartIconContainer = document.body.querySelector('[data-cart-icon-holder]');
    this.cartIconContainer.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch('products.json');

    if (response.ok) {
      this.products = await response.json();
      this.productsGrid = new ProductsGrid(this.products);
      this.productsGridContainer = document.body.querySelector('[data-products-grid-holder]');
      this.productsGridContainer.innerHTML = "";
      this.productsGridContainer.append(this.productsGrid.elem);
    } else { 
      console.error('Ошибка загрузки товаров с сервера: ' + response.status);
    }

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.addEventListeners();
  }

  addEventListeners() { 
    document.body.addEventListener('product-add', (evt) => this.cart.addProduct(this.products.find(item => item.id === evt.detail)));
    document.body.querySelector('.slider').addEventListener('slider-change', (evt) => this.productsGrid.updateFilter({ maxSpiciness: evt.detail }));
    document.body.querySelector('.ribbon').addEventListener('ribbon-select', (evt) => this.productsGrid.updateFilter({category: evt.detail}));
    document.body.querySelector('#nuts-checkbox').addEventListener('change', () => this.productsGrid.updateFilter({
      noNuts: document.body.querySelector('#nuts-checkbox').checked // новое значение чекбокса
    }));
    document.body.querySelector('#vegeterian-checkbox').addEventListener('change', () => this.productsGrid.updateFilter({
      vegeterianOnly: document.body.querySelector('#vegeterian-checkbox').checked // новое значение чекбокса
    }));
  }
}
