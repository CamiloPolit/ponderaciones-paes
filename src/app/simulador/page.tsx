"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import universities from "../universities.json";
import React, { useState, useRef, useEffect, useMemo } from "react";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";
import LocationMenu from "@/components/LocationMenu";
import OptionTabs from "@/components/OptionTabs";
import ResultsPreview from "@/components/ResultsPreview";
import OptionsPreview from "@/components/OptionsPreview";
import StatisticsPreview from "@/components/StatisticsPreview";
import GeneralTable from "@/components/GeneralTable";
import CareerSimulationPreview from "@/components/CareerSimulationPreview";
import useFetchUniversityData from "@/hooks/useFetchUniversityData";
import useFetchCareerData from "@/hooks/useFetchCareerData";
import CareerFilterSearch from "@/components/CareerFilterSearch";

const labels = [
  "Nem",
  "Ranking",
  "M1",
  "M2",
  "Lectura",
  "Ciencias",
  "Historia",
];

const labelToDataKey = {
  Nem: "nem",
  Ranking: "ranking",
  M1: "m1",
  M2: "m2",
  Lectura: "clec",
  Ciencias: "cien",
  Historia: "hsco",
};

const universityList = universities.Universities;

export default function Simulador() {
  const {
    careerData,
    setCareerData,
    careerDataLoading,
    careerDataError,
    fetchCareerData,
  } = useFetchCareerData();
  const {
    universityData,
    setUniversityData,
    universityDataLoading,
    universityDataError,
    fetchUniversityData,
  } = useFetchUniversityData();

  const { toast } = useToast();
  const { width, height } = useWindowSize();

  const [imageSrc, setImageSrc] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [isCareerSelected, setIsCareerSelected] = useState(false);
  const [mainCareerLogo, setMainCareerLogo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLocationUnique, setIsLocationUnique] = useState(true);

  const [activeTab, setActiveTab] = useState("Simulador");
  const options = ["Simulador", "Opciones avanzadas"];

  const [useType, setUseType] = useState("Simulador");
  const [searchType, setSearchType] = useState(
    "Búsqueda por Universidad y Carrera",
  );

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState("Selecciona la sede");

  const [areElectivesFilled, setAreElectivesFilled] = useState(false);

  const weightedInputs = useRef({});

  const [totalWeightedScore, setTotalWeightedScore] = useState(0);

  const [showCalculations, setShowCalculations] = useState(true);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);

  const [displayConfetti, setDisplayConfetti] = useState(false);

  const [showCareerInfoCards, setShowCareerInfoCards] = useState(false);

  // Doesn't matter the value of toastTrigger, every time it changes, the toast'll apappear
  const [toastTrigger, setToastTrigger] = useState(0);

  const [filteredCareers, setFilteredCareers] = useState([]);

  const [filterSelectedCareer, setFilterSelectedCareer] = useState(false);

  const filteredCareerData = useMemo(() => {
    if (!careerData || !careerData.length) {
      return [];
    }
    return careerData.filter((career) => career.nomb_sede === position);
  }, [careerData, position]);

  useEffect(() => {
    setCareerData([]);

    setPosition("Selecciona la sede");

    if (selectedUniversity && selectedCareer) {
      fetchCareerData(inputValue, selectedCareer).then((data) => {
        setCareerData(data);

        sessionStorage.getItem("Career") &&
          setMainCareerLogo(data[0].area_conocimiento);

        sessionStorage.getItem("Career") &&
          fetchUniversityData(inputValue, searchType).then((data) => {
            setUniversityData(data);
            setFilteredCareers(data);
          });

        const newLocations = data.map((item) => item.nomb_sede);
        setLocations(newLocations);
        setIsDataLoaded(true);

        newLocations.length === 1 && setPosition(newLocations[0]);

        const location = sessionStorage.getItem("Location");
        location && setPosition(location);

        setIsLocationUnique(newLocations.length === 1);
      });
    } else if (selectedUniversity && !selectedCareer) {
      fetchUniversityData(inputValue, searchType).then((data) => {
        setUniversityData(data);
        setFilteredCareers(data);
        setCareerData(data);
      });
    }
  }, [selectedUniversity, selectedCareer, searchType]);

  useEffect(() => {
    toastTrigger &&
      toast({
        variant: "destructive",
        title: "¡Verifica los datos!",
        description:
          "Tienes datos que no son válidos, por favor, revisa que cumpla con la escala requerida (100 a 1000).",
      });
  }, [toastTrigger]);

  useEffect(() => {
    const university = sessionStorage.getItem("University");
    const career = sessionStorage.getItem("Career");

    if (university !== null && career !== null) {
      setSelectedUniversity(true);
      setSelectedCareer(career);
      setMatchedText(university);
      setIsDisabled(false);
      setInputValue(university);
      setIsCareerSelected(true);
      setIsDataLoaded(true);

      let match = universityList.find((suggestion) =>
        suggestion.name.toLowerCase().startsWith(university.toLowerCase()),
      );

      setImageSrc(
        match
          ? "/logos/".concat(
              match.abbreviation?.toLocaleLowerCase().concat(".png"),
            )
          : "",
      );
    }
  }, []);

  const handleSimulation = () => {
    let isValid = true;
    let totalWeightedScoreAux = 0;
    let electiveMaxScore = 0;

    labels.forEach((label) => {
      if (weightedInputs.current[label].disabled) {
        return;
      }

      let value = Number(weightedInputs.current[label].value);
      console.log(value);

      if (
        areElectivesFilled &&
        (label === "Ciencias" || label === "Historia")
      ) {
        if (value) {
          electiveMaxScore = Math.max(electiveMaxScore, value);
          isValid = true;
        }
        return;
      }

      if (isNaN(value) || value < 100 || value > 1000) {
        isValid = false;
      } else {
        const dataKey = labelToDataKey[label];
        const weight = filteredCareerData[0]?.[dataKey];

        if (weight) {
          totalWeightedScoreAux += (value * weight) / 100;
        }
      }
    });

    if (electiveMaxScore > 0) {
      const electiveLabel =
        electiveMaxScore === weightedInputs.current["Ciencias"].value
          ? "cien"
          : "hsco";
      const electiveWeight = filteredCareerData[0]?.[electiveLabel];
      if (electiveWeight) {
        totalWeightedScoreAux += (electiveMaxScore * electiveWeight) / 100;
      }
    }

    setTotalWeightedScore(totalWeightedScoreAux);

    if (!isLocationUnique && position === "Selecciona la sede") {
      toast({
        variant: "destructive",
        title: "Debes seleccionar una sede",
        description:
          "No tienes ninguna sede seleccionada, selecciona una para continuar.",
      });
      return;
    }

    if (!isValid || !isCareerSelected) {
      setToastTrigger((prev) => prev + 1);
    } else {
      setShowCalculations(false);
      setShowSimulation(true);
      sessionStorage.removeItem("University");
      sessionStorage.removeItem("Career");
      sessionStorage.removeItem("Location");

      if (totalWeightedScoreAux >= filteredCareerData[0].puntaje_corte) {
        setDisplayConfetti(true);
      }
    }
  };

  useEffect(() => {
    setIsCareerSelected(
      searchType === "Búsqueda por Universidad y Carrera" &&
        selectedCareer !== "",
    );
    console.log("Estoy cargando por primera vez");
    searchType !== "Búsqueda por Universidad y Carrera" &&
      setSelectedCareer("");
    setMainCareerLogo("");
    setIsDataLoaded(false);
  }, [searchType]);

  const handleUniversitySimulation = () => {
    let isValid = true;
    const mandatoryExams = ["Nem", "Ranking", "M1", "Lectura"];
    let cienciasValue = 0;
    let historiaValue = 0;

    labels.forEach((label) => {
      let value = Number(weightedInputs.current[label].value);

      if (weightedInputs.current[label].disabled) {
        return;
      }

      if (mandatoryExams.includes(label) && !value) {
        isValid = false;
        return;
      }

      if (value < 100 || value > 1000) {
        if (value == 0) {
          return;
        }

        isValid = false;
      }

      if (label === "Ciencias") {
        cienciasValue = value;
      } else if (label === "Historia") {
        historiaValue = value;
      }
    });

    if (cienciasValue === 0 && historiaValue === 0) {
      isValid = false;
    }

    if (!isValid || !selectedUniversity) {
      toast({
        variant: "destructive",
        title: "¡Verifica los datos!",
        description:
          "Revisa que los datos cumplan con la escala requerida (100 a 1000), además, recuerda simular en todas las pruebas obligatorias, y en al menos una electiva.",
      });
    } else {
      setShowCalculations(false);
      setShowCareerInfoCards(true);
      sessionStorage.removeItem("University");
      sessionStorage.removeItem("Career");
      sessionStorage.removeItem("Location");
    }

    console.log(universityData);
  };

  return (
    <>
      {showCalculations && (
        <motion.div
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 flex h-[110vh] flex-col items-center md:mt-0 md:h-[87vh] md:justify-center"
        >
          <OptionTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={options}
          />

          {activeTab === "Simulador" && (
            <div className="flex w-11/12 items-center justify-center">
              <div className="min-h-[300px] w-full gap-10 rounded-b-xl border-[1px] border-gray-300 py-5 md:flex md:w-2/3 md:items-center md:justify-center">
                {searchType === "Búsqueda por Universidad y Carrera" && (
                  <div className="flex flex-col items-center justify-center md:flex-row md:gap-10">
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
                        imageSrc={imageSrc}
                        setImageSrc={setImageSrc}
                        setIsCareerSelected={setIsCareerSelected}
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
                        mainCareerLogo={mainCareerLogo}
                        setMainCareerLogo={setMainCareerLogo}
                        universityDataLoading={universityDataLoading}
                      />

                      <Separator className="m-auto my-4 w-full" />
                      {!isLocationUnique && isCareerSelected && (
                        <>
                          <div className="flex items-center justify-center">
                            <p className="px-2 text-[1.15rem] font-semibold">
                              Sede:
                            </p>
                            <LocationMenu
                              locations={locations}
                              position={position}
                              setPosition={setPosition}
                            />
                          </div>
                          <Separator className="my-4 w-11/12" />
                        </>
                      )}

                      {isDataLoaded &&
                        isCareerSelected &&
                        !careerDataLoading && (
                          <div className="my-5">
                            <div className="m-auto my-4 flex w-11/12 items-center gap-3">
                              <Badge
                                variant="outline"
                                className="h-8 min-w-20 border border-stone-400 bg-green-300"
                              ></Badge>
                              <p>=</p>
                              <p className="text-sm font-medium leading-none text-stone-800">
                                Debes rendir esta prueba obligatoriamente.
                              </p>
                            </div>
                          </div>
                        )}

                      {areElectivesFilled &&
                        isCareerSelected &&
                        !careerDataLoading && (
                          <div className="my-5">
                            <div className="m-auto flex w-11/12 items-center gap-3">
                              <Badge
                                variant="outline"
                                className="h-8 min-w-20 border border-stone-400 bg-yellow-300"
                              ></Badge>
                              <p>=</p>
                              <p className="text-sm font-medium leading-none text-stone-800">
                                Puedes escoger cuál rendir, en caso <br /> de
                                rendir ambas, se considerará <br />
                                el puntaje máximo.
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                    <SimulationTable
                      labels={labels}
                      careerData={careerData}
                      isDataLoaded={isDataLoaded}
                      setAreElectivesFilled={setAreElectivesFilled}
                      areElectivesFilled={areElectivesFilled}
                      setToastTrigger={setToastTrigger}
                      weightedInputs={weightedInputs}
                      isCareerSelected={isCareerSelected}
                    />
                  </div>
                )}

                {searchType === "Búsqueda por Universidad" && (
                  <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
                    <div>
                      <div className="mt-10">
                        <UniversitySearch
                          selectedUniversity={selectedUniversity}
                          setSelectedUniversity={setSelectedUniversity}
                          matchedText={matchedText}
                          setMatchedText={setMatchedText}
                          isDisabled={isDisabled}
                          setIsDisabled={setIsDisabled}
                          inputValue={inputValue}
                          setInputValue={setInputValue}
                          imageSrc={imageSrc}
                          setImageSrc={setImageSrc}
                          setIsCareerSelected={setIsCareerSelected}
                        />
                      </div>

                      <Separator className="my-10 w-full" />

                      <div className="my-5">
                        <div className="m-auto my-4 flex w-11/12 items-center gap-3">
                          <Badge
                            variant="outline"
                            className="h-8 min-w-20 border border-stone-400 bg-green-300"
                          ></Badge>
                          <p>=</p>
                          <p className="text-sm font-medium leading-none text-stone-800">
                            Debes rendir esta prueba obligatoriamente.
                          </p>
                        </div>
                      </div>
                      <div className="my-5">
                        <div className="m-auto my-4 flex w-11/12 items-center gap-3">
                          <Badge
                            variant="outline"
                            className="h-8 min-w-20 border border-stone-400 bg-blue-300"
                          ></Badge>
                          <p>=</p>
                          <p className="text-sm font-medium leading-none text-stone-800">
                            Obligatoria sólo para algunas carreras.
                          </p>
                        </div>
                      </div>
                      <div className="my-5">
                        <div className="m-auto my-4 flex w-11/12 items-center gap-3">
                          <Badge
                            variant="outline"
                            className="h-8 min-w-20 border border-stone-400 bg-yellow-300"
                          ></Badge>
                          <p>=</p>
                          <p className="text-sm font-medium leading-none text-stone-800">
                            Debes rendir al menos una de estas pruebas.
                          </p>
                        </div>
                      </div>
                    </div>
                    <GeneralTable
                      labels={labels}
                      setToastTrigger={setToastTrigger}
                      weightedInputs={weightedInputs}
                      selectedUniversity={selectedUniversity}
                    />
                  </div>
                )}

                {searchType === "Búsqueda por Carrera" && (
                  <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
                    <div className="mt-3">
                      <CareerFilterSearch
                        filterSelectedCareer={filterSelectedCareer}
                        setFilterSelectedCareer={setFilterSelectedCareer}
                        matchedText={matchedText}
                        setMatchedText={setMatchedText}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        imageSrc={imageSrc}
                        setImageSrc={setImageSrc}
                      />
                    </div>
                    <GeneralTable
                      labels={labels}
                      setToastTrigger={setToastTrigger}
                      weightedInputs={weightedInputs}
                      selectedUniversity={filterSelectedCareer}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "Opciones avanzadas" && (
            <OptionsPreview
              useType={useType}
              setUseType={setUseType}
              searchType={searchType}
              setSearchType={setSearchType}
              toast={toast}
            />
          )}

          <button
            onClick={
              searchType == "Búsqueda por Universidad"
                ? handleUniversitySimulation
                : handleSimulation
            }
            disabled={activeTab === "Opciones avanzadas"}
            className={`my-2 w-1/3 rounded-md ${activeTab === "Simulador" ? "bg-stone-950 text-white hover:bg-stone-900" : "disabled:cursor-default disabled:bg-transparent disabled:text-transparent"} p-3 text-sm font-medium leading-none`}
          >
            Hacer Simulación
          </button>
        </motion.div>
      )}

      {showCareerInfoCards && (
        <CareerSimulationPreview
          universityData={universityData}
          areElectivesFilled={areElectivesFilled}
          setShowCareerInfoCards={setShowCareerInfoCards}
          setAreElectivesFilled={setAreElectivesFilled}
          setShowStatistics={setShowStatistics}
          setCareerData={setCareerData}
          setPosition={setPosition}
          setShowCalculations={setShowCalculations}
        />
      )}

      {showSimulation && (
        <ResultsPreview
          totalWeightedScore={totalWeightedScore}
          setShowSimulation={setShowSimulation}
          setShowCalculations={setShowCalculations}
          setShowStatistics={setShowStatistics}
          filteredCareerData={filteredCareerData}
          setDisplayConfetti={setDisplayConfetti}
        />
      )}

      {displayConfetti && (
        <Confetti
          width={width}
          recycle={false}
          numberOfPieces={1500}
          gravity={0.45}
          opacity={0.55}
          height={height}
        />
      )}

      {showStatistics && (
        <StatisticsPreview
          setShowStatistics={setShowStatistics}
          setShowSimulation={setShowSimulation}
          setShowCalculations={setShowCalculations}
          setDisplayConfetti={setDisplayConfetti}
          selectedCareer={selectedCareer}
          careerData={careerData}
          filteredCareerData={filteredCareerData}
          imageSrc={imageSrc}
          searchType={searchType}
          setShowCareerInfoCards={setShowCareerInfoCards}
        />
      )}
      <Toaster />
    </>
  );
}
