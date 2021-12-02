const fs = require('fs');
const path = require('path');

function parseData(rawDataString) {
  return rawDataString.split('\n').map(dataString => {
    const [type, value] = dataString.split(' ');
    return { type, value: parseInt(value, 10) };
  });
}

function calFirstOne(data = []) {
  const typeMap = {
    forward: 'forward',
    down: 'down',
    up: 'up',
  };
  const totalResult = data.reduce(
    (acc, { type, value }) => {
      if (type === typeMap.forward) {
        acc.x += value;
      }
      if (type === typeMap.down) {
        acc.y += value;
      }
      if (type === typeMap.up) {
        acc.y -= value;
      }
      return acc;
    },
    { x: 0, y: 0 }
  );
  return totalResult.x * totalResult.y;
}

function calSecondOne(data = []) {
  const typeMap = {
    forward: 'forward',
    down: 'down',
    up: 'up',
  };
  const totalResult = data.reduce(
    (acc, { type, value }) => {
      if (type === typeMap.forward) {
        acc.x += value;
        acc.y += acc.aim * value;
      }
      if (type === typeMap.down) {
        acc.aim += value;
      }
      if (type === typeMap.up) {
        acc.aim -= value;
      }
      return acc;
    },
    { x: 0, y: 0, aim: 0 }
  );
  return totalResult.x * totalResult.y;
}

fs.readFile(`${path.resolve()}/day2/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return;
  }
  const parsedData = parseData(data);
  const firstOneRes = calFirstOne(parsedData);
  const secondOneRes = calSecondOne(parsedData);
  console.log('firstOneRes', firstOneRes);
  console.log('secondOneRes', secondOneRes);
});
