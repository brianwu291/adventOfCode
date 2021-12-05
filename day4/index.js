const fs = require('fs');
const path = require('path');

function importData() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      `${path.resolve()}/day4/randomNumbers.txt`,
      'utf8',
      (err, rawDataString) => {
        if (err) {
          reject(err);
          return;
        }
        const randomNumbers = rawDataString.split(',').map(n => parseInt(n, 10));

        fs.readFile(
          `${path.resolve()}/day4/boards.txt`,
          'utf8',
          (err, rawDataString) => {
            if (err) {
              reject(err);
              return;
            }
            const boards = rawDataString
              .split('\n\n')
              .map(rawBoard => {
                const boardArr = [];
                rawBoard
                  .split('\n')
                  .forEach(singleBoardStr => {
                    const singleArr = [];
                    singleBoardStr
                      .split('\n')
                      .forEach(rowNumStr => {
                        rowNumStr
                          .split(' ')
                          .forEach(rawNum => {
                            if (rawNum !== '') {
                              singleArr.push({
                                isMarked: false,
                                value: parseInt(rawNum.trim(), 10)
                              }); 
                            }
                          })
                      });
                    boardArr.push(singleArr);
                  })
                return boardArr;
              });
            resolve({
              randomNumbers,
              boards,
            });
          },
        );
      });
    }
  );
}

function getAllUnMarkedNumInBoard(board = [[]]) {
  return board.reduce(
    (acc, row) => {
      row.forEach(({ isMarked, value }) => {
        if (!isMarked) {
          acc.push(value);
        }
      });
      return acc;
    },
    []
  );
}

function checkIsBingoOnList(list = []) {
  return list.every(({ isMarked }) => isMarked);
}

function checkHasBingoAndReturnUnMarkNums(board = [[]]) {
  const lists = [...Array(5)].map(() => []);
  // handle row
  for (let i = 0; i < board.length; i += 1) {
    if (checkIsBingoOnList(board[i])) {
      return getAllUnMarkedNumInBoard(board);
    }
  }

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      lists[j].push(board[i][j]);
    }
  }

  // handle line
  for (let k = 0; k < lists.length; k += 1) {
    if (checkIsBingoOnList(lists[k])) {
      return getAllUnMarkedNumInBoard(board);
    }
  }

  return null;
}

function setMarkedNumOnBoard(boards = [[[]]], targetNum = 0) {
  boards.forEach((board, bIndex) => {
    board.forEach((row, rIndex) => {
      row.forEach(({ value }, numIndex) => {
        if (value === targetNum) {
          boards[bIndex][rIndex][numIndex].isMarked = true;
        }
      })
    })
  });
}

function totalSumOnNums(nums = []) {
  return nums.reduce(
    (acc, num) => {
      acc += num;
      return acc;
    },
    0
  );
}

function handleFirstOne({ randomNumbers = 0, boards = [[[]]] }) {
  const copyBoards = JSON.parse(JSON.stringify(boards));
  let unMarkNums = null, matchNum = null;
  for (let i = 0; i < randomNumbers.length && !unMarkNums; i += 1) {
    const randomNum = randomNumbers[i];
    setMarkedNumOnBoard(copyBoards, randomNum);
    for (let k = 0; k < copyBoards.length && !unMarkNums; k += 1) {
      const curBoard = copyBoards[k];
      const tempUnMarkNums = checkHasBingoAndReturnUnMarkNums(curBoard);
      if (tempUnMarkNums) {
        unMarkNums = tempUnMarkNums;
        matchNum = randomNum;
      }
    }
  }
  console.log('firstOneResult', totalSumOnNums(unMarkNums) * matchNum);
  return ({ randomNumbers, boards });
}

function handleSecondOne({ randomNumbers = 0, boards = [[[]]] }) {
  const countMap = {};
  const copyBoards = JSON.parse(JSON.stringify(boards));
  let unMarkNums = null, matchNum = null, tempCount = 0;
  for (let i = 0; i < randomNumbers.length && tempCount < copyBoards.length; i += 1) {
    const randomNum = randomNumbers[i];
    setMarkedNumOnBoard(copyBoards, randomNum);
    for (let k = 0; k < copyBoards.length && tempCount < copyBoards.length; k += 1) {
      const curBoard = copyBoards[k];
      const tempUnMarkNums = checkHasBingoAndReturnUnMarkNums(curBoard);
      if (tempUnMarkNums) {
        if (countMap[k] === undefined) {
          countMap[k] = k;
          tempCount += 1;
        }
        if (tempCount === copyBoards.length) {
          unMarkNums = tempUnMarkNums;
          matchNum = randomNum;
        }
      }
    }
  }
  console.log('secondOneResult', totalSumOnNums(unMarkNums) * matchNum);
  return ({ randomNumbers, boards });
}

importData()
  .then(handleFirstOne)
  .then(handleSecondOne);
