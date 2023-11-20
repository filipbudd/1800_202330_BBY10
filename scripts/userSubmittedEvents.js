// Store the current user
var userID = localStorage.getItem("user");

function deleteSubmittedEvent(id) {
    var submittedEventRef = db.collection("users")
        .doc(userID);
		submittedEventRef.update({ submitEvents: firebase.firestore.FieldValue.arrayRemove(id) }).then(refresh => {
		document.getElementById("i_events-go-here").replaceChildren();
		displaySubmittedEvent();
    });

	db.collection("events")
        .doc(id).delete();
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

                    var docID = doc.id;

                    let newEvent = cardTemplate.content.cloneNode(true);
                    newEvent.querySelector(".event-category").innerHTML = category;
                    newEvent.querySelector(".event-title").innerHTML = title;
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
