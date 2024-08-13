import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";

export default function SimulationTable({
  labels,
  careerData,
  isDataLoaded,
  setAreElectivesFilled,
  areElectivesFilled,
  toastTrigger,
  setToastTrigger,
  weightedInputs,
}) {
  const labelToDataKey = {
    Nem: "nem",
    Ranking: "ranking",
    M1: "m1",
    M2: "m2",
    Lectura: "clec",
    Ciencias: "cien",
    Historia: "hsco",
  };

  const handleInputChange = (label, value) => {
    const numValue = Number(value);

    if (value === "") {
      return;
    }

    if (isNaN(numValue) || numValue < 100 || numValue > 1000) {
      setToastTrigger((prev) => prev + 1);
    }
  };

  return (
    <div suppressHydrationWarning className="grid grid-cols-2 gap-x-7 px-7">
      {labels.map((label) => {
        const dataKey = labelToDataKey[label];
        const value = isDataLoaded ? careerData[0]?.[dataKey] : undefined;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center justify-center py-2">
              <p className="text-center font-semibold">{label}</p>
              <input
                type="text"
                ref={(el) => (weightedInputs.current[label] = el)}
                className="mx-1 w-20 rounded-xl border-2 p-2 text-center text-[1rem] text-black/85 hover:border-black disabled:bg-stone-200 sm:w-24"
                maxLength="4"
                onBlur={(e) => handleInputChange(label, e.target.value)}
                disabled={!isDataLoaded || value === null}
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
