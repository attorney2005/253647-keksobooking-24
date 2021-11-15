function createFilters() {
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
  let onChangeListener = () => null;

  typeSelect.addEventListener('change', onTypeChange);
  priceSelect.addEventListener('change', onPriceChange);
  roomsSelect.addEventListener('change', onRoomsChange);
  guestsSelect.addEventListener('change', onGuestsChange);
  featuresSelect.addEventListener('change', onFeaturesChange);

  // Private methods
  function onTypeChange() {
    filters.type = typeSelect.value;
    onChangeListener();
  }
  function onPriceChange() {
    filters.price = priceSelect.value;
    onChangeListener();
  }
  function onRoomsChange() {
    filters.rooms = roomsSelect.value;
    onChangeListener();
  }
  function onGuestsChange() {
    filters.guests = guestsSelect.value;
    onChangeListener();
  }
  function onFeaturesChange() {
    filters.features = featuresCheckboxes
      .filter((checkbox) => checkbox.checked === true)
      .map((checkbox) => checkbox.value);
    onChangeListener();
  }

  // Public methods
  function setChangeListener(callback) {
    onChangeListener = callback;
  }
  function getFilters() {
    return filters;
  }

  return {
    setChangeListener: setChangeListener,
    getFilters: getFilters,
  };
}

export { createFilters };
