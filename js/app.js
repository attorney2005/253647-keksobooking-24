import { createForm } from './form.js';
import { createMap } from './map.js';
import { createApi } from './api.js';
import { createMessageBox } from './message-box.js';
import { createFilterForm } from './filter-form.js';
import { createRepository } from './repository.js';

const DEFAULT_LOCATION = {
  lat: 35.68172,
  lng: 139.75392
}

function createApp() {
  const form = createForm(DEFAULT_LOCATION);
  const api = createApi();
  const messageBox = createMessageBox();
  const map = createMap(DEFAULT_LOCATION);
  const filters = createFilterForm();
  const repository = createRepository();

  repository.setChangeListener(() => {
    map.reset();
    map.showAnnouncements(repository.getData());
  });

  filters.setChangeListener(() => {
    repository.applyFilters(filters.getFilters());
  });

  form.addSubmitListener((formData) => {
    api.sendData(formData);
  });
  form.addResetListener(() => {
    map.reset();
    map.showAnnouncements(repository.getData());
  });

  map.setAddressSetListener((lat, lng) => {
    form.setAddress(lat, lng);
  });
  map.setLoadListener(() => {
    form.activate();
    api.getData();
  });

  api.setDataReceivedListener((data) => {
    repository.putData(data);
    filters.activate();
    repository.applyFilters(filters.getFilters());
  });
  api.setDataSentListener(() => {
    messageBox.showFormSuccessMessage();
    form.clear();
  });
  api.setDataSendingErrorListener(() => {
    messageBox.showFormFailureMessage();
  });
  api.setDataReceivingErrorListener(() => {
    messageBox.showLoadFailureMessage();
  });

  // Public methods
  function start() {
    form.deactivate();
    filters.deactivate();
  }

  return {
    start: start
  }
}

export { createApp };