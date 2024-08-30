import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import PieChartt from "@/components/PieChart";
import CareerScoresMetrics from "@/components/CareerScoresMetrics";
import MaxScoresNumberCard from "@/components/MaxScoresNumberCard";
import AccreditationCard from "@/components/AccreditationCard";
import { Card } from "@/components/ui/card";
const UniversityMap = dynamic(() => import("@/components/UniversityMap"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function StatisticsPreview({
  setShowStatistics,
  setShowSimulation,
  setShowCalculations,
  setDisplayConfetti,
  selectedCareer,
  careerData,
  filteredCareerData,
  imageSrc,
  searchType,
  setShowCareerInfoCards,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <div className="flex flex-1 flex-col gap-8 p-6 md:p-10">
        <section>
          <div className="mb-6 flex justify-between gap-[40px]">
            <Button
              variant="outline"
              className="text-black hover:bg-gray-200"
              onClick={() => {
                setShowStatistics(false);
                searchType == "Búsqueda por Universidad y Carrera"
                  ? setShowSimulation(true)
                  : setShowCareerInfoCards(true);
              }}
            >
              Volver
            </Button>
            <Button
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => {
                setShowCalculations(true);
                setShowStatistics(false);
                setDisplayConfetti(false);
              }}
            >
              Simular Nuevamente
            </Button>
          </div>
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
              <h3 className="mb-2 text-center text-lg font-bold">Arancel</h3>
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
              <h3 className="mb-2 text-center text-lg font-bold">Cupos BEA</h3>
              <p className="text-4xl font-bold">{filteredCareerData[0]?.bea}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
              <h3 className="mb-2 text-center text-lg font-bold">Cupos PACE</h3>
              <p className="text-4xl font-bold">
                {filteredCareerData[0]?.pace}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border border-stone-300 bg-neutral-200 p-4 shadow-sm md:items-start md:justify-normal">
              <h3 className="mb-2 text-center text-lg font-bold">Cupos +MC</h3>

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

          <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
            <div className="h-full max-w-[500px]">
              <PieChartt
                women_percentage={filteredCareerData[0]?.porcentaje_mujeres}
                slots={filteredCareerData[0]?.vac_1er}
                career={filteredCareerData[0]?.nombre_carrera}
              />
            </div>

            {filteredCareerData[0]?.mc == null ? (
              ""
            ) : (
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
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Puntajes y Notas</h2>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-stretch md:justify-evenly md:gap-0">
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
                  <h2 className="text-center text-[1.2rem] font-bold">
                    NEM Promedio
                  </h2>
                  <p className="text-primary text-center text-3xl font-bold">
                    {filteredCareerData[0]?.promedio_notas}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-center text-[1.2rem] font-bold">
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
          <h2 className="mb-4 text-2xl font-bold">Acreditación Universidad</h2>
          <div className="">
            <AccreditationCard
              university={filteredCareerData[0].nomb_inst}
              acreditada_inst={filteredCareerData[0].acreditada_inst}
              acre_inst_desde_hasta={
                filteredCareerData[0].acre_inst_desde_hasta
              }
              imageSrc={imageSrc}
            />
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
              searchType == "Búsqueda por Universidad y Carrera"
                ? setShowSimulation(true)
                : setShowCareerInfoCards(true);
            }}
          >
            Volver
          </Button>
          <Button
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => {
              setShowCalculations(true);
              setShowStatistics(false);
              setDisplayConfetti(false);
            }}
          >
            Simular Nuevamente
          </Button>
        </div>
      </div>
    </div>
  );
}
