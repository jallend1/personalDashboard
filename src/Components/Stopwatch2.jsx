import React, { useState, useEffect } from "react";

const Stopwatch2 = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopWatchTime, setStopWatchTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const convertSecondsToTime = (seconds) => {
    console.log(seconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return { hours, minutes, secs };
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const secondsPassed = (currentTime - startTime) / 1000;
        const { hours, minutes, secs } = convertSecondsToTime(secondsPassed);
        setStopWatchTime({ hours, minutes, secs });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <h1>{stopWatchTime.hours}:{stopWatchTime.minutes}:{stopWatchTime.secs}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch2;