"use client";
import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";
import LocationMenu from "@/components/LocationMenu";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Simulador() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [isCareerSelected, setIsCareerSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLocationUnique, setIsLocationUnique] = useState(true);

  const [universityData, setUniversityData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState("Selecciona la sede");

  const fetchUniversityData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}`,
    );
    const data = await response.json();
    return data;
  };

  const fetchCareerData = async () => {
    const response = await fetch(
      `/api/universidades/${inputValue.toUpperCase().replace(/ /g, "_")}?carrera=${selectedCareer}`,
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    setCareerData([]);
    setPosition("Selecciona la sede");

    if (selectedUniversity && selectedCareer) {
      fetchCareerData().then((data) => {
        setCareerData(data);

        const newLocations = data.map((item) => item.nomb_sede);
        setLocations(newLocations);
        setIsLocationUnique(newLocations.length === 1);
      });
    } else if (selectedUniversity && !selectedCareer) {
      fetchUniversityData().then((data) => {
        setUniversityData(data);
        setCareerData(data);
      });
    }
  }, [selectedUniversity, selectedCareer]);

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
              universityData={universityData}
            />

            <div className="flex items-center justify-center gap-2 font-semibold">
              <Switch id="NEM-switch" />
              <label
                htmlFor="NEM-switch"
                className="scroll-m-20 text-sm font-semibold tracking-tight"
              >
                Ingresar NEM como nota (Escala de 1 al 7)
              </label>
            </div>
            <Separator className="my-4 w-full" />

            {!isLocationUnique && (
              <div className="flex items-center justify-center">
                <p className="px-2 text-[1.15rem] font-semibold">Sede:</p>
                <LocationMenu
                  locations={locations}
                  selectedCareer={selectedCareer}
                  position={position}
                  setPosition={setPosition}
                />
              </div>
            )}
          </div>
        </div>

        <SimulationTable labels={labels} />
      </motion.div>
    </div>
  );
}
