function writeAttendedEvents() {
    //define a variable for the collection you want to create in Firestore to populate data
    var attendedEventsRef = db.collection("attendedEvents");

    attendedEventsRef.add({
        code: "BBY01",
        name: "Burnaby Lake Park Trail", 
        location: "Burnaby",
        xp: "easy",
		details: "A lovely place for lunch walk",
        date: 2-16,         
        cost: 60,       
       
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    attendedEventsRef.add({
        code: "AM01",
        name: "Buntzen Lake Trail", 
        location: "Anmore",
        xp: "moderate",
        details: "Close to town, and relaxing",
        date: 2-19,      
        cost: 80,     
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    attendedEventsRef.add({
        code: "NV01",
        name: "Mount Seymour Trail", 
        location: "North Vancouver",
        xp: "hard",
        details:  "Amazing ski slope views",
        date: 3-26,        
        cost: 120,   
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
}

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("attendedEventsCardTemplate"); 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allAttendedEvents=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allAttendedEvents.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
				var code = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var eventsXP = doc.data().xp; //gets the length field
                //var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = "XP "+eventsXP;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${code}.jpg`; //Example: NV01.jpg
                // newcard.querySelector('a').href = "eachHike.html?docID="+docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("attendedEvents");  //input param is the name of the collection
