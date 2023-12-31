const duration = document.getElementById("multi-day-selected");
const singleDay = document.getElementById("single-day-selected");

function addDurationField() {
	singleDay.innerHTML = "";
	duration.innerHTML = "";
	const createLableStart = document.createElement("Lable");
	createLableStart.textContent = "Start from:   ";
	const dateFieldStart = document.createElement("input");
	dateFieldStart.setAttribute("id", "dateFieldStart");
	dateFieldStart.setAttribute("type", "date");
	dateFieldStart.setAttribute("name", "date");
	dateFieldStart.setAttribute("required", "");

	const createLableEnd = document.createElement("Lable");
	createLableEnd.textContent = "   to:";
	const dateFieldEnd = document.createElement("input");
	dateFieldEnd.setAttribute("id", "dateFieldEnd");
	dateFieldEnd.setAttribute("type", "date");
	dateFieldEnd.setAttribute("name", "date");
	dateFieldEnd.setAttribute("required", "");
	duration.appendChild(createLableStart);
	duration.appendChild(dateFieldStart);
	duration.appendChild(createLableEnd);
	duration.appendChild(dateFieldEnd);
}

function addDateField() {
	singleDay.innerHTML = "";
	duration.innerHTML = "";
	const dateField = document.createElement("input");
	dateField.setAttribute("id", "dateField");
	dateField.setAttribute("type", "date");
	dateField.setAttribute("name", "date");
	dateField.setAttribute("required", "");
	singleDay.appendChild(dateField);
}

document.addEventListener("DOMContentLoaded", function() {
	let button = document.getElementById("i_form_submit");
	if (button.disabled = true) {
		button.disabled = false;
	}

});

// upload image
var ImageFile;
let fileInput = document.getElementById("uploadImage");
fileInput.addEventListener("change", function(e) {
	ImageFile = e.target.files[0];
});

function saveSubmitInfo() {
	let form = document.getElementById("i_submit-form");
	if (form.checkValidity() == true) {
		if (confirm("Are you sure to submit?")) {
			let button = document.getElementById("i_form-submit").disabled = true;
			var collectionRef = db.collection("events");

			//const user = firebase.auth().currentUser;
			// let userId = localStorage.getItem("user");
			// const currentUser = db.collection("users").doc(userId );
			//a) get user entered values
			let submitCategory = document.getElementById("category-select").value;
			let submitAge = document.getElementById("age-select").value;
			let singleDaySelected = document.getElementById("dateField") !== null;
			let startDate = "",
				endDate = "";
			if (singleDaySelected) {
				startDate = document.getElementById("dateField").value;
				endDate = startDate;
			} else {
				startDate = document.getElementById("dateFieldStart").value;
				endDate = document.getElementById("dateFieldEnd").value;
			}

			let submitDescription = document.getElementById("description").value;
			let submitHost = document.getElementById("inputHost").value;
			let submitLocation = document.getElementById("inputLocation").value;
			let submitTitle = document.getElementById("eventName").value;
			let submitCost = document.getElementById("cost").value;
			let latitude = document.getElementById("latitude").value;
			let longitude = document.getElementById("longitude").value;

			//save
			let cost;
			submitCost = submitCost.replaceAll(/[^0-9|\.|\-]/g, "");
			if (submitCost == "") {
				cost = "0";
			} else {
				cost = submitCost;
			}

			const submitData = {
				ages: submitAge,
				category: submitCategory,
				address: submitLocation,
				cost: cost,
				start: startDate,
				end: endDate,
				description: submitDescription,
				name: submitTitle,
				host: submitHost,
				latitude,
				longitude,
				submit_time: firebase.firestore.FieldValue.serverTimestamp(),
			};

			collectionRef.add(submitData).then((docRef) => {
				//image
				if (ImageFile) {
					uploadPic(docRef.id);
					recordEventIDforUser(docRef.id);
				} else {
					window.location.href = "thanks.html";
				}
			});
		} else {
			console.log("something is wrong");
		}
	} else {
		alert("Please fill out the whole form.")
	}

}

// creates array in user doc with id of submitted event recorded
function recordEventIDforUser(ID) {
	var userID = localStorage.getItem("user");
	var submitEventRef = db.collection("users").doc(userID);
	submitEventRef.update({
		submitEvents: firebase.firestore.FieldValue.arrayUnion(ID),
	});
}

//upload image
function uploadPic(eventID) {
	var storageRef = storage.ref("images/" + eventID + ".jpg");
	storageRef
		.put(ImageFile)
		.then(function() {
			console.log("2. Uploaded to Cloud Storage.");
			storageRef.getDownloadURL().then(function(url) {
				db.collection("events")
					.doc(eventID)
					.update({
						image: url,
					})
					.then(() => {
						window.location.href = "thanks.html";
					});
			});
		})
		.catch((error) => {
			console.log("error uploading to cloud storage");
		});
}