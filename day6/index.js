const fs = require('fs');
const path = require('path');

function parseData(rawDataString = '') {
  return rawDataString.split(',').map(dataStr => parseInt(dataStr, 10));
}


/**
 * if 1:
 * 1 first day
 * 0 second day
 * 68 third day
 * 
 * if: 2
 * 2 first day
 * 1 second day
 * 0 third day
 * 68
 * 
 * if: 3
 * ...
 * 
 * 每個位置的值 num，代表再移動 num + 1 天
 * 就會變為 6，並新增 8 到末端
 * 
 * 因此可以用一個長度為 9 的 array 記
 * index 代表的是 num，值是目前共幾個 num
 * example:
 * data:[1,3,1,4]
 * array: [0,2,0,1,1]
 * 長度為 9 表示 index 是 0 - 8，符合題目要求
 * 
 * 跑回圈時(代表一共跑幾天)
 * 每天把這個 array 第一個 num 移出來(表示要 reset 為 6)
 * 並 push 到尾端 (表示新增 8)
 * 跑完後，再把 array 中的值相加即可
*/


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
