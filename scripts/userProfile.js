// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        localStorage.setItem("user", user.uid);
        // User is signed in; you can access their name
        var name = user.displayName;

        // Display the user's name on the webpage
        document.getElementById('user-name').textContent = name;
    } else {
        // User is not signed in
        // You COULD redirect the user to the login page (Future idea)
        console.log('User is not signed in');
    }
});