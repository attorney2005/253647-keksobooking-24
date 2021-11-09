
const urlSendData = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess) => fetch(urlSendData)
  .then((response) => response.json())
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    console.log('ошибка');
  });

const sendData = (url, onSuccess, onFail, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  ).then((response) => response.ok ? onSuccess() : onFail(),
  )
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
