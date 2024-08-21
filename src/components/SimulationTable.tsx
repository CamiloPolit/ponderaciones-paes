import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import NemDialog from "@/components/NemDialog";

const labelToDataKey = {
  Nem: "nem",
  Ranking: "ranking",
  M1: "m1",
  M2: "m2",
  Lectura: "clec",
  Ciencias: "cien",
  Historia: "hsco",
};

export default function SimulationTable({
  labels,
  careerData,
  isDataLoaded,
  setAreElectivesFilled,
  areElectivesFilled,
  setToastTrigger,
  weightedInputs,
  isCareerSelected,
}) {
  const [nemValue, setNemValue] = useState("");

  const cienciasValue = isDataLoaded
    ? careerData[0]?.[labelToDataKey["Ciencias"]]
    : null;
  const historiaValue = isDataLoaded
    ? careerData[0]?.[labelToDataKey["Historia"]]
    : null;
  setAreElectivesFilled(cienciasValue !== null && historiaValue !== null);

  useEffect(() => {
    labels.forEach((label) => {
      const storedValue = sessionStorage.getItem(label);
      if (storedValue) {
        weightedInputs.current[label].value = storedValue;
      }
    });
  }, [labels, careerData]);

  useEffect(() => {
    labels.forEach((label) => {
      const dataKey = labelToDataKey[label];
      const value = careerData[0]?.[dataKey];

      if (!isDataLoaded || value === null || !isCareerSelected) {
        if (weightedInputs.current[label]) {
          weightedInputs.current[label].value = "";
        }
      }
    });
  }, [isDataLoaded, labels, careerData]);

  const handleInputBlur = (label, value) => {
    const numValue = Number(value);

    if (value === "") {
      return;
    }

    if (isNaN(numValue) || numValue < 100 || numValue > 1000) {
      setToastTrigger((prev) => prev + 1);
    }

    sessionStorage.setItem(label, value);
  };

  return (
    <div suppressHydrationWarning className="grid grid-cols-2 gap-x-7 px-7">
      {labels.map((label) => {
        const dataKey = labelToDataKey[label];
        const value = isDataLoaded ? careerData[0]?.[dataKey] : undefined;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center justify-center py-2">
              {label === "Nem" && isCareerSelected && (
                <NemDialog
                  text="Calcular aquí"
                  onNemChange={(value) => {
                    setNemValue(value);
                    weightedInputs.current[label].value = value;
                    sessionStorage.setItem(label, value);
                  }}
                />
              )}
              <p className="text-center font-semibold">{label}</p>

              <input
                type="text"
                ref={(el) => (weightedInputs.current[label] = el)}
                className="mx-1 w-20 rounded-xl border-2 p-2 text-center text-[1rem] text-black/85 hover:border-black disabled:bg-stone-200 sm:w-24"
                maxLength="4"
                onBlur={(e) => handleInputBlur(label, e.target.value)}
                disabled={!isDataLoaded || value === null || !isCareerSelected}
                onChange={(e) => {
                  if (label === "Nem") {
                    setNemValue(e.target.value);
                  }
                }}
              />
            </div>
            <div className="relative mb-[-22px]">
              <Badge
                variant="outline"
                className={`cursor-default ${value ? "" : "opacity-0"} ${
                  areElectivesFilled &&
                  (label === "Ciencias" || label === "Historia")
                    ? "bg-yellow-100"
                    : "bg-lime-100"
                } text-[0.85rem]`}
              >
                {value ?? "30"}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
