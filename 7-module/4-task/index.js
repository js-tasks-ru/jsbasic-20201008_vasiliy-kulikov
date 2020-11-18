export default class StepSlider {
  constructor({ steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    
    this.render();
    this.init();
  }

  onPointerDown() { 
    document.addEventListener('pointermove', this.onPointerMove);
    this.thumb.addEventListener('pointerup', this.onPointerUp);
    this.elem.classList.add('slider_dragging');
  }

  onPointerUp = () => { 
    this.progressPercentage();

    document.removeEventListener('pointermove', this.onPointerMove); //не видно чтобы удалялся обработчик
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    this.customEvent();
  }

  onPointerMove = (evt) => { 
    this.valueCalc(evt);

    this.progress.style.width = this.left / this.sliderSize.width * 100 + '%';
    this.thumb.style.left = this.left / this.sliderSize.width * 100 + '%';
    
    if (parseInt(this.thumb.style.left) >= 100) { 
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

    if(this.blockStepsChildren[this.value]) {
      this.blockStepsChildren[this.value].classList.add('slider__step-active')
    };
  }

  click = (evt) => { 

    this.valueCalc(evt);
    this.progressPercentage();
    this.stepActive();
    this.customEvent();
  }

  render() { 
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    
    let stepsArray = [];
    const step = '<span></span>';
    
    for (let i = 0; i < this.steps; i++) { 
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
  }

  init() { 
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;

    this.thumbValue = this.elem.querySelector('.slider__value');
    this.thumbValue.textContent = this.value;

    this.blockSteps = this.elem.querySelector('.slider__steps');
    this.blockStepsChildren = this.blockSteps.children;
    this.stepActive();

    this.progress = this.elem.querySelector('.slider__progress');
    this.progressPercentage();

    this.thumb.addEventListener('pointerdown', () => this.onPointerDown());
    this.elem.addEventListener('click', this.click);
  }

  progressPercentage() { 
    this.progressPercent = this.value / (this.steps - 1) * 100;
    this.progress.style.width =  this.progressPercent + '%';
    this.thumb.style.left = this.progressPercent + '%';

  }

  customEvent() { 
    let customEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(customEvent);
  }

  valueCalc(evt) {
    this.sliderSize = this.elem.getBoundingClientRect();
    this.segmentWidth = this.sliderSize.width / (this.steps - 1);
    this.left = evt.clientX - this.sliderSize.x;

    this.value = Math.round(this.left / this.segmentWidth);
    this.thumbValue.textContent = this.value;
  }
}
