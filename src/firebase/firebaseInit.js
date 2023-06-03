// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA0RVunkSw1BbC2t1mbM3V2eAu-LV_KY0",
  authDomain: "fir-f8955.firebaseapp.com",
  databaseURL: "https://fir-f8955-default-rtdb.firebaseio.com/",
  projectId: "fir-f8955",
  storageBucket: "fir-f8955.appspot.com",
  messagingSenderId: "1083294247920",
  appId: "1:1083294247920:web:9b8b5833a7bef605424b35",
  measurementId: "G-3LGRSLZ2X2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);