// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-video-generator-5e513.firebaseapp.com",
  projectId: "ai-video-generator-5e513",
  storageBucket: "ai-video-generator-5e513.firebasestorage.app",
  messagingSenderId: "295800868497",
  appId: "1:295800868497:web:ac15645290d8df061a7930",
  measurementId: "G-85JNKXL2B3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
