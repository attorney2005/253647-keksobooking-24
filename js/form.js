const form = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');

const button = document.querySelector('.ad-form__submit');

form.setAttribute('action', 'https://24.javascript.pages.academy/keksobooking');
form.setAttribute('method', 'POST');
form.setAttribute('enctype', 'multipart/form-data');

titleInput.setAttribute('required', true);
titleInput.setAttribute('minlength', '30');
titleInput.setAttribute('maxlength', '100');

priceInput.setAttribute('required', true);
priceInput.setAttribute('number', true);
priceInput.setAttribute('max', '10000');

function setMinPriceForType() {
    const typeToMinPrice = {
        'bungalow': 0,
        'flat': 1000,
        'hotel': 3000,
        'house': 5000,
        'palace': 10000,
    };
    const type = typeSelect.value;
    const price = typeToMinPrice[type];
    priceInput.setAttribute('min', price);
    priceInput.setAttribute('placeholder', price);
}

typeSelect.addEventListener('change', setMinPriceForType);
setMinPriceForType();

const disableRoomSelects = function () {
    for (var i = 0; i < guestsSelect.options.length; i++) {
        guestsSelect.options[i].disabled = true;
    }
};

const roomNumberChangeHandler = function () {
    disableRoomSelects();
    const choosenValue = (roomsSelect.value === '100') ? '0' : roomsSelect.value;
    if (choosenValue === '0' || choosenValue === '1') {
        for (let i = 0; i < guestsSelect.options.length; i++) {
            if (guestsSelect.options[i].value === choosenValue) {
                guestsSelect.options[i].disabled = false;
            }
        }
    }
    if (choosenValue === '2') {
        for (let i = 0; i < guestsSelect.options.length; i++) {
            if (guestsSelect.options[i].value === choosenValue || guestsSelect.options[i].value ==='1') {
                guestsSelect.options[i].disabled = false;
            }
        }
    }
    if (choosenValue === '3') {
        for (let i = 0; i < guestsSelect.options.length; i++) {
            if (guestsSelect.options[i].value === choosenValue || guestsSelect.options[i].value ==='2'|| guestsSelect.options[i].value ==='1') {
                guestsSelect.options[i].disabled = false;
            }
        }
    }
    for (var i = 0; i < guestsSelect.options.length; i++) {
        if (!guestsSelect.options[i].disabled) {
            guestsSelect.options[i].selected = true;
            break;
        }
    }
}

roomsSelect.addEventListener('change', roomNumberChangeHandler);

roomNumberChangeHandler();



//     const roomToGuestMap = {
//         '1': ['1'],
//         '2': ['2', '1'],
//         '3': ['3', '2', '1'],
//         '100': ['0']
//     };

// roomsSelect.addEventListener('change', setGuestLimit);
// setGuestLimit();

//тестовые данные
// titleInput.value = 'Уютный домик в деревне Старки Московской области рядом с Черноголовкой'
// priceInput.value = 4000;