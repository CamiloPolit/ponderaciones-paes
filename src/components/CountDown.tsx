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
    <div>
      <h1>CUENTA REGRESIVA PAES 2024</h1>
      <p>Días: {timeLeft.days}</p>
      <p>Horas: {timeLeft.hours}</p>
      <p>Minutos: {timeLeft.minutes}</p>
      <p>Segundos: {timeLeft.seconds}</p>
    </div>
  );
};

export default Countdown;
