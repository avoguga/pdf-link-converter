// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfLIwKYBxj1HM_R79BnvIctzwMwEmdV4s",
  authDomain: "pdf-link-converter.firebaseapp.com",
  projectId: "pdf-link-converter",
  storageBucket: "pdf-link-converter.appspot.com",
  messagingSenderId: "739777383178",
  appId: "1:739777383178:web:7ce21494a439c675f908f3",
  measurementId: "G-0QKHDWQGHP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
