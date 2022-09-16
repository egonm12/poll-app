import { getApp, getApps, initializeApp } from "firebase/app";
import {
	getDoc,
	getFirestore,
	doc,
	getDocs,
	where,
	collection,
	query,
	setDoc,
	connectFirestoreEmulator,
} from "firebase/firestore";
import { UpdateScore } from "~/routes/polls/$id";
import { firebaseConfig } from "~/utils/config.client";
// import { db as serverDb } from "~/utils/firebase";

export const getUserByID = async (id: string) => {
	const app =
		getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const db = getFirestore(app);

	const docRef = await doc(db, "users", id);

	const snapshot = await getDoc(docRef);

	if (!snapshot.exists) {
		throw new Error("User doesn't exist");
	} else {
		return snapshot.data();
	}
};

export const getUsers = async () => {
	const app =
		getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const db = getFirestore(app);

	const ref = collection(db, "users");
	const getQuery = query(ref);
	const querySnapshot = await getDocs(getQuery);

	return querySnapshot.docs.map((item) => item.data());
};

export const updateUserById = async <T extends UpdateScore>(payload: T) => {
	const app =
		getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const db = getFirestore(app);

	const snapshot = await setDoc(
		doc(db, "users", payload.id as string),
		payload,
		{
			merge: true,
		}
	);

	return snapshot;
};

export const getAdminUser = async (id: string) => {
	const app =
		getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const db = getFirestore(app);

	const docRef = await doc(db, "users", id);
	const snapshot = await getDoc(docRef);

	if (!snapshot.exists) {
		throw new Error("User doesn't exist");
	} else {
		return snapshot.data()?.role === "admin";
	}
	// const userRef = collection(serverDb, "users");
	// const getQuery = query(userRef, where("role", "==", "admin"));

	// const result = await getDocs(getQuery);
	// return result.docs.map((item) => {
	// 	return item.data().id === id;
	// });
};
// export const getAdminUser = async () => {
// 	const userRef = collection(serverDb, "users");
// 	const getQuery = query(userRef, where("role", "==", "admin"));

// 	const result = await getDocs(getQuery);
// 	return result.docs.map((item) => {
// 		return item.data();
// 	});
// };
