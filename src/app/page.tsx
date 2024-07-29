"use client";

import React, { useState, useRef } from "react";
import UniversitySearch from "../components/UniversitySearch";
import CarreerSearch from "@/components/CarreerSearch";
import SimulationTable from "@/components/SimulationTable";
import Countdown from "@/components/CountDown";
import { motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState(false);
  const [matchedText, setMatchedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const careerComponentRef = useRef(null);

  const labels = [
    "Nem",
    "Ranking",
    "M1",
    "M2",
    "Competencia lectora",
    "Ciencias",
    "Historia",
    "Send",
  ];

  return (
    <>
      <div className="relative flex h-screen flex-col items-center justify-center bg-stone-950">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute top-0"
        >
          <ul className="flex text-xl text-white">
            <li className="cursor-pointer px-7 py-4 hover:text-gray-300">
              Inicio
            </li>
            <li className="cursor-pointer px-7 py-4 hover:text-gray-300">
              Blog
            </li>
            <li className="cursor-pointer px-7 py-4 hover:text-gray-300">
              Estadísticas
            </li>
            <li className="cursor-pointer px-7 py-4 hover:text-gray-300">
              Contacto
            </li>
          </ul>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="block py-4 text-6xl text-white"
        >
          CUENTA REGRESIVA
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="block py-4 text-6xl text-white"
        >
          PAES 2024
        </motion.h2>
        <Countdown supressHydratationWarning />
      </div>

      <main className="flex h-screen flex-col items-center justify-center bg-gray-100">
        {/* <h1 className="pb-10 text-5xl text-slate-900">Pondera Aquí:</h1> */}
        <motion.div
          initial={{ opacity: 0, y: 300 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex w-2/3 items-center justify-center rounded-3xl bg-gray-50 py-5"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="px-7">
              <UniversitySearch
                selectedUniversity={selectedUniversity}
                setSelectedUniversity={setSelectedUniversity}
                matchedText={matchedText}
                setMatchedText={setMatchedText}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                careerComponentRef={careerComponentRef}
              />

              <CarreerSearch
                careerComponentRef={careerComponentRef}
                isDisabled={isDisabled}
                selectedUniversity={selectedUniversity}
              />
            </div>
          </div>

          <SimulationTable labels={labels} />
        </motion.div>
      </main>
    </>
  );
}
