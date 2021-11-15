function createApi() {
  const getUrl = 'https://24.javascript.pages.academy/keksobooking/data';
  const sendUrl = 'https://24.javascript.pages.academy/keksobooking';
  let dataReceivedListener = () => null;
  let dataSentListener = () => null;
  let networkErrorListener = () => null;
  let requestErrorListener = () => null;

  // Private methods
  function onDataReceived(res) {
    if (res.ok) {
      res.json().then((data) => dataReceivedListener(data));
    } else {
      requestErrorListener(res.status);
    }
  }

  function onDataSent(res) {
    if (res.ok) {
      dataSentListener();
    } else {
      requestErrorListener(res.status);
    }
  }

  function onNetworkError(err) {
    networkErrorListener(err);
  }

  // Public methods
  function getData() {
    fetch(getUrl)
      .then((response) => onDataReceived(response))
      .catch((err) => onNetworkError(err));
  }

  function sendData(data) {
    fetch(sendUrl, {
      method: 'POST',
      body: data,
    })
      .then((response) => onDataSent(response))
      .catch((err) => onNetworkError(err));
  }

  function setDataReceivedListener(callback) {
    dataReceivedListener = callback;
  }
  function setDataSentListener(callback) {
    dataSentListener = callback;
  }
  function setNetworkErrorListener(callback) {
    networkErrorListener = callback;
  }
  function setRequestErrorListener(callback) {
    requestErrorListener = callback;
  }

  return {
    getData: getData,
    sendData: sendData,
    setDataReceivedListener: setDataReceivedListener,
    setDataSentListener: setDataSentListener,
    setNetworkErrorListener: setNetworkErrorListener,
    setRequestErrorListener: setRequestErrorListener,
  };
}

export { createApi };
