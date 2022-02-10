import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import {
  addRandomCellValue,
  checkWin,
  initializeBoard,
  isOver,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "./utils";

const boardSizes = [3, 4, 5, 6];

function App() {
  const [selectedBoardSize, setBoardSize] = useState(1);
  const [board, updateBoard] = useState<number[]>([]);

  const boardSize = React.useMemo(
    () => boardSizes[selectedBoardSize],
    [selectedBoardSize]
  );

  const checkEndGame = () => {
    if (checkWin(board)) {
      console.log("You win!");
    } else if (isOver(board)) {
      console.log("Game over!");
    }
  };

  const left = () => {
    const newBoard = moveLeft(board);
    updateBoard(addRandomCellValue(newBoard));
    checkEndGame();
  };

  const right = () => {
    const newBoard = moveRight(board);
    updateBoard(addRandomCellValue(newBoard));
    checkEndGame();
  };

  const up = () => {
    const newBoard = moveUp(board);
    updateBoard(addRandomCellValue(newBoard));
    checkEndGame();
  };

  const down = () => {
    const newBoard = moveDown(board);
    updateBoard(addRandomCellValue(newBoard));
    checkEndGame();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;

      default:
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  useEffect(() => {
    updateBoard(initializeBoard(boardSize));
  }, [boardSize]);

  return (
    <main id="app-container" className="container m-auto px-4">
      <div className="mt-8 w-full sm:w-96 m-auto">
        <Board cells={board} boardSize={boardSize} />
      </div>
      <div className="flex justify-center gap-4 my-8">
        {boardSizes.map((size, index) => (
          <button
            key={`gridSizeBtn-${size}`}
            className={classNames(
              "px-3 py-2 rounded text-white hover:bg-indigo-700",
              {
                "bg-indigo-400": index !== selectedBoardSize,
                "bg-indigo-700": index === selectedBoardSize,
              }
            )}
            disabled={index === selectedBoardSize}
            onClick={() => setBoardSize(index)}
          >
            {size} x {size}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
