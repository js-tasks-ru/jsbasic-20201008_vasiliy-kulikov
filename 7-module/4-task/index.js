export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.steps = steps;
    this.value = value;
    let stepsArray = [];
    const step = '<span></span>';
    
    for (let i = 0; i < steps; i++) { 
      stepsArray.push(step);
    }

    this.elem.innerHTML = `
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${stepsArray.join('')}
      </div>
    `;

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;

    this.thumbValue = this.elem.querySelector('.slider__value');
    this.thumbValue.textContent = this.value;

    this.blockSteps = this.elem.querySelector('.slider__steps');
    this.blockStepsChildren = this.blockSteps.children;
    this.stepActive();

    this.progress = this.elem.querySelector('.slider__progress');
    this.progressPercent = (this.value) / (this.steps - 1) * 100;
    
    
    this.progress.style.width = this.progressPercent + '%';
    this.thumb.style.left = this.progressPercent + '%';

    this.thumb.addEventListener('pointerdown', () => this.onPointerDown());
    this.elem.addEventListener('click', this.click);
  }

  onPointerDown() { 
    document.addEventListener('pointermove', this.onPointerMove);
    this.thumb.addEventListener('pointerup', this.onPointerUp);
    this.elem.classList.add('slider_dragging');
  }

  onPointerUp = () => { 
    this.progress.style.width = this.value / (this.steps - 1) * 100 + '%';
    this.thumb.style.left = this.value / (this.steps - 1) * 100 + '%';

    document.removeEventListener('pointermove', this.onPointerMove); //не видно чтобы удалялся обработчик
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    let customEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(customEvent);
  }

  onPointerMove = (evt) => { 
    let sliderSize = this.elem.getBoundingClientRect();
    let segmentWidth = sliderSize.width / (this.steps - 1);

    this.value = Math.round((evt.clientX - sliderSize.x) / segmentWidth);
    this.thumbValue.textContent = this.value;

    this.progress.style.width = (evt.clientX - sliderSize.x) / sliderSize.width * 100 + '%';
    this.thumb.style.left = `${(evt.clientX - sliderSize.x) / sliderSize.width * 100}%`;
    
    if (parseInt(this.thumb.style.left) >= sliderSize.width) { 
      this.thumb.style.left = "100%";
      this.progress.style.width = "100%";
      this.thumbValue.textContent = this.steps - 1;
      this.value = this.steps - 1;
    }

    if (parseInt(this.thumb.style.left) <= 0) { 
      this.thumb.style.left = "0%";
      this.progress.style.width = "0%";
      this.thumbValue.textContent = 0;
      this.value = 0;
    }

    this.stepActive();
  }

  stepActive() { 
    for (let child of this.blockStepsChildren) { 
      child.className = '';
    }

    this.blockStepsChildren[this.value].classList.add('slider__step-active');
  }

  click = (evt) => { 
    let elemCoords = this.elem.getBoundingClientRect();
    let segmentWidth = elemCoords.width / (this.steps - 1);
    this.value = Math.round((evt.clientX - elemCoords.x) / segmentWidth); 
    
    this.thumbValue.textContent = this.value;
    this.progressPercent = (this.value) / (this.steps - 1) * 100;
    
    
    this.progress.style.width = this.progressPercent + '%';
    this.thumb.style.left = this.progressPercent + '%';

    this.stepActive();

    let customEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(customEvent);
  }
}
