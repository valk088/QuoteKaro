// firebase-auth-helper.js
import { auth } from "../firebase";

export const saveUIDToLocalStorage = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem("firebaseUID", user.uid);
    } else {
      localStorage.removeItem("firebaseUID");
    }
  });
};
