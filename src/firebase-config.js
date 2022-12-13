import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: "block-talk-42c0d",
  storageBucket: "block-talk-42c0d.appspot.com",
  messagingSenderId: "487535311993",
  appId: "1:487535311993:web:24a912c46a1cf85c4968a8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
