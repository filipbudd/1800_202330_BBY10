firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        localStorage.setItem("user", user.uid);
        
        // Set the user's UID as a variable
        var uid = user.uid;
        
        // Fetch the user document from Firestore
        var userDocRef = firebase.firestore().collection("users").doc(uid);

        userDocRef.get().then(function(doc) {
            if (doc.exists) {
                // User document exists; you can access its data
                var name = doc.data().name;
                var userBio = doc.data().bio;
                var picUrl = doc.data().profilePic;

                // Display the user's name on the webpage
                document.getElementById('user-name').textContent = name;
                    
                var nameElement = document.getElementById('user-name'); // Assuming the id is 'bioInput'
                nameElement.style.wordWrap = 'break-word';
                nameElement.style.maxWidth = '1000px';
                
                // Display the user's name on the webpage
                if(userBio != "") {
                    document.getElementById('user-bio').textContent = userBio;
                    // Apply word-wrap and set max-width to the bio element
                    
                    var bioElement = document.getElementById('user-bio'); // Assuming the id is 'bioInput'
                    bioElement.style.wordWrap = 'break-word';
                    bioElement.style.maxWidth = '400px';
                }
                else {
                    document.getElementById('user-bio').textContent = "This is a chance for you to share your story, interesting human!.";
                }
                
                // Display the user's profile picture on the webpage
                $("#mypic-goes-here").attr("src", picUrl);
            } else {
                // User document does not exist
                console.log('User document does not exist');
            }
        }).catch(function(error) {
            console.log('Error fetching user document:', error);
        });

    } else {
        // User is not signed in
        console.log('User is not signed in');
    }
});