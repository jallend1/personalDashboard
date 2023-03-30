import "../css/active-hours.css";
import Toggle from "./Toggle";
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
        <button className="active-hours-reset" onClick={resetDay}>
          Reset Day
        </button>
      </div>
    </div>
  );
};

export default ActiveHours;
