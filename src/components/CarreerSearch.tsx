import React, { useEffect, useState, useRef } from "react";
import { MdBlock } from "react-icons/md";
import CareersMenu from "./CareersMenu";

export default function CareerSearch({
  isDisabled,
  careerComponentRef,
  selectedCareer,
  setSelectedCareer,
  setIsCareerSelected,
  setUniversityData,
  filteredCareers,
  setFilteredCareers,
  universityData,
  mainCareerLogo,
  setMainCareerLogo,
  universityDataLoading,
}) {
  const [activeCareerType, setActiveCareerType] = useState("Todo");
  const [isInputActive, setIsInputActive] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isDisabled) {
      if (selectedCareer) {
        setSelectedCareer("");
      }
      setMainCareerLogo("");
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
        {!mainCareerLogo ? (
          <MdBlock size="40px" className="text-gray-500" />
        ) : (
          <img
            className="max-h-10 max-w-10"
            src={`careerIcons/${mainCareerLogo}.png`}
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
          onFocus={(e) => {
            setIsInputActive(true);
            setActiveCareerType("Todo");
            setFilteredCareers(universityData);
          }}
          onChange={(e) => {
            setSelectedCareer(e.target.value);
            setFilteredCareers(universityData);
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
          universityData={universityData}
          setUniversityData={setUniversityData}
          setSelectedCareer={setSelectedCareer}
          setMainCareerLogo={setMainCareerLogo}
          setActiveCareerType={setActiveCareerType}
          setIsInputActive={setIsInputActive}
          setIsCareerSelected={setIsCareerSelected}
          filteredCareers={filteredCareers}
          setFilteredCareers={setFilteredCareers}
          universityDataLoading={universityDataLoading}
        />
      </div>
    </div>
  );
}
