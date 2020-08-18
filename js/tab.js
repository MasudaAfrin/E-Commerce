let tabs = document.querySelectorAll(".pro-des .btn-container button");
let panels = document.querySelectorAll(".pro-des .panelitem");

//function for panel display
function displayPanel(index){
    //for tab
    tabs.forEach(function(node){
        node.style.backgroundColor = "white";
        node.style.color = "black";
    });
    //active button bg color and font color
    tabs[index].style.backgroundColor = "#239ccd";
    tabs[index].style.color = "white";
    
    //panelitem
    panels.forEach(function(node){
        node.style.display = "none";
    });
    panels[index].style.display = "block";

}

displayPanel(0);