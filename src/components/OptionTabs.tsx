import React, { useState } from "react";

export default function OptionTabs({ activeTab, setActiveTab, options }) {
  const handleClick = () => {
    console.log("holaa");
  };

  return (
    <>
      <div className="flex w-11/12 items-center justify-center">
        <div className="flex h-[40px] w-2/3 overflow-hidden">
          {options.map((option) => {
            return (
              <div
                key={option}
                className={`flex h-full w-1/2 items-center justify-center rounded-t-xl ${
                  activeTab === option
                    ? "bg-stone-950"
                    : "bg-stone-300 hover:bg-stone-200"
                } cursor-pointer md:w-[200px]`}
                onClick={() => setActiveTab(option)}
              >
                <p
                  className={`text-sm font-semibold leading-7 ${
                    activeTab === option ? "text-slate-200" : "text-stone-800"
                  }`}
                >
                  {option}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
