import { createForm } from './form.js';
import { createMap } from './map.js';
import { createApi } from './api.js';
import { createMessageBox } from './message-box.js';
import { createFilters } from './filters.js';
import { createRepository } from './repository.js';

const form = createForm();
const api = createApi();
const messageBox = createMessageBox();
const map = createMap(() => {
  form.activate();
});
const filters = createFilters();
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
});
form.deactivate();

map.setAddressSetListener((lat, lng) => {
  form.setAddress(lat, lng);
});

api.setDataReceivedListener((data) => {
  repository.putData(data);
});
api.setDataSentListener(() => {
  messageBox.showSuccessMessage();
  form.clear();
});
api.setNetworkErrorListener(() => {
  messageBox.showErrorMessage();
});
api.setRequestErrorListener(() => {
  messageBox.showErrorMessage();
});

api.getData();
repository.applyFilters(filters.getFilters());


