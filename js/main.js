const USER_IDS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];

const TITLES = [
  'Уютное жилье в Москве',
  'Уютное жилье в Грозном',
  'Уютное жилье в Кабуле',
  'Уютное жилье в Багдаде',
  'Уютное жилье в Дели',
  'Уютное жилье в Пекине',
  'Уютное жилье в Токио',
  'Уютное жилье в Рязани',
  'Уютное жилье в Кроаснодаре',
  'Уютное жилье в Липецке',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_IN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwather',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Жилище мечты',
  'Хижина для вождя',
  'Суперкварттира',
  'Замок',
  'Землянка',
  'Курень',
  'Элитная трешка',
  'Фазенда',
  'Сакля',
  'Избушка',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const LOCATION_ACCURACY = 5;
const PRICE_MAX = 100000;
const ROOMS_MAX = 100;
const GUESTS_MAX = 100;
const ANNOUNCEMENT_NUMBER = 10;


function getRandomPositiveInteger(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat(from, to, digits = 1) {
  const lower = Math.min(Math.abs(from), Math.abs(to));
  const upper = Math.max(Math.abs(from), Math.abs(to));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function getRandomArrayElement(elements) {
  return elements[_.random(0, elements.length - 1)];
}

function getAnnouncement() {
  const userId = getRandomArrayElement(USER_IDS);
  const locationLat = getRandomPositiveFloat(LATITUDE_MIN, LATITUDE_MAX, LOCATION_ACCURACY);
  const locationLng = getRandomPositiveFloat(LONGITUDE_MIN, LONGITUDE_MAX, LOCATION_ACCURACY);

  return {
    author: {
      avatar: `img/avatars/user${userId}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: String(`${locationLat}, ${locationLng}`),
      price: getRandomPositiveInteger(0, PRICE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(0, ROOMS_MAX),
      guests: getRandomPositiveInteger(0, GUESTS_MAX),
      checkin: getRandomArrayElement(CHECK_IN),
      checkout: getRandomArrayElement(CHECK_OUT),
      features: [getRandomArrayElement(FEATURES)],
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: [getRandomArrayElement(PHOTOS)],
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
}

function createListOfAnnouncements(num) {
  const announcementList = [];
  for (let index = 0; index < num; index++) {
    announcementList.push(getAnnouncement());
  }
  return announcementList;
}

createListOfAnnouncements(ANNOUNCEMENT_NUMBER);
// console.log(createListOfAnnouncements(ANNOUNCEMENT_NUMBER));
