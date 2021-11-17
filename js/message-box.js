
function createMessageBox() {
  const formSuccessMessageTemplate = document.querySelector('#success').content;
  const formFailureMessageTemplate = document.querySelector('#error').content;
  const formSuccessMessageFragment = formSuccessMessageTemplate.querySelector('.success');
  const formFailureMessageFragment = formFailureMessageTemplate.querySelector('.error');
  const formSuccessMessage = formSuccessMessageFragment.cloneNode(true);
  const formFailureMessage = formFailureMessageFragment.cloneNode(true);
  const loadFailureMessage = createLoadFailureMessage();

  document.body.appendChild(formSuccessMessage);
  document.body.appendChild(formFailureMessage);
  document.body.appendChild(loadFailureMessage);
  document.addEventListener('keydown', onEscapeClick);
  formSuccessMessage.addEventListener('click', hideMessages);
  formFailureMessage.addEventListener('click', hideMessages);

  hideMessages();

  function onEscapeClick(evt) {
    if (evt.key === 'Escape') {
      hideMessages();
    }
  }

  function createLoadFailureMessage() {
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = 100;
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '115px';
    alertContainer.style.top = '20px';
    alertContainer.style.right = '115px';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '28px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
    alertContainer.style.fontFamily = 'Roboto', 'Arial', 'sans-serif';
    alertContainer.style.cursor = 'pointer';

    alertContainer.textContent = 'Не удалось загрузить данные. Попробуйте перезагрузить страницу';

    alertContainer.addEventListener('click', () => {
      location.reload();
      return false;
    }, { once: true });

    return alertContainer
  };

  function showFormSuccessMessage() {
    formSuccessMessage.classList.remove('visually-hidden');
  }

  function showFormFailureMessage() {
    formFailureMessage.classList.remove('visually-hidden');
  }

  function showLoadFailureMessage() {
    loadFailureMessage.classList.remove('visually-hidden');
  }

  function hideMessages() {
    formSuccessMessage.classList.add('visually-hidden');
    formFailureMessage.classList.add('visually-hidden');
    loadFailureMessage.classList.add('visually-hidden');
  }

  return {
    showFormSuccessMessage: showFormSuccessMessage,
    showFormFailureMessage: showFormFailureMessage,
    showLoadFailureMessage: showLoadFailureMessage,
    hideMessages: hideMessages,
  };
}

export { createMessageBox };
