const initModalFormValidation = () => {
  const form = document.querySelector('.modal__form');
  const phoneInput = form.querySelector('input[name="phone"]');
  const checkbox = form.querySelector('input[name="consent"]');

  const maskPhone = (input) => {
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, '');
      if (value.startsWith('7')) {
        value = `+${ value}`;
      } else if (!value.startsWith('+7')) {
        value = `+7${ value}`;
      }

      input.value = value.replace(
        /^(\+7)(\d{3})(\d{3})(\d{2})(\d{2}).*/,
        '$1 ($2) $3-$4-$5'
      );
    });
  };

  maskPhone(phoneInput);

  const handleValidation = () => {
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phoneInput.value)) {
      phoneInput.setCustomValidity('Введите номер в формате +7 (000) 000-00-00');
    } else {
      phoneInput.setCustomValidity('');
    }

    if (!checkbox.checked) {
      checkbox.setCustomValidity('Необходимо согласие на обработку данных');
    } else {
      checkbox.setCustomValidity('');
    }
  };

  form.addEventListener('input', handleValidation);
  form.addEventListener('submit', (event) => {
    handleValidation();
    if (!form.checkValidity()) {
      event.preventDefault();
    }
  });

};

export default initModalFormValidation;
