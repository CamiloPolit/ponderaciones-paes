"use client";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";

export default function Simulador() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [isCareerSelected, setIsCareerSelected] = useState(false);

  const labels = [
    "Nem",
    "Ranking",
    "M1",
    "M2",
    "Lectura",
    "Ciencias",
    "Historia",
    "Send",
  ];

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="w-11/12 rounded-2xl border-2 border-gray-300 bg-gray-50 py-5 md:flex md:w-2/3 md:items-center md:justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="xs:px-7">
            <UniversitySearch
              selectedUniversity={selectedUniversity}
              setSelectedUniversity={setSelectedUniversity}
              matchedText={matchedText}
              setMatchedText={setMatchedText}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />

            <CarreerSearch
              careerComponentRef={careerComponentRef}
              isDisabled={isDisabled}
              selectedCareer={selectedCareer}
              setSelectedCareer={setSelectedCareer}
              setIsCareerSelected={setIsCareerSelected}
            />
          </div>
        </div>

        <SimulationTable labels={labels} />
      </motion.div>
    </div>
  );
}
