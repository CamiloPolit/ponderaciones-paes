import React from "react";

export default function Calendar({ month, day }) {
  return (
    <div className="h-20 w-20 bg-black p-2">
      <div className="flex h-1/2 w-full items-center justify-center bg-white font-bold">
        <h4 className="scroll-m-20 text-xl font-bold tracking-tight">
          {month}
        </h4>
      </div>
      <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight text-white">
        {day}
      </h4>
    </div>
  );
}
