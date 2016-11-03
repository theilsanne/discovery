/*
ui.js
For the nav slide out menu, and any other ui controls
*/

"use strict";


function slideOut(){
    document.getElementById("sideNav").style.width = "100%";
    document.getElementById("sideNav").style.visibility = "visible";
}

function slideBack(){
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("sideNav").style.visibility = "hidden";
}

document.querySelector("#underwaterState").onchange = function(e){
    if(e.target.checked == true){
        app.main.expState = app.main.EXP_STATE.UNDERWATER;
        console.log("state changed to " + app.main.expState);
        app.main.room.map.generate(app.main.expState);
    }
}
document.querySelector("#spaceState").onchange = function(e){
    if(e.target.checked == true){
        app.main.expState = app.main.EXP_STATE.SPACE;
        console.log("state changed to " + app.main.expState);
        app.main.room.map.generate(app.main.expState);
    }
}
document.querySelector("#homeState").onchange = function(e){
    if(e.target.checked == true){
        app.main.expState = app.main.EXP_STATE.HOME;
        console.log("state changed to " + app.main.expState);
        app.main.room.map.generate(app.main.expState);
    }
}

