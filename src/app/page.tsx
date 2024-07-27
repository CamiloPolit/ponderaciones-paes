"use client";
import React, { useState, useRef } from "react";
import UniversitySearch from "../components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState<boolean>(false);
  const [matchedText, setMatchedText] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const careerComponentRef = useRef(null);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1>Pondera Aquí:</h1>
      <div className="w-11/12 rounded-3xl bg-white py-5">
        <UniversitySearch
          selectedUniversity={selectedUniversity}
          setSelectedUniversity={setSelectedUniversity}
          matchedText={matchedText}
          setMatchedText={setMatchedText}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          careerComponentRef={careerComponentRef}
        />

        <CarreerSearch
          careerComponentRef={careerComponentRef}
          isDisabled={isDisabled}
          selectedUniversity={selectedUniversity}
        />
      </div>
    </main>
  );
}
