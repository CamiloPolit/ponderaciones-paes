"use client";
import React, { useState, useRef } from "react";
import UniversitySearch from "@/components/UniversitySearch";
import CareerSearch from "@/components/CarreerSearch";

export default function PreviewSimulator() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);

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
      />
    </>
  );
}
