function deleteBookmark(id){
    var userID = "J2A4IddxuURAJsYt0cEn3Kc5Nx73";
    var bookmarksRef = db.collection("users")
        .doc(userID); //user collection should not be hardcoded
    bookmarksRef.update({ bookmarks: firebase.firestore.FieldValue.arrayRemove(id)});
}


function displayBookmarksDynamically(){
    let cardTemplate = document.getElementById("i_bookmark-template");
    
    //another thing to change to not be hard coded but user specfic
    var userID = "J2A4IddxuURAJsYt0cEn3Kc5Nx73"
    var bookmarksRef = db.collection("users").doc(userID);
    
    var bookmarkGoHere = document.getElementById("i_bookmarks-go-here");
    bookmarksRef.get().then((doc) => {
        var bookmarksArray = doc.data().bookmarks;
        if (bookmarksArray.length == 0){
            bookmarkGoHere.innerHTML = "You have no bookmarks";
        } else {
            bookmarksArray.forEach(eventID => {
                db.collection("events").doc(eventID).get().then(doc => {
                    var category = doc.data().eventCategory;
                var title = doc.data().eventName;
                var date = doc.data().eventDate;
    
                var docID = doc.id;
    
                let newBookmark = cardTemplate.content.cloneNode(true);
    
                newBookmark.querySelector(".bookmark-category").innerHTML = category;
                newBookmark.querySelector(".bookmark-title").innerHTML = title;
                newBookmark.querySelector(".bookmark-date").innerHTML = date;
                newBookmark.querySelector(".bookmark-btn").onClick = deleteBookmark(docID);
                //gonna need to find how to reference specific hoke description to link that for the title
    
                bookmarkGoHere.appendChild(newBookmark);
                });

                
               
                })
        }
    });

    
}

displayBookmarksDynamically();

