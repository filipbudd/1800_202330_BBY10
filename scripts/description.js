function bookmark(){
    let icon = document.getElementById("i_bookmark-icon").className;
    if (icon == "material-symbols-outlined"){
        document.getElementById("i_bookmark-icon").className = "material-icons";
    } else {
        document.getElementById("i_bookmark-icon").className = "material-symbols-outlined";
    }
}

