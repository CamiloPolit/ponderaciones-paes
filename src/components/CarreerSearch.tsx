import React, { useEffect, useState, useRef } from "react";
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
    { prefix: "ENG", number: "C004", name: "Ingeniería Civil en Computación" },
    { prefix: "ENG", number: "C005", name: "Ingeniería Civil Industrial" },
    { prefix: "ENG", number: "C006", name: "Ingeniería Civil Química" },
    { prefix: "ENG", number: "C007", name: "Ingeniería Civil Eléctrica" },
    {
      prefix: "ENG",
      number: "C101",
      name: "Ingeniería Civil en Biotecnología",
    },
  ];

  // Acá hay que añadir lógica para cuando hagamos el fetch, filtrar por área
  const [activeCareerType, setActiveCareerType] = useState<string>("Todo");
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [selectedPrefix, setSelectedPrefix] = useState<string>("");

  useEffect(() => {
    careerComponentRef.current.focus();
  }, [isDisabled]);

  const handleClick = (type) => {
    setActiveCareerType(type);
  };

  const handleBlur = () => {
    setIsInputActive(false);
  };

  const types = ["Todo", "Ingeniería", "Ciencias", "Humanista", "Salud"];

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center">
        {!selectedPrefix ? (
          <MdBlock size="40px" className="text-gray-500" />
        ) : (
          <img
            className="max-h-10 max-w-10"
            src={`careerIcons/${selectedPrefix.toLowerCase()}.png`}
            alt="Logo Carrera"
          />
        )}
      </div>

      <div className="relative">
        <input
          ref={careerComponentRef}
          value={!isDisabled ? selectedCareer : ""}
          type="text"
          placeholder="Nombre de la carrera"
          disabled={isDisabled}
          onFocus={(e) => setIsInputActive(true)}
          onBlur={handleBlur}
          onChange={(e) => {
            setSelectedCareer(e.target.value);
          }}
          className={`ml-1 w-96 rounded-3xl border-2 p-2 text-xl text-black/85 ${isDisabled ? "disabled:cursor-not-allowed disabled:bg-slate-100" : "hover:cursor-pointer hover:border-black"}`}
        />
        <div className="scrollable-container absolute max-h-48 w-full overflow-auto">
          {isInputActive && (
            <div>
              <div className="flex justify-between bg-gray-100 px-1 text-xs">
                <div>Tipo de carrera:</div>
                <div className="flex">
                  {types.map((type) => (
                    <p
                      key={type}
                      className={`cursor-pointer px-1 ${
                        activeCareerType === type
                          ? "text-blue-600"
                          : "text-black"
                      }`}
                      onClick={() => handleClick(type)}
                    >
                      {type}
                    </p>
                  ))}
                </div>
              </div>
              {careerExamples.map((career) => (
                <div
                  key={career.number}
                  className="flex cursor-pointer items-center justify-around bg-gray-50 hover:bg-gray-200"
                  onMouseDown={() => {
                    setSelectedCareer(career.name);
                    setSelectedPrefix(career.prefix);
                  }}
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
          )}
        </div>
      </div>
    </div>
  );
}
