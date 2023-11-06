function bookmark(){
    let icon = document.getElementById("i_bookmark-icon").className;
    if (icon == "material-symbols-outlined"){
        document.getElementById("i_bookmark-icon").className = "material-icons";
    } else {
        document.getElementById("i_bookmark-icon").className = "material-symbols-outlined";
    }
}

function updateBookmark(){
    db.collection("events").doc("CKMMGiUDrJKDjigW8aHP").update({
        "bookmarked": true
    }).then(function(){
        console.log("this worked?");
    });
}