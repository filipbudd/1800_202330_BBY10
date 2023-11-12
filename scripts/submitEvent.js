function saveSubmitInfo() {
    const user = firebase.auth().currentUser;
    const currentUser = db.collection("users").doc(user.uid);
//a) get user entered values
    let submitCategory = document.getElementById("category-select").value;
    let submitDuration = document.getElementById("multi-day-selected").value;
    submitDuration = submitDuration ? submitDuration: "";
    let submitSingleDay = document.getElementById("single-day-selected").value;
    submitSingleDay = submitSingleDay ? submitSingleDay: "";
    let submitDescription = document.getElementById("description").value;
    let submitHost = document.getElementById("inputHost").value;
    let submitLocation = document.getElementById("inputLocation").value;
    let submitTitle = document.getElementById("eventName").value;
    let submitCost = document.getElementById("cost").value;

    const submitData = {
        category: submitCategory,
        duration: submitDuration,
        date: submitSingleDay,
        description: submitDescription,
        host: submitHost,
        location: submitLocation,
        title: submitTitle,
        cost: submitCost
    }
    currentUser.collection('submitEvent').add(submitData)
      .then((docRef) => {
    console.log('submitEvent added with ID: ', docRef.id);
    })
      .catch((error) => {
    console.error('error adding submitEvent')
    })
}
