window.addEventListener("DOMContentLoaded", () => {
  const inputsColor = document.querySelectorAll('input[name=product_color]');
  const formColorLabel = document.getElementById('productColorValue');
  inputsColor.forEach((input) => {
    input.addEventListener('change', (e) => {
      formColorLabel.innerText = e.target.dataset.nameDisplay;
    });
  });

  const inputsQuantity = document.querySelectorAll('.input-quantity');
  inputsQuantity.forEach((input) => {
    const inputField = input.querySelector('.input-quantity__field');
    const inputBtnIncrease = input.querySelector('.input-quantity__btn[data-action=increase]');
    const inputBtnDecrease = input.querySelector('.input-quantity__btn[data-action=decrease]');

    const changeValue = (newValue) => {
      if (newValue >= 1) {
        inputField.value = newValue;
        inputField.setAttribute("aria-valuenow", `${newValue}`);
      }

      if (newValue > 1) {
        inputBtnDecrease.removeAttribute("disabled");
      } else {
        inputBtnDecrease.setAttribute("disabled", 'true');
      }

      if (newValue < 1) {
        inputField.setAttribute("aria-invalid", 'true' );
      } else {
        inputField.removeAttribute("aria-invalid");
      }
    }

    inputBtnIncrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      changeValue(initialValue + 1);
    });
    inputBtnDecrease.addEventListener('click', () => {
      const initialValue = inputField.value * 1;
      changeValue(initialValue - 1);
    });

    inputField.addEventListener('input', () => changeValue(inputField.value));

    const handleKey= (e)=> {
      let v = +inputField.value || 0;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        changeValue(v + (e.key === 'ArrowUp' ? 1 : -1));
      }
    }

    inputField.addEventListener('keydown', (e) => handleKey(e));
  });

  const accordions = document.querySelectorAll('.accordion__item');
  accordions.forEach((accordion) => {
    const accordionTitle = accordion.querySelector('.accordion__item-title');
    accordionTitle.addEventListener('click', () => {
      accordion.classList.toggle('accordion__item_active');
      const title = accordion.querySelector('.accordion__item-title');
      if (accordion.classList.contains('accordion__item_active')) {
        title.setAttribute('aria-expanded', 'true');
      } else {
        title.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const modalTarget = document.querySelectorAll('.modal-target');
  modalTarget.forEach((_modalTarget) => {
      _modalTarget.addEventListener('click', () => {
          const modalWindow = document.querySelector('.modal');
          showModal(modalWindow);
      });
  });

  const modalBackdrop = document.querySelectorAll('.modal-backdrop');
  modalBackdrop.forEach((modalBackdrop)=> {
    modalBackdrop.addEventListener('click', (e) => {

      const modalWindow = e.target.closest('.modal');
      hideModal(modalWindow);
    });
  });

  const showModal = (modalWindow) => {
    modalWindow.classList.add('show-modal');

    const header = modalWindow.querySelector('.heading-2');
    header.focus();

    modalWindow.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        hideModal(modalWindow);
      }
  });

    const mainContent = document.querySelector('.main-grid');
    mainContent.setAttribute('inert','true');
  }

  const hideModal = (modalWindow) => {
    modalWindow.classList.remove('show-modal');

    const mainContent = document.querySelector('.main-grid');
    mainContent.removeAttribute('inert');

    modalTarget[0].focus();
  }
})