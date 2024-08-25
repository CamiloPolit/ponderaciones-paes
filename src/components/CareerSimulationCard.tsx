import React from "react";
import { Badge } from "@/components/ui/badge";

export default function CareerSimulationCard({
  university,
  careerLogo,
  career,
  nem,
  ranking,
  clec,
  m1,
  m2,
  cien,
  hsco,
  areElectivesFilled,
}) {
  let totalWeightedScoreAux = 0;
  let electiveMaxScore = 0;

  const weights = {
    Nem: nem,
    Ranking: ranking,
    Lectura: clec,
    M1: m1,
    M2: m2,
    Ciencias: cien,
    Historia: hsco,
  };

  // Filtrar las claves de weights que no evalúan a falso
  const requiredKeys = Object.keys(weights).filter((key) => weights[key]);

  // Verificar que todas las claves necesarias estén presentes en sessionStorage
  const areRequiredValuesPresent = requiredKeys.every((key) => {
    const sessionValue = sessionStorage.getItem(key);
    return sessionValue !== null; // Verificar si existe en sessionStorage
  });

  // Si algún valor necesario no está presente en sessionStorage, omitir la renderización de la tarjeta
  if (!areRequiredValuesPresent) {
    return null;
  }

  // Calcular el puntaje ponderado
  const labels = [
    { label: "Nem", value: nem },
    { label: "Ranking", value: ranking },
    { label: "M1", value: m1 },
    { label: "M2", value: m2 },
    { label: "Lectura", value: clec },
    { label: "Ciencias", value: cien },
    { label: "Historia", value: hsco },
  ];

  labels.forEach(({ label, value }) => {
    if (!value) return; // Saltar si no hay valor

    // Obtener el valor correspondiente desde sessionStorage
    const sessionValue = Number(sessionStorage.getItem(label));

    // Ponderar Ciencias e Historia como electivas si se han completado
    if (areElectivesFilled && (label === "Ciencias" || label === "Historia")) {
      electiveMaxScore = Math.max(electiveMaxScore, sessionValue);
    } else {
      const weight = weights[label];
      if (weight) {
        totalWeightedScoreAux += (sessionValue * weight) / 100;
      }
    }
  });

  // Si se tiene un puntaje máximo para Ciencias o Historia, se pondera aquí
  if (electiveMaxScore > 0) {
    const electiveLabel =
      electiveMaxScore === Number(sessionStorage.getItem("Ciencias"))
        ? "Ciencias"
        : "Historia";
    const electiveWeight = weights[electiveLabel];
    if (electiveWeight) {
      totalWeightedScoreAux += (electiveMaxScore * electiveWeight) / 100;
    }
  }

  return (
    <div className="bg-background flex cursor-pointer overflow-hidden rounded-lg shadow-lg">
      <div className="bg-muted flex w-32 items-center justify-center md:w-40">
        <img
          src={`careerIcons/${careerLogo}.png`}
          width={50}
          height={50}
          alt="University Logo"
          className="object-contain"
          style={{ aspectRatio: "50/50", objectFit: "cover" }}
        />
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-6">
        <div>
          <div className="mb-2 flex items-center space-x-4">
            {nem && (
              <Badge
                variant="outline"
                className="bg-teal-500 text-center text-green-50"
              >
                Nem {nem}%
              </Badge>
            )}
            {ranking && (
              <Badge
                variant="outline"
                className="bg-orange-500 text-center text-green-50"
              >
                Ranking {ranking}%
              </Badge>
            )}
            {m1 && (
              <Badge
                variant="outline"
                className="bg-green-500 text-center text-green-50"
              >
                M1 {m1}%
              </Badge>
            )}
            {m2 && (
              <Badge
                variant="outline"
                className="bg-blue-500 text-center text-blue-50"
              >
                M2 {m2}%
              </Badge>
            )}
            {hsco && (
              <Badge
                variant="outline"
                className="bg-yellow-500 text-center text-yellow-50"
              >
                Historia {hsco}%
              </Badge>
            )}
            {cien && (
              <Badge
                variant="outline"
                className="bg-red-500 text-center text-red-50"
              >
                Ciencias {cien}%
              </Badge>
            )}
            {clec && (
              <Badge
                variant="outline"
                className="bg-purple-500 text-center text-purple-50"
              >
                Lectura {clec}%
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold">{career}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{university}</p>
          <p className="text-muted-foreground">
            Puntaje simulado: {totalWeightedScoreAux.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
