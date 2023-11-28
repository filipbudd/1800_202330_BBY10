firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		

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


var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//turn number dates to words
function convertSingleDate(date) {
	let dateArray = date.split("-");
	return months[dateArray[1] - 1] + " " + dateArray[2];
}

function convertDurationDates(date1, date2) {
	let dateArray1 = date1.split("-");
	let dateArray2 = date2.split("-");

	if (dateArray1[0] == dateArray2[0]) {
		return months[dateArray1[1] - 1] + " " + dateArray1[2] + " - "
			+  months[dateArray2[1] - 1]  + " " + dateArray2[2];
	} else {
		return  months[dateArray1[1] - 1] + " " + dateArray1[2]
			+ " - " +  months[dateArray2[1] - 1] + " " + dateArray2[2];
	}
}


function displayThreeSubmittedEvents() {
	let cardTemplate = document.getElementById("i_event-title-template");
	let eventGoHere = document.getElementById("i_event-titles");

	var userID = localStorage.getItem("user");

	let submittedEvents = db.collection("users").doc(userID);
	submittedEvents.get().then((doc) => {
		var eventsArray = doc.data().submitEvents;
		console.log(doc.data().submitEvents);
		
		if (eventsArray.length == 0) {
			eventGoHere.innerHTML = "You haven't submitted any events"
		} else {
			eventsArray.slice(0,3).forEach(eventID => {
				console.log(eventID);
				db.collection("events").doc(eventID).get().then(doc => {
					var title = doc.data().name;
					var start = doc.data().start;
					var end = doc.data().end;

					if (start == end){
						var date = convertSingleDate(start);
					} else {
						var date = convertDurationDates(start, end);
					}
	
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

function deleteUserRecordOfEvent(id) {
	db.collection("events").doc(id).delete();
    var submittedEventRef = db.collection("users")
        .doc(userID);
	
	submittedEventRef.update({ submitEvents: firebase.firestore.FieldValue.arrayRemove(id) }).then(refresh => {
		document.getElementById("i_events-go-here").replaceChildren();
		displaySubmittedEvent();
    });
}

function deleteSubmittedEvent(id) {
	db.collection("events").doc(id).get().then(doc => {
		var image = doc.data().image;
		var fileRef = storage.refFromURL(image);

		fileRef.delete().then(function(){
			console.log("Image deleted");
		});

		db.collection("events").doc(id).delete().then(() => {
			console.log("event deleted");
		});
		deleteUserRecordOfEvent(id);
	});

}

