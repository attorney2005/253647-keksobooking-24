function getTypeText(type) {
  const TYPES_TO_TEXT_DICTIONARY = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalow': 'Бунгало',
    'hotel': 'Отель',
  };
  return TYPES_TO_TEXT_DICTIONARY[type];
}

function getRoomWord(numberOfRooms) {
  if (numberOfRooms === 1) {
    return 'комната';
  } else if (numberOfRooms > 1 && numberOfRooms < 5) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
}

function getGuestWord(numberOfGuests) {
  return numberOfGuests === 1 ? 'гостя' : 'гостей';
}

function getCapacityText(numberOfRooms, numberOfGuests) {
  return `${numberOfRooms} ${getRoomWord(numberOfRooms)} для ${numberOfGuests} ${getGuestWord(numberOfGuests)}`;
}

function getPriceText(price) {
  return `${price} ₽/ночь`;
}

function getCheckTime(checkIn, checkOut) {
  return `Заезд после ${checkIn} выезд до ${checkOut}`;
}

function renderFeatures(featureNames) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < featureNames.length; i++) {
    const featureDomElement = document.createElement('li');
    const baseBemClass = 'popup__feature';
    const bemModifierClass = `${baseBemClass}--${featureNames[i]}`;

    featureDomElement.classList.add(baseBemClass);
    featureDomElement.classList.add(bemModifierClass);
    fragment.appendChild(featureDomElement);
  }

  return fragment;
}

function renderPhotos(photoUrls) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photoUrls.length; i++) {
    const photoDomElement = document.createElement('img');
    photoDomElement.src = photoUrls[i];
    photoDomElement.width = '45';
    photoDomElement.height = '40';
    photoDomElement.alt = 'Фотография жилья';
    photoDomElement.classList.add('popup__photo');
    fragment.appendChild(photoDomElement);
  }

  return fragment;
}

function renderAnnouncementCard(announcementData) {
  const cardTemplate = document.querySelector('#card').content;
  const templateFragment = cardTemplate.querySelector('.popup');
  const card = templateFragment.cloneNode(true);
  const offer = announcementData.offer;

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = getPriceText(offer.price);
  card.querySelector('.popup__type').textContent = getTypeText(offer.type);
  card.querySelector('.popup__text--capacity').textContent = getCapacityText(offer.rooms, offer.guests);
  card.querySelector('.popup__text--time').textContent = getCheckTime(offer.checkin, offer.checkout);
  card.querySelector('.popup__description').textContent = offer.description;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(renderFeatures(offer.features));
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(renderPhotos(offer.photos));
  card.querySelector('.popup__avatar').src = announcementData.author.avatar;

  return card;
}

export {
  renderAnnouncementCard
};
