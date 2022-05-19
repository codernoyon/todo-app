// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAebUC-eupVk_1jyxb9blonSb5NQkMko",
  authDomain: "todo-app-mini.firebaseapp.com",
  projectId: "todo-app-mini",
  storageBucket: "todo-app-mini.appspot.com",
  messagingSenderId: "978385887887",
  appId: "1:978385887887:web:697a1b95495cfd6d1786fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;