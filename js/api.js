function createApi() {
  const getUrl = 'https://24.javascript.pages.academy/keksobooking/data';
  const sendUrl = 'https://24.javascript.pages.academy/keksobooking';
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
    fetch(getUrl)
      .then((response) => onDataReceived(response))
      .catch(() => dataReceivingErrorListener());
  }

  function sendData(data) {
    fetch(sendUrl, {
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

  return {
    getData: getData,
    sendData: sendData,
    setDataReceivedListener: setDataReceivedListener,
    setDataSentListener: setDataSentListener,
    setDataSendingErrorListener: setDataSendingErrorListener,
    setDataReceivingErrorListener: setDataReceivingErrorListener,
  };
}

export { createApi };
