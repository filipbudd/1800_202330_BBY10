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
                var name = user.displayName;;
                var userBio = doc.data().bio;
                var picUrl = doc.data().profilePic;

                // Display the user's name on the webpage
                document.getElementById('user-name').textContent = name;
                
                // Display the user's name on the webpage
                //if(userBio != null) {
                    document.getElementById('user-bio').textContent = userBio;
                //}
                
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
