"use client";
import React, { useState } from "react";
import UniversitySearch from "../components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState<boolean>(false);
  const [matchedText, setMatchedText] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="w-11/12 rounded-3xl bg-white py-5">
        <UniversitySearch
          selectedUniversity={selectedUniversity}
          setSelectedUniversity={setSelectedUniversity}
          matchedText={matchedText}
          setMatchedText={setMatchedText}
          setIsDisabled={setIsDisabled}
        />

        <CarreerSearch isDisabled={isDisabled} />
      </div>
    </main>
  );
}
