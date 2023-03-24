import { useState } from "react";
import "../css/toggle.css";

const Toggle = ({ hour }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="toggle">
      <label class="toggle">
        <span class="toggle-label">7</span>
        <input
          class="toggle-checkbox"
          type="checkbox"
          checked={isToggled}
          onChange={toggle}
        />
        <div class="toggle-switch"></div>
      </label>
    </div>
  );
};

export default Toggle;
