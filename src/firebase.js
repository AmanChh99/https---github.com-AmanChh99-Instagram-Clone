// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCz33NkKM24rGX8soPVXltBqZm6TLXmBnE",
  authDomain: "instagram-clone-44ba2.firebaseapp.com",
  projectId: "instagram-clone-44ba2",
  storageBucket: "instagram-clone-44ba2.appspot.com",
  messagingSenderId: "661625728377",
  appId: "1:661625728377:web:2e784d2bfe8ff00a21d3a8",
  measurementId: "G-YDKGTWYQC0",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
