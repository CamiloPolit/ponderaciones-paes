"use client";
import React, { useState, useRef } from "react";
import { MdBlock } from "react-icons/md";
import universities from "../app/universities.json";

type University = {
  name?: string;
  abbreviation?: string;
  locations?: string[];
}[];

export default function Page() {
  const suggestions: University = universities.Universities;
  const [inputValue, setInputValue] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [matchedText, setMatchedText] = useState<string>("");
  const [selectedUniversity, setSelectedUniversity] = useState<boolean>(false);

  const handleChange = (e) => {
    const value: string = e.target.value;
    let match = suggestions.find((suggestion) =>
      suggestion.name.toLowerCase().startsWith(value.toLowerCase()),
    );
    setImageSrc(
      match
        ? "/logos/".concat(
            match.abbreviation?.toLocaleLowerCase().concat(".png"),
          )
        : "",
    );
    match = match?.name;

    setMatchedText(match);
    setSelectedUniversity(false);
    setInputValue(value);

    // Modify the suggested text in case the case of the input is different
    if (match && value) {
      const matchModified = value.slice(0).concat(match.slice(value.length));
      setHighlightedText(matchModified);
    } else {
      setHighlightedText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && highlightedText) {
      e.preventDefault();
      setInputValue(matchedText);
      setHighlightedText("");
      setSelectedUniversity(true);
    }
  };

  return (
    <div className="flex">
      {(highlightedText || selectedUniversity) && (
        <img className="h-min" src={imageSrc} alt="Logo UCh" />
      )}
      {!highlightedText && !selectedUniversity && (
        <MdBlock size="40px" className="text-gray-500" />
      )}
      <div className="h-full" style={{ position: "relative" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ejemplo: Universidad de Chile"
        />
        {inputValue && (
          <input
            type="text"
            value={highlightedText}
            readOnly
            className="pointer-events-none absolute left-0 top-0 border-transparent bg-transparent text-black/50"
          />
        )}
      </div>
    </div>
  );
}
