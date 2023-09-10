import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD873MZxltcakKO278uPy8Lvd9f1CcYY5A",
  authDomain: "aod-daek.firebaseapp.com",
  projectId: "aod-daek",
  storageBucket: "aod-daek.appspot.com",
  messagingSenderId: "862737571220",
  appId: "1:862737571220:web:e8789b8eeb506f661d8381",
  measurementId: "G-WJJS00HPMY"
};

const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp