import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
   
          </h3>
        </div>

        <div class="modal__body">

        </div>
      </div>
    `; 
    this.buttonClose = this.modal.querySelector('.modal__close');
    this.buttonClose.addEventListener('click', () => { this.close() });
    document.addEventListener('keydown', (evt) => {
      if (evt.code === "Escape") { 
        this.modal.remove();
        document.body.classList.remove('is-modal-open');
      }
     });
  }

  open() { 
    document.querySelector('.container').append(this.modal);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) { 
    this.modal.querySelector('.modal__title').innerHTML = title;
  }

  setBody(modalBody) {
    this.modal.querySelector('.modal__body').append(modalBody);
  }

  close() { 
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
  }
}
