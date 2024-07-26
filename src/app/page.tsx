"use client";
import React, { useState } from "react";
import { MdBlock } from "react-icons/md";
import { IconContext } from "react-icons";

export default function Page() {
  const suggestions = [
    "Universidad de Chile",
    "Universidad de Antogasta",
    "Pontificia",
    "Pontaca",
  ];

  const [inputValue, setInputValue] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    let match = suggestions.find((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase()),
    );

    console.log(match);
    if (match && value) {
      match = value.slice(0).concat(match.slice(value.length));
      setHighlightedText(match);
    } else {
      setHighlightedText("");
    }
  };

  console.log(highlightedText);

  return (
    <div className="flex">
      {/* <img className="h-min" src="/favicons/favicon-32x32.png" alt="Logo UCh" /> */}
      <MdBlock size="32px" className="text-gray-500" />
      <div className="h-full" style={{ position: "relative" }}>
        <input type="text" value={inputValue} onChange={handleChange} />
        {highlightedText && inputValue && (
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
