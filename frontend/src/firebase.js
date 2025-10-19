// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBbbWf2aMRKwYCBC6otohLPjGP_ACd6frs",
  authDomain: "hasiru-sante.firebaseapp.com",
  projectId: "hasiru-sante",
  storageBucket: "hasiru-sante.firebasestorage.app",
  messagingSenderId: "291046239677",
  appId: "1:291046239677:web:076c7a748d1949cf0176d4",
  measurementId: "G-0PT1F33ZB6"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

if (window.location.hostname === "localhost") {
  console.log("Connecting to local emulators...");
  connectFirestoreEmulator(firestore, "localhost", 8080); // <-- IMPORTANT: Port updated to 8085
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { app, firestore, auth, functions };