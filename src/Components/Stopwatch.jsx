import React, { useState, useEffect } from "react";
import '../css/stopwatch.css'

const Stopwatch = () => {
  const START_COLOR = [243, 243, 243];
  const TIME_TO_COMPLETE = 3600;
  const [isRunning, setIsRunning] = useState(true);

  const [stopWatchTime, setStopWatchTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState(START_COLOR);
  const [remainingTimeToComplete, setRemainingTimeToComplete] =
    useState(TIME_TO_COMPLETE);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const resetStopwatch = () => {
    setIsRunning(true);
    setStopWatchTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    resetBackgroundColor();
  };

  const resetBackgroundColor = () => {
    const stopwatchDiv = document.querySelector("#stopwatch");
    setCurrentBackgroundColor(START_COLOR);
    stopwatchDiv.style.backgroundColor = `rgb(${START_COLOR[0]}, ${START_COLOR[1]}, ${START_COLOR[2]}, 0.4)`;
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
          seconds: 0,
        };
    } else {
      // Otherwise, add a second
      return {
        hours: prevStopWatchTime.hours,
        minutes: prevStopWatchTime.minutes,
        seconds: prevStopWatchTime.seconds + 1,
      };
    }
  };

  const precedingZero = (time) => (time < 10 ? "0" + time : time);

  useEffect(() => {
    const stopwatchDiv = document.querySelector("#stopwatch");
    const FINISH_COLOR = [255, 11, 11];
    const changeBackgroundColor = (stopwatchDiv) => {
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
        stopwatchDiv.style.backgroundColor = `rgb(${newColors[0]}, ${newColors[1]}, ${newColors[2]}, 0.4)`;
      }
    };

    let interval = null;
    let colorInterval = null;
    if (isRunning) {
      colorInterval = setInterval(() => {
        changeBackgroundColor(stopwatchDiv);
      }, 1000);
      interval = setInterval(() => {
        setStopWatchTime((prevStopWatchTime) => {
          return handleTimeLogic(prevStopWatchTime);
        });
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
      clearInterval(colorInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, [isRunning, remainingTimeToComplete, currentBackgroundColor]);

  const toggleStartButton = () => {
    if (isRunning) {
      return <button onClick={resetStopwatch}>I moved!</button>;
    } else {
      return <button onClick={startStopwatch}>Start</button>;
    }
  };

  return (
    <div className="stopwatch component" id="stopwatch">
      <h2>Time since you last stood up:</h2>
      <div className="time">
        {precedingZero(stopWatchTime.hours)}:
        {precedingZero(stopWatchTime.minutes)}:
        {precedingZero(stopWatchTime.seconds)}
      </div>
      <div className="buttons">
        {toggleStartButton()}
      </div>
    </div>
  );
};

export default Stopwatch;
