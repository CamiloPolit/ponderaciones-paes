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
      <div className="relative flex h-screen flex-col items-center justify-center bg-stone-950">
        <h1 className="py-3 text-7xl text-white">CUENTA REGRESIVA</h1>
        <h2 className="py-4 text-6xl text-white">PAES 2024</h2>
        <Countdown supressHydratationWarning />
      </div>

      <main className="flex h-screen flex-col items-center justify-center">
        <h1 className="pb-10 text-5xl text-slate-800">Pondera Aquí:</h1>
        <div className="flex w-2/3 items-center justify-center rounded-3xl bg-white py-5">
          <div className="flex flex-col items-center justify-center">
            <div className="px-5">
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
