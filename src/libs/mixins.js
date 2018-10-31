export function getRandomInt(minLimit, maxLimit) {
  const min = Math.ceil(minLimit);
  const max = Math.floor(maxLimit);
  return Math.floor(Math.random() * (max - min)) + min;
}
