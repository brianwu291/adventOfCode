const fs = require('fs');
const path = require('path');

function parseData(rawDataString = '') {
  return rawDataString.split(',').map(dataStr => parseInt(dataStr, 10));
}

function produceNewDataOnOneDay(data = []) {
  const result = [...data];
  let shouldAddNewFishCount = 0;
  for (let i = 0; i < result.length; i += 1) {
    const curTimer = result[i];
    if (curTimer === 0) {
      result[i] = 6;
      shouldAddNewFishCount += 1;
    } else {
      result[i] = curTimer - 1;
    }
  }

  for (let j = 1; j <= shouldAddNewFishCount; j += 1) {
    result.push(8);
  }

  return result;
}

function calFirstOne(data = []) {
  let result = [...data];

  for (let i = 1; i <= 80; i += 1) {
    result = produceNewDataOnOneDay(result);
  }

  return result.length;
}

function calSecondOne(data = []) {
  let result = [...data];

  for (let i = 1; i <= 256; i += 1) {
    result = produceNewDataOnOneDay(result);
  }

  return result.length;
}

fs.readFile(`${path.resolve()}/day6/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return;
  }
  const parsedData = parseData(data);

  // const firstOneRes = calFirstOne(parsedData);
  // const secondOneRes = calSecondOne(parsedData);
  // console.log('firstOneRes', firstOneRes);
  // console.log('secondOneRes', secondOneRes);
});
