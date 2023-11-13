//EVINS STUFF BELOW

function displayEventInfo() {

  //Get the ID from the URL (look at the url)
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");
  console.log(ID);
  
  //Refer to the specific event
  db.collection( "events" ).doc(ID).get().then( doc => {

          //Get all the necessary data from the DB and stores in variables
          var ages = doc.data().ages;
          var category = doc.data().category;
          var address = doc.data().address;
          var cost = doc.data().cost;
          var date = doc.data().date
          var description = doc.data().description;
          var image = doc.data().image;
          var link = doc.data().link;
          var map = doc.data().map;
          var name = doc.data().name;
          var host = doc.data().host;

          // populate all information, and image through the Ids
          document.getElementById( "event-name" ).innerHTML = name;
          document.getElementById("category").innerHTML = category;
          document.getElementById("cost").innerHTML = cost;
          document.getElementById("date").innerHTML = date;
          document.getElementById("address").innerHTML = address;
          document.getElementById("host").innerHTML = host;
          document.getElementById("description").innerHTML = description;
          document.getElementById("ages").innerHTML = ages;
          document.getElementById("link").href = "NOT_A_REAL_PAGE.html:) -Evin";

          //formats the image directory and adds it
          let imgEvent = document.getElementById("bannerImg")
          imgEvent.src = "../images/" + image + ".jpg";
          console.log( ID + ' THIS IS THE DOC ID');
  });
}
displayEventInfo();