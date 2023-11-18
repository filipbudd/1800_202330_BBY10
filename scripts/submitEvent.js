const duration = document.getElementById("multi-day-selected");
const singleDay = document.getElementById("single-day-selected");

function addDurationField() {
  singleDay.innerHTML = "";
  duration.innerHTML = "";
  const createLableStart = document.createElement("Lable");
  createLableStart.textContent = "Start from:   ";
  const dateFieldStart = document.createElement("input");
  dateFieldStart.setAttribute("type", "date");
  dateFieldStart.setAttribute("name", "date");
  dateFieldStart.setAttribute("required", "");

  const createLableEnd = document.createElement("Lable");
  createLableEnd.textContent = "   to:";
  const dateFieldEnd = document.createElement("input");
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
  dateField.setAttribute("type", "date");
  dateField.setAttribute("name", "date");
  dateField.setAttribute("required", "");
  singleDay.appendChild(dateField);
}

function saveSubmitInfo() {
if (confirm("Are you sure to submit?")) {

  var collectionRef = db.collection("events");

    //const user = firebase.auth().currentUser;
    // let userId = localStorage.getItem("user");
    // const currentUser = db.collection("users").doc(userId );
//a) get user entered values
    let submitCategory = document.getElementById("category-select").value;
    let submitAge = document.getElementById("age-select").value;
    let submitDuration = document.getElementById("multi-day-selected").value;
    submitDuration = submitDuration ? submitDuration: "";
    let submitSingleDay = document.getElementById("single-day-selected").value;
    submitSingleDay = submitSingleDay ? submitSingleDay: "";
    let submitDescription = document.getElementById("description").value;
    let submitHost = document.getElementById("inputHost").value;
    let submitLocation = document.getElementById("inputLocation").value;
    let submitTitle = document.getElementById("eventName").value;
    let submitCost = document.getElementById("cost").value;
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;

    if (submitDuration == ""){
      let submitDate = submitDuration;
    } else {
      let submitDate = submitSingleDay;
    }
    
    const submitData = {
        category: submitCategory,
        ages: submitAge,
        date: submitDate,
        description: submitDescription,
        host: submitHost,
        address: submitLocation,
        name: submitTitle,
        address: submitLocation,
        name: submitTitle,
        cost: submitCost,
        latitude,
        longitude
    }
    
    // currentUser.collection('submitEvent').add(submitData)
    //   .then((docRef) => {
    // console.log('submitEvent added with ID: ', docRef.id);
    // })
    //   .catch((error) => {
    // console.error('error adding submitEvent')
    // })

    //different from previous submit data due to there being a difference 
    //in the set up fo the two collections and we need to discuss that
    // var submitEventData = {
    //     category: submitCategory,
    //     cost: submitCost,
    //     date:submitSingleDay,
    //     description: submitDescription,
    //     host: submitHost,
    // }
    collectionRef.add(submitData).then(function(docRef) {
      console.log('submitEvent added to events collection ID: ', docRef.id);
    })
} else {
    // location.reload();
}
}