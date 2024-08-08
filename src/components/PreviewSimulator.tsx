"use client";
import React, { useState, useRef, useEffect } from "react";
import UniversitySearch from "@/components/UniversitySearch";
import CareerSearch from "@/components/CarreerSearch";

export default function PreviewSimulator() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [isCareerSelected, setIsCareerSelected] = useState(false);

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
      />

      <CareerSearch
        careerComponentRef={careerComponentRef}
        isDisabled={isDisabled}
        selectedCareer={selectedCareer}
        setSelectedCareer={setSelectedCareer}
        setIsCareerSelected={setIsCareerSelected}
      />
    </>
  );
}
