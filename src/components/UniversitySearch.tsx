"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdBlock } from "react-icons/md";
import universities from "../app/universities.json";
import UniversitiesMenu from "./UniversitiesMenu";

const suggestions = universities.Universities;

export default function Page({
  selectedUniversity,
  setSelectedUniversity,
  matchedText,
  setMatchedText,
  isDisabled,
  setIsDisabled,
  inputValue,
  setInputValue,
  imageSrc,
  setImageSrc,
  setIsCareerSelected,
}) {
  const [highlightedText, setHighlightedText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsInputActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

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
    setIsCareerSelected(false);
    setInputValue(value);
    setIsDisabled(true);

    if (match && value) {
      const matchModified = value.slice(0).concat(match.slice(value.length));
      setHighlightedText(matchModified);
    } else {
      setHighlightedText("");
    }

    if (highlightedText == value && value) {
      setHighlightedText("");
      setSelectedUniversity(true);
      setIsDisabled(false);
      setIsInputActive(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Tab" || e.key === "Enter") && highlightedText) {
      e.preventDefault();
      setInputValue(matchedText);
      setHighlightedText("");
      setSelectedUniversity(true);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      ),
    );
  }, [inputValue]);

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center">
        {(highlightedText || selectedUniversity) && (
          <img
            className="h-min"
            src={imageSrc}
            alt="Logo Universidad"
            draggable="false"
          />
        )}
        {!highlightedText && !selectedUniversity && (
          <MdBlock size="40px" className="text-gray-500" />
        )}
      </div>

      <div ref={containerRef} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={(e) => setIsInputActive(true)}
          placeholder="Nombre de la universidad"
          className={`xs:text-xl ml-1 w-64 rounded-xl border-2 p-2 text-[1rem] text-black/80 sm:w-96 ${isDisabled ? "hover:border-black" : ""}`}
        />
        {inputValue && (
          <input
            type="text"
            value={highlightedText}
            readOnly
            className="xs:text-xl pointer-events-none absolute left-0 top-0 ml-1 w-64 rounded-3xl border-2 border-transparent bg-transparent p-2 text-[1rem] text-black/50 hover:border-black sm:w-96"
          />
        )}
        <UniversitiesMenu
          filteredSuggestions={filteredSuggestions}
          setInputValue={setInputValue}
          setHighlightedText={setHighlightedText}
          setImageSrc={setImageSrc}
          isInputActive={isInputActive}
          setIsInputActive={setIsInputActive}
          setIsDisabled={setIsDisabled}
          setSelectedUniversity={setSelectedUniversity}
          setMatchedText={setMatchedText}
        />
      </div>
    </div>
  );
}
