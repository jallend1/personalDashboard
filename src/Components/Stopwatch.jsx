import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stopWatchTime, setStopWatchTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const changeBackgroundColor = () => {
    const startColor = [0, 0, 0];
    const finishColor = [255, 11, 11];
    const time = 10;
    const steps = 30;
    const stepTime = time / steps;
    const stepColor = [
      (finishColor[0] - startColor[0]) / steps,
      (finishColor[1] - startColor[1]) / steps,
      (finishColor[2] - startColor[2]) / steps,
    ];
    let currentColor = startColor;
    let i = 0;
    const colorInterval = setInterval(() => {
      currentColor = [
        currentColor[0] + stepColor[0],
        currentColor[1] + stepColor[1],
        currentColor[2] + stepColor[2],
      ];
      document.body.style.backgroundColor = `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, 0.4)`;
      i++;
      if (i === steps) {
        clearInterval(colorInterval);
      }
    }, stepTime * 1000);
  };

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
    let colorInterval = null;
    if (isRunning && !isPaused) {
      //   TODO: Integrate color interval with stopwatch interval
      changeBackgroundColor();
      colorInterval = setInterval(() => {
        changeBackgroundColor();
      }, 10000);
      interval = setInterval(() => {
        setStopWatchTime((prevStopWatchTime) => {
          return handleTimeLogic(prevStopWatchTime);
        });
      }, 1000);
    } else if (!isRunning && !isPaused) {
      clearInterval(interval);
      clearInterval(colorInterval);
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
