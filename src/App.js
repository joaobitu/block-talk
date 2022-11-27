import "./style.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Description } from "./components/Description";
import { useEffect, useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [blocks, setBlocks] = useState([]);
  const blocksCollectionRef = collection(db, "blocks");

  //add all of these states to onchange functions in the inputs for registering and login!
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [activeUser, setActiveUser] = useState({}); // pass active user to header and other places so I can access active user data, and display it!

  onAuthStateChanged(auth, (currentUser) => {
    setActiveUser(currentUser);
  });

  const register = async () => {
    // pass this to the submit button of the register form
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    //pass this to the submit button of the login form
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    //pass this to a header button.
    await signOut(auth);
  };

  const getBlocksList = async () => {
    const data = await getDocs(blocksCollectionRef);
    setBlocks(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        user: doc.user,
      }))
    );
  };

  useEffect(() => {
    getBlocksList();
  }, []);

  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Description />
    </div>
  );
}

export default App;
