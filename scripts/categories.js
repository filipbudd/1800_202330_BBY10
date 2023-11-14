
//This function displays the cards on the 'categories.html' file
function displayEventPageDynamically(collection) {

  //gets the card template id
  let cardTemplate = document.getElementById("categoryCardTemplate");
  
  //Refers the 'events' collection
  db.collection(collection).get()
    .then(allEvents => {

      //Goes through all the cards in the DB
      allEvents.forEach(doc => {

        //These are grabbed from the DB to be used in the card
        var description = doc.data().description;
        var category = doc.data().category;
        var name = doc.data().name;
        var date =doc.data().date;

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

      })
    })

}

displayEventPageDynamically("events");