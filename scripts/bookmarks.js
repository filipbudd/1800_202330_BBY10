function deleteBookmark(id){
    var bookmarksRef = db.collection("users")
        .doc("J2A4IddxuURAJsYt0cEn3Kc5Nx73")
        .collection("bookmarks"); //user collection should not be hardcoded
    var bookmarkID = id

    bookmarksRef.doc(bookmarkID).delete();

}


async function displayBookmarksDynamically(){
    let cardTemplate = document.getElementById("i_bookmark-template");
    
    //another thing to change to not be hard coded but user specfic
    var userID = "J2A4IddxuURAJsYt0cEn3Kc5Nx73"
    var bookmarksRef = db.collection("users").doc(userID).collection("bookmarks");
    var bookmarksSnapshotRef = await bookmarksRef.get();
    
    var bookmarkGoHere = document.getElementById("i_bookmarks-go-here")
    if (bookmarksSnapshotRef.empty){
        bookmarkGoHere.innerHTML = "You have no bookmarks";
    } else {
        bookmarksRef.get()
        .then(allBookmarks=> {

            allBookmarks.forEach(doc => {
                var category = doc.data().eventInfo.eventCategory;
                var title = doc.data().eventInfo.eventName;
                var date = doc.data().eventInfo.eventDate;

                var docID = doc.id;

                let newBookmark = cardTemplate.content.cloneNode(true);

                newBookmark.querySelector(".bookmark-category").innerHTML = category;
                newBookmark.querySelector(".bookmark-title").innerHTML = title;
                newBookmark.querySelector(".bookmark-date").innerHTML = date;
                newBookmark.querySelector(".bookmark-btn").onClick = deleteBookmark(docID);
                //gonna need to find how to reference specific hoke description to link that for the title

                bookmarkGoHere.appendChild(newBookmark);
           
            })
        })

    }
}

displayBookmarksDynamically();

