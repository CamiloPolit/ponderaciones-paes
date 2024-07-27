import React, { useEffect } from "react";
import { MdBlock } from "react-icons/md";

export default function CarreerSearch({ isDisabled, careerComponentRef }) {
  useEffect(() => {
    careerComponentRef.current.focus();
  }, [isDisabled]);

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center">
        <MdBlock size="40px" className="text-gray-500" />
      </div>
      <input
        ref={careerComponentRef}
        type="text"
        placeholder="Nombre de la carrera"
        disabled={isDisabled}
        className={`ml-1 w-96 rounded-3xl border-2 p-2 text-xl text-black/85 ${isDisabled ? "disabled:cursor-not-allowed disabled:bg-slate-100" : "hover:cursor-pointer hover:border-black"}`}
      />
    </div>
  );
}
