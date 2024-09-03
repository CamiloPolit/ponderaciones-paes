import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import CareerSimulationCard from "./CareerSimulationCard";
import useScrollPosition from "@/hooks/useScrollPosition";
import CareersDropMenuFilter from "./CareersDropMenuFilter";
import CareersFilters from "./CareersFilters";

export default function CareerSimulationPreview({
  universityData,
  areElectivesFilled,
  setShowCareerInfoCards,
  setAreElectivesFilled,
  setShowStatistics,
  setCareerData,
  setPosition,
  setShowCalculations,
  searchType,
  cardsPreviewScrollPosition,
  setCardsPreviewScrollPosition,
}) {
  const scrollPosition = useScrollPosition();
  const [selectedFilter, setSelectedFilter] = useState("Todo");
  const [filteredData, setFilteredData] = useState(universityData);

  const cienciasValue = sessionStorage.getItem("Ciencias");
  const historiaValue = sessionStorage.getItem("Historia");

  setAreElectivesFilled(cienciasValue && historiaValue);

  useEffect(() => {
    setCardsPreviewScrollPosition(scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    window.scrollTo(0, cardsPreviewScrollPosition);
  }, []);

  useEffect(() => {
    if (selectedFilter === "Todo") {
      setFilteredData(universityData);
    } else {
      setFilteredData(
        universityData.filter(
          (universidad) => universidad.area_conocimiento === selectedFilter,
        ),
      );
    }
  }, [selectedFilter, universityData]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="text-black hover:bg-gray-200"
            onClick={() => {
              setShowCareerInfoCards(false);
              setShowCalculations(true);
            }}
          >
            Volver
          </Button>

          <h2 className="text-3xl font-bold">
            {searchType === "Búsqueda por Universidad"
              ? `Oferta de Carreras Ofrecidas por la ${universityData[0].nomb_inst}`
              : `Universidades que Ofrecen ${universityData[0].nombre_carrera} en su Oferta de Carreras:`}
          </h2>
          {searchType === "Búsqueda por Universidad" && (
            <p className="text-stone-700">Explora las diferentes carreras</p>
          )}
          <p className="text-stone-700">
            * Recuerda que las carreras listadas corresponden sólo a las que fue
            posible hacer la simulación en base a los puntajes ingresados en los
            campos de puntajes.
          </p>
        </div>
        <div className="space-y-6">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-4 md:justify-between">
            <div
              className={`${searchType === "Búsqueda por Carrera" ? "hidden" : ""} flex flex-wrap items-center justify-center gap-4`}
            >
              <CareersFilters
                selectedFilter={selectedFilter}
                handleFilterClick={handleFilterClick}
              />
            </div>

            <div className="hidden md:block">
              <CareersDropMenuFilter />
            </div>
          </div>
          <div className="flex justify-end md:hidden">
            <CareersDropMenuFilter />
          </div>
          <div className="grid gap-6">
            {filteredData.map((career) => (
              <CareerSimulationCard
                key={
                  searchType === "Búsqueda por Universidad"
                    ? career.nombre_carrera.concat(career.nomb_sede)
                    : career.nomb_inst.concat(career.nomb_sede)
                }
                university={career.nomb_inst}
                career={career.nombre_carrera}
                careerLogo={career.area_conocimiento}
                nem={career.nem}
                ranking={career.ranking}
                clec={career.clec}
                m1={career.m1}
                m2={career.m2}
                cien={career.cien}
                hsco={career.hsco}
                last_score={career.puntaje_corte}
                areElectivesFilled={areElectivesFilled}
                setShowCareerInfoCards={setShowCareerInfoCards}
                setShowStatistics={setShowStatistics}
                setCareerData={setCareerData}
                universityData={universityData}
                setPosition={setPosition}
                location={career.nomb_sede}
                searchType={searchType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
