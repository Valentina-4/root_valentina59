
// . is to target class, # is to target id

let cases = document.querySelectorAll(".cases")
let replayBtn = document.querySelector("#replay")
let paneauMessage = document.querySelector("#message")
let paneauMessageGagnant = document.querySelector("#message img")

// variables de l'app
let jouerX = true;
let gagnant = '';
const patrons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


for (let boite of cases) {
        boite.active = true;
        boite.addEventListener("click", function(){
            
            if (boite.active) {
                if (jouerX) {    
                    
                    boite.style.backgroundImage = "url('S.png')";
                    // boite.innerText = "X";
                    jouerX = false;
             }

            else{
                    boite.style.backgroundImage = "url('O.png')";
                    // boite.innerText = "O";
                    jouerX = true;
            }
    
        }
        boite.active = false
        valide();
    });

}


const valide = function () {

    let win = false;

        for(let patron of patrons) {

            // console.log(patron);

            let val1 = cases[patron[0]].style.backgroundImage.slice(5,10);
            let val2 = cases[patron[1]].style.backgroundImage.slice(5,10);
            let val3 = cases[patron[2]].style.backgroundImage.slice(5,10);
            
        // let val1 = cases[patron[0]].innerText;
        // let val2 = cases[patron[1]].innerText;
        // let val3 = cases[patron[2]].innerText;

            if (val1 &&
                val1 === val2 &&
                val1 === val3) { 
                console.log(`Le gagnant est ${val1}`);
                paneauMessageGagnant.src = val1;
                win = true;
                for (let boite of cases) {
                    boite.active = false;
                }
            }
            
        }
        if ([...cases].every((boite) => boite.active === false) && !win) {
            paneauMessageGagnant.src = "T.png";
        }

}



replayBtn.addEventListener("click", function() {
for (let boite of cases){
boite.active = true;
boite.style.backgroundImage = "";
jouerX = true;
}
}
)