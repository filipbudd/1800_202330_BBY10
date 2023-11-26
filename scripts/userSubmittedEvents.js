// Store the current user
var userID = localStorage.getItem("user");

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//turn number dates to words
function convertSingleDate(date) {
	let dateArray = date.split("-");
	return months[dateArray[1] - 1] + " " + dateArray[2] + " " + dateArray[0];
}

function convertDurationDates(date1, date2) {
	let dateArray1 = date1.split("-");
	let dateArray2 = date2.split("-");

	if (dateArray1[0] == dateArray2[0]) {
		return months[dateArray1[1] - 1] + " " + dateArray1[2] + " to "
			+  months[dateArray2[1] - 1]  + " " + dateArray2[2] + " " + dateArray1[0];
	} else {
		return  months[dateArray1[1] - 1] + " " + dateArray1[2] + " " + dateArray1[0]
			+ " to " +  months[dateArray2[1] - 1] + " " + dateArray2[2] + " " + dateArray2[0];
	}
}

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



function displaySubmittedEvent() {
    let cardTemplate = document.getElementById("i_event-template");
	var eventGoHere = document.getElementById("i_events-go-here");

    var eventsRef = db.collection("users").doc(userID);

    eventsRef.get().then((doc) => {
        var eventsArray = doc.data().submitEvents;

        if (eventsArray.length == 0) {
            eventGoHere.innerHTML = "You haven't submitted any events";
        } else {
            eventsArray.forEach(eventID => {
                db.collection("events").doc(eventID).get().then(doc => {
                    var category = doc.data().category;
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
                    newEvent.querySelector(".event-category").innerHTML = category;
                    newEvent.querySelector(".event-title").innerHTML = title;
					newEvent.querySelector(".event-date").innerHTML = date;
                    newEvent.querySelector(".event-title").href = "eachEvent.html?docID=" + docID;
                    newEvent.querySelector(".event-btn").onclick = function () { deleteSubmittedEvent(docID); }

                    //gonna need to find how to reference specific hike description to link that for the title

                    eventGoHere.appendChild(newEvent);
                });



            })
        }
    });
}

displaySubmittedEvent();
