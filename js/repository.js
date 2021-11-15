
function createRepository() {
  let data = [];
  let filters = {};
  let changeListener = () => null;

  // Private methods
  function checkType(anouncement) {
    return anouncement.offer.type === filters.type || filters.type === 'any';
  }

  function checkPrice(anouncement) {
    const price = anouncement.offer.price;
    const priceRange = estimatePriceRange(price);
    return priceRange === filters.price || filters.price === 'any';
  }

  function checkRooms(anouncement) {
    return anouncement.offer.rooms === filters.rooms || filters.rooms === 'any';
  }

  function checkGuests(anouncement) {
    const desiredGuests = filters.guests;
    const presentCapacity = anouncement.offer.guests;
    if (desiredGuests === 'any') {
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
    if (price < 10000) {return 'low';}
    if (price < 50000) {return 'middle';}
    return 'high';
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
      .slice(0, 100);
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


// const filterType = (announcement) => {
//     const typeValue = mapFilters.querySelector('#housing-type').value;
//     return typeValue === announcement.offer.type || typeValue === 'any';
// };

// const filterPrice = (announcement) => {
//     const priceValue = mapFilters.querySelector('#housing-price').value;
//     switch (priceValue) {
//         case 'low': return announcement.offer.price < 10000;
//         case 'middle': return announcement.offer.price >= 10000 && announcement.offer.price < 50000;
//         case 'high': return announcement.offer.price >= 50000;
//         case 'any': return true;
//         default: return false;
//     }
// };

// const filterRooms = (announcement) => {
//     const roomsValue = mapFilters.querySelector('#housing-rooms');
//     return roomsValue === announcement.offer.rooms.toString() || roomsValue === 'any';
// };

// const filterGuests = (announcement) => {
//     const guestsValue = mapFilters.querySelector('#housing-guests');
//     return guestsValue === announcement.offer.guests.toString() || guestsValue === 'any';
// };

// const filterFeatures = (announcement) => {
//     const selectedFeatures = Array.from(filterForm.querySelectorAll('#housing-features input:checked'));
//     if (!announcement.offer.features) {
//       return false;
//     }
//     const featuresValues = selectedFeatures.map((element) => element.value);
//     const filter = featuresValues.filter((item) => announcement.offer.features.includes(item));
//     return featuresValues.length === filter.length;
//   };

// //   функция c фильтрами которую будем передавать в сортировку

// const getAllFilterInput = (announcement) => {
//     const inputFiltres = [
//       filterType,
//       filterPrice,
//       filterRooms,
//       filterGuests,
//       filterFeatures
//     ];
// }
