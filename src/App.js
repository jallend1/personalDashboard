import Header from "./Components/Header";
import Stopwatch from "./Components/Stopwatch";
import Greeting from "./Components/Greeting";
import ActiveHours from "./Components/ActiveHours";
import LoginModal from "./Components/LoginModal";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const hoursDataFromStorage = JSON.parse(localStorage.getItem("hoursData"));
  const [hoursData, setHoursData] = useState(
    hoursDataFromStorage ||
    new Array(13).fill(0).map((hour, index) => {
      return { hour: index + 6, active: false };
    })
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };



  const updateHours = (targetHour) => {
    const newHours = hoursData.map((h) => {
      if (h.hour === targetHour) {
        return { hour: h.hour, active: !h.active };
      }
      return h;
    });
    setHoursData(newHours);
    localStorage.setItem("hoursData", JSON.stringify(newHours));
  };

  const resetDay = () => {
    const newHours = hoursData.map((h) => {
      return { hour: h.hour, active: false };
    });
    setHoursData(newHours);
    localStorage.setItem("hoursData", JSON.stringify(newHours));
  };

  return (
    <div className="App">
      <Header signInWithGoogle={signInWithGoogle} isLoggedIn={isLoggedIn} />
      <LoginModal isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} toggleModal={toggleModal} showModal={showModal} />
      <Greeting />
      <Stopwatch />
      <ActiveHours
        hoursData={hoursData}
        updateHours={updateHours}
        resetDay={resetDay}
      />
    </div>
  );
}

export default App;
