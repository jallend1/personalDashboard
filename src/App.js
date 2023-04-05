import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";


import Header from "./Components/Header";
import Stopwatch from "./Components/Stopwatch";
import Greeting from "./Components/Greeting";
import ActiveHours from "./Components/ActiveHours";
import Water from "./Components/Water";
import Stopwatch2 from "./Components/Stopwatch2";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const db = getFirestore(app);

function App() {
  const hoursDataFromStorage = JSON.parse(localStorage.getItem("hoursData"));
  const [hoursData, setHoursData] = useState(
    hoursDataFromStorage ||
    new Array(13).fill(0).map((hour, index) => {
      return { hour: index + 6, active: false };
    })
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState("Friend");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        setUserFirstName(user.displayName.split(" ")[0]);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
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
      <Header signInWithGoogle={signInWithGoogle} signOut={signOut} isLoggedIn={isLoggedIn} />
      <Greeting userFirstName={userFirstName} />
      <div className="components">
        <Stopwatch />
        <Stopwatch2 />
        <Water />
      </div>
      <ActiveHours
        hoursData={hoursData}
        updateHours={updateHours}
        resetDay={resetDay}
      />
    </div>
  );
}

export default App;
