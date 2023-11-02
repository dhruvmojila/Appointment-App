import { initializeApp, getApps, getApp } from "firebase/app";
import "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh3WCCX1iiBJOk2nD8CYCIjaJjGIB10bo",
  authDomain: "appointment-app-9df8b.firebaseapp.com",
  projectId: "appointment-app-9df8b",
  storageBucket: "appointment-app-9df8b.appspot.com",
  messagingSenderId: "959985158338",
  appId: "1:959985158338:web:10af49815ce6c2af13d35b",
  measurementId: "G-SEKWR39NXH",
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
