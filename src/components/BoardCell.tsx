import classNames from "classnames";
import React from "react";

type BoardCellProps = {
  value: number;
};

const BoardCell = ({ value }: BoardCellProps) => {
  const valStr = value > 0 ? value.toString() : "";
  return (
    <div
      className={classNames(
        "col-span-1 block w-full  h-full text-center p-2 md:p-5",
        {
          "text-white": value !== 2,
          "bg-stone-100": value === 0,
          "bg-amber-100": value === 2,
          "bg-orange-200": value === 4,
          "bg-orange-300": value === 8,
          "bg-orange-500": value === 16,
          "bg-red-400": value === 32,
          "bg-orange-600": value === 64,
          "bg-yellow-400": value === 128,
          "bg-yellow-500": value === 256,
        }
      )}
    >
      <span className={classNames("inline-block transition-all")}>
        {valStr}
      </span>
    </div>
  );
};

export default BoardCell;
