import "../css/active-hours.css";
import Toggle from "./Toggle";
const ActiveHours = ({ updateHours, hoursData }) => {
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
    </div>
  );
};

export default ActiveHours;
