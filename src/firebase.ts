// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXtL56V3JPSG4SmC_p4JR_GS-HTUBRwkE",
  authDomain: "realtor-clone-react-d765b.firebaseapp.com",
  projectId: "realtor-clone-react-d765b",
  storageBucket: "realtor-clone-react-d765b.appspot.com",
  messagingSenderId: "1041609859004",
  appId: "1:1041609859004:web:5e52ae5e714e67619d55b9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// get firebase db
export const db = getFirestore(app);
