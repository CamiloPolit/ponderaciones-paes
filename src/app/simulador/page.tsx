"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

// const MapContainer = dynamic(() =>
//   import("react-leaflet").then((mod) => mod.MapContainer),
// );
// const TileLayer = dynamic(() =>
//   import("react-leaflet").then((mod) => mod.TileLayer),
// );

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import PieChartt from "@/components/PieChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UniversitySearch from "@/components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";
import LocationMenu from "@/components/LocationMenu";
import OptionTabs from "@/components/OptionTabs";
import OptionRow from "@/components/OptionRow";
import MaxScoresNumberCard from "@/components/MaxScoresNumberCard";
import AccreditationCard from "@/components/AccreditationCard";
import CareerScoresMetrics from "@/components/CareerScoresMetrics";
const UniversityMap = dynamic(() => import("@/components/UniversityMap"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

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

export default function Simulador() {
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

  const [universityData, setUniversityData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [position, setPosition] = useState("Selecciona la sede");

  const [areElectivesFilled, setAreElectivesFilled] = useState(false);

  const weightedInputs = useRef({});

  const [activeTab, setActiveTab] = useState("Simulador");
  const options = ["Simulador", "Opciones avanzadas"];

  const [useType, setUseType] = useState("Simulador");
  const [searchType, setSearchType] = useState(
    "Búsqueda por Universidad y Carrera",
  );

  const [totalWeightedScore, setTotalWeightedScore] = useState(0);

  const [showCalculations, setShowCalculations] = useState(true);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);

  const [displayConfetti, setDisplayConfetti] = useState(false);

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

  const filteredCareerData = useMemo(() => {
    return careerData.filter((career) => career.nomb_sede === position);
  }, [careerData, position]);

  const handleSimulation = () => {
    let isValid = true;
    let totalWeightedScoreAux = 0;

    labels.forEach((label) => {
      if (weightedInputs.current[label].disabled) {
        return;
      }

      let value = Number(weightedInputs.current[label].value);

      if (
        areElectivesFilled &&
        (label === "Ciencias" || label === "Historia")
      ) {
        if (!value) {
          isValid = false;
          return;
        }
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

    setTotalWeightedScore(totalWeightedScoreAux);

    if (!isValid || !isCareerSelected) {
      setToastTrigger((prev) => prev + 1);
    } else {
      setShowCalculations(false);
      setShowSimulation(true);

      if (totalWeightedScoreAux >= filteredCareerData[0].puntaje_corte) {
        setDisplayConfetti(true);
      }
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
        setIsDataLoaded(true);

        newLocations.length === 1 && setPosition(newLocations[0]);

        setIsLocationUnique(newLocations.length === 1);
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

  const [testScores, setTestScores] = useState({
    m1: 0,
    m2: 0,
    language: 0,
    science: 0,
    socialStudies: 0,
  });
  const [totalScore, setTotalScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [careerStats, setCareerStats] = useState({
    avgCorrectAnswers: {
      m1: 85,
      m2: 90,
      language: 90,
      science: 80,
      socialStudies: 75,
    },
    avgScores: {
      m1: 90,
      m2: 85,
      language: 92,
      science: 88,
      socialStudies: 80,
    },
    perfectScores: {
      m1: 10,
      m2: 15,
      language: 15,
      science: 8,
      socialStudies: 5,
    },
    tuition: 5000,
    annualCost: 10000,
    availableVacancies: 200,
    womenEnrolled: 40,
    lastWomanScore: 450,
    accreditationYears: 10,
    accreditationPeriod: "2020-2030",
    avgNEM: 450,
    rank: 25,
  });
  const calculateTotalScore = () => {
    const total =
      testScores.m1 +
      testScores.m2 +
      testScores.language +
      testScores.science +
      testScores.socialStudies;
    setTotalScore(total);
    calculateRank(total);
  };
  const calculateRank = (total) => {
    const rank = Math.floor(Math.random() * 100) + 1;
    setRank(rank);
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
              <div className="w-full gap-10 rounded-b-xl border-[1px] border-gray-300 py-5 md:flex md:w-2/3 md:items-center md:justify-center">
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
                      imageSrc={imageSrc}
                      setImageSrc={setImageSrc}
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
                          <p className="px-2 text-[1.15rem] font-semibold">
                            Sede:
                          </p>
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
          )}

          {activeTab === "Opciones avanzadas" && (
            <div className="flex min-h-[500px] w-11/12 justify-center md:min-h-[380px]">
              <div className="flex w-full flex-col items-center justify-center rounded-b-xl border-[1px] border-gray-300 py-10 md:w-2/3">
                <h1 className="mb-7 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 md:mb-8">
                  Opciones ⚙️
                </h1>
                <OptionRow
                  filter_type="Tipo de uso de la página"
                  options={["Simulador", "Mostrar sólo Estadísticas"]}
                  optionSelected={useType}
                  setOptionSelected={setUseType}
                />
                <OptionRow
                  filter_type="Tipo de búsqueda"
                  options={[
                    "Búsqueda por Universidad y Carrera",
                    "Búsqueda por Universidad",
                    "Búsqueda por Carrera",
                    "Búsqueda por Área de Conocimiento",
                  ]}
                  optionSelected={searchType}
                  setOptionSelected={setSearchType}
                />
                <Button
                  onClick={() =>
                    toast({
                      title: "Los cambios se han guardado correctamente",
                      description:
                        "La próxima vez que entres al simulador, se iniciará esta configuración por defecto.",
                    })
                  }
                  className="mt-10"
                >
                  Guardar como predeterminado al entrar a la página
                </Button>
              </div>
            </div>
          )}

          <button
            onClick={handleSimulation}
            disabled={activeTab === "Opciones avanzadas"}
            className={`my-2 w-1/3 rounded-md ${activeTab === "Simulador" ? "bg-stone-950 text-white hover:bg-stone-900" : "disabled:cursor-default disabled:bg-transparent disabled:text-transparent"} p-3 text-sm font-medium leading-none`}
          >
            Hacer Simulación
          </button>
        </motion.div>
      )}

      {showSimulation && (
        <div className="flex h-[80vh] items-center justify-center px-[20px] md:px-0">
          <Card className="bg-background w-full max-w-2xl rounded-lg p-4 shadow-md md:p-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Puntaje Simulado
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-black text-opacity-55">
                  Puntaje Simulado:
                </div>
                <div className="text-3xl font-bold">
                  {totalWeightedScore.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-black text-opacity-55">
                  Último Puntaje Matriculado:
                </div>
                <div className="text-3xl font-bold">
                  {filteredCareerData[0]?.puntaje_corte}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-black text-opacity-55">
                  Posición en la Lista:
                </div>
                <div className="text-3xl font-bold">12</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="items-center gap-2 text-lg font-semibold text-stone-700">
                  {totalWeightedScore > filteredCareerData[0]?.puntaje_corte
                    ? `✅ ¡Felicitaciones! Quedarías seleccionada/a en la carrera con una diferencia de ${(totalWeightedScore - filteredCareerData[0]?.puntaje_corte).toFixed(2)} puntos.`
                    : `❌ Lamentablemente no quedarías seleccionado/a en la carrera con el puntaje simulado, te faltarían ${(filteredCareerData[0]?.puntaje_corte - totalWeightedScore).toFixed(2)} puntos.`}
                </div>
              </div>
            </CardContent>
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                className="text-black hover:bg-gray-200"
                onClick={() => {
                  setShowSimulation(false);
                  setShowCalculations(true);
                }}
              >
                Volver
              </Button>
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => {
                  setShowSimulation(false);
                  setShowStatistics(true);
                }}
              >
                Ver Estadísticas
              </Button>
            </div>
          </Card>
        </div>
      )}

      {displayConfetti && (
        <Confetti
          width={width - 50}
          recycle={false}
          numberOfPieces={1500}
          gravity={0.2}
          opacity={0.55}
          height={height}
        />
      )}

      {showStatistics && (
        <div className="flex min-h-screen flex-col bg-neutral-50">
          <div className="flex flex-1 flex-col gap-8 p-6 md:p-10">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Información General</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
                  <h3 className="mb-2 text-lg font-bold">Matrícula</h3>
                  <p className="text-center text-xl font-bold md:text-4xl">
                    {filteredCareerData[0]?.formato_valores === "Pesos"
                      ? `$${filteredCareerData[0]?.valor_matricula}`
                      : `${filteredCareerData[0]?.valor_matricula} UF`}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
                  <h3 className="mb-2 text-center text-lg font-bold">
                    Arancel
                  </h3>
                  <p className="text-xl font-bold md:text-4xl">
                    {filteredCareerData[0]?.formato_valores === "Pesos"
                      ? `$${filteredCareerData[0]?.valor_arancel}`
                      : `${filteredCareerData[0]?.valor_arancel} UF`}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
                  <h3 className="mb-2 text-center text-lg font-bold">
                    Vacantes Admisión Regular
                  </h3>
                  <p className="text-xl font-bold md:text-4xl">
                    {filteredCareerData[0]?.vac_1er}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
                  <h3 className="mb-2 text-center text-lg font-bold">
                    Cupos BEA
                  </h3>
                  <p className="text-4xl font-bold">
                    {filteredCareerData[0]?.bea}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
                  <h3 className="mb-2 text-center text-lg font-bold">
                    Cupos PACE
                  </h3>
                  <p className="text-4xl font-bold">
                    {filteredCareerData[0]?.pace}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
                  <h3 className="mb-2 text-center text-lg font-bold">
                    Cupos +MC
                  </h3>

                  {filteredCareerData[0]?.mc == null ? (
                    <p className="text-center text-lg font-bold">No Aplica</p>
                  ) : (
                    <p className="text-4xl font-bold">
                      {filteredCareerData[0]?.mc}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Representatividad</h2>

              <div className="flex flex-col justify-center gap-10 md:flex-row">
                <div className="h-full max-w-[500px]">
                  <PieChartt
                    women_percentage={filteredCareerData[0]?.porcentaje_mujeres}
                    slots={filteredCareerData[0]?.vac_1er}
                    career={selectedCareer}
                  />
                </div>
                <div className="flex items-center justify-center rounded-lg border border-stone-300 bg-white p-4 shadow-sm">
                  <div className="flex max-w-[200px] flex-col items-center justify-center">
                    <h3 className="mb-2 text-center text-2xl font-bold">
                      Puntaje Corte Cupos +MC
                    </h3>
                    <p className="mb-5 text-2xl font-semibold">
                      {filteredCareerData[0]?.puntaje_corte_mujeres}
                    </p>
                    <img
                      src="careerIcons/women_in_stem.png"
                      alt="Women in STEM"
                      className=""
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Puntajes y Notas</h2>
              <div className="flex flex-col justify-evenly gap-5 md:flex-row md:gap-0">
                <CareerScoresMetrics
                  title="Métricas de Puntajes"
                  description="Puntaje Corte, Promedio, Mediano y Máximo de los alumnos que ingresaron a la carrera por admisión regular."
                  min={filteredCareerData[0]?.puntaje_corte}
                  mean={filteredCareerData[0]?.puntaje_promedio}
                  median={filteredCareerData[0]?.puntaje_mediana}
                  max={filteredCareerData[0]?.puntaje_maximo}
                />
                <MaxScoresNumberCard
                  title="Puntajes Máximos"
                  description="Cantidad de puntajes máximos en cada una de las pruebas en la carrera
          seleccionada."
                  clec={Math.trunc(careerData[0].clec_max)}
                  m1={Math.trunc(careerData[0].mate1_max)}
                  m2={Math.trunc(careerData[0].mate2_max)}
                  cien={Math.trunc(careerData[0].cien_max)}
                  hsco={Math.trunc(careerData[0].hcsoc_max)}
                />
                <MaxScoresNumberCard
                  title="Preguntas Correctas"
                  description="Cantidad media de preguntas correctas por prueba en la carrera
          seleccionada."
                  clec={careerData[0].average_cl}
                  m1={careerData[0].average_m1}
                  m2={careerData[0].average_m2}
                  cien={careerData[0].average_cien}
                  hsco={careerData[0].average_hcs}
                />
              </div>

              <Card className="m-auto mt-5 flex h-[150px] w-full max-w-3xl flex-row items-center md:mt-11">
                <div className="bg-background flex-1 p-6">
                  <div className="flex items-center justify-evenly">
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-[1.2rem] font-bold">NEM Promedio</h2>
                      <p className="text-primary text-3xl font-bold">
                        {filteredCareerData[0]?.promedio_notas}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-[1.2rem] font-bold">
                        Puntaje Ranking Promedio
                      </h2>
                      <p className="text-primary text-3xl font-bold">
                        {filteredCareerData[0]?.ranking_promedio}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">
                Acreditación Universidad
              </h2>
              <div className="">
                <AccreditationCard />
              </div>
            </section>

            <section className="rounded-lg">
              <h2 className="mb-4 text-2xl font-bold">Ubicación de la Sede</h2>
              <div className="flex h-[400px] w-full justify-center">
                <UniversityMap
                  latitud={filteredCareerData[0].latitud}
                  longitud={filteredCareerData[0].longitud}
                />
              </div>
            </section>
            <div className="mt-6 flex justify-center gap-[40px]">
              <Button
                variant="outline"
                className="text-black hover:bg-gray-200"
                onClick={() => {
                  setShowStatistics(false);
                  setShowSimulation(true);
                }}
              >
                Volver
              </Button>
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => {
                  setShowCalculations(true);
                  setShowStatistics(false);
                }}
              >
                Simular Nuevamente
              </Button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
