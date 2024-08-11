"use client";
import React, { useState, useRef, useEffect } from "react";
import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import LocationMenu from "@/components/LocationMenu";

export default function PreviewSimulator() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [isCareerSelected, setIsCareerSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLocationUnique, setIsLocationUnique] = useState(true);

  const [universityData, setUniversityData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState("Selecciona la sede");

  const fetchUniversityData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}`,
    );
    const data = await response.json();
    return data;
  };

  const fetchCareerData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}?carrera=${selectedCareer}`,
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (selectedUniversity) {
      sessionStorage.setItem("University", matchedText);
    } else {
      sessionStorage.removeItem("University");
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (selectedUniversity) {
      sessionStorage.setItem("Career", selectedCareer);
    } else {
      sessionStorage.removeItem("Career");
    }
  }, [isCareerSelected]);

  useEffect(() => {
    setIsDataLoaded(false);
    setCareerData([]);

    setPosition("Selecciona la sede");

    if (selectedUniversity && selectedCareer) {
      fetchCareerData().then((data) => {
        setCareerData(data);

        const newLocations = data.map((item) => item.nomb_sede);
        setLocations(newLocations);
        setIsLocationUnique(newLocations.length === 1);
        setIsDataLoaded(true);
      });
    } else if (selectedUniversity && !selectedCareer) {
      fetchUniversityData().then((data) => {
        setUniversityData(data);
        setCareerData(data);
      });
    }
  }, [selectedUniversity, selectedCareer]);

  return (
    <>
      <UniversitySearch
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
        matchedText={matchedText}
        setMatchedText={setMatchedText}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <CarreerSearch
        careerComponentRef={careerComponentRef}
        isDisabled={isDisabled}
        selectedCareer={selectedCareer}
        setSelectedCareer={setSelectedCareer}
        setIsCareerSelected={setIsCareerSelected}
        universityData={universityData}
      />

      {!isLocationUnique && (
        <>
          <div className="flex items-center justify-center">
            <p className="px-2 text-[1.15rem] font-semibold">Sede:</p>
            <LocationMenu
              locations={locations}
              position={position}
              setPosition={setPosition}
            />
          </div>
        </>
      )}
    </>
  );
}
