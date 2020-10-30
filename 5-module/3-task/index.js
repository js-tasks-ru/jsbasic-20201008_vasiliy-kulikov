function initCarousel() {
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const slidesContainer = document.querySelector('.carousel__inner');
  const slideImgWidth = slidesContainer.offsetWidth;
  const slides = document.querySelectorAll('.carousel__slide');
  const slidesQuantity = slides.length;
  carouselArrowLeft.style.display = 'none';
  let position = 0;

  carouselArrowLeft.addEventListener('click', () => {  
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
}
