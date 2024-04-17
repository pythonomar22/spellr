import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA74dS_wmuE9SL3SZBgLaqQ5clNdMyPm4o",
  authDomain: "spellr-83298.firebaseapp.com",
  databaseURL: "https://spellr-83298-default-rtdb.firebaseio.com",
  projectId: "spellr-83298",
  storageBucket: "spellr-83298.appspot.com",
  messagingSenderId: "439472885128",
  appId: "1:439472885128:web:6e715f918b095aebb87e3d",
  measurementId: "G-L7XNSP5Y8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);