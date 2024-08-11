import { Badge } from "@/components/ui/badge";

export default function SimulationTable({ labels, careerData, isDataLoaded }) {
  // Mapeo de etiquetas a las claves de datos correspondientes
  const labelToDataKey = {
    Nem: "nem",
    Ranking: "ranking",
    M1: "m1",
    M2: "m2",
    Lectura: "clec",
    Ciencias: "cien",
    Historia: "hsco",
  };

  return (
    <div suppressHydrationWarning className="grid grid-cols-2 gap-x-7 px-7">
      {labels.map((label) => {
        const dataKey = labelToDataKey[label];
        const value = isDataLoaded ? careerData[0]?.[dataKey] : undefined;

        return label === "Send" ? (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-2"
          ></div>
        ) : (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center justify-center py-2">
              <p className="text-center font-semibold">{label}</p>
              <input
                type="text"
                className="mx-1 w-20 rounded-xl border-2 p-2 text-center text-[1rem] text-black/85 hover:border-black disabled:bg-stone-200 sm:w-24"
                maxLength="4"
                disabled={!isDataLoaded || value === null}
              />
            </div>
            <div className="relative mb-[-22px]">
              {
                <Badge
                  variant="outline"
                  className={`cursor-default ${
                    value ? "" : "opacity-0"
                  } bg-stone-100 text-[0.85rem]`}
                >
                  {value ?? "30"}
                </Badge>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}
