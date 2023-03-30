import "../css/toggle.css";

const Toggle = ({ hour: hourDetails, updateHours }) => {
  return (
    <div className="toggle">
      <label className="toggle">
        <span className="toggle-label">{hourDetails.hour}:00</span>
        <input
          className="toggle-checkbox"
          type="checkbox"
          checked={hourDetails.active}
          onChange={() => updateHours(hourDetails.hour)}
        />
        <div className="toggle-switch"></div>
      </label>
    </div>
  );
};

export default Toggle;
