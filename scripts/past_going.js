function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("attendedEventsCardTemplate");

//db.collection(collection)
var userDocRef = db.collection("users").doc("J2A4IddxuURAJsYt0cEn3Kc5Nx73");
var attendedEventsCollectionRef = userDocRef.collection("attendedEvents");
  
  attendedEventsCollectionRef.get()
    .then((allAttendedEvents) => {
      allAttendedEvents.forEach((doc) => {
        var title = doc.data().name;
        var details = doc.data().details;
        var code = doc.data().code;
        var eventsXP = doc.data().xp;
        //var docID = doc.id;
        let newcard = cardTemplate.content.cloneNode(true);

        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-length").innerHTML = "XP " + eventsXP;
        newcard.querySelector(".card-text").innerHTML = details;
        newcard.querySelector(".card-image").src = `../images/${code}.jpg`;

        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    });
}

function addSubDocument(data) {
  var userDocRef = db.collection("users").doc(user.uid);
  var attendedEventsCollectionRef = userDocRef.collection("attendedEvents");
  var attendedEventsDocRef = attendedEventsCollectionRef.doc(); // let Firestore generate the ID

  attendedEventsDocRef
    .set(data)
    .then(function () {
      console.log("Subdocument added!");
    })
    .catch(function (error) {
      console.error("Error writing subdocument: ", error);
    });
}

let dataInited = false;
function initData() {
  if (!dataInited) {
    addSubDocument({
      code: "BBY01",
      name: "It's halloween",
      location: "Burnaby",
      xp: 10,
      details:
        "A great lineup of indoor and outdoor family friendly Halloween activities in around Vancouver with trick or treating and more!",
      date: "1031",
      cost: 0,
      last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    addSubDocument({
      code: "AM01",
      name: "Chrismas Party",
      location: "Anmore",
      xp: 10,
      details:
        "The most magical holiday tradition returns to Magic Kingdom park select nights November 9 to December 22, 2023!",
      date: "1202",
      cost: 10,
      last_updated: firebase.firestore.Timestamp.fromDate(
        new Date("March 10, 2022")
      ),
    });
    addSubDocument({
      code: "NV01",
      name: "Whistler Blackcomb",
      location: "Whistler",
      xp: 30,
      details:
        "Experience world-class skiing and snowboarding, breathtaking scenery, and endless adventure.",
      date: "1230",
      cost: 120,
      last_updated: firebase.firestore.Timestamp.fromDate(
        new Date("January 1, 2023")
      ),
    });
    dataInited = true;
  }
}

//initData();

displayCardsDynamically("attendedEvents");
