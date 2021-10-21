const form = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const typeList = typeSelect.querySelectorAll('option');
console.log(typeList);

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











//тестовые данные
// titleInput.value = 'Уютный домик в деревне Старки Московской области рядом с Черноголовкой'
// priceInput.value = 4000;