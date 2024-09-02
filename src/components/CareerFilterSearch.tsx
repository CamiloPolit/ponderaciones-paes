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
  careerFilterInputValue,
  setCareerFilterInputValue,
  careerFilterImageSrc,
  setCareerFilterImageSrc,
}) {
  const [highlightedText, setHighlightedText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const containerRef = useRef(null);
  const cache = useRef({});

  const { suggestions, loading, error, fetchCareerSuggestions } =
    useFetchCareerSuggestions();

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
    setCareerFilterInputValue(value);
    if (value) {
      debouncedFetchSuggestions(value);
    } else {
      setFilteredSuggestions([]);
      setMatchedText("");
      setCareerFilterImageSrc("");
    }

    const match = filteredSuggestions.find((suggestion) =>
      suggestion.nombre_carrera.toLowerCase().startsWith(value.toLowerCase()),
    );

    setCareerFilterImageSrc(
      match
        ? "/careerIcons/".concat(match.area_conocimiento.concat(".png"))
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
      setCareerFilterInputValue(matchedText);
      setHighlightedText("");
      setFilterSelectedCareer(true);
    }
  };

  useEffect(() => {
    if (careerFilterInputValue) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.nombre_carrera
          .toLowerCase()
          .startsWith(careerFilterInputValue.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [suggestions, careerFilterInputValue]);

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center">
        {(highlightedText || filterSelectedCareer) && (
          <img
            className="max-w-9 object-contain"
            src={careerFilterImageSrc}
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
          value={careerFilterInputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputActive(true)}
          placeholder="Nombre de la carrera"
          className="xs:text-xl ml-1 w-64 rounded-xl border-2 p-2 text-[1rem] text-black/80 hover:border-black sm:w-96"
        />
        {careerFilterInputValue && (
          <input
            type="text"
            value={highlightedText}
            readOnly
            className="xs:text-xl pointer-events-none absolute left-0 top-0 ml-1 w-64 rounded-3xl border-2 border-transparent bg-transparent p-2 text-[1rem] text-black/50 hover:border-black sm:w-96"
          />
        )}

        <CareerFilterMenu
          filteredSuggestions={filteredSuggestions}
          setCareerFilterInputValue={setCareerFilterInputValue}
          setHighlightedText={setHighlightedText}
          setCareerFilterImageSrc={setCareerFilterImageSrc}
          isInputActive={isInputActive}
          setIsInputActive={setIsInputActive}
          setFilterSelectedCareer={setFilterSelectedCareer}
          setMatchedText={setMatchedText}
          careerFilterInputValue={careerFilterInputValue}
          loading={loading}
        />
      </div>
    </div>
  );
}
