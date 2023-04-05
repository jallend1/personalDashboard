import React, { useState, useEffect } from "react";
import '../css/stopwatch.css'

const START_COLOR = [243, 243, 243];
const FINISH_COLOR = [255, 11, 11];
const TIME_TO_COMPLETE = 3600;

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const [stopWatchTime, setStopWatchTime] = useState({
    hours: 0,
    minutes: 0,
    secs: 0,
  });

  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState(START_COLOR);
  const [remainingTimeToComplete, setRemainingTimeToComplete] =
    useState(TIME_TO_COMPLETE);

  const resetStopwatch = () => {
    setStartTime(Date.now());
    setIsRunning(true);
    setStopWatchTime({
      hours: 0,
      minutes: 0,
      secs: 0,
    });
    resetBackgroundColor();
    setRemainingTimeToComplete(TIME_TO_COMPLETE);
  };

  const resetBackgroundColor = () => {
    const stopwatchDiv = document.querySelector("#stopwatch");
    setCurrentBackgroundColor(START_COLOR);
    stopwatchDiv.style.backgroundColor = `rgb(${START_COLOR[0]}, ${START_COLOR[1]}, ${START_COLOR[2]}, 0.4)`;
  };

  const precedingZero = (time) => (time < 10 ? "0" + time : time);

  useEffect(() => {
    const stopwatchDiv = document.querySelector("#stopwatch");
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

    const convertSecondsToTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return { hours, minutes, secs };
    };

    let interval = null;
    let colorInterval = null;
    if (isRunning) {
      colorInterval = setInterval(() => {
        changeBackgroundColor(stopwatchDiv);
      }, 1000);
      interval = setInterval(() => {
        const currentTime = Date.now();
        const secondsPassed = (currentTime - startTime) / 1000;
        const { hours, minutes, secs } = convertSecondsToTime(secondsPassed);
        setStopWatchTime({ hours, minutes, secs });
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
      clearInterval(colorInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, [isRunning, remainingTimeToComplete, currentBackgroundColor, startTime]);

  return (
    <div className="stopwatch component" id="stopwatch">
      <h2>Time since you last stood up:</h2>
      <div className="time">
        {precedingZero(stopWatchTime.hours)}:
        {precedingZero(stopWatchTime.minutes)}:
        {precedingZero(stopWatchTime.secs)}
      </div>
      <div className="buttons">
        <button onClick={resetStopwatch}>I moved!</button>
      </div>
    </div>
  );
};

export default Stopwatch;
