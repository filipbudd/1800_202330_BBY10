function bookmark(){
    let icon = document.getElementById("i_bookmark-icon").className;
    if (icon == "material-symbols-outlined"){
        document.getElementById("i_bookmark-icon").className = "material-icons";
    } else {
        document.getElementById("i_bookmark-icon").className = "material-symbols-outlined";
    }
}

function addBookmark(){
    let params = new URL( window.location.href ); //get URL of search bar
    let EventID = params.searchParams.get( "docID" ); //get value for key "id"
    let userRef = "J2A4IddxuURAJsYt0cEn3Kc5Nx73"; //this should not be hardcoded
    
    db.collection("users").document(userRef).collection("bookmarks").add(EventID)
    
}



//EVINS STUFF BELOW
// function displayHikeInfo() {
//     let params = new URL( window.location.href ); //get URL of search bar
//     let ID = params.searchParams.get( "docID" ); //get value for key "id"
//     console.log( ID );

//     // doublecheck: is your collection called "Reviews" or "reviews"?
//     db.collection( "events" )
//         .doc( ID )
//         .get()
//         .then( doc => {
//             thisHike = doc.data();
//             hikeCode = thisHike.code;
//             hikeName = doc.data().name;
            
//             // only populate title, and image
//             document.getElementById( "hikeName" ).innerHTML = hikeName;
//             let imgEvent = document.querySelector( ".hike-img" );
//             imgEvent.src = "../images/" + hikeCode + ".jpg";
//         } );
// }
// displayHikeInfo();


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