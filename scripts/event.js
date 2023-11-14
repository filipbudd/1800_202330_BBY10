// Store the current user
var userID = localStorage.getItem("user");
console.log(userID);
var eventID = "CKMMGiUDrJKDjigW8aHP" // should not be hardcoded

function bookmark() {
    var bookmarksRef = db.collection("users").doc(userID);
    bookmarksRef.onSnapshot((doc) => {
        var bookmarksArray = doc.data().bookmarks;
        console.log(bookmarksArray);
        if (bookmarksArray.includes(eventID)) {
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
            bookmarks: firebase.firestore.FieldValue.arrayUnion(eventID)
        });
    } else {
        bookmarksRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(eventID)
        });
    }
    //define a variable for the collection you want to create in Firestore to populate data


    //let params = new URL( window.location.href ); //get URL of search bar
    //let EventID = params.searchParams.get( "docID" ); //get value for key "id"

}


