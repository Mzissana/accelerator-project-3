const initFormValidation = () => {
  const form = document.querySelector('.modal__form');

  form.setAttribute('novalidate', '');

  const inputs = form.querySelectorAll('.modal-form__input');
  const phoneInput = form.querySelector('input[name="phone"]');

  const maskPhone = (input) => {
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, '');
      if (value.startsWith('7')) {
        value = `+${value}`;
      } else if (!value.startsWith('+7')) {
        value = `+7${value}`;
      }

      input.value = value.replace(
        /^(\+7)(\d{3})(\d{3})(\d{2})(\d{2}).*/,
        '$1 ($2) $3-$4-$5'
      );
    });
  };

  if (phoneInput) {
    maskPhone(phoneInput);
  }
  const validateInput = (input) => {
    if (!input.checkValidity()) {
      input.classList.add('modal-form__input--error');
    } else {
      input.classList.remove('modal-form__input--error');
    }
  };

  form.addEventListener('input', (event) => {
    if (event.target.classList.contains('modal-form__input')) {
      validateInput(event.target);
    }
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    inputs.forEach((input) => {
      validateInput(input);
      if (!input.checkValidity()) {
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();
    }
  });
};

export default initFormValidation;
