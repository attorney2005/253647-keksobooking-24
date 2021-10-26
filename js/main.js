import { createListOfAnnouncements } from './data.js';
import { renderAnnouncementCard } from './template.js';
import './form.js';

const announcementList = createListOfAnnouncements();
const announcementData = announcementList[0];

const card = renderAnnouncementCard(announcementData);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(card);

