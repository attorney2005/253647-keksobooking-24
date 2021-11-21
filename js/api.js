const GET_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://24.javascript.pages.academy/keksobooking';
let dataReceivedListener = () => null;
let dataSentListener = () => null;
let dataSendingErrorListener = () => null;
let dataReceivingErrorListener = () => null;

function onDataReceived(res) {
  if (res.ok) {
    res.json().then((data) => dataReceivedListener(data));
  } else {
    dataReceivingErrorListener();
  }
}

function onDataSent(res) {
  if (res.ok) {
    dataSentListener();
  } else {
    dataSendingErrorListener();
  }
}

function getData() {
  fetch(GET_URL)
    .then((response) => onDataReceived(response))
    .catch(() => dataReceivingErrorListener());
}

function sendData(data) {
  fetch(SEND_URL, {
    method: 'POST',
    body: data,
  })
    .then((response) => onDataSent(response))
    .catch(() => dataSendingErrorListener());
}

function setDataReceivedListener(callback) {
  dataReceivedListener = callback;
}
function setDataSentListener(callback) {
  dataSentListener = callback;
}
function setDataSendingErrorListener(callback) {
  dataSendingErrorListener = callback;
}
function setDataReceivingErrorListener(callback) {
  dataReceivingErrorListener = callback;
}

const api = {
  getData,
  sendData,
  setDataReceivedListener,
  setDataSentListener,
  setDataSendingErrorListener,
  setDataReceivingErrorListener,
};

export { api };
