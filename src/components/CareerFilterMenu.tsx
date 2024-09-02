import React from "react";

export default function CareerFilterSearch({
  filteredSuggestions,
  setCareerFilterInputValue,
  setHighlightedText,
  setCareerFilterImageSrc,
  isInputActive,
  setIsInputActive,
  setFilterSelectedCareer,
  setMatchedText,
  careerFilterInputValue,
  loading,
}) {
  return !loading && isInputActive && careerFilterInputValue ? (
    <div className="absolute z-10 max-h-48 w-full overflow-x-hidden overflow-y-scroll">
      {filteredSuggestions.map((career) => (
        <div
          key={career.nombre_carrera}
          className="flex cursor-pointer items-center justify-around bg-gray-50 hover:bg-gray-200"
          onMouseDown={() => {
            setCareerFilterInputValue(career.nombre_carrera);
            setHighlightedText(career.nombre_carrera);
            setCareerFilterImageSrc(
              `./careerIcons/${career.area_conocimiento}.png`,
            );
            setIsInputActive(false);
            setFilterSelectedCareer(true);
            setMatchedText(career.nombre_carrera);
          }}
        >
          <div className="flex max-h-8 max-w-8 items-center justify-center py-2">
            <img
              src={`/careerIcons/${career.area_conocimiento}.png`}
              alt={`Foto ${career.nombre_carrera}`}
              draggable="false"
            />
          </div>
          <div className="w-10/12 p-2">{career.nombre_carrera}</div>
        </div>
      ))}
    </div>
  ) : (
    loading && (
      <div className="absolute z-10 max-h-48 w-full overflow-x-hidden overflow-y-scroll bg-gray-50">
        <div className="w-10/12 p-2 text-center">Cargando...</div>
      </div>
    )
  );
}
