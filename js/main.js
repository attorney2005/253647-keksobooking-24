import { debounce } from './utils/debounce.js';
import { api } from './api.js';
import { repository } from './repository.js';
import { formComponent } from './form.js';
import { mapComponent } from './map.js';
import { messagesComponent } from './messages.js';
import { filtersComponent } from './filters.js';

repository.setChangeListener(debounce(() => {
  mapComponent.showAnnouncements(repository.getData());
}));

filtersComponent.setChangeListener(() => {
  repository.applyFilters(filtersComponent.getFilters());
});

formComponent.addSubmitListener((formData) => {
  api.sendData(formData);
});
formComponent.addResetListener(() => {
  mapComponent.reset();
  mapComponent.showAnnouncements(repository.getData());
});

mapComponent.setAddressSetListener((lat, lng) => {
  formComponent.setAddress(lat, lng);
});
mapComponent.setLoadListener(() => {
  formComponent.activate();
  api.getData();
});

api.setDataReceivedListener((data) => {
  repository.putData(data);
  filtersComponent.activate();
  repository.applyFilters(filtersComponent.getFilters());
});
api.setDataSentListener(() => {
  messagesComponent.showFormSuccessMessage();
  formComponent.clear();
});
api.setDataSendingErrorListener((err) => {
  messagesComponent.showFormFailureMessage();
});
api.setDataReceivingErrorListener(() => {
  messagesComponent.showLoadFailureMessage();
});

formComponent.deactivate();
filtersComponent.deactivate();
