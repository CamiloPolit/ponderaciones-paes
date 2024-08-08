import React, { useState } from "react";

export default function UniversitiesMenu({
  filteredSuggestions,
  setInputValue,
  setHighlightedText,
  setImageSrc,
  isInputActive,
  setIsInputActive,
  setIsDisabled,
  setSelectedUniversity,
}) {
  return (
    isInputActive && (
      <div className="absolute z-10 w-full">
        {filteredSuggestions.slice(0, 6).map((university) => (
          <div
            key={university.abbreviation}
            className="flex cursor-pointer items-center justify-around bg-gray-50 hover:bg-gray-200"
            onMouseDown={() => {
              setInputValue(university.name);
              setHighlightedText(university.name);
              setImageSrc(`logos/${university.abbreviation.toLowerCase()}.png`);
              setIsInputActive(false);
              setIsDisabled(false);
              setSelectedUniversity(true);
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center py-2">
              <img
                src={`/logos/${university.abbreviation.toLowerCase()}.png`}
                alt={`Foto ${university.abbreviation}`}
              />
            </div>
            <div className="w-10/12 p-2">{university.name}</div>
          </div>
        ))}
      </div>
    )
  );
}
