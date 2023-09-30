import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyCEiLHBWofZ48N0vzPmxkqMTFqFeAW6WvY",
  authDomain: "ticketswala-a6d58.firebaseapp.com",
  projectId: "ticketswala-a6d58",
  storageBucket: "ticketswala-a6d58.appspot.com",
  messagingSenderId: "323359400647",
  appId: "1:323359400647:web:7b3bfa6d8e5261891714e2"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);


export {
  firebaseApp,
  addDoc,
  collection,
  db,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  uploadBytes,
  auth,
  signInWithEmailAndPassword
};