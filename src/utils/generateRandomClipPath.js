import getRandomNumber from './getRandomNumber';

const generateRandomClipPath = (clipPercentage = 0) => {
  const x1 = getRandomNumber(0, clipPercentage);
  const y1 = getRandomNumber(0, clipPercentage);
  const x2 = getRandomNumber(100 - clipPercentage, 100);
  const y2 = getRandomNumber(0, clipPercentage);
  const x3 = getRandomNumber(100 - clipPercentage, 100);
  const y3 = getRandomNumber(100 - clipPercentage, 100);
  const x4 = getRandomNumber(0, clipPercentage);
  const y4 = getRandomNumber(100 - clipPercentage, 100);

  return `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%, ${x4}% ${y4}%)`;
};

export default generateRandomClipPath;
