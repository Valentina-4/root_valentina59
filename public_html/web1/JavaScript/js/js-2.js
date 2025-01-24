console.log("JS 2 is loaded")


//step one = selecting your element
const myPacman = document.getElementById("pacman");

//step 2 = adding a click event 
myPacman.addEventListener("click", () => {
    myPacman.style.borderTop = " 60px solid pink"
    myPacman.style.borderLeft = " 60px solid pink"
    myPacman.style.borderBottom = " 60px solid pink"

    myPacman.classList.add("change-me")
 
    
})