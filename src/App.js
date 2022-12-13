import "./style.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Description } from "./components/Description";
import { useEffect, useState } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { AuthModal } from "./components/Auth-modal";
import { NewBlock } from "./components/New-block-modal";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { Profile } from "./components/Profile";
import { Follows } from "./components/Follows";
import { ExtendedBlock } from "./components/Extended-Block";

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
      if (user) {
        await addDoc(userCollectionRef, {
          email: registerEmail,
          followers: 0,
          followersList: [],
          following: 0,
          followingList: [],
          pictureURL:
            "https://www.kindpng.com/picc/m/429-4296037_empty-profile-picture-jpg-hd-png-download.png",
          blocks: [],
          description:
            "This is a stock description, to personalize your description just click the edit button",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const followingStatus = (loggedUser, targetUser) => {
    const loggedInUserData = users.filter(
      (element) => element.email === loggedUser
    )[0];
    console.log(loggedInUserData.followingList.includes(targetUser));
    if (loggedInUserData.followingList.includes(targetUser)) return true;
    return false;
  };

  const follow = async (loggedUser, targetUser) => {
    //checks to see if it is following, if it is, return
    const isFollowing = await followingStatus(loggedUser, targetUser);

    if (isFollowing) {
      return;
    }

    // first I am adding the target to following
    const properIDLoggedIn = users.filter(
      (element) => element.email === loggedUser
    )[0];
    console.log(properIDLoggedIn);
    const properIDTarget = users.filter(
      (element) => element.email === targetUser
    )[0];

    const userDoc = doc(db, "users", properIDLoggedIn.id);
    const targetUserDoc = doc(db, "users", properIDTarget.id);

    const newFollowing = {
      followingList: properIDLoggedIn.followingList.concat(targetUser),
      following: properIDLoggedIn.following + 1,
    };
    // second adding the user to targets followers

    const newFollower = {
      followersList: properIDTarget.followersList.concat(loggedUser),
      followers: properIDTarget.followers + 1,
    };
    await updateDoc(userDoc, newFollowing);
    await updateDoc(targetUserDoc, newFollower);
    getUsers();
  };
  const unfollow = async (loggedUser, targetUser) => {
    //checks to see if it is following, if it isnt, return
    const isFollowing = await followingStatus(loggedUser, targetUser);

    if (!isFollowing) {
      return;
    }
    const properIDLoggedIn = users.filter(
      (element) => element.email === loggedUser
    )[0];

    const properIDTarget = users.filter(
      (element) => element.email === targetUser
    )[0];

    const userDoc = doc(db, "users", properIDLoggedIn.id);
    const targetUserDoc = doc(db, "users", properIDTarget.id);

    const removeFollowing = {
      followingList: properIDLoggedIn.followingList
        .slice(properIDLoggedIn.followingList.indexOf(targetUser) + 1)
        .concat(
          properIDLoggedIn.followingList.slice(
            0,
            properIDLoggedIn.followingList.indexOf(targetUser)
          )
        ),
      following: properIDLoggedIn.following - 1,
    };

    const removeFollower = {
      followersList: properIDTarget.followersList
        .slice(properIDTarget.followersList.indexOf(loggedUser) + 1)
        .concat(
          properIDTarget.followersList.slice(
            0,
            properIDTarget.followersList.indexOf(loggedUser)
          )
        ),
      followers: properIDTarget.followers - 1,
    };
    await updateDoc(userDoc, removeFollowing);
    await updateDoc(targetUserDoc, removeFollower);
    getUsers();
  };
  const updateProfile = async (e, id, email) => {
    e.preventDefault();

    const userDoc = doc(db, "users", id);
    const properIDTarget = users.filter(
      (element) => element.email === email
    )[0];

    const newFields = {
      description: e.target.elements[2].value
        ? e.target.elements[2].value
        : properIDTarget.description,
      pictureURL: e.target.elements[1].value
        ? e.target.elements[1].value
        : properIDTarget.pictureURL,
    };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const login = async (e) => {
    e.preventDefault();
    //pass this to the submit button of the login form
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
      return false;
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

  const addBlock = async (e, user) => {
    e.preventDefault();
    await addDoc(blocksCollectionRef, {
      comments: [],
      commentsCount: 0,
      content: e.target.elements[0].value,
      userOwner: user,
      date: new Date().toISOString(),
    });
  };
  const deleteBlock = async (id) => {
    const blockDoc = doc(db, "blocks", id);
    await deleteDoc(blockDoc);
    getBlocksList();
  };
  const addComment = async (postID, currentUser, e) => {
    if (!e.target.elements[0].value) return;

    e.preventDefault();
    const blockRef = blocks.filter((obj) => obj.id === postID)[0];
    const blockDoc = doc(db, "blocks", blockRef.id);

    const newComment = {
      comments: blockRef.comments.concat({
        content: e.target.elements[0].value,
        owner: currentUser,
        date: new Date().toISOString(),
        index: blockRef.comments.length + 1,
      }),
      commentsCount: blockRef.commentsCount + 1,
    };
    await updateDoc(blockDoc, newComment);
    getBlocksList();
  };
  const deleteComment = async (postID, commentIndex) => {
    const blockRef = blocks.filter((obj) => obj.id === postID)[0];
    const blockDoc = doc(db, "blocks", blockRef.id);

    const newComment = {
      comments: blockRef.comments
        .slice(0, commentIndex)
        .concat(blockRef.comments.slice(commentIndex + 1)),
      commentsCount: blockRef.commentsCount - 1,
    };
    await updateDoc(blockDoc, newComment);
    getBlocksList();
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
      console.log(activeUser?.email);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  return (
    <div className="App">
      <Header
        toggleRegisterLogIn={toggleAuthModal}
        profileAuth={activeUser}
        logoutAction={logout}
        userData={users}
      />
      <Sidebar toggleNewBlock={toggleBlockModal} profileAuth={activeUser} />
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="welcome-page"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                margin: "10px",
              }}
            >
              {(!activeUser?.email && users.length > 0 && (
                <div>
                  {" "}
                  <h1>Welcome to Block Talk!</h1>
                  <p>
                    Please Create your account by clicking the button on the top
                    right side, and feel free to try out the application! for
                    more details check out the{" "}
                    <a href="https://github.com/joaobitu/block-talk">
                      repository
                    </a>
                    !
                  </p>
                </div>
              )) ||
                (users.length > 0 && (
                  <Homepage
                    blocksList={blocks}
                    profileAuth={activeUser}
                    validateFollowing={followingStatus}
                    deleteSelectedBlock={deleteBlock}
                  />
                ))}
            </div>
          }
        />
        <Route
          path="/:email"
          element={
            <Homepage
              blocksList={blocks}
              profileAuth={activeUser}
              validateFollowing={followingStatus}
              deleteSelectedBlock={deleteBlock}
            />
          }
        />
        <Route
          path="/profile/:email"
          element={
            <Profile
              userData={users}
              profileAuth={activeUser}
              profileUpdateSubmit={updateProfile}
              profileUpdateToggle={toggleProfileUpdateModal}
              profileModalValidity={profileUpdateModal}
              followButton={follow}
              unfollowButton={unfollow}
              blocksList={blocks}
              deleteSelectedBlock={deleteBlock}
            />
          }
        />
        <Route
          path="/follows/:email"
          element={<Follows userData={users} profileAuth={activeUser} />}
        />
        <Route
          path="/posts/:id"
          element={
            <ExtendedBlock
              blocksList={blocks}
              addCommentSubmit={addComment}
              profileAuth={activeUser}
              deleteCommentClick={deleteComment}
            />
          }
        />
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
      {newBlockModal && (
        <NewBlock
          toggleNewBlock={toggleBlockModal}
          profileAuth={activeUser}
          userData={users}
          addNewBlock={addBlock}
          updateBlocksList={getBlocksList}
        />
      )}
    </div>
  );
}

export default App;
