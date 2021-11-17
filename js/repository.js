const DEFAULT_VALUE = 'any';
const PRICE_LOW = 'low';
const PRICE_LOW_LIMIT = 10000;
const PRICE_MIDDLE = 'middle';
const PRICE_HIGH = 'high';
const PRICE_HIGH_LIMIT = 50000;
const ANNOUNCEMENTS_NUMBER = 10; 

function createRepository() {
  let data = [];
  let filters = {};
  let changeListener = () => null;

  // Private methods
  function checkType(anouncement) {
    return anouncement.offer.type === filters.type || filters.type === DEFAULT_VALUE;
  }

  function checkPrice(anouncement) {
    const price = anouncement.offer.price;
    const priceRange = estimatePriceRange(price);
    return priceRange === filters.price || filters.price === DEFAULT_VALUE;
  }

  function checkRooms(anouncement) {
    return anouncement.offer.rooms === filters.rooms || filters.rooms === DEFAULT_VALUE;
  }

  function checkGuests(anouncement) {
    const desiredGuests = filters.guests;
    const presentCapacity = anouncement.offer.guests;
    if (desiredGuests === DEFAULT_VALUE) {
      return true;
    }
    return presentCapacity > Number(desiredGuests);
  }

  function checkFeatures(anouncement) {
    const desiredFeatures = filters.features;
    const presentFeatures = anouncement.offer.features || [];
    for (const feature of desiredFeatures) {
      if (!presentFeatures.includes(feature)) {
        return false;
      }
    }
    return true;
  }

  function estimatePriceRange(price) {
    if (price < PRICE_LOW_LIMIT) {return PRICE_LOW;}
    if (price < PRICE_HIGH_LIMIT) {return PRICE_MIDDLE;}
    return PRICE_HIGH;
  }

  // Public methods
  function putData(newData) {
    data = newData;
    changeListener();
  }

  function applyFilters(newFilters) {
    filters = newFilters;
    changeListener();
  }

  function getData() {
    return data
      .filter(checkType)
      .filter(checkPrice)
      .filter(checkRooms)
      .filter(checkGuests)
      .filter(checkFeatures)
      .slice(0, ANNOUNCEMENTS_NUMBER);
  }

  function setChangeListener(callback) {
    changeListener = callback;
  }

  return {
    putData: putData,
    applyFilters: applyFilters,
    getData: getData,
    setChangeListener: setChangeListener,
  };
}

export { createRepository };
