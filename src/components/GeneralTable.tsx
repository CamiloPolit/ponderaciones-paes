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

export default function GeneralTable({
  labels,
  setToastTrigger,
  weightedInputs,
}) {
  const [nemValue, setNemValue] = useState("");

  useEffect(() => {
    labels.forEach((label) => {
      const storedValue = sessionStorage.getItem(label);
      if (storedValue) {
        weightedInputs.current[label].value = storedValue;
      }
    });
  }, [labels]);

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
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center justify-center py-2">
              {label === "Nem" ? (
                <NemDialog
                  text="Calcular aquí"
                  onNemChange={(value) => {
                    setNemValue(value);
                    weightedInputs.current[label].value = value;
                    sessionStorage.setItem(label, value);
                  }}
                />
              ) : label === "Ranking" ? (
                <span className="mb-[-5px] cursor-pointer text-[0.86rem] font-medium text-blue-300">
                  Estimar aquí
                </span>
              ) : null}

              <p className="text-center font-semibold">{label}</p>

              <input
                type="text"
                ref={(el) => (weightedInputs.current[label] = el)}
                className="mx-1 w-20 rounded-xl border-2 p-2 text-center text-[1rem] text-black/85 hover:border-black disabled:bg-stone-200 sm:w-24"
                maxLength="4"
                onBlur={(e) => handleInputBlur(label, e.target.value)}
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
                className={`cursor-default ${
                  label === "Ciencias" || label === "Historia"
                    ? "bg-yellow-100"
                    : label === "M2"
                      ? "bg-blue-50"
                      : "bg-lime-100"
                } text-[0.85rem] text-opacity-0`}
              >
                {30}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
