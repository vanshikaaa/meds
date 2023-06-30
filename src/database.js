// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgfklcRry6VVraZx5Q-ILSm7xzL-L6mYM",
  authDomain: "meds-1c85b.firebaseapp.com",
  projectId: "meds-1c85b",
  storageBucket: "meds-1c85b.appspot.com",
  messagingSenderId: "912735753534",
  appId: "1:912735753534:web:b87ee3886451ae795dc86f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };