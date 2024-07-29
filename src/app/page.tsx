"use client";

import React, { useState, useRef } from "react";
import UniversitySearch from "../components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";
import Countdown from "@/components/CountDown";

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
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
    <>
      <Countdown supressHydratationWarning />

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
    </>
  );
}
