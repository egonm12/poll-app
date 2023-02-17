// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import admin from "firebase-admin";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import { getAuth } from "firebase/auth";

require("dotenv").config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librariescons
const firebaseConfig = {
	apiKey: "AIzaSyD3D_XIWzpvgDvvUlULCQJgq8Uvxj_BiyU",
	authDomain: "mobile-guild-poll-app.firebaseapp.com",
	projectId: "mobile-guild-poll-app",
	storageBucket: "mobile-guild-poll-app.appspot.com",
	messagingSenderId: "172729895409",
	appId: "1:172729895409:web:e125a9b1daff8480d79c50",
	measurementId: "G-CMGTVD6Q7C"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

const EMULATORS_STARTED = "EMULATORS_STARTED";
function startEmulators() {
	if (!global[EMULATORS_STARTED]) {
		global[EMULATORS_STARTED] = true;
		connectFirestoreEmulator(db, "localhost", 8080);
		console.log("connected to emulator");
	}
}

if (process.env.NODE_ENV === "development") {
	console.log("started");
	// startEmulators();
}

export { db, auth };
