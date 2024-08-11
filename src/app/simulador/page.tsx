"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";
import LocationMenu from "@/components/LocationMenu";

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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState("Selecciona la sede");

  const [areElectivesFilled, setAreElectivesFilled] = useState(false);

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
    setIsDataLoaded(false);
    setCareerData([]);

    setPosition("Selecciona la sede");

    if (selectedUniversity && selectedCareer) {
      fetchCareerData().then((data) => {
        setCareerData(data);

        const newLocations = data.map((item) => item.nomb_sede);
        setLocations(newLocations);
        setIsLocationUnique(newLocations.length === 1);
        setIsDataLoaded(true);
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
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-[87vh] flex-col items-center justify-center"
    >
      <div className="w-11/12">
        <div
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="m-auto w-full gap-10 rounded-xl border-[1px] border-gray-300 py-5 md:flex md:w-2/3 md:items-center md:justify-center"
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
                  Ingresar NEM como nota (Escala de 1 al 7, <br /> con dos
                  cifras decimales separadas por coma)
                </label>
              </div>
              <Separator className="my-4 w-full" />
              {!isLocationUnique && (
                <>
                  <div className="flex items-center justify-center">
                    <p className="px-2 text-[1.15rem] font-semibold">Sede:</p>
                    <LocationMenu
                      locations={locations}
                      selectedCareer={selectedCareer}
                      position={position}
                      setPosition={setPosition}
                    />
                  </div>
                  <Separator className="my-4 w-full" />
                </>
              )}

              {isDataLoaded && (
                <div className="my-2 flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="h-8 w-20 bg-lime-200"
                  ></Badge>
                  <p>=</p>
                  <p className="text-sm font-medium leading-none text-stone-800">
                    Debes rendir esta prueba obligatoriamente.
                  </p>
                </div>
              )}

              {areElectivesFilled && (
                <>
                  <div className="my-2 flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="h-8 w-20 bg-yellow-200"
                    ></Badge>
                    <p>=</p>
                    <p className="text-sm font-medium leading-none text-stone-800">
                      Puedes escoger cuál rendir, en caso de rendir
                      <br />
                      ambas, se escogerá el puntaje máximo.
                    </p>
                  </div>
                  <Separator className="my-4 w-full" />
                </>
              )}
            </div>
          </div>

          <SimulationTable
            labels={labels}
            careerData={careerData}
            isDataLoaded={isDataLoaded}
            setAreElectivesFilled={setAreElectivesFilled}
            areElectivesFilled={areElectivesFilled}
          />
        </div>
      </div>
      <button className="my-2 w-1/3 rounded-md bg-stone-950 p-3 text-sm font-medium leading-none text-white hover:bg-stone-900">
        Hacer Simulación
      </button>
    </motion.div>
  );
}
