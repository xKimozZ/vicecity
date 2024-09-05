const getRandomObject = (obj) => {
    const keys = getRandomKey(obj);
    return obj[keys];
  };

export const getRandomKey = (obj) => {
    const keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
  };

export default getRandomObject;