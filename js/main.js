import { createListOfAnnouncements } from './data.js';
import { renderAnnouncementCard } from './template.js';
import {enableInactiveState} from './form.js';
import './map.js';

const announcementList = createListOfAnnouncements();

enableInactiveState();
