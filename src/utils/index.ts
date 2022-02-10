import pipe from "lodash/fp/pipe";

export const generateEmptyBoard = (boardSize: number = 4): number[] =>
  Array.from<number>({ length: Math.pow(boardSize, 2) }).fill(0);

const getRandomCellValue = () => (Math.random() > 0.1 ? 2 : 4);

const getRandomNumber = (limit: number) => Math.floor(Math.random() * limit);

const hasValue = (cellValue: number) => cellValue !== 0;

export const addRandomCellValue = (board: number[]) => {
  let index = Math.floor(Math.random() * board.length);

  while (hasValue(board[index])) {
    index = getRandomNumber(board.length);
  }

  return Array.from(board).fill(getRandomCellValue(), index, index + 1);
};

export const initializeBoard = (boardSize: number): number[] => {
  const board = generateEmptyBoard(boardSize);
  return addRandomCellValue(board);
};

const move = (board: number[]) => {
  const boardSize = Math.sqrt(board.length);
  const newBoard = generateEmptyBoard(boardSize);

  // Cycle array as matrix
  let col = 0;

  for (let row = 0; row < boardSize; row++) {
    let colIndex = col;
    let endColIndex = boardSize + col;
    for (col; col < endColIndex; col++) {
      if (hasValue(board[col])) {
        newBoard[colIndex] = board[col];
        colIndex++;
      }
    }
  }

  return newBoard;
};

const mergeCells = (board: number[]) => {
  const boardSize = Math.ceil(Math.sqrt(board.length));
  const newBoard = [...board];

  // Cycle array as matrix
  let col = 0;

  for (let row = 0; row < boardSize; row++) {
    let endColIndex = boardSize + col - 1;
    for (col; col < endColIndex; col++) {
      if (hasValue(newBoard[col]) && newBoard[col] === newBoard[col + 1]) {
        newBoard[col] = newBoard[col + 1] * 2;
        newBoard[col + 1] = 0;
      }
    }
    col++;
  }

  return newBoard;
};

const reverse = (board: number[]) => {
  const boardSize = Math.sqrt(board.length);
  const newBoard = generateEmptyBoard(boardSize);

  // Cycle array as matrix
  let startColIndex = 0;
  let endColIndex = boardSize - 1;

  for (let row = 0; row < boardSize; row++) {
    let colIndex = endColIndex;
    for (startColIndex; startColIndex <= endColIndex; startColIndex++) {
      newBoard[startColIndex] = board[colIndex];
      colIndex--;
    }
    endColIndex += boardSize;
  }

  return newBoard;
};

const rotateLeft = (board: number[]) => {
  const boardSize = Math.sqrt(board.length);
  const newBoard = generateEmptyBoard(boardSize);

  // Cycle array as matrix
  /**
   * [0,0,0,4] [4,4,0,0]
   * [0,0,2,4] [0,2,0,0]
   * [2,0,0,0] [0,0,0,2]
   * [0,2,0,0] [0,0,2,0]
   */

  // Cycle array as matrix
  let col = 0;

  for (let row = 0; row < boardSize; row++) {
    let colIndex = boardSize - row - 1;
    let endColIndex = boardSize + col;
    for (col; col < endColIndex; col++) {
      newBoard[col] = board[colIndex];
      colIndex += boardSize;
    }
    // col++;
  }

  return newBoard;
};

const rotateRight = (board: number[]) => {
  const boardSize = Math.sqrt(board.length);
  const newBoard = generateEmptyBoard(boardSize);

  // Cycle array as matrix
  /**
   * [0,0,0,4] [0,2,0,0]
   * [0,0,2,4] [2,0,0,0]
   * [2,0,0,0] [0,0,2,0]
   * [0,2,0,0] [0,0,4,4]
   */

  // Cycle array as matrix
  let col = 0;

  for (let row = 0; row < boardSize; row++) {
    let colIndex = board.length - boardSize + row;
    let endColIndex = boardSize + col;
    for (col; col < endColIndex; col++) {
      newBoard[col] = board[colIndex];
      colIndex -= boardSize;
    }
  }

  return newBoard;
};

const hasDiff = (board: number[], updatedBoard: number[]) =>
  board.some((value, index) => value !== updatedBoard[index]);

export const moveLeft = (board: number[]) =>
  pipe([move, mergeCells, move])(board);

export const moveRight = (board: number[]) =>
  pipe([reverse, moveLeft, reverse])(board);

export const moveUp = (board: number[]) =>
  pipe([rotateLeft, moveLeft, rotateRight])(board);

export const moveDown = (board: number[]) =>
  pipe([rotateRight, moveLeft, rotateLeft])(board);

export const checkWin = (board: number[]) => board.includes(2048);

export const isOver = (board: number[]) => {
  return !(
    hasDiff(board, moveLeft(board)) ||
    hasDiff(board, moveRight(board)) ||
    hasDiff(board, moveUp(board)) ||
    hasDiff(board, moveDown(board))
  );
};
