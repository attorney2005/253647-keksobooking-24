const form = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');

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
//тестовые данные
// titleInput.value = 'Уютный домик в деревне Старки Московской области рядом с Черноголовкой'
// priceInput.value = 4000;