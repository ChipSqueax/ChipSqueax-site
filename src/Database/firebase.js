// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWA2wW5xLWJ2pJT9mZiagYXfsg6TO5fpk",
  authDomain: "mydummysite2-3976e.firebaseapp.com",
  projectId: "mydummysite2-3976e",
  storageBucket: "mydummysite2-3976e.appspot.com",
  messagingSenderId: "657711712348",
  appId: "1:657711712348:web:00d05b43f6108f2a92fe99",
  measurementId: "G-31LV60K8PS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const exportDB = {
  db: db,
  storage: storage,
  auth: auth,
  provider: provider,
}

export default exportDB;