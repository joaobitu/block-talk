import "./style.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Description } from "./components/Description";
import { useEffect, useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { AuthModal } from "./components/Auth-modal";
import { NewBlock } from "./components/New-block-modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { Profile } from "./components/Profile";
import { Follows } from "./components/Follows";

function App() {
  const [blocks, setBlocks] = useState([]);
  const blocksCollectionRef = collection(db, "blocks");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const userCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);

  const [activeUser, setActiveUser] = useState({});

  const [authModalToggle, setAuthModalToggle] = useState(false);
  const [newBlockModal, setNewBlockModal] = useState(false);
  const [profileUpdateModal, setProfileUpdateModal] = useState(false);

  const toggleProfileUpdateModal = () => {
    setProfileUpdateModal(!profileUpdateModal);
  };

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

  const updateProfile = async (e, id) => {
    e.preventDefault();
    const userDoc = doc(db, "users", id);
    console.log(e);
    const newFields = {
      description: e.target.elements[2].value,
      pictureURL: e.target.elements[1].value,
    };
    await updateDoc(userDoc, newFields);
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
      }))
    );
  };

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    getUsers();

    getBlocksList();
    onAuthStateChanged(auth, (currentUser) => {
      setActiveUser(currentUser);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          toggleRegisterLogIn={toggleAuthModal}
          profileAuth={activeUser}
          logoutAction={logout}
        />
        <Sidebar toggleNewBlock={toggleBlockModal} profileAuth={activeUser} />
        <Routes>
          <Route path="/:email" element={<Homepage />} />
          <Route
            path="/profile/:email"
            element={
              <Profile
                userData={users}
                profileAuth={activeUser}
                profileUpdateSubmit={updateProfile}
                profileUpdateToggle={toggleProfileUpdateModal}
                profileModalValidity={profileUpdateModal}
              />
            }
          />
          <Route path="/follows/:email" element={<Follows />} />
        </Routes>
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
    </BrowserRouter>
  );
}

export default App;
