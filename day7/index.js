const fs = require('fs');
const path = require('path');

function parseData(rawDataString = '') {
  return rawDataString.split(',').map(dataStr => parseInt(dataStr, 10));
}

function calFirstOne(data = []) {
  let result = Infinity;

  for (let i = 0; i < data.length; i += 1) {
    const curNum = data[i];

    let tempRes = 0;
    for (let j = 0; j < data.length; j += 1) {
      const comparedNum = data[j];
      const gap = Math.abs(curNum - comparedNum);
      tempRes += gap;
    }
    
    result = Math.min(result, tempRes);
  }

  return result;
}

function calculateFuelBetweenTwoPos(start = 0, end = 0) {
  if (start === end) return 0;

  // 34567
  // 1 + 2 + 3 + 4
  let result = 0;
  const gap = end - start;
  for (let i = 1; i <= gap; i += 1) {
    result += i;
  }

  return result;
}

function calSecondOne(data = []) {
  const total = data.reduce(
    (acc, num) => acc + num,
    0
  );

  const candidateMax = Math.ceil(total / data.length);
  const candidateMin = Math.floor(total / data.length);

  const candidateMaxRes = data.reduce(
    (acc, num) => {
      const start = candidateMax < num ? candidateMax : num;
      const end = candidateMax > num ? candidateMax : num;
      const gap = calculateFuelBetweenTwoPos(start, end);
      return acc + gap;
    },
    0
  );

  const candidateMinRes = data.reduce(
    (acc, num) => {
      const start = candidateMin < num ? candidateMin : num;
      const end = candidateMin > num ? candidateMin : num;
      const gap = calculateFuelBetweenTwoPos(start, end);
      return acc + gap;
    },
    0
  );

  return Math.min(candidateMaxRes, candidateMinRes);
}

fs.readFile(`${path.resolve()}/day7/input.txt`, 'utf8' , (err, data) => {
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
