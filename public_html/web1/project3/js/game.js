console.log("🍒 Loaded!")

const stage = document.querySelector("body")
const myCherries = document.getElementById("cherries");

myCherries.onclick = function() {
    this.classList.toggle("move");
}

//sounds
const heComplains = new Audio("sounds/game-bonus-144751.mp3")

myCherries.onclick = function() {
    this.classList.toggle("move");
    heComplains.play();
}

stage.addEventListener("click", function(event) {
    console.log(event.clientX + " : " + event.clientY);

    //"" '' ``

    var coords = `translateX(${event.clientX-150}px) translateY(${event.clientY-177}px)`
    myCherries.style.transform = coords;

})

// Keyboard input
document.onkeydown = checkKeys;

function checkKeys(event) {
    
    var style = window.getComputedStyle(myCherries);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xVal = matrix.m41;
    var yVal = matrix.m42;    
    var coords;

    //left arrow
    if(event.keyCode == "37") {
        coords = `translateX(${xVal-200}px) translateY(${yVal}px)`;
        myCherries.style.transform = coords;
    }

    //right arrow
    if(event.keyCode == "39") {
        coords = `translateX(${xVal+200}px) translateY(${yVal}px)`;
        myCherries.style.transform = coords;
    }

    //up arrow
    if(event.keyCode == "38") {
        coords = `translateX(${xVal}px) translateY(${yVal-200}px)`;
        myCherries.style.transform = coords;
    }

    //down arrow
    if(event.keyCode == "40") {
        coords = `translateX(${xVal}px) translateY(${yVal+200}px)`;
        myCherries.style.transform = coords;
    }



}

    function addMyObject() {

    /*  Custom Object*/
        let myObject = document.createElement("img");
        myObject.src = "img/Group 4.svg";
        stage.append(myObject);
    
    //read windows available width and height in px
        let w = window.innerWidth;
        let h = window.innerHeight;

    //randomize new x&y numbers within the space limits
        let randomX = Math.floor((Math.random() * w) + 1);
        let randomY = Math.floor((Math.random() * h) + 1);

        myObject.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`
        
        setTimeout(() => {myObject.remove(); }, 5000);
    
    }

    addMyObject();
