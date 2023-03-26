// Creates a component that gets the current date and time, lists all hours from 7am to 8pm along with a connected checkbox

// Imports
import { useState } from "react";
import "../css/active-hours.css";
const ActiveHours = () => {
  const [isToggled, setIsToggled] = useState(false);
  const hours = new Array(12).fill(0).map((hour, index) => index + 7);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  // Returns the component
  return (
    <div className="active-hours">
      <h1>Active Hours</h1>
      <div className="active-hours-container">
        {hours.map((hour) => (
          <div className="active-hour">
            <span className="active-hour-label">{hour}</span>
            <input
              className="active-hour-checkbox"
              type="checkbox"
              checked={isToggled}
              onChange={toggle}
            />
            <div className="active-hour-switch"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveHours;
