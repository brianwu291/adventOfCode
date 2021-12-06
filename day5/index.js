const fs = require('fs');
const path = require('path');

function parseData(rawDataString = '') {
  return rawDataString
    .split('\n')
    .map(row => {
      const [prePos, sufPos] = row.split('->').map(pos => pos.trim());
      const [preX, preY] = prePos.split(',');
      const [sufX, sufY] = sufPos.split(',');
      return ({
        pre: { x: parseInt(preX, 10), y: parseInt(preY, 10) },
        after: { x: parseInt(sufX, 10), y: parseInt(sufY, 10) },
      })
    });
}


/**
 * @data
 * like:
 * [
 *  { pre: { x: 31, y: 133 }, after: { x: 831, y: 933 } },
 *  { pre: { x: 250, y: 976 }, after: { x: 250, y: 355 } },
 *  ...
 * ]
*/
function calFirstOne(data = []) {
  const countDiagram = {};
  /** 
   * { `${x}{y}`: count }
   **/
  let result = 0;
  data.forEach(({ pre, after }) => {
    const sameX = pre.x === after.x;
    const sameY = pre.y === after.y;
    if (sameX && !sameY) {
      const y = pre.y > after.y ? after.y : pre.y;
      for (let i = y; i <= (pre.y > after.y ? pre.y : after.y); i += 1) {
        if (countDiagram[`${pre.x}-${i}`] === undefined) {
          countDiagram[`${pre.x}-${i}`] = 1;
        } else {
          countDiagram[`${pre.x}-${i}`] += 1;
          if (countDiagram[`${pre.x}-${i}`] === 2) {
            result += 1;
          }
        }
      }
    }

    if (!sameX && sameY) {
      const x = pre.x > after.x ? after.x : pre.x;
      for (let i = x; i <= (pre.x > after.x ? pre.x : after.x); i += 1) {
        if (countDiagram[`${i}-${pre.y}`] === undefined) {
          countDiagram[`${i}-${pre.y}`] = 1;
        } else {
          countDiagram[`${i}-${pre.y}`] += 1;
          if (countDiagram[`${i}-${pre.y}`] === 2) {
            result += 1;
          }
        }
      }
    }
  
    if (sameX && sameY) {
      if (countDiagram[`${pre.x}-${pre.y}`] === undefined) {
        countDiagram[`${pre.x}-${pre.y}`] = 1;
      } else {
        countDiagram[`${pre.x}-${pre.y}`] += 1;
        if (countDiagram[`${pre.x}-${pre.y}`] === 2) {
          result += 1;
        }
      }
    }

  });

  return result;
}

function checkIsDiagonalLine(pre = {}, after = {}) {
  return Math.abs(pre.x - after.x) === Math.abs(pre.y - after.y);
}

/**
 * @data
 * like:
 * [
 *  { pre: { x: 31, y: 133 }, after: { x: 831, y: 933 } },
 *  { pre: { x: 250, y: 976 }, after: { x: 250, y: 355 } },
 *  ...
 * ]
*/
function calSecondOne(data = []) {
  const countDiagram = {};
  /** 
   * { `${x}{y}`: count }
   **/
  let result = 0;
  data.forEach(({ pre, after }) => {
    const sameX = pre.x === after.x;
    const sameY = pre.y === after.y;
    if (sameX && !sameY) {
      const y = pre.y > after.y ? after.y : pre.y;
      for (let i = y; i <= (pre.y > after.y ? pre.y : after.y); i += 1) {
        if (countDiagram[`${pre.x}-${i}`] === undefined) {
          countDiagram[`${pre.x}-${i}`] = 1;
        } else {
          countDiagram[`${pre.x}-${i}`] += 1;
          if (countDiagram[`${pre.x}-${i}`] === 2) {
            result += 1;
          }
        }
      }
    }

    if (!sameX && sameY) {
      const x = pre.x > after.x ? after.x : pre.x;
      for (let i = x; i <= (pre.x > after.x ? pre.x : after.x); i += 1) {
        if (countDiagram[`${i}-${pre.y}`] === undefined) {
          countDiagram[`${i}-${pre.y}`] = 1;
        } else {
          countDiagram[`${i}-${pre.y}`] += 1;
          if (countDiagram[`${i}-${pre.y}`] === 2) {
            result += 1;
          }
        }
      }
    }
  
    if (sameX && sameY) {
      if (countDiagram[`${pre.x}-${pre.y}`] === undefined) {
        countDiagram[`${pre.x}-${pre.y}`] = 1;
      } else {
        countDiagram[`${pre.x}-${pre.y}`] += 1;
        if (countDiagram[`${pre.x}-${pre.y}`] === 2) {
          result += 1;
        }
      }
    }

    if (checkIsDiagonalLine(pre, after)) {
      const isXRising = pre.x < after.x;
      const isYRising = pre.y < after.y;

      if (isXRising && isYRising) {
        let i = pre.x, j = pre.y;
        while (i <= after.x && j <= after.y) {
          if (countDiagram[`${i}-${j}`] === undefined) {
            countDiagram[`${i}-${j}`] = 1;
          } else {
            countDiagram[`${i}-${j}`] += 1;
            if (countDiagram[`${i}-${j}`] === 2) {
              result += 1;
            }
          }

          i += 1;
          j += 1;
        }
      }

      if (isXRising && !isYRising) {
        let i = pre.x, j = pre.y;
        while (i <= after.x && j >= after.y) {
          if (countDiagram[`${i}-${j}`] === undefined) {
            countDiagram[`${i}-${j}`] = 1;
          } else {
            countDiagram[`${i}-${j}`] += 1;
            if (countDiagram[`${i}-${j}`] === 2) {
              result += 1;
            }
          }

          i += 1;
          j -= 1;
        }
      }

      if (!isXRising && isYRising) {
        let i = pre.x, j = pre.y;
        while (i >= after.x && j <= after.y) {
          if (countDiagram[`${i}-${j}`] === undefined) {
            countDiagram[`${i}-${j}`] = 1;
          } else {
            countDiagram[`${i}-${j}`] += 1;
            if (countDiagram[`${i}-${j}`] === 2) {
              result += 1;
            }
          }

          i -= 1;
          j += 1;
        }
      }

      if (!isXRising && !isYRising) {
        let i = pre.x, j = pre.y;
        while (i >= after.x && j >= after.y) {
          if (countDiagram[`${i}-${j}`] === undefined) {
            countDiagram[`${i}-${j}`] = 1;
          } else {
            countDiagram[`${i}-${j}`] += 1;
            if (countDiagram[`${i}-${j}`] === 2) {
              result += 1;
            }
          }

          i -= 1;
          j -= 1;
        }
      }
    }

  });

  return result;
}


fs.readFile(`${path.resolve()}/day5/input.txt`, 'utf8' , (err, data) => {
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