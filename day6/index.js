const fs = require('fs');
const path = require('path');

function parseData(rawDataString = '') {
  return rawDataString.split(',').map(dataStr => parseInt(dataStr, 10));
}


function calFirstOne(data = []) {
  const queue = [...Array(9)].map(() => 0);

  for (const fish of data) {
    queue[fish] += 1;
  }

  for (let i = 1; i <= 80; i += 1) {
    const currentFishes = queue.shift();
    queue.push(currentFishes);
    queue[6] += currentFishes;
  }

  return queue.reduce((a, b) => a + b, 0);
}

function calSecondOne(data = []) {
  const queue = [...Array(9)].map(() => 0);

  for (const fish of data) {
    queue[fish] += 1;
  }

  for (let i = 1; i <= 256; i += 1) {
    const currentFishes = queue.shift();
    queue.push(currentFishes);
    queue[6] += currentFishes;
  }

  return queue.reduce((a, b) => a + b, 0);
}

fs.readFile(`${path.resolve()}/day6/input.txt`, 'utf8' , (err, data) => {
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
