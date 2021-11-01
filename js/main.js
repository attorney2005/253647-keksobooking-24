import { createListOfAnnouncements } from './data.js';
import { renderAnnouncementCard } from './template.js';
import { initForm, activateForm } from './form.js';
import { initMap} from './map.js';

const announcementList = createListOfAnnouncements();

initForm();
initMap(onMapLoaded);


function onMapLoaded() {
    activateForm();
}
