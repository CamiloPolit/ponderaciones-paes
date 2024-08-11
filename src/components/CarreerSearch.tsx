import React, { useEffect, useState, useRef } from "react";
import { MdBlock } from "react-icons/md";
import CareersMenu from "./CareersMenu";

export default function CareerSearch({
  isDisabled,
  careerComponentRef,
  selectedCareer,
  setSelectedCareer,
  setIsCareerSelected,
  universityData,
}) {
  const [activeCareerType, setActiveCareerType] = useState<string>("Todo");
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [selectedPrefix, setSelectedPrefix] = useState<string>("");
  const containerRef = useRef(null);

  useEffect(() => {
    careerComponentRef.current.focus();
    setSelectedCareer("");

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
            src={`careerIcons/${selectedPrefix}.png`}
            alt="Logo Carrera"
            draggable="false"
          />
        )}
      </div>

      <div className="relative" ref={containerRef}>
        <input
          ref={careerComponentRef}
          value={!isDisabled ? selectedCareer : ""}
          type="text"
          readOnly
          disabled={isDisabled}
          onFocus={(e) => setIsInputActive(true)}
          onChange={(e) => {
            setSelectedCareer(e.target.value);
          }}
          className={`xs:text-xl ml-1 w-64 rounded-xl border-2 p-2 text-[1rem] text-black/85 sm:w-96 ${
            isDisabled
              ? "disabled:cursor-not-allowed disabled:bg-stone-200"
              : "hover:cursor-pointer hover:border-black"
          }`}
        />

        <CareersMenu
          isInputActive={isInputActive}
          activeCareerType={activeCareerType}
          careerExamples={universityData}
          setSelectedCareer={setSelectedCareer}
          setSelectedPrefix={setSelectedPrefix}
          setActiveCareerType={setActiveCareerType}
          setIsInputActive={setIsInputActive}
          setIsCareerSelected={setIsCareerSelected}
        />
      </div>
    </div>
  );
}
