"use client";
import React, { useState, useRef } from "react";
import UniversitySearch from "../components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";

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
        <div className="grid grid-cols-2">
          {labels.map((label) =>
            label === "Send" ? (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-2"
              >
                <p className="cursor-default opacity-0">This have opacity 0</p>
                <div className="h-12 w-20 cursor-pointer rounded-3xl border-2 bg-slate-600"></div>
              </div>
            ) : (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-2 px-6"
              >
                <p>{label}</p>
                <input
                  type="text"
                  className="w-20 rounded-3xl border-2 p-2 text-center text-xl text-black/85 hover:border-black"
                />
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
