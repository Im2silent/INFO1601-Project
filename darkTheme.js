if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-theme");
    document.getElementById("icon").src = "sun.png";
}


document.getElementById("icon").onclick = function() {
    
    document.body.classList.toggle("dark-theme");

    
    if (document.body.classList.contains("dark-theme")) {
        document.getElementById("icon").src = "sun.png";
        
        localStorage.setItem("darkMode", "true");
    } else {
        document.getElementById("icon").src = "moon.png";
       
        localStorage.setItem("darkMode", "false");
    }
};
