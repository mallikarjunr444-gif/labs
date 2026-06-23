import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-gh3BrvC_QbHcdz3xFV--ZsGieH_nMNs",
  authDomain: "labs-8b2b3.firebaseapp.com",
  projectId: "labs-8b2b3",
  storageBucket: "labs-8b2b3.firebasestorage.app",
  messagingSenderId: "172581181869",
  appId: "1:172581181869:web:4731ced0dbb9db1a972924",
  measurementId: "G-DRX2TF9YC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
