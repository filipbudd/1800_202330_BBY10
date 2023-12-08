## CapWise
* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
Our web application NearbyNexus, helps parents and students
easily find local events they are interested in or submit their own events.

## Technologies
Technologies used for this project:
- HTML, CSS, JavaScript
- Bootstrap 4.3(Frontend library)
- Firebase Version 8 (Authentication, Firestore, Storage, Hosting)
- Mapbox (Reference: https://docs.mapbox.com/mapbox-gl-js/example/marker-from-geocode/)

## Contents
Content of the project folder:
```
Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── README.md

It has the following subfolders and files:
├── .firebase                # Folder for hosting cache autogenerated by firebase
	/hosting..cache

├── images                   # Folder for images
    /chrismas.png
    /coconut.jpg
    /Earth.png
    /halloween.png
    /image-placeholder.png
    /NearbyNexusIcon.png
    /profilePic.png
    /ski.png
    /skii.jpg 

├── scripts                  # Folder for scripts
    /authentication.js		 # Functions for the log in page
    /bookmarks.js			 # Fucntions for bookmarks page
    /categories.js			 # Functions for the event browsing page
    /eachEvent.js			 # Functions for event description pages
    /editUserProfile.js		 # Functions for edit user profile form page
    /firebaseAPI_TEAM10.js   # Firebase API stuff, shared across pages
    /map.js					 # Function that shows map on pages
    /past_going.js			 # Functions for the attended events page (not used in the project)
    /script.js				 # Inside joke amoung the team we didn't want to delete
    /skeleton.js			 # Functions 
    /submitEvent.js
    /userProfile.js
    /userSubmittedEvents.js

├── HTML                     # Folder for HTML file
    /account.html
    /bookmarks.html
    /categories.html
    /eachEvent.html
    /editUserProfile.html
    /home.html
    /login.html
    /past_going.html
	/siteerror.html
    /submitEvent.html
    /thanks.html
    /userSubmittedEvents.html

├── styles                   # Folder for styles
    /style.css               # holds styles that are applied on all html files

Firebase hosting files:
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules
```
## Limitations
Here are some known bugs:
- Set Alarm function is not working for now
- Attended events feature is not working for now
- ...

## Resources
- Tech Tips
- Firebase
- In-app icons from Google Icons (Open Source https://fonts.google.com/)
## Contact 
* Eugenie Kim - ekim138@my.bcit.ca
* Evin Gonzales egonzales20@my.bcit.ca
## Acknowledgements 
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>