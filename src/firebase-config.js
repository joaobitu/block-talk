import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDijHtmpN8LcSUke1jwOAgZNlpmhLRtzf4",
  authDomain: "block-talk-42c0d.firebaseapp.com",
  projectId: "block-talk-42c0d",
  storageBucket: "block-talk-42c0d.appspot.com",
  messagingSenderId: "487535311993",
  appId: "1:487535311993:web:24a912c46a1cf85c4968a8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
