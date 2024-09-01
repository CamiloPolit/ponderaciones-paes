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
  last_score,
  setShowCareerInfoCards,
  setShowStatistics,
  setCareerData,
  universityData,
  setPosition,
  location,
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

  const requiredKeys = Object.keys(weights).filter((key) => {
    return weights[key];
  });

  const areRequiredValuesPresent = requiredKeys.every((key) => {
    if (
      requiredKeys.includes("Ciencias") &&
      requiredKeys.includes("Historia")
    ) {
      const cienValue = sessionStorage.getItem("Ciencias");
      const hscoValue = sessionStorage.getItem("Historia");

      return cienValue !== null || hscoValue !== null;
    } else {
      return sessionStorage.getItem(key) !== null;
    }
  });

  if (!areRequiredValuesPresent) {
    return null;
  }

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
    if (!value) return;

    const sessionValue = Number(sessionStorage.getItem(label));

    if (areElectivesFilled && (label === "Ciencias" || label === "Historia")) {
      electiveMaxScore = Math.max(electiveMaxScore, sessionValue);
    } else {
      const weight = weights[label];
      if (weight) {
        totalWeightedScoreAux += (sessionValue * weight) / 100;
      }
    }
  });

  if (electiveMaxScore > 0) {
    const electiveLabel =
      electiveMaxScore === Number(sessionStorage.getItem("Ciencias")) &&
      weights["Ciencias"]
        ? "Ciencias"
        : "Historia";
    const electiveWeight = weights[electiveLabel];
    if (electiveWeight) {
      totalWeightedScoreAux += (electiveMaxScore * electiveWeight) / 100;
    }
  }

  const handleClick = () => {
    const filteredData = universityData.filter(
      (data) => data.nomb_inst === university && data.nombre_carrera === career,
    );
    console.log(filteredData);

    setCareerData(filteredData);
    setPosition(filteredData[0].nomb_sede);
    setShowCareerInfoCards(false);
    setShowStatistics(true);
    console.log(filteredData);
  };

  return (
    <div
      className={`bg-background flex cursor-pointer overflow-hidden rounded-lg border ${totalWeightedScoreAux.toFixed(2) > Number(last_score).toFixed(2) ? "border-green-500" : "border-red-500"} shadow-sm duration-75 hover:scale-[1.007]`}
      onClick={handleClick}
    >
      <div className="bg-muted hidden w-32 items-center justify-center md:flex md:w-40">
        <img
          src={`careerIcons/${careerLogo}.png`}
          width={50}
          height={50}
          alt="University Logo"
          className="object-contain"
          style={{ aspectRatio: "50/50", objectFit: "cover" }}
        />
      </div>
      <div className="flex-1 space-y-6 p-4 md:space-y-4 md:p-6">
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-start">
            <h3 className="w-full text-center text-xl font-semibold leading-6 md:text-start">
              {career}
            </h3>
            <p className="w-full text-center leading-4 text-stone-700 md:text-start">
              {`${university}`}
            </p>
            <p className="mb-2 w-full text-center text-[0.85rem] leading-4 text-stone-700 md:text-start">
              {`${location}`}
            </p>

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
                className="bg-blue-500 text-center text-green-50"
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
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <p className="text-stone-700">Puntaje simulado:</p>
            <span className="text-primary font-semibold">
              {totalWeightedScoreAux.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-stone-700">Puntaje corte:</p>
            <span className="text-primary font-semibold">
              {Number(last_score).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
