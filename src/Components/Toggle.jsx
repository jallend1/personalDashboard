import { useState } from "react";
import "../css/toggle.css";

const Toggle = ({ hour }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="toggle">
      <label className="toggle">
        <span className="toggle-label">7</span>
        <input
          className="toggle-checkbox"
          type="checkbox"
          checked={isToggled}
          onChange={toggle}
        />
        <div className="toggle-switch"></div>
      </label>
    </div>
  );
};

export default Toggle;
