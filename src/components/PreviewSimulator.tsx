"use client";
import React, { useState, useRef, useEffect } from "react";
import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";

export default function PreviewSimulator() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [isCareerSelected, setIsCareerSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [universityData, setUniversityData] = useState([]);
  const [careerData, setCareerData] = useState([]);

  const fetchUniversityData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}`,
    );
    const data = await response.json();
    return data;
  };

  const fetchCareerData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue}?carrera=${selectedCareer}`,
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // Establecer isCareerSelected en falso cuando cambie la universidad
    setIsCareerSelected(false);

    if (selectedUniversity && selectedCareer) {
      fetchCareerData().then((data) => {
        setCareerData(data);
      });
    } else if (selectedUniversity && !selectedCareer) {
      fetchUniversityData().then((data) => {
        setUniversityData(data);
        setCareerData(data); // Cargar todas las carreras cuando se seleccione solo la universidad
      });
    }
  }, [selectedUniversity]); // Solo depende de selectedUniversity para cambiar isCareerSelected

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
        careerData={careerData}
      />
    </>
  );
}
