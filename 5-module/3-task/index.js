function initCarousel() {
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const slidesContainer = document.querySelector('.carousel__inner');
  const slideImgWidth = document.querySelector('.carousel__img').offsetWidth;
  const slides = document.querySelectorAll('.carousel__slide');
  const slidesQuantity = slides.length;
  let position = 0;

  carouselArrowLeft.addEventListener('click', () => {  

    position -= slideImgWidth;
    slidesContainer.style.transform = `translateX(${position}px)`;

    if (-position === (slidesQuantity - 1) * slideImgWidth) {
      carouselArrowLeft.style.display = 'none';
    } else { 
      carouselArrowRight.style.display = '';
    }
  })

  carouselArrowRight.addEventListener('click', () => {  
    
    position += slideImgWidth;
    slidesContainer.style.transform = `translateX(${position}px)`;

    if (position === 0) {
      carouselArrowRight.style.display = 'none';
    } else { 
      carouselArrowLeft.style.display = '';
    }
  })
}
