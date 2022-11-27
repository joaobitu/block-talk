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
import { AuthModal } from "./components/Auth-modal";
import { NewBlock } from "./components/New-block-modal";

function App() {
  const [blocks, setBlocks] = useState([]);
  const blocksCollectionRef = collection(db, "blocks");

  //add all of these states to onchange functions in the inputs for registering and login!
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [activeUser, setActiveUser] = useState({}); // pass active user to header and other places so I can access active user data, and display it!

  const [authModalToggle, setAuthModalToggle] = useState(false);
  const [newBlockModal, setNewBlockModal] = useState(false);

  const toggleBlockModal = () => {
    setNewBlockModal(!newBlockModal);
  };

  const toggleAuthModal = () => {
    setAuthModalToggle(!authModalToggle);
  };

  const register = async (e) => {
    e.preventDefault();
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

  const login = async (e) => {
    e.preventDefault();
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
    onAuthStateChanged(auth, (currentUser) => {
      setActiveUser(currentUser);
    });
  }, []);

  return (
    <div className="App">
      <Header
        toggleRegisterLogIn={toggleAuthModal}
        profileAuth={activeUser}
        logoutAction={logout}
      />
      <Sidebar toggleNewBlock={toggleBlockModal} />
      <Description />
      {authModalToggle && (
        <AuthModal
          toggleRegisterLogIn={toggleAuthModal}
          emailRegisterValue={setRegisterEmail}
          passwordRegisterValue={setRegisterPassword}
          emailLoginValue={setLoginEmail}
          passwordLoginValue={setLoginPassword}
          registerSubmit={register}
          loginSubmit={login}
        />
      )}
      {newBlockModal && <NewBlock toggleNewBlock={toggleBlockModal} />}
    </div>
  );
}

export default App;
