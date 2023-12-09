//FILIP'S STUFF DO NOT TOUCH

var currentUser;
function populateUserInfo() {
	firebase.auth().onAuthStateChanged(user => {
		// Check if user is signed in:
		if (user) {

			//go to the correct user document by referencing to the user uid
			currentUser = db.collection("users").doc(user.uid)
			//get the document for the current user.
			currentUser.get()
				.then(userDoc => {
					//get the data fields of the user
					var userName = userDoc.data().name;
					var userBio = userDoc.data().bio;
					var userCity = userDoc.data().city;
					let picUrl = userDoc.data().profilePic;

					//if the data fields are not empty, then write them in to the form.
					if (userName != null) {
						document.getElementById("nameInput").value = userName;
					}
					if (userBio != null) {
						document.getElementById("bioInput").value = userBio;
						updateCharCount();
					}
					if (userCity != null) {
						document.getElementById("cityInput").value = userCity;
					}
					if (picUrl != null) {
						console.log(picUrl);
						// use this line if "mypicdiv" is a "div"
						//$("#mypicdiv").append("<img src='" + picUrl + "'>")
						$("#mypic-goes-here").attr("src", picUrl);
					} else
						console.log("picURL is null");
				})
		} else {
			// No user is signed in.
			console.log("No user is signed in");
		}
	});
}

// Call the function to run it 
populateUserInfo();

// Function to update character count for bioInput
function updateCharCount() {
	// Get the bio input value
	var bioInputValue = document.getElementById('bioInput').value;

	// Set the character limit
	var characterLimit = 230;

	// Truncate the input value if it exceeds the character limit
	if (bioInputValue.length > characterLimit) {
		document.getElementById('bioInput').value = bioInputValue.slice(0, characterLimit);
		bioInputValue = document.getElementById('bioInput').value;
	}

	// Calculate the remaining characters
	var charactersLeft = Math.max(characterLimit - bioInputValue.length, 0);

	// Update the character count display
	document.getElementById('charCount').textContent = 'Characters left: ' + charactersLeft;
}

// Attach the updateCharCount function to the input event of bioInput
document.getElementById('bioInput').addEventListener('input', updateCharCount);

// Function to enable the form fields for editing
function editUserInfo() {
	// Enable the form fields
	document.getElementById('personalInfoFields').disabled = false;
}

// Function to save user information
function saveUserInfo() {
	firebase.auth().onAuthStateChanged(function(user) {
		var storageRef = storage.ref("images/" + user.uid + ".jpg");

		// Check if ImageFile is defined
		if (ImageFile) {
			// Asynch call to put File Object (global variable ImageFile) onto Cloud
			storageRef.put(ImageFile)
				.then(function() {
					console.log('Uploaded to Cloud Storage.');

					// Asynch call to get URL from Cloud
					storageRef.getDownloadURL()
						.then(function(url) {
							console.log("Got the download URL.");
							// Get values from the form
							userName = document.getElementById('nameInput').value;
							userBio = document.getElementById('bioInput').value;
							userCity = document.getElementById('cityInput').value;

							// Asynch call to save the form fields into Firestore.
							db.collection("users").doc(user.uid).update({
									name: userName,
									bio: userBio,
									city: userCity,
									profilePic: url
								})
								.then(function() {
									console.log('Added Profile Pic URL to Firestore.');
									console.log('Saved user profile info');
									document.getElementById('personalInfoField').disabled = true;
								})
						})
				})
		} else {
			// Get values from the form
			userName = document.getElementById('nameInput').value;
			userBio = document.getElementById('bioInput').value;
			userCity = document.getElementById('cityInput').value;

			// Save the form fields into Firestore without the profilePic field
			db.collection("users").doc(user.uid).update({
					name: userName,
					bio: userBio,
					city: userCity,
				})
				.then(function() {
					console.log('Saved user profile info (without profilePic)');
					document.getElementById('personalInfoFields').disabled = true;
				})
		}
	});
}

// Changing the image
var ImageFile; // global variable to store the File Object reference

// Function to handle file selection and display in the DOM
function chooseFileListener() {
	const fileInput = document.getElementById("mypic-input");
	const image = document.getElementById("mypic-goes-here");

	//attach listener to input file
	//when this file changes, do something
	fileInput.addEventListener('change', function(e) {

		//the change event returns a file "e.target.files[0]"
		ImageFile = e.target.files[0];
		var blob = URL.createObjectURL(ImageFile);

		//change the DOM img element source to point to this file
		image.src = blob;
	})
}

// Call the function to set up the file input listener
chooseFileListener();