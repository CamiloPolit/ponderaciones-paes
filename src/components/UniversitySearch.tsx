"use client";
import React, { useState, useRef } from "react";
import { MdBlock } from "react-icons/md";
import universities from "../app/universities.json";

type University = {
  name?: string;
  abbreviation?: string;
  locations?: string[];
}[];

export default function Page({
  selectedUniversity,
  setSelectedUniversity,
  matchedText,
  setMatchedText,
  setIsDisabled,
}) {
  const suggestions: University = universities.Universities;
  const [inputValue, setInputValue] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");

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
    setIsDisabled(true);

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
      setIsDisabled(false);
    }
  };

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center">
        {(highlightedText || selectedUniversity) && (
          <img className="h-min" src={imageSrc} alt="Logo UCh" />
        )}
        {!highlightedText && !selectedUniversity && (
          <MdBlock size="40px" className="text-gray-500" />
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ejemplo: Universidad de Chile"
          className="text-black/ ml-1 w-96 rounded-3xl border-2 p-2 text-xl hover:border-black"
        />
        {inputValue && (
          <input
            type="text"
            value={highlightedText}
            readOnly
            className="pointer-events-none absolute left-0 top-0 ml-1 w-96 rounded-3xl border-2 border-transparent bg-transparent p-2 text-xl text-black/50 hover:border-black"
          />
        )}
      </div>
    </div>
  );
}
