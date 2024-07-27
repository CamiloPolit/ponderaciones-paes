"use client";
import React, { useState } from "react";
import UniversitySearch from "../components/UniversitySearch";

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState<boolean>(false);
  const [matchedText, setMatchedText] = useState<string>("");
  return (
    <>
      <UniversitySearch
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
        matchedText={matchedText}
        setMatchedText={setMatchedText}
      />
    </>
  );
}
