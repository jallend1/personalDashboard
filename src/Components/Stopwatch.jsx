import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startStopwatch = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseStopwatch = () => {
    setIsPaused(true);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning && !isPaused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const toggleStartButton = () => {
    if (isRunning && !isPaused) {
      return <button onClick={pauseStopwatch}>Pause</button>;
    } else {
      return <button onClick={startStopwatch}>Start</button>;
    }
  };

  return (
    <div className="stopwatch">
      <div className="time">{time}</div>
      <div className="buttons">
        {toggleStartButton()}
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
