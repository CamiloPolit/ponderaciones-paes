"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdBlock } from "react-icons/md";
import CareerFilterMenu from "./CareerFilterMenu";
import useFetchCareerSuggestions from "@/hooks/useFetchCareerSuggestions";
import debounce from "lodash.debounce";

export default function KnowledgeAreaSearch({
  filterSelectedCareer,
  setFilterSelectedCareer,
  matchedText,
  setMatchedText,
  inputValue,
  setInputValue,
  imageSrc,
  setImageSrc,
}) {
  const [highlightedText, setHighlightedText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const containerRef = useRef(null);
  const cache = useRef({});

  const { suggestions, fetchCareerSuggestions } = useFetchCareerSuggestions();

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

  const debouncedFetchSuggestions = useCallback(
    debounce(async (value) => {
      if (cache.current[value]) {
        setFilteredSuggestions(cache.current[value]);
      } else {
        const fetchedSuggestions = await fetchCareerSuggestions(value);
        cache.current[value] = fetchedSuggestions;
        setFilteredSuggestions(fetchedSuggestions);
      }
    }, 400),
    [fetchCareerSuggestions],
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      debouncedFetchSuggestions(value);
    } else {
      setFilteredSuggestions([]);
      setMatchedText("");
      setImageSrc("");
    }

    const match = filteredSuggestions.find((suggestion) =>
      suggestion.nombre_carrera.toLowerCase().startsWith(value.toLowerCase()),
    );

    setImageSrc(
      match
        ? "/careerIcons/".concat(
            match.area_conocimiento?.toLowerCase().concat(".png"),
          )
        : "",
    );
    setMatchedText(match ? match.nombre_carrera : "");
    setFilterSelectedCareer(false);

    if (match && value) {
      const matchModified = value.concat(
        match.nombre_carrera.slice(value.length),
      );
      setHighlightedText(matchModified);
    } else {
      setHighlightedText("");
    }

    if (highlightedText === value && value) {
      setHighlightedText("");
      setFilterSelectedCareer(true);
      setIsInputActive(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Tab" || e.key === "Enter") && highlightedText) {
      e.preventDefault();
      setInputValue(matchedText);
      setHighlightedText("");
      setFilterSelectedCareer(true);
    }
  };

  useEffect(() => {
    if (inputValue) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.nombre_carrera
          .toLowerCase()
          .startsWith(inputValue.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [suggestions, inputValue]);

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center">
        {(highlightedText || filterSelectedCareer) && (
          <img
            className="h-min"
            src={imageSrc}
            alt="Logo Universidad"
            draggable="false"
          />
        )}
        {!highlightedText && !filterSelectedCareer && (
          <MdBlock size="40px" className="text-gray-500" />
        )}
      </div>

      <div ref={containerRef} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputActive(true)}
          placeholder="Nombre de la carrera"
          className="xs:text-xl ml-1 w-64 rounded-xl border-2 p-2 text-[1rem] text-black/80 hover:border-black sm:w-96"
        />
        {inputValue && (
          <input
            type="text"
            value={highlightedText}
            readOnly
            className="xs:text-xl pointer-events-none absolute left-0 top-0 ml-1 w-64 rounded-3xl border-2 border-transparent bg-transparent p-2 text-[1rem] text-black/50 hover:border-black sm:w-96"
          />
        )}

        <CareerFilterMenu
          filteredSuggestions={filteredSuggestions}
          setInputValue={setInputValue}
          setHighlightedText={setHighlightedText}
          setImageSrc={setImageSrc}
          isInputActive={isInputActive}
          setIsInputActive={setIsInputActive}
          setFilterSelectedCareer={setFilterSelectedCareer}
          setMatchedText={setMatchedText}
          inputValue={inputValue}
        />
      </div>
    </div>
  );
}
