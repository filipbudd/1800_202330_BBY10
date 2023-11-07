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

    var bookmarksRef = db.collection("users").doc("J2A4IddxuURAJsYt0cEn3Kc5Nx73").collection("bookmarks"); //user collection should not be hardcoded
    var eventsRef = db.collection("events");
    var eventID = "CKMMGiUDrJKDjigW8aHP" // should not be hardcoded

    if (icon == "material-symbols-outlined"){
        eventsRef.doc(eventID) 
    .get()
    .then(doc => {
        eventInfo = doc.data();
        bookmarksRef.add({
            eventInfo,
            eventID: eventID
        });

    });
    } else {
        bookmarksRef.get("bookmarks")
            .then(allBookmarks => {
                allBookmarks.forEach(doc => {
                    var eventBookmarked = doc.data().eventID;
                    var bookmarkID = doc.id;
                    
                    if (eventBookmarked == eventID){
                        bookmarksRef.doc(bookmarkID).delete();
                    }
                })
            })
    }
    //define a variable for the collection you want to create in Firestore to populate data
   

    //let params = new URL( window.location.href ); //get URL of search bar
    //let EventID = params.searchParams.get( "docID" ); //get value for key "id"
    
}



//EVINS STUFF BELOW
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayPageDynamically(collection) {



    document.getElementById("event-description").innerHTML = "PLEASE WORK";


    let pageDesc = document.getElementById("eventPage"); // Retrieve the HTML element with the ID "eventPage" and store it in the cardTemplate variable. 
    console.log(pageDesc);

    db.collection(collection).get("events")   
        .then(allInfo=> {

            allInfo.forEach(doc => { 
                var title = doc.data().eventName;       
                var details = doc.data().eventDescription;
                var host = doc.data().eventHost;
                var address = doc.data().eventLocation;
                var price = doc.data().eventPrice;
                var date = doc.data().eventDate;
                var priceStatus = doc.data().eventPriceStatus;

                document.getElementById("event-title").innerHTML = title;
                document.getElementById("event-description").innerHTML = details;
                document.getElementById("event-cost").innerHTML = price;
                document.getElementById("price-status").innerHTML = priceStatus;
                document.getElementById("event-date").innerHTML = date;
                document.getElementById("event-address").innerHTML = address;
                document.getElementById("event-host").innerHTML = host;
            })
        })
}

displayPageDynamically("events");  