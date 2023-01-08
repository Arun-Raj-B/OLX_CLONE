import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyAiNNBMVEvTAmlATmKGFQuq7qncVbissbE",
  authDomain: "fir-23df0.firebaseapp.com",
  projectId: "fir-23df0",
  storageBucket: "fir-23df0.appspot.com",
  messagingSenderId: "428436929324",
  appId: "1:428436929324:web:0a6c5150b00c35ef7cca89",
  measurementId: "G-SJ452HMLMQ",
};

export default firebase.initializeApp(firebaseConfig);
