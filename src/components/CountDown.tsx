import React, { useState, useEffect } from "react";

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
    <div className="flex">
      <div>
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-stone-800 text-5xl text-white">
          {timeLeft.days}
        </div>
        <p className="flex items-center justify-center text-2xl text-white">
          Días
        </p>
      </div>
      <div className="mt-[-38px] flex items-center justify-center px-5 text-5xl text-white">
        :
      </div>
      <div>
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-stone-800 text-5xl text-white">
          {timeLeft.hours}
        </div>
        <p className="flex items-center justify-center text-2xl text-white">
          Hr
        </p>
      </div>
      <div className="mt-[-38px] flex items-center justify-center px-5 text-5xl text-white">
        :
      </div>
      <div>
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-stone-800 text-5xl text-white">
          {timeLeft.minutes}
        </div>
        <p className="flex items-center justify-center text-2xl text-white">
          Min
        </p>
      </div>
      <div className="mt-[-38px] flex items-center justify-center px-5 text-5xl text-white">
        :
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-stone-800 text-5xl text-white">
          {timeLeft.seconds}
        </div>
        <p className="flex items-center justify-center text-2xl text-white">
          Seg
        </p>
      </div>
    </div>
  );
};

export default Countdown;
