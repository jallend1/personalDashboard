import Stopwatch from "./Components/Stopwatch";
import Greeting from "./Components/Greeting";
import ActiveHours from "./Components/ActiveHours";
import { useState } from "react";

function App() {
  const [hoursData, setHoursData] = useState(
    new Array(13).fill(0).map((hour, index) => {
      return { hour: index + 6, active: false };
    })
  );

  const updateHours = (targetHour) => {
    const newHours = hoursData.map((h) => {
      if (h.hour === targetHour) {
        return { hour: h.hour, active: !h.active };
      }
      return h;
    });
    setHoursData(newHours);
  };

  return (
    <div className="App">
      <Greeting />
      <Stopwatch />
      <ActiveHours hoursData={hoursData} updateHours={updateHours} />
    </div>
  );
}

export default App;
