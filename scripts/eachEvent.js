
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//turn number dates to words
function convertSingleDate(date) {
	dateArray = date.split("-");
	console.log(dateArray);
	return dateArray[2] + " " + months[dateArray[1]-1] + " " + dateArray[0];
}

function convertDurationDates(date1, date2) {
	dateArray1 = date1.split("-");
	dateArray2 = date2.split("-");

	if (dateArray1[0] == dateArray2[0]) {
		return dateArray1[2] + " " + months[dateArray1[1]-1] + " to "
		+ dateArray2[2] + " " + months[dateArray2[1]-1] + dateArray1[0];
	} else {
		return dateArray1[2] + " " + months[dateArray1[1]-1] + " " + dateArray1[0] 
			+ " to " + dateArray2[2] + " " + months[dateArray2[1]-1] + " " + dateArray2[0];
	}
}



//EVINS STUFF BELOW

//Get the ID from the URL (look at the url)
let params = new URL(window.location.href);
var ID = params.searchParams.get("docID");

function displayEventInfo() {
    //Refer to the specific event
    db.collection("events").doc(ID).get().then(doc => {

        //Get all the necessary data from the DB and stores in variables
        var ages = doc.data().ages;
        var category = doc.data().category;
        var address = doc.data().address;
        var cost = doc.data().cost;
        var description = doc.data().description;
        var image = doc.data().image;
        var link = doc.data().link;
        var map = doc.data().map;
		var start = doc.data().start;
		var end = doc.data().end;
        var name = doc.data().name;
        var host = doc.data().host;
		

		// Generate date using start and end
		if (start == end){
			var date = convertSingleDate(start);
		} else {
			var date = convertDurationDates(start, end);
		}

        // populate all information, and image through the Ids
        document.getElementById("event-name").innerHTML = name;
        document.getElementById("category").innerHTML = category;
        document.getElementById("cost").innerHTML = cost;
        document.getElementById("date").innerHTML = date;
        document.getElementById("address").innerHTML = address;
        document.getElementById("host").innerHTML = host;
        document.getElementById("description").innerHTML = description;
        document.getElementById("ages").innerHTML = ages;
        document.getElementById("link").href = "NOT_A_REAL_PAGE.html:) -Evin";

        //formats the image directory and adds it
        let imgEvent = document.getElementById("bannerImg")
        imgEvent.src = "../images/" + image + ".jpg";
        console.log(ID + ' THIS IS THE DOC ID');
    });
}
displayEventInfo();





//----------------------- BOOKMARK FUNCTIONS -----------------------//
// Store the current user
var userID = localStorage.getItem("user");
console.log(userID);

function bookmark() {
    var bookmarksRef = db.collection("users").doc(userID);
    bookmarksRef.onSnapshot((doc) => {
        var bookmarksArray = doc.data().bookmarks;
        console.log(bookmarksArray);
        if (bookmarksArray.includes(ID)) {
            document.getElementById("i_bookmark-icon").className = "material-icons";
        } else {
            document.getElementById("i_bookmark-icon").className = "material-symbols-outlined";
        }
    });
}
bookmark();


function addBookmark() {

    let icon = document.getElementById("i_bookmark-icon").className;
    var bookmarksRef = db.collection("users").doc(userID);

    if (icon == "material-symbols-outlined") {
        bookmarksRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(ID)
        });
    } else {
        bookmarksRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(ID)
        });
    }
}
