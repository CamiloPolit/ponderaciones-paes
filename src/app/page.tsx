"use client";
import React, { useState, useRef } from "react";
import UniversitySearch from "../components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState<boolean>(false);
  const [matchedText, setMatchedText] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const careerComponentRef = useRef(null);

  const labels = [
    "Nem",
    "Ranking",
    "M1",
    "M2",
    "Competencia lectora",
    "Ciencias",
    "Historia",
    "Send",
  ];

  return (
    <main className="h-screen">
      <div className="flex w-2/3 items-center justify-center rounded-3xl bg-white py-5">
        <div className="flex flex-col items-center justify-center">
          <h1>Pondera Aquí:</h1>
          <div className="">
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
        </div>

        <SimulationTable labels={labels} />
      </div>
    </main>
  );
}
