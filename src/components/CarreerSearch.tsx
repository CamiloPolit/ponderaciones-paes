import React, { useEffect, useState, useRef } from "react";
import { MdBlock } from "react-icons/md";
import CareersMenu from "./CareersMenu";

export default function CareerSearch({ isDisabled, careerComponentRef }) {
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
  ];

  const [activeCareerType, setActiveCareerType] = useState<string>("Todo");
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [selectedPrefix, setSelectedPrefix] = useState<string>("");

  const containerRef = useRef(null);

  useEffect(() => {
    careerComponentRef.current.focus();

    if (isDisabled) {
      setSelectedPrefix("");
    }
  }, [isDisabled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsInputActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      <div className="relative" ref={containerRef}>
        <input
          ref={careerComponentRef}
          value={!isDisabled ? selectedCareer : ""}
          type="text"
          placeholder="Nombre de la carrera"
          disabled={isDisabled}
          onFocus={(e) => setIsInputActive(true)}
          onChange={(e) => {
            setSelectedCareer(e.target.value);
          }}
          className={`ml-1 w-96 rounded-3xl border-2 p-2 text-xl text-black/85 ${
            isDisabled
              ? "disabled:cursor-not-allowed disabled:bg-slate-100"
              : "hover:cursor-pointer hover:border-black"
          }`}
        />

        <CareersMenu
          isInputActive={isInputActive}
          activeCareerType={activeCareerType}
          careerExamples={careerExamples}
          setSelectedCareer={setSelectedCareer}
          setSelectedPrefix={setSelectedPrefix}
          setActiveCareerType={setActiveCareerType}
          setIsInputActive={setIsInputActive}
        />
      </div>
    </div>
  );
}
