// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlTbSS9ra5xsR7DSt3-mSHALixDnT6zuM",
  authDomain: "personal-finance-tracker-b0473.firebaseapp.com",
  projectId: "personal-finance-tracker-b0473",
  storageBucket: "personal-finance-tracker-b0473.appspot.com",
  messagingSenderId: "405263264849",
  appId: "1:405263264849:web:efe07ba206a2528e205c70",
  measurementId: "G-3SB307EX9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
