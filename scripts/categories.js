
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
			+  months[dateArray2[1] - 1]  + " " + dateArray2[2] + dateArray1[0];
	} else {
		return  months[dateArray1[1] - 1] + " " + dateArray1[2] + " " + dateArray1[0]
			+ " to " +  months[dateArray2[1] - 1] + " " + dateArray2[2] + " " + dateArray2[0];
	}
}

//Get sort-by setting
function sortBy() {
	let sort = document.getElementById("sort-by").value
	if (sort == "name" || sort == "start" || sort == "cost") {
		return sort;
	} else {
		return "name";
	}
}

function AscOrDescSort() {
	let desc = document.getElementById("descending").checked
	if (desc) {
		return "desc";
	} else {
		return "asc";
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

//This function displays the cards on the 'categories.html' file
function displayEventPageDynamically(collection, sortBy) {

	let sort = sortBy;
	console.log(sort);
	//gets the card template id
	let cardTemplate = document.getElementById("categoryCardTemplate");

	let hasEvent = false;
	//Refers the 'events' collection
	db.collection(collection)
		.orderBy(sort, AscOrDescSort())
		.get()
		.then(Events => {

			//Goes through all the cards in the DB
			Events.forEach(doc => {
				if (doc.data().category == topic) {
					hasEvent = true;
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
					let cardimg = newcard.getElementById('card-image');
					cardimg.src = "/images/" + image + ".jpg";

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

displayEventPageDynamically("events", "name");

//updates the page when the sort by options are changed
$("select").change(function () {
	document.getElementById("events-go-here").replaceChildren();
	displayEventPageDynamically("events", sortBy());
});

$("input").change( function() {
	document.getElementById("events-go-here").replaceChildren();
	displayEventPageDynamically("events", sortBy());
} );