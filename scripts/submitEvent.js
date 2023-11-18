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
    const user = firebase.auth().currentUser;
    const currentUser = db.collection("users").doc(user.uid);
    console.log("button works");
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
        cost: submitCost,
        latitude,
        longitude,
    }
    
    db.collection("events").add(submitData).then((docRef) => {
      console.log('submitEvent added to events collection ID: ', docRef.id);
      currentUser.update({
        submittedEvents: firebase.firestore.FieldValue.arrayUnion(ID)
    });
    })
      .catch((error) => {
    console.error('error adding submitEvent')
    })

    
}