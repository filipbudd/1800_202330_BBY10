function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("EVENTTEMPLATE.html");
  
  db.collection("events").get().then(allEvents => {

    allEvents.forEach(doc => {
      var ages = doc.data().name;
      var category = doc.data().category;
      var city = doc.data().city;
      var cost = doc.data().cost;
      var date = doc.data().date
      var description = doc.data().description;
      var image = doc.data().image;
      var link = doc.data().link;
      var map = doc.data().map 
      //ended here
    })
  })

}