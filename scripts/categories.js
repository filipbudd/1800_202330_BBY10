
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//turn number dates to words
function convertSingleDate(date) {
	dateArray = date.split("-");
	return months[dateArray[1] - 1] + " " + dateArray[2] + " " + dateArray[0];
}

function convertDurationDates(date1, date2) {
	dateArray1 = date1.split("-");
	dateArray2 = date2.split("-");

	if (dateArray1[0] == dateArray2[0]) {
		return months[dateArray1[1] - 1] + " " + dateArray1[2] + " to "
			+ months[dateArray2[1] - 1] + " " + dateArray2[2] + dateArray1[0];
	} else {
		return months[dateArray1[1] - 1] + " " + dateArray1[2] + " " + dateArray1[0]
			+ " - " + months[dateArray2[1] - 1] + " " + dateArray2[2] + " " + dateArray2[0];
	}
}

//Get sort-by setting
function sortBy() {
	let selection = document.getElementById("order-by").value.split(" ");
	var defaultSelect = ["name", "asc"];
	if (selection[0] == "name" || selection[0] == "start" || selection[0] == "cost") {
		return selection;
	} else {
		return defaultSelect;
	}
}



//Get the topic from the URL (look at the url, this is for the category sort) 
let params = new URL(window.location.href);
var topic = params.searchParams.get("topic");

//Formats the URL string to match that of the database (Might be removed later)
function formatQuery(query) {
	let lowercase = query.toLowerCase();
	return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}

if (topic != null) { topic = formatQuery(topic); }


if (topic == null) {
	//This function displays the cards on the 'categories.html' file (ALL)
	function displayEventPageDynamically(collection, sortBy) {

		// determine sorting values
		let sort = sortBy[0];
		let order = sortBy[1];
	
		//gets the card template id
		let cardTemplate = document.getElementById("categoryCardTemplate");

		//Refers the 'events' collection
		db.collection(collection)
			.orderBy(sort, order)
			.get()
			.then(Events => {

				//Goes through all the cards in the DB
				Events.forEach(doc => {

					//These are grabbed from the DB to be used in the card
					var description = doc.data().description;
					var category = doc.data().category;
					var name = doc.data().name;
					var start = doc.data().start;
					var end = doc.data().end;
					

					// Generate date using start and end
					if (start == end) {
						var date = convertSingleDate(start);
					} else {
						var date = convertDurationDates(start, end);
					}

					//THIS ONE IS DIRECTLY RELATED TO THE IMAGE DO NOT CHANGE THE IMAGE NAME
					var image = doc.data().image;

					//Create a new card
					let newcard = cardTemplate.content.cloneNode(true);

					//this is the auto generated ID for the individual events
					var docID = doc.id;

					//This one writes the auto generated id into the URL as a query
					newcard.querySelector('.card-title').href = "eachEvent.html?docID=" + doc.id;
					newcard.querySelector('.btn').href = "eachEvent.html?docID=" + doc.id;

					//These add dynamic words to the card
					newcard.querySelector('.card-title').innerHTML = name;
					newcard.querySelector('.card-date').innerHTML = date;
					newcard.querySelector('.card-text').innerHTML = description;
					newcard.querySelector('.card-category').innerHTML = category;

					
					//These 2 lines handle the image and its route formatting
					let existingImage = newcard.querySelector('.card-image').innerHTML = "<img class=\"card-image img-fluid\" src=\"" + image + "\" alt=\"Firebase Image\">";
					console.log(existingImage);
					existingImage.src = image;
					
					//This adds the card
					document.getElementById("events-go-here").appendChild(newcard);

				});

				//Changes the breadcrumb in 'categories.html'
				document.getElementById("category-title").innerHTML = topic;
			});

	}
}





//This function displays the cards on the 'categories.html' file (SORTED BY TOPIC)
function displayEventPageDynamically(collection, sortBy) {

	// determine sorting values
	let sort = sortBy[0];
	let order = sortBy[1];

	//gets the card template id
	let cardTemplate = document.getElementById("categoryCardTemplate");

	let hasEvent = false;
	//Refers the 'events' collection
	db.collection(collection)
		.orderBy(sort, order)
		.get()
		.then(Events => {

			console.log(Events)
			//Goes through all the cards in the DB
			Events.forEach(doc => {
				console.log(doc.data().category)
				if (doc.data().category == topic) {
					hasEvent = true;
					//These are grabbed from the DB to be used in the card
					var description = doc.data().description;
					var category = doc.data().category;
					var cost = "$ " + doc.data().cost;
					var name = doc.data().name;
					var start = doc.data().start;
					var end = doc.data().end;
					var img = doc.data().image;

					// Generate date using start and end
					if (start == end) {
						var date = convertSingleDate(start);
					} else {
						var date = convertDurationDates(start, end);
					}

					//THIS ONE IS DIRECTLY RELATED TO THE IMAGE DO NOT CHANGE THE IMAGE NAME
					var image = doc.data().image;

					//Create a new card
					let newcard = cardTemplate.content.cloneNode(true);

					//this is the auto generated ID for the individual events
					var docID = doc.id;

					//This one writes the auto generated id into the URL as a query
					newcard.querySelector('.card-title').href = "eachEvent.html?docID=" + doc.id;
					newcard.querySelector('.btn').href = "eachEvent.html?docID=" + doc.id;

					//These add dynamic words to the card
					newcard.querySelector('.card-title').innerHTML = name;
					newcard.querySelector('.card-date').innerHTML = date;
					newcard.querySelector('.card-cost').innerHTML = cost;
					newcard.querySelector('.card-text').innerHTML = description;
					newcard.querySelector('.card-category').innerHTML = category;
					// newcard.querySelector('.carg-image').innerHTML = img;

					//These 2 lines handle the image and its route formatting
					let existingImage = newcard.querySelector('.card-image').innerHTML = "<img class=\"card-image img-fluid\" src=\"" + image + "\" alt=\"Firebase Image\">";
					console.log(existingImage);
					existingImage.src = image;
					

					//This adds the card
					document.getElementById("events-go-here").appendChild(newcard);
				}
			});

			//Changes the breadcrumb in 'categories.html'
			document.getElementById("category-title").innerHTML = topic;

			//Message if there are no events for the category
			if (hasEvent == false) {
				document.getElementById("events-go-here").innerHTML = "Uh oh! There's no events under the category \'" + topic + "\'!";
			}
		});

}

displayEventPageDynamically("events", ["name", "desc"]);

//updates the page when the sort by options are changed
$("select").change(function () {
	document.getElementById("events-go-here").replaceChildren();
	displayEventPageDynamically("events", sortBy());
});

function redirectToLink() {

	getPathFromUrl(params.href);
	// Get the selected option element
	var selectElement = document.getElementById("sort-by");
	var selectedOption = selectElement.options[selectElement.selectedIndex];

	// Get the link from the 'data-link' attribute
	var link = selectedOption.getAttribute("category-link");

	// Redirect to the selected link
	if (link) {
		window.location.href = link;
	}
}

function getPathFromUrl(url) {
	return url.split("?")[0];
}