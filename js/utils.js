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

function getRandomSubArray(originalArray) {
  const subArrayLength = getRandomPositiveInteger(1, originalArray.length);
  return originalArray.slice(0, subArrayLength);
}

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomSubArray
};
