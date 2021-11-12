const body = document.querySelector('body');
const contentPopupSuccess = document.querySelector('#success').content;
const messageSuccesTemplate = contentPopupSuccess.querySelector('.success');
const contentPopupError = document.querySelector('#error').content;
const messageErrorTemplate = contentPopupError.querySelector('.error');
const success = messageSuccesTemplate.cloneNode(true);
const error = messageErrorTemplate.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

const createPopupMessage = (messageType) => {
  body.appendChild(messageType);
  messageType.addEventlistener('click', () => {
    messageType.remove();
  }, { once: true });
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    if (success) {
      success.remove();
    }
    if (error) {
      error.remove();
    }
  }
});

const createDownLoadMessage  = () => {
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

  alertContainer.textContent = 'Не удалось загрузить данные. Попробуйте перезагрузить страницу';

  document.body.append(alertContainer);

  alertContainer.addEventListener('click', () => {
    location.reload();
    return false;
  }, { once: true });
};

export { createPopupMessage, success, error, createDownLoadMessage };
