import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResultsPreview({
  totalWeightedScore,
  setShowSimulation,
  setShowCalculations,
  setShowStatistics,
  filteredCareerData,
  setDisplayConfetti,
  careerPlace,
  placeLoading,
  fetchCareerPlace,
}) {
  useEffect(() => {
    fetchCareerPlace(filteredCareerData[0]?.codigo_carrera, totalWeightedScore);
  }, []);

  return (
    <div className="flex h-[80vh] items-center justify-center px-[20px] md:px-0">
      <Card className="bg-background w-full max-w-2xl rounded-lg p-4 shadow-md md:p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Puntaje Simulado</CardTitle>
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
          {totalWeightedScore > filteredCareerData[0]?.puntaje_corte ? (
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-black text-opacity-55">
                Posición en la Lista:
              </div>
              <div className="text-3xl font-bold">
                {placeLoading
                  ? "Cargando..."
                  : careerPlace === 0
                    ? "1"
                    : careerPlace}
              </div>
            </div>
          ) : null}
          <div className="flex items-center justify-between">
            <div className="items-center gap-2 text-lg font-semibold text-stone-700">
              {totalWeightedScore > filteredCareerData[0]?.puntaje_corte
                ? `✅ ¡Felicitaciones! Quedarías seleccionado/a en la carrera con una diferencia de ${(totalWeightedScore - filteredCareerData[0]?.puntaje_corte).toFixed(2)} puntos.`
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
              setDisplayConfetti(false);
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
  );
}
