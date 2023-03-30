import "../css/toggle.css";

const Toggle = ({ hour, updateHours }) => {
  return (
    <div className="toggle">
      <label className="toggle">
        <span className="toggle-label">{hour.hour}</span>
        <input
          className="toggle-checkbox"
          type="checkbox"
          checked={hour.active}
          onChange={() => updateHours(hour.hour)}
        />
        <div className="toggle-switch"></div>
      </label>
    </div>
  );
};

export default Toggle;
