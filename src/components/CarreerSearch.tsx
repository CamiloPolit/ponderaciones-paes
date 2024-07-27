import React, { useEffect, useState } from "react";
import { MdBlock } from "react-icons/md";

export default function CarreerSearch({
  isDisabled,
  careerComponentRef,
  selectedUniversity,
}) {
  const careerExamples = [
    { prefix: "ENG", number: "C001", name: "Ingeniería Civil en Computación" },
    { prefix: "ENG", number: "C002", name: "Ingeniería Civil Industrial" },
    { prefix: "ENG", number: "C004", name: "Ingeniería Civil Química" },
    { prefix: "ENG", number: "C003", name: "Ingeniería Civil Eléctrica" },
    {
      prefix: "ENG",
      number: "C101",
      name: "Ingeniería Civil en Biotecnología",
    },
  ];

  useEffect(() => {
    careerComponentRef.current.focus();
  }, [isDisabled]);

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center">
        <MdBlock size="40px" className="text-gray-500" />
      </div>

      <div className="relative">
        <input
          ref={careerComponentRef}
          type="text"
          placeholder="Nombre de la carrera"
          disabled={isDisabled}
          className={`ml-1 w-96 rounded-3xl border-2 p-2 text-xl text-black/85 ${isDisabled ? "disabled:cursor-not-allowed disabled:bg-slate-100" : "hover:cursor-pointer hover:border-black"}`}
        />
        <div className="absolute w-full">
          {selectedUniversity &&
            careerExamples.map((career) => (
              <div
                key={career.number}
                className="flex cursor-pointer items-center justify-around bg-gray-50 hover:bg-gray-200"
              >
                <div className="max-h-8 max-w-8">
                  <img
                    src={`/careerIcons/${career.prefix.toLowerCase()}.png`}
                    alt={`Foto ${career.prefix}`}
                  />
                </div>
                <div className="w-10/12 p-2">{career.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
