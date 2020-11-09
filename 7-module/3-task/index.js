export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.slider = document.createElement('div');
    this.slider.classList.add('slider');
    this.slider.innerHTML = `
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        <span></span>
        <span></span>
        <span class="slider__step-active"></span>
        <span></span>
        <span></span>
      </div>
    `;
  }
}
