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
		return months[dateArray1[1] - 1] + " " + dateArray1[2] + " to " +
			months[dateArray2[1] - 1] + " " + dateArray2[2] + " " + dateArray1[0];
	} else {
		return months[dateArray1[1] - 1] + " " + dateArray1[2] + " " + dateArray1[0] +
			" to " + months[dateArray2[1] - 1] + " " + dateArray2[2] + " " + dateArray2[0];
	}
}

function deleteBookmark(id) {

	var bookmarksRef = db.collection("users")
		.doc(userID);
	bookmarksRef.update({
		bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
	}).then(refresh => {
		document.getElementById("i_bookmarks-go-here").replaceChildren();
		displayBookmarksDynamically();
	});

}

function displayBookmarksDynamically() {
	let cardTemplate = document.getElementById("i_bookmark-template");

	var bookmarksRef = db.collection("users").doc(userID);

	var bookmarkGoHere = document.getElementById("i_bookmarks-go-here");
	bookmarksRef.get().then((doc) => {
		var bookmarksArray = doc.data().bookmarks;

		if (bookmarksArray.length == 0) {
			bookmarkGoHere.innerHTML = "You have no bookmarks";
		} else {
			bookmarksArray.forEach(eventID => {
				db.collection("events").doc(eventID).get().then(doc => {

					var category = doc.data().category;
					var title = doc.data().name;
					var start = doc.data().start;
					var end = doc.data().end;

					if (start == end) {
						var date = convertSingleDate(start);
					} else {
						var date = convertDurationDates(start, end);
					}

					var docID = doc.id;

					let newBookmark = cardTemplate.content.cloneNode(true);
					newBookmark.querySelector(".bookmark-category").innerHTML = category;
					newBookmark.querySelector(".bookmark-title").innerHTML = title;
					newBookmark.querySelector(".bookmark-title").href = "eachEvent.html?docID=" + docID;
					newBookmark.querySelector(".bookmark-date").innerHTML = date;
					newBookmark.querySelector(".bookmark-btn").onclick = function() {
						deleteBookmark(docID);
					}

					//gonna need to find how to reference specific hike description to link that for the title

					bookmarkGoHere.appendChild(newBookmark);
				});

			})
		}
	});

}

displayBookmarksDynamically();