
// Функция, возвращающая случайное целое число из переданного диапазона включительно
// function getRandomIntFromRange(min, max) {
//     if (min < 0 || max <= min) {
//         return false;
//     }
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// getRandomIntFromRange(1, 100);


// function getFloatFromRange(min, max, range) {
//     if (range < 0 || min < 0 || min >= max) {
//         return false;
//     }
//     const randomNumber = (Math.random() * (max - min + 1) + min);
//     return randomNumber.toFixed(range);
// }
// getFloatFromRange(0, 100, 3);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://schoolsw3.com/jsref/jsref_tofixed.php



const NUMBERS_PHOTO = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10'
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
    'Уютное жилье в Липецке'
];

const TYPES = [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel'
];

const CHECK_IN = [
    '12:00',
    '13:00',
    '14:00'
];

const CHECK_OUT = [
'12: 00', 
'13:00',
'14:00'
];

const FEATURES = [
    'wifi',
    'dishwather',
    'parking',
    'washer',
    'elevator',
    'conditioner'
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
    'Избушка'
];

const PHOTOS = [ 
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
]


function getRandomPositiveInteger (min, max) {
    
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};

function getRandomPositiveFloat (min, max, digits = 1) {
    
    const lower = Math.min(Math.abs(min), Math.abs(max));
    const upper = Math.max(Math.abs(min), Math.abs(max));
    const result = Math.random() * (upper - lower) + lower;
    return result.toFixed(digits);
};

const getRandomArrayElement = (elements) =>
elements[_,random(0, elements.length-1)];

// function arrayRandElement(elements) {
// const rand = Math.floor(Math.random() * elements.length)
// return elements[rand];
// };

function getAnnouncement () {
    index = getRandomArrayElement();
    locationLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
    locationLng= getRandomPositiveFloat(139.70000, 139.80000, 5);
    return {    
        author: {
            avatar: 'img/avatars/user' + index + '.png',
        },

        offer: {
            title: getRandomArrayElement(TITLES),
            address: String(`${locationLat}, ${locationLng}`),
            price: getRandomPositiveInteger(0, 100000),
            type: getRandomArrayElement(TYPES),
            rooms: getRandomPositiveInteger(0, 100),
            guests: getRandomPositiveInteger(0, 100),
            checkin: getRandomArrayElement(CHECK_IN),
            checkout: getRandomArrayElement(CHECK_OUT),
            features: getRandomArrayElement(FEATURES),
            description: getRandomArrayElement(DESCRIPTIONS),
            photos: getRandomArrayElement(PHOTOS)
        },

        location: {
            lat: locationLat, 
            lng: locationLng,
        }
    };
};

const allAnnouncements = [];
createArrayOfObjects = function() {
for (let i = 0; i < 10; i++) {
getAnnouncement();
return allAnnouncements.push(getAnnouncement);
}
};