
function createMessageBox() {
  const successMessageTemplate = document.querySelector('#success').content;
  const errorMessageTemplate = document.querySelector('#error').content;
  const successMessageFragment = successMessageTemplate.querySelector('.success');
  const errorMessageFragment = errorMessageTemplate.querySelector('.error');
  const successMessage = successMessageFragment.cloneNode(true);
  const errorMessage = errorMessageFragment.cloneNode(true);

  document.body.appendChild(successMessage);
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', onEscapeClick);
  successMessage.addEventListener('click', hideMessages);
  errorMessage.addEventListener('click', hideMessages);

  hideMessages();

  // Private methods
  function onEscapeClick(evt) {
    if (evt.key === 'Escape') {
      hideMessages();
    }
  }

  // Public methods
  function showSuccessMessage() {
    successMessage.classList.remove('visually-hidden');
  }

  function showErrorMessage() {
    errorMessage.classList.remove('visually-hidden');
  }

  function hideMessages() {
    successMessage.classList.add('visually-hidden');
    errorMessage.classList.add('visually-hidden');
  }

  return {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
    hideMessages: hideMessages,
  };
}


// function createErrorMessage() {
//   const alertContainer = document.createElement('div');
//   alertContainer.style.zIndex = 100;
//   alertContainer.style.position = 'absolute';
//   alertContainer.style.left = '115px';
//   alertContainer.style.top = '20px';
//   alertContainer.style.right = '115px';
//   alertContainer.style.padding = '10px 3px';
//   alertContainer.style.fontSize = '28px';
//   alertContainer.style.textAlign = 'center';
//   alertContainer.style.backgroundColor = 'red';
//   alertContainer.style.fontFamily = 'Roboto', 'Arial', 'sans-serif';

//   alertContainer.textContent = 'Не удалось загрузить данные. Попробуйте перезагрузить страницу';

//   document.body.append(alertContainer);

//   // alertContainer.addEventListener('click', () => {
//   //   location.reload();
//   //   return false;
//   // }, { once: true });
// };

export { createMessageBox };
