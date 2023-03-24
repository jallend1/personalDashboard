import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const START_COLOR = [0, 0, 0];
  const TIME_TO_COMPLETE = 3600;
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stopWatchTime, setStopWatchTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState(START_COLOR);
  const [remainingTimeToComplete, setRemainingTimeToComplete] =
    useState(TIME_TO_COMPLETE);

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
      seconds: 0
    });
    resetBackgroundColor();
  };

  const resetBackgroundColor = () => {
    setCurrentBackgroundColor(START_COLOR);
    document.body.style.backgroundColor = `rgb(${START_COLOR[0]}, ${START_COLOR[1]}, ${START_COLOR[2]}, 0.4)`;
    setRemainingTimeToComplete(TIME_TO_COMPLETE);
  };

  const handleTimeLogic = (prevStopWatchTime) => {
    if (prevStopWatchTime.seconds === 59) {
      return prevStopWatchTime.minutes === 59
        ? // If ??:59:59, add an hour
          { hours: prevStopWatchTime.hours + 1, minutes: 0, seconds: 0 }
        : // If ??:??:59, add a minute
          {
            hours: prevStopWatchTime.hours,
            minutes: prevStopWatchTime.minutes + 1,
            seconds: 0
          };
    } else {
      // Otherwise, add a second
      return {
        hours: prevStopWatchTime.hours,
        minutes: prevStopWatchTime.minutes,
        seconds: prevStopWatchTime.seconds + 1
      };
    }
  };

  const precedingZero = (time) => (time < 10 ? '0' + time : time);

  useEffect(() => {
    const FINISH_COLOR = [255, 11, 11];
    const changeBackgroundColor = () => {
      if (remainingTimeToComplete > 0) {
        // Calculate the amount each color needs to change by to smoothly reach the final color in the remaining time
        const colorSteps = FINISH_COLOR.map(
          (color, index) =>
            (color - currentBackgroundColor[index]) / remainingTimeToComplete
        );
        // Changes the current color by the calculated amount
        const newColors = currentBackgroundColor.map(
          (color, index) => color + colorSteps[index]
        );
        setRemainingTimeToComplete((prevTime) => prevTime - 1);
        setCurrentBackgroundColor(newColors);
        document.body.style.backgroundColor = `rgb(${newColors[0]}, ${newColors[1]}, ${newColors[2]}, 0.4)`;
      }
    };

    let interval = null;
    let colorInterval = null;
    if (isRunning && !isPaused) {
      colorInterval = setInterval(() => {
        changeBackgroundColor();
      }, 1000);
      interval = setInterval(() => {
        setStopWatchTime((prevStopWatchTime) => {
          return handleTimeLogic(prevStopWatchTime);
        });
      }, 1000);
    } else if (!isRunning && !isPaused) {
      clearInterval(interval);
      clearInterval(colorInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, [isRunning, isPaused, remainingTimeToComplete, currentBackgroundColor]);

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
