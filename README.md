## CapWise
* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
Our web application NearbyNexus, is to help parents and students
easily find local events they are interested in or submit their own events.

## Technologies
Technologies used for this project:
- HTML, CSS, JavaScript
- Bootstrap 4.3(Frontend library)
- Firebase Version 8 (Authentication, Firestore, Storage, Hosting)
- Mapbox (Reference: https://docs.mapbox.com/mapbox-gl-js/example/marker-from-geocode/)

## Contents
Content of the project folder:

 Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
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
    /authentication.js
    /bookmark.js
    /categories.js
    /eachEvent.js
    /editUserProfile.js
    /firebaseAPI_TEAM10.js   # firebase API stuff, shared across pages
    /map.js
    /past_going.js
    /script.js
    /skeleton.js
    /submitEvent.js
    /userProfile.js
    /userSubmittedEvents.js

├── HTML                     # Folder for HTML file
    /account.html
    /bookmard.html
    /categories.html
    /eachEvent.html
    /editUserProfile.html
    /home.html
    /login.html
    /past_going.html
    /submitEvent.html
    /thanks.html
    /userSubmittedEvents.html

├── styles                   # Folder for styles
    /style.css               

Firebase hosting files:
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules

## Limitations
Here are some known bugs:
- Set Alarm function is not working for now
- Attended events feature is not working for now
- ...

## Resources

## Contact 

## Acknowledgements 