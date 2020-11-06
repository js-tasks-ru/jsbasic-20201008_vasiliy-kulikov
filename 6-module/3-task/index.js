import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.slidesHtmlArray = slides.map((item) => {
      return `
        <div class="carousel__slide" data-id="penang-shrimp">
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

    const slidesBlock = document.createElement('div');
    slidesBlock.classList.add('carousel');
    slidesBlock.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
        ${this.slidesHtmlArray.join('')}
      </div>
    `;
    
    const carouselArrowLeft = slidesBlock.querySelector('.carousel__arrow_left');
    const carouselArrowRight = slidesBlock.querySelector('.carousel__arrow_right');
    const slidesContainer = slidesBlock.querySelector('.carousel__inner');
    const slideImgWidth = slidesContainer.offsetWidth; //Вот здесь пишет что ширина элемента 0
    const slidesArray = slidesBlock.querySelectorAll('.carousel__slide');
    const slidesQuantity = slidesArray.length;
    carouselArrowLeft.style.display = 'none';
    let position = 0;
  
    carouselArrowLeft.addEventListener('cslidesBlocklick', () => {
      position += slideImgWidth;
      slidesContainer.style.transform = `translateX(${position}px)`;
  
      if (position === 0) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowRight.style.display = '';
      }
    })
  
    carouselArrowRight.addEventListener('click', () => {
      position -= slideImgWidth;
      slidesContainer.style.transform = `translateX(${position}px)`;
  
      if (-position === (slidesQuantity - 1) * slideImgWidth) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
      }
    })
    
    this.elem = slidesBlock;
    
    
  }
}
