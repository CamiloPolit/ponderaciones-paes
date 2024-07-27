import React from "react";
import { MdBlock } from "react-icons/md";

export default function CarreerSearch({ isDisabled }) {
  return (
    <div className="flex">
      <div className="flex h-11 w-11 content-center justify-center">
        <MdBlock size="40px" className="text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Nombre de la carrera"
        disabled={isDisabled}
        className={`ml-1 w-96 rounded-3xl border-2 p-2 text-xl text-black/85 ${isDisabled ? "disabled:cursor-not-allowed disabled:bg-slate-200" : "hover:cursor-pointer"}`}
      />
    </div>
  );
}
