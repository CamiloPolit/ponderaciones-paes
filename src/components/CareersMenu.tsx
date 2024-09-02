import { useEffect, useState } from "react";

const categoryMapping = {
  "Administración y Comercio": "Ingeniería",
  Agropecuaria: "Agropecuaria",
  "Arte y Arquitectura": "Artes",
  "Ciencias Básicas": "Ciencias",
  "Ciencias Sociales": "Humanista",
  Derecho: "Humanista",
  Educación: "Humanista",
  Humanidades: "Humanista",
  Salud: "Salud",
  Tecnología: "Ingeniería",
};

export default function CareersMenu({
  isInputActive,
  activeCareerType,
  universityData,
  setSelectedCareer,
  setMainCareerLogo,
  setActiveCareerType,
  setIsInputActive,
  setIsCareerSelected,
  filteredCareers,
  setFilteredCareers,
  universityDataLoading,
}) {
  const handleClick = (type) => {
    setActiveCareerType(type);
    setIsInputActive(true);

    if (type === "Todo") {
      setFilteredCareers(universityData);
    } else {
      const filteredData = universityData.filter((career) => {
        return categoryMapping[career.area_conocimiento] === type;
      });
      setFilteredCareers(filteredData);
    }
  };

  return (
    <div className="scrollable-container absolute z-10 max-h-48 w-full overflow-auto">
      {isInputActive && (
        <div>
          <div className="flex justify-between bg-gray-100 px-1 text-xs">
            <div className="flex w-full flex-wrap justify-center border-b-2 border-stone-300">
              {[
                "Todo",
                "Ingeniería",
                "Ciencias",
                "Humanista",
                "Salud",
                "Artes",
                "Agropecuaria",
              ].map((type) => (
                <p
                  key={type}
                  className={`cursor-pointer px-2 py-1 ${
                    activeCareerType === type ? "text-blue-600" : "text-black"
                  }`}
                  onClick={() => handleClick(type)}
                >
                  {type}
                </p>
              ))}
            </div>
          </div>
          {universityDataLoading ? (
            <div className="w-full bg-gray-50 py-2 text-center">
              Cargando...
            </div>
          ) : (
            filteredCareers.map((career) => (
              <div
                key={career.codigo_carrera}
                className="flex cursor-pointer items-center justify-around bg-gray-50 hover:bg-gray-200"
                onMouseDown={() => {
                  setSelectedCareer(career.nombre_carrera);
                  setMainCareerLogo(career.area_conocimiento);
                  setIsCareerSelected(true);
                  setIsInputActive(false);
                }}
              >
                <div className="max-h-8 max-w-8">
                  <img
                    src={`/careerIcons/${career.area_conocimiento}.png`}
                    alt={`Foto ${career.nombre_carrera}`}
                    className="object-cover"
                  />
                </div>
                <div className="w-10/12 p-2">{career.nombre_carrera}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
