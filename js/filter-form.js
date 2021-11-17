function createFilterForm() {
  const form = document.querySelector('.map__filters');
  const typeSelect = document.querySelector('#housing-type');
  const priceSelect = document.querySelector('#housing-price');
  const roomsSelect = document.querySelector('#housing-rooms');
  const guestsSelect = document.querySelector('#housing-guests');
  const featuresSelect = document.querySelector('#housing-features');
  const featuresCheckboxes = Array.from(featuresSelect.querySelectorAll('input'));
  const filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: [],
  };
  let changeListener = () => null;

  typeSelect.addEventListener('change', onTypeChange);
  priceSelect.addEventListener('change', onPriceChange);
  roomsSelect.addEventListener('change', onRoomsChange);
  guestsSelect.addEventListener('change', onGuestsChange);
  featuresSelect.addEventListener('change', onFeaturesChange);

  // Private methods
  function onTypeChange() {
    filters.type = typeSelect.value;
    changeListener();
  }
  function onPriceChange() {
    filters.price = priceSelect.value;
    changeListener();
  }
  function onRoomsChange() {
    filters.rooms = roomsSelect.value;
    changeListener();
  }
  function onGuestsChange() {
    filters.guests = guestsSelect.value;
    changeListener();
  }
  function onFeaturesChange() {
    filters.features = featuresCheckboxes
      .filter((checkbox) => checkbox.checked === true)
      .map((checkbox) => checkbox.value);
    changeListener();
  }

  // Public methods
  function activate() {
    form.classList.remove('map__filters--disabled');
  }

  function deactivate() {
    form.classList.add('map__filters--disabled');
  }

  function setChangeListener(callback) {
    changeListener = callback;
  }

  function getFilters() {
    return filters;
  }

  return {
    activate: activate,
    deactivate: deactivate,
    setChangeListener: setChangeListener,
    getFilters: getFilters,
  };
}

export { createFilterForm };
