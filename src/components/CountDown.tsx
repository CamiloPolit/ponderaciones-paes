"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Countdown = () => {
  const targetDate = new Date("2024-12-03T00:00:00").getTime();
  const [isHydratated, setIsHydrated] = useState(false);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - (now + 1);

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    setIsHydrated(true);
    return () => clearInterval(timer);
  }, []);

  if (!isHydratated) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex"
    >
      <div>
        <div className="xs:h-20 xs:w-20 flex h-16 w-16 items-center justify-center rounded-xl bg-stone-800 text-3xl text-white md:h-24 md:w-24 md:text-5xl">
          {timeLeft.days}
        </div>
        <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl">
          Días
        </h3>
      </div>
      <div className="xs:px-5 mt-[-38px] flex items-center justify-center px-3 text-4xl md:text-5xl">
        :
      </div>
      <div>
        <div className="xs:h-20 xs:w-20 flex h-16 w-16 items-center justify-center rounded-xl bg-stone-800 text-3xl text-white md:h-24 md:w-24 md:text-5xl">
          {timeLeft.hours}
        </div>
        <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl">Hr</h3>
      </div>
      <div className="xs:px-5 mt-[-38px] flex items-center justify-center px-3 text-4xl md:text-5xl">
        :
      </div>
      <div>
        <div className="xs:h-20 xs:w-20 flex h-16 w-16 items-center justify-center rounded-xl bg-stone-800 text-3xl text-white md:h-24 md:w-24 md:text-5xl">
          {timeLeft.minutes}
        </div>
        <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl">Min</h3>
      </div>
      <div className="xs:px-5 mt-[-38px] flex items-center justify-center px-3 text-4xl md:text-5xl">
        :
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="xs:h-20 xs:w-20 flex h-16 w-16 items-center justify-center rounded-xl bg-stone-800 text-3xl text-white md:h-24 md:w-24 md:text-5xl">
          {timeLeft.seconds}
        </div>
        <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl">Seg</h3>
      </div>
    </motion.div>
  );
};

<h3 className="text-2xl font-bold tracking-tighter sm:text-4xl"></h3>;

export default Countdown;
