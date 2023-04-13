import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


import Header from "./Components/Header";
import Stopwatch from "./Components/Stopwatch";
import Greeting from "./Components/Greeting";
import ActiveHours from "./Components/ActiveHours";
import Water from "./Components/Water";
import PrimaryTasks from "./Components/PrimaryTasks";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

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
  const [uid, setUid] = useState("");

  // Creates an object containing today's date, and active hours to send to Firestore
  const createDayObject = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = `${month}/${day}/${year}`;
    return { date, activeHours: hoursData };
  };

  const updateDayInFirestore = () => {
    const day = createDayObject();
    const docRef = db.collection("users").doc(uid).collection("days").doc(day.date);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          docRef.update(day);
        } else {
          docRef.set(day);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        setUserFirstName(user.displayName.split(" ")[0]);
        setUid(user.uid);
        setIsLoggedIn(true);
        checkForUserInFirestore(user.uid);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const checkForUserInFirestore = (userID) => {
    const docRef = db.collection("users").doc(uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Check if user has a document for today
          updateDayInFirestore();
        } else {
          docRef.set({ name: userFirstName });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
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
      <div className="page-content">
        <div className="sidebar">
          <ActiveHours
            hoursData={hoursData}
            updateHours={updateHours}
            resetDay={resetDay}
          />
        </div>
        <div className="main-content">
          <Greeting userFirstName={userFirstName} />
          <div className="components">
            <Stopwatch />
            <Water />
            <PrimaryTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
