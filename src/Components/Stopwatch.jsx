import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stopWatchTime, setStopWatchTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    setStopWatchTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const handleTimeLogic = (prevStopWatchTime) => {
    if (prevStopWatchTime.seconds === 59) {
      if (prevStopWatchTime.minutes === 59) {
        return {
          hours: prevStopWatchTime.hours + 1,
          minutes: 0,
          seconds: 0,
        };
      } else {
        return {
          hours: prevStopWatchTime.hours,
          minutes: prevStopWatchTime.minutes + 1,
          seconds: 0,
        };
      }
    } else {
      return {
        hours: prevStopWatchTime.hours,
        minutes: prevStopWatchTime.minutes,
        seconds: prevStopWatchTime.seconds + 1,
      };
    }
  };

  const precedingZero = (time) => (time < 10 ? "0" + time : time);

  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setStopWatchTime((prevStopWatchTime) => {
          return handleTimeLogic(prevStopWatchTime);
        });
      }, 1000);
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
      <div className="time">
        {precedingZero(stopWatchTime.hours)}:
        {precedingZero(stopWatchTime.minutes)}:
        {precedingZero(stopWatchTime.seconds)}
      </div>
      <div className="buttons">
        {toggleStartButton()}
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
