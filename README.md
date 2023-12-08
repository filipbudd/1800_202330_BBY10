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
    /chrismas.png			 # Image for carousel on landing page
    /coconut.jpg			 # An inside joke made by our manager
    /Earth.png			 	 # Used for the spinning earth on the landing pages
    /halloween.png			 # Image for carousel on landing page
    /image-placeholder.png			 # Placeholder image for events submitted without an image
    /NearbyNexusIcon.png			 # Favicon for the website
    /profilePic.png 			 # Default profile image
    /ski.png 			 # Image for carousel on landing page
    /skii.jpg  			 # Image for carousel on landing page

├── scripts                  # Folder for scripts
    /authentication.js		 # Functions for the log in page
    /bookmarks.js			 # Fucntions for user bookmarks page
    /categories.js			 # Functions for the event browsing page
    /eachEvent.js			 # Functions for event description pages
    /editUserProfile.js		 # Functions for edit user profile form page
    /firebaseAPI_TEAM10.js   # Firebase API stuff, shared across pages
    /map.js					 # Function that shows map on pages
    /past_going.js			 # Functions for the attended events page (not used in the project)
    /script.js				 # Inside joke amoung the team we didn't want to delete
    /skeleton.js			 # Functions to display footer and header on all pages
    /submitEvent.js 		 # Functions for event submission form page
    /userProfile.js			 # Functions for user profile page
    /userSubmittedEvents.js	 # Functions for user submitted events

├── HTML                     # Folder for HTML file
    /account.html			 # User profile page
    /bookmarks.html			 # User bookmarks page
    /categories.html		 # Event browsing  page
    /eachEvent.html			 # Event description page (functions like a template)
    /editUserProfile.html	 # User profile editing page
    /home.html				 # Landing page after logging in
    /login.html				 # Login page
    /past_going.html		 # Attended events page
	/siteerror.html			 # Error page (unused but this is evidence that we tried)
    /submitEvent.html		 # Event submission form page
    /thanks.html			 # Thank you page of after submitting an event
    /userSubmittedEvents.html	 # User submitted events page

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
- Unimplemented error page
- 

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