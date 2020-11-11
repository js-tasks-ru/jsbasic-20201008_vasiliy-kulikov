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

    this.rangeStylization();

    this.elem.addEventListener('click', (evt) => { this.choose(evt)})
  }

  choose(evt) { 
    let elemCoords = this.elem.getBoundingClientRect();
    let segmentWidth = elemCoords.width / (this.steps - 1);
    this.value = Math.round((evt.clientX - elemCoords.x) / segmentWidth); 
    this.rangeStylization();
    let customEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(customEvent);
  }

  rangeStylization() { 
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderValue.textContent = this.value;

    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.sliderStepsChildren = this.sliderSteps.children;

    for (let child of this.sliderStepsChildren) { 
      child.className = '';
    }

    this.sliderStepsChildren[this.value].classList.add('slider__step-active');

    this.range = (this.value) / (this.steps - 1) * 100;
    
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderProgress.style.width = this.range + '%';

    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderThumb.style.left = this.range + '%';
  }
}
