// https://firebase.google.com/docs/web/setup#available-libraries
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyADEMmN3UaQEu13pKp73zNaXWPYjob_hxk",
	authDomain: "nearbynexus-b7719.firebaseapp.com",
	projectId: "nearbynexus-b7719",
	storageBucket: "nearbynexus-b7719.appspot.com",
	messagingSenderId: "1001592887147",
	appId: "1:1001592887147:web:1ecd90e207df930c401e2e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log("FIREBASE INITIALIZED")

const storage = firebase.storage();

function logout() {
	firebase.auth().signOut()
		.then(() => {
			console.log("User signed out");
			// Redirect or perform additional actions after logout
		})
		.catch((error) => {
			console.error("Error signing out:", error);
		});
}

//DON'T ACTUALLY USE THIS YET BUT WE'LL PROBABLY NEED IT LATER
function writeEvents() {
	//define a variable for the collection you want to create in Firestore to populate data
	var eventsRef = db.collection("events");

	eventsRef.add({

		address: "",
		ages: "",
		category: "",
		cost: "",
		description: "",
		end: "",
		host: "",
		latitude: "",
		longitude: "",
		name: "",
		start: "",

		lastUpdated: firebase.firestore.FieldValue.serverTimestamp() //current system time
	});
}