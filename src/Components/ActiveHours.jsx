import "../css/active-hours.css";
import Toggle from "./Toggle";
const ActiveHours = ({ updateHours, hours }) => {
  return (
    <div className="active-hours">
      <h2>Active Hours</h2>
      <div className="active-hours-container">
        {hours.map((hour) => (
          <Toggle hour={hour} key={hour.hour} updateHours={updateHours} />
        ))}
      </div>
    </div>
  );
};

export default ActiveHours;
