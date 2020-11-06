import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    const slidesHtmlArray = slides.map((item) => {
      return `
        <div class="carousel__slide" data-id=${item.id}>
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `
    });
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
        ${slidesHtmlArray.join('')}
      </div>
    `;
    
    this.slidesContainer = this.elem.querySelector('.carousel__inner');
    this.slidesQuantity = this.slides.length;
    this.position = 0;

    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');

    this.arrowRight.addEventListener('click', () => { this.clickRight() });
    this.arrowLeft.addEventListener('click', () => { this.clickLeft() });


    let buttonOrders = this.elem.querySelectorAll('.carousel__button');
    for (let button of buttonOrders) { 
      button.addEventListener('click', () => { 
        this.order(button); // придумал только с передачей элемента в виде параметра
      });
    }
  }

  clickRight() {
    this.slideImgWidth = this.slidesContainer.offsetWidth;
    this.position -= this.slideImgWidth;
    this.slidesContainer.style.transform = `translateX(${this.position}px)`;

    if (-this.position === (this.slidesQuantity - 1) * this.slideImgWidth) {
      this.arrowRight.style.display = 'none';
    } else {
      this.arrowLeft.style.display = '';
    }
  }
  
  clickLeft() { 
    this.position += this.slideImgWidth;
    this.slidesContainer.style.transform = `translateX(${this.position}px)`;

    if (this.position === 0) {
      this.arrowLeft.style.display = 'none';
    } else {
      this.arrowRight.style.display = '';
    }
  }

  order(button) { // возможно по-правильному это должно быть реализовано иначе, но не придумал как

    let slideId = button.closest('.carousel__slide').dataset.id;

    let customEvent = new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }
}
