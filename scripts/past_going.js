function showMap() {
	var locationInput = document.getElementById("inputLocation").value;
	if (!locationInput) locationInput = "BCIT burnaby, canada";

	mapboxgl.accessToken =
		"pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ";

	const mapboxClient = mapboxSdk({
		accessToken: mapboxgl.accessToken
	});
	mapboxClient.geocoding
		.forwardGeocode({
			query: locationInput,
			autocomplete: false,
			limit: 1,
		})
		.send()
		.then((response) => {
			if (
				!response ||
				!response.body ||
				!response.body.features ||
				!response.body.features.length
			) {
				console.error("Invalid response:");
				console.error(response);
				return;
			}
			const feature = response.body.features[0];

			const map = new mapboxgl.Map({
				container: "map",
				// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
				style: "mapbox://styles/mapbox/streets-v12",
				center: feature.center,
				function addSubDocument(data) {
					const user = firebase.auth().currentUser;
					var userDocRef = db.collection("users").doc(user.uid);
					var attendedEventsCollectionRef = userDocRef.collection("attendedEvents");
					var attendedEventsDocRef = attendedEventsCollectionRef.doc();

					attendedEventsDocRef
						.set(data)
						.then(function() {
							console.log("Subdocument added!");
						})
						.catch(function(error) {
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
							details: "A great lineup of indoor and outdoor family friendly Halloween activities in around Vancouver with trick or treating and more!",
							date: "1031",
							cost: 0,
							last_updated: firebase.firestore.FieldValue.serverTimestamp(),
						});
						addSubDocument({
							code: "AM01",
							name: "Chrismas Party",
							location: "Anmore",
							xp: 10,
							details: "The most magical holiday tradition returns to Magic Kingdom park select nights November 9 to December 22, 2023!",
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
							details: "Experience world-class skiing and snowboarding, breathtaking scenery, and endless adventure.",
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

				function displayCardsDynamically(collection) {
					let cardTemplate = document.getElementById("attendedEventsCardTemplate");
					let userId = localStorage.getItem("user");
					var userDocRef = db.collection("users").doc(userId);
					var attendedEventsCollectionRef = userDocRef.collection("attendedEvents");

					attendedEventsCollectionRef.get().then((allAttendedEvents) => {
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

				displayCardsDynamically("attendedEvents");

				zoom: 14,
			});

			document.getElementById("latitude").value = feature.center[0];
			document.getElementById("longitude").value = feature.center[1];

			// Create a marker and add it to the map.
			new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
		});
}
showMap();