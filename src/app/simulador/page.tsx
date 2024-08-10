"use client";
import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
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
  const [inputValue, setInputValue] = useState("");

  const [universityData, setUniversityData] = useState([]);
  const [careerData, setCareerData] = useState([]);

  const fetchUniversityData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}`,
    );
    const data = await response.json();
    return data;
  };

  const fetchCareerData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue}?carrera=${selectedCareer}`,
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // Establecer isCareerSelected en falso cuando cambie la universidad
    setIsCareerSelected(false);

    if (selectedUniversity && selectedCareer) {
      fetchCareerData().then((data) => {
        setCareerData(data);
      });
    } else if (selectedUniversity && !selectedCareer) {
      fetchUniversityData().then((data) => {
        setUniversityData(data);
        setCareerData(data); // Cargar todas las carreras cuando se seleccione solo la universidad
      });
    }
  }, [selectedUniversity]); // Solo depende de selectedUniversity para cambiar isCareerSelected

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
    <div className="flex h-[87vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="w-11/12 rounded-xl border-[1px] border-gray-300 py-5 md:flex md:w-2/3 md:items-center md:justify-center"
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
              inputValue={inputValue}
              setInputValue={setInputValue}
            />

            <CarreerSearch
              careerComponentRef={careerComponentRef}
              isDisabled={isDisabled}
              selectedCareer={selectedCareer}
              setSelectedCareer={setSelectedCareer}
              setIsCareerSelected={setIsCareerSelected}
              careerData={careerData}
            />
          </div>
        </div>

        <SimulationTable labels={labels} />
      </motion.div>
    </div>
  );
}
