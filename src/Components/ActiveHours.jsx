import "../css/active-hours.css";
import Toggle from "./Toggle";
const ActiveHours = () => {
  const hours = new Array(12).fill(0).map((hour, index) => index + 7);
  return (
    <div className="active-hours">
      <h2>Active Hours</h2>
      <div className="active-hours-container">
        {hours.map((hour) => (
          <Toggle hour={hour} key={hour} />
        ))}
      </div>
    </div>
  );
};

export default ActiveHours;
