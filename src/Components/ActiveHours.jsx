import "../css/active-hours.css";
import Toggle from "./Toggle";
import Button from './Button';
const ActiveHours = ({ updateHours, hoursData, resetDay }) => {
  return (
    <div className="active-hours">
      <h2>Active Hours</h2>
      <div className="active-hours-container">
        {hoursData.map((hourDetails) => (
          <Toggle
            hour={hourDetails}
            key={hourDetails.hour}
            updateHours={updateHours}
          />
        ))}

      </div>
      <Button text="Reset Day" onClick={resetDay} className="neon-button reset-button" />
    </div>
  );
};

export default ActiveHours;
