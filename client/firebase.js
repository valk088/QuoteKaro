// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCguPl0yCePykvPIVkcm0UXsLtFu1my_fU",
  authDomain: "quotekaro-4d4cd.firebaseapp.com",
  projectId: "quotekaro-4d4cd",
  storageBucket: "quotekaro-4d4cd.firebasestorage.app",
  messagingSenderId: "565673641821",
  appId: "1:565673641821:web:dcbf51e20d142768940ab4",
  measurementId: "G-44YRS1NJCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);