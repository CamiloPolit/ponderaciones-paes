"use client";
import React, { useState, useRef, useEffect } from "react";
import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import LocationMenu from "@/components/LocationMenu";
import useFetchCareerData from "@/hooks/useFetchCareerData";
import useFetchUniversityData from "@/hooks/useFetchUniversityData";

export default function PreviewSimulator() {
  const [imageSrc, setImageSrc] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [isCareerSelected, setIsCareerSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLocationUnique, setIsLocationUnique] = useState(true);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState("Selecciona la sede");

  const [filteredCareers, setFilteredCareers] = useState([]);
  const [mainCareerLogo, setMainCareerLogo] = useState("");

  const [useType, setUseType] = useState("Simulador");
  const [searchType, setSearchType] = useState(
    "Búsqueda por Universidad y Carrera",
  );

  const {
    careerData,
    setCareerData,
    careerDataLoading,
    careerDataError,
    fetchCareerData,
  } = useFetchCareerData();
  const {
    universityData,
    setUniversityData,
    universityDataLoading,
    universityDataError,
    fetchUniversityData,
  } = useFetchUniversityData();

  useEffect(() => {
    if (selectedUniversity) {
      sessionStorage.setItem("University", matchedText);
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (isCareerSelected) {
      sessionStorage.setItem("Career", selectedCareer);
    }
  }, [isCareerSelected]);

  useEffect(() => {
    setCareerData([]);

    setPosition("Selecciona la sede");

    if (selectedUniversity && selectedCareer) {
      fetchCareerData(inputValue, selectedCareer).then((data) => {
        setCareerData(data);

        sessionStorage.getItem("Career") &&
          setMainCareerLogo(data[0].area_conocimiento);

        sessionStorage.getItem("Career") &&
          fetchUniversityData(inputValue, searchType).then((data) => {
            setUniversityData(data);
            setFilteredCareers(data);
          });

        const newLocations = data.map((item) => item.nomb_sede);
        setLocations(newLocations);
        setIsDataLoaded(true);

        newLocations.length === 1 && setPosition(newLocations[0]);

        const location = sessionStorage.getItem("Location");
        location && setPosition(location);

        setIsLocationUnique(newLocations.length === 1);
      });
    } else if (selectedUniversity && !selectedCareer) {
      fetchUniversityData(inputValue, searchType).then((data) => {
        setUniversityData(data);
        setFilteredCareers(data);
        setCareerData(data);
      });
    }
  }, [selectedUniversity, selectedCareer, searchType]);

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
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        setIsCareerSelected={setIsCareerSelected}
      />

      <CarreerSearch
        careerComponentRef={careerComponentRef}
        isDisabled={isDisabled}
        selectedCareer={selectedCareer}
        setSelectedCareer={setSelectedCareer}
        setIsCareerSelected={setIsCareerSelected}
        universityData={universityData}
        setUniversityData={setUniversityData}
        filteredCareers={filteredCareers}
        setFilteredCareers={setFilteredCareers}
        mainCareerLogo={mainCareerLogo}
        setMainCareerLogo={setMainCareerLogo}
        universityDataLoading={universityDataLoading}
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
