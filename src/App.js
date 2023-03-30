import Stopwatch from "./Components/Stopwatch";
import Greeting from "./Components/Greeting";
import ActiveHours from "./Components/ActiveHours";

function App() {
  return (
    <div className="App">
      <Greeting />
      <Stopwatch />
      <ActiveHours />
    </div>
  );
}

export default App;
