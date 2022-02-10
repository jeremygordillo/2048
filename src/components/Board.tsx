import React from "react";
import classNames from "classnames";
import BoardCell from "./BoardCell";

type BoardProps = {
  cells: number[];
  boardSize: number;
};

const Board = ({ cells, boardSize }: BoardProps) => {
  return (
    <div
      className={classNames(
        "grid gap-2 bg-amber-700 text-gray-700 text-xl md:text-3xl rounded p-4",
        {
          "grid-cols-3": boardSize === 3,
          "grid-cols-4": boardSize === 4,
          "grid-cols-5": boardSize === 5,
          "grid-cols-6": boardSize === 6,
        }
      )}
    >
      {cells.map((c, index) => (
        <BoardCell key={`cell_${index}`} value={c} />
      ))}
    </div>
  );
};

export default Board;
