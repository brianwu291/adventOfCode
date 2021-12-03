const fs = require('fs');
const path = require('path');

function parseData(rawDataString) {
  return rawDataString.split('\n');
}

function calGammaAndEpsilonRate(data = []) {
  const resultStrCount = [...Array(data[0].length)].map(() => ({ zero: 0, one: 0 }));
  data.forEach(binaryNumStr => {
    for (let i = 0; i < binaryNumStr.length; i += 1) {
      const curBinaryNumStr = binaryNumStr[i];
      if (parseInt(curBinaryNumStr, 10) === 1) {
        resultStrCount[i].one += 1;
      } else if (parseInt(curBinaryNumStr, 10) === 0) {
        resultStrCount[i].zero += 1;
      }
    }
  });
  
  let gammaResult = '';
  let epsilonResult = '';

  for (let j = 0; j < resultStrCount.length; j += 1) {
    const curStrCount = resultStrCount[j];
    if (curStrCount.one > curStrCount.zero) {
      gammaResult = `${gammaResult}1`;
      epsilonResult = `${epsilonResult}0`;
    } else {
      gammaResult = `${gammaResult}0`;
      epsilonResult = `${epsilonResult}1`;
    }
  }

  return ({ gammaRate: gammaResult, epsilonRate: epsilonResult });
}

function getOxygenRate(data = []) {
  const binaryNumLength = data[0].length;
  let tempOxy = [...data];
  for (let k = 0; k < binaryNumLength; k += 1) {
    const tempCount = { one: 0, zero: 0 };
    tempOxy.forEach(binaryNumStr => {
      const curBinaryNumStr = binaryNumStr[k];
      if (curBinaryNumStr === '1') {
        tempCount.one += 1;
      } else if (curBinaryNumStr === '0') {
        tempCount.zero += 1;
      }
    });

    if (tempOxy.length === 1) {
      k = Infinity;
    } else {
      if (tempCount.one >= tempCount.zero) {
        tempOxy = tempOxy.filter(binaryNumStr => (
          binaryNumStr[k] === '1'
        ))
      } else {
        tempOxy = tempOxy.filter(binaryNumStr => (
          binaryNumStr[k] === '0'
        ))
      }
    }
  }

  return tempOxy[0];
}

function getCO2Rate(data = []) {
  const binaryNumLength = data[0].length;
  let tempCO2 = [...data];
  for (let k = 0; k < binaryNumLength; k += 1) {
    const tempCount = { one: 0, zero: 0 };
    tempCO2.forEach(binaryNumStr => {
      const curBinaryNumStr = binaryNumStr[k];
      if (curBinaryNumStr === '1') {
        tempCount.one += 1;
      } else if (curBinaryNumStr === '0') {
        tempCount.zero += 1;
      }
    });
    if (tempCO2.length === 1) {
      k = Infinity;
    } else {
      if (tempCount.zero <= tempCount.one) {
        tempCO2 = tempCO2.filter(binaryNumStr => (
          binaryNumStr[k] === '0'
        ))
      } else {
        tempCO2 = tempCO2.filter(binaryNumStr => (
          binaryNumStr[k] === '1'
        ))
      }
    }
  }

  return tempCO2[0];
}


function calFirstOne({ gammaRate, epsilonRate }) {
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}
function calSecondOne({ oxygenRate, co2Rate }) {
  return parseInt(oxygenRate, 2) * parseInt(co2Rate, 2);
}

fs.readFile(`${path.resolve()}/day3/input.txt`, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return;
  }
  const parsedData = parseData(data);
  const { gammaRate, epsilonRate } = calGammaAndEpsilonRate(parsedData);
  const firstOneRes = calFirstOne({ gammaRate, epsilonRate });
  const secondOneRes = calSecondOne({
    oxygenRate: getOxygenRate(parsedData),
    co2Rate: getCO2Rate(parsedData),
  });

  console.log('firstOneRes', firstOneRes);
  console.log('secondOneRes', secondOneRes);
});
