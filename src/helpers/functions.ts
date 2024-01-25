export function getValue(obj: any, path: string) {
  const keysArray = path.split('.');
  let newObject = JSON.parse(simpleStringify(obj));
  for (let i = 0; i < keysArray.length; i++) {
    if (typeof newObject[keysArray[i]] === undefined) {
      return newObject[keysArray[i]];
    }
    newObject = newObject[keysArray[i]];
  }
  return newObject;
}

function simpleStringify(object: any) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == 'object') {
      continue;
    }
    if (typeof object[prop] == 'function') {
      continue;
    }
    //@ts-ignore
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
}

export function caculatorAverage24h(price: any, histPrice: any) {
  try {
    if (price && histPrice) {
      const currentPrice = price ? price['USD'] : 0;
      const usdHistPrice = histPrice ? histPrice['24H']['USD'] : 0;
      const average = (currentPrice - usdHistPrice) / usdHistPrice;
      return average;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
