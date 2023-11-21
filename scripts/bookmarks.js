// Store the current user
var userID = localStorage.getItem("user");

function deleteBookmark(id) {
    
    var bookmarksRef = db.collection("users")
        .doc(userID);
    	bookmarksRef.update({ bookmarks: firebase.firestore.FieldValue.arrayRemove(id) }).then(refresh => {
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
                    var date = doc.data().date;

                    var docID = doc.id;

                    let newBookmark = cardTemplate.content.cloneNode(true);
                    newBookmark.querySelector(".bookmark-category").innerHTML = category;
                    newBookmark.querySelector(".bookmark-title").innerHTML = title;
                    newBookmark.querySelector(".bookmark-title").href = "eachEvent.html?docID=" + docID;
                    newBookmark.querySelector(".bookmark-date").innerHTML = date;
                    newBookmark.querySelector(".bookmark-btn").onclick = function () { deleteBookmark(docID); }

                    //gonna need to find how to reference specific hike description to link that for the title

                    bookmarkGoHere.appendChild(newBookmark);
                });



            })
        }
    });


}

displayBookmarksDynamically();

