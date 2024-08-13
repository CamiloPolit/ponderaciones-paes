"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";
import LocationMenu from "@/components/LocationMenu";

const labels = [
  "Nem",
  "Ranking",
  "M1",
  "M2",
  "Lectura",
  "Ciencias",
  "Historia",
];

export default function Simulador() {
  const { toast } = useToast();

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
  const [filteredCareers, setFilteredCareers] = useState([]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState("Selecciona la sede");

  const [areElectivesFilled, setAreElectivesFilled] = useState(false);

  const weightedInputs = useRef({});

  // Doesn't matter the value of toastTrigger, every time it changes, the toast'll apappear
  const [toastTrigger, setToastTrigger] = useState(0);

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

  const handleSimulation = () => {
    let isValid = true;

    labels.forEach((label) => {
      if (weightedInputs.current[label].disabled) {
        return;
      }

      let value = Number(weightedInputs.current[label].value);

      if (isNaN(value) || value < 100 || value > 1000) {
        isValid = false;
      }
    });

    if (!isValid) {
      setToastTrigger((prev) => prev + 1);
    } else {
      console.log("Todos los campos son validos");
    }
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
        setIsDataLoaded(true);
      });
    } else if (selectedUniversity && !selectedCareer) {
      fetchUniversityData().then((data) => {
        setUniversityData(data);
        setFilteredCareers(data);
        setCareerData(data);
      });
    }
  }, [selectedUniversity, selectedCareer]);

  useEffect(() => {
    toastTrigger &&
      toast({
        variant: "destructive",
        title: "¡Verifica los datos!",
        description:
          "Tienes datos que no son válidos, por favor, revisa que cumpla con la escala requerida.",
      });
  }, [toastTrigger]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 flex h-[110vh] flex-col items-center md:mt-0 md:h-[87vh] md:justify-center"
      >
        <div className="flex w-11/12 items-center justify-center">
          <div className="w-full gap-10 rounded-xl border-[1px] border-gray-300 py-5 md:flex md:w-2/3 md:items-center md:justify-center">
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
                  setUniversityData={setUniversityData}
                  filteredCareers={filteredCareers}
                  setFilteredCareers={setFilteredCareers}
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
                        position={position}
                        setPosition={setPosition}
                      />
                    </div>
                    <Separator className="my-4 w-full" />
                  </>
                )}

                {isDataLoaded && (
                  <div className="my-5">
                    <div className="m-auto my-4 flex w-11/12 items-center gap-3">
                      <Badge
                        variant="outline"
                        className="h-8 min-w-20 bg-lime-100"
                      ></Badge>
                      <p>=</p>
                      <p className="text-sm font-medium leading-none text-stone-800">
                        Debes rendir esta prueba obligatoriamente.
                      </p>
                    </div>
                  </div>
                )}

                {areElectivesFilled && (
                  <div className="my-5">
                    <div className="m-auto flex w-11/12 items-center gap-3">
                      <Badge
                        variant="outline"
                        className="h-8 min-w-20 bg-yellow-100"
                      ></Badge>
                      <p>=</p>
                      <p className="text-sm font-medium leading-none text-stone-800">
                        Puedes escoger cuál rendir, en caso <br /> de rendir
                        ambas, se considerará <br />
                        el puntaje máximo.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <SimulationTable
              labels={labels}
              careerData={careerData}
              isDataLoaded={isDataLoaded}
              setAreElectivesFilled={setAreElectivesFilled}
              areElectivesFilled={areElectivesFilled}
              toastTrigger={toastTrigger}
              setToastTrigger={setToastTrigger}
              weightedInputs={weightedInputs}
            />
          </div>
        </div>
        <button
          onClick={handleSimulation}
          className="my-2 w-1/3 rounded-md bg-stone-950 p-3 text-sm font-medium leading-none text-white hover:bg-stone-900"
        >
          Hacer Simulación
        </button>
      </motion.div>
      <Toaster />
    </>
  );
}
