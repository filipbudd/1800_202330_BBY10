firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		localStorage.setItem("user", user.uid);

		// Set the user's UID as a variable
		var uid = user.uid;

		// Fetch the user document from Firestore
		var userDocRef = firebase.firestore().collection("users").doc(uid);

		userDocRef.get().then(function (doc) {
			if (doc.exists) {
				// User document exists; you can access its data
				var name = doc.data().name;
				var userBio = doc.data().bio;
				var picUrl = doc.data().profilePic;

				// Display the user's name on the webpage
				document.getElementById('user-name').textContent = name;

				var nameElement = document.getElementById('user-name'); // Assuming the id is 'bioInput'
				nameElement.style.wordWrap = 'break-word';
				nameElement.style.maxWidth = '1000px';

				// Display the user's name on the webpage
				if (userBio != "") {
					document.getElementById('user-bio').textContent = userBio;
					// Apply word-wrap and set max-width to the bio element

					var bioElement = document.getElementById('user-bio'); // Assuming the id is 'bioInput'
					bioElement.style.wordWrap = 'break-word';
					bioElement.style.maxWidth = '400px';
				}
				else {
					document.getElementById('user-bio').textContent = "This is a chance for you to share your story, interesting human!.";
				}

				// Display the user's profile picture on the webpage
				$("#mypic-goes-here").attr("src", picUrl);

				//display user submitted events
				displayThreeSubmittedEvents(submittedEvents);
			} else {
				// User document does not exist
				console.log('User document does not exist');
			}
		}).catch(function (error) {
			console.log('Error fetching user document:', error);
		});

		


	} else {
		// User is not signed in
		console.log('User is not signed in');
	}
});

function displayThreeSubmittedEvents() {
	let cardTemplate = document.getElementById("i_event-title-template");
	let eventGoHere = document.getElementById("i_event-titles");

	var userID = localStorage.getItem("user");

	let submittedEvents = db.collection("users").doc(userID);
	console.log(submittedEvents);
	submittedEvents.get().then((doc) => {
		var eventsArray = doc.data().submitEvents;
		
		if (eventsArray.length == 0) {
			eventGoHere.innerHTML = "You haven't submitted any events"
		} else {
			eventsArray.slice(0,3).forEach(eventID => {
				console.log(eventID);
				db.collection("events").doc(eventID).get().then(doc => {
					var title = doc.data().name;
					var date = doc.data().date;
	
					var docID = doc.id;
	
					let newEvent = cardTemplate.content.cloneNode(true);
					newEvent.querySelector(".submitted-event-title").innerHTML = title;
					newEvent.querySelector(".submitted-event-title").href = "eachEvent.html?docID=" + docID;
					newEvent.querySelector(".event-date").innerHTML = date;
					newEvent.querySelector(".event-btn").onclick = function () { deleteSubmittedEvent(docID); }
	
					//gonna need to find how to reference specific hike description to link that for the title
	
					eventGoHere.appendChild(newEvent);
				});
	
	
	
			});
		}
	})
	
}

displayThreeSubmittedEvents();

function deleteSubmittedEvent(id) {
    var userID = localStorage.getItem("user");

    var submittedEventRef = db.collection("users")
        .doc(userID);
		submittedEventRef.update({ submitEvents: firebase.firestore.FieldValue.arrayRemove(id) }).then(refresh => {
		document.getElementById("i_event-titles").replaceChildren();
		displayThreeSubmittedEvents();
    });

	db.collection("events")
        .doc(id).delete();

}

