function bookmark(){
    let icon = document.getElementById("i_bookmark-icon").className;
    if (icon == "material-symbols-outlined"){
        document.getElementById("i_bookmark-icon").className = "material-icons";
    } else {
        document.getElementById("i_bookmark-icon").className = "material-symbols-outlined";
    }
}

function addBookmark(){
    let icon = document.getElementById("i_bookmark-icon").className;
    var userID = "J2A4IddxuURAJsYt0cEn3Kc5Nx73"
    var bookmarksRef = db.collection("users").doc(userID); //user collection should not be hardcoded

    var eventID = "CKMMGiUDrJKDjigW8aHP" // should not be hardcoded

    if (icon == "material-symbols-outlined"){
        bookmarksRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(eventID)});
    } else {
        bookmarksRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(eventID)});
    }
    //define a variable for the collection you want to create in Firestore to populate data
   

    //let params = new URL( window.location.href ); //get URL of search bar
    //let EventID = params.searchParams.get( "docID" ); //get value for key "id"
    
}


