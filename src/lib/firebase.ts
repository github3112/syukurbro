import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "gratefulme",
  appId: "1:37978453068:web:fb54a0bf3a9cf1104170e9",
  storageBucket: "gratefulme.firebasestorage.app",
  apiKey: "AIzaSyCDk4ujt4c0VLy-0JuDGeNGf5C1MO945IA",
  authDomain: "gratefulme.firebaseapp.com",
  messagingSenderId: "37978453068",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
