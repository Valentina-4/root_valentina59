console.log("🐸")


const circles = document.querySelectorAll(".circle")

circles.forEach(function(item, index){
    item.addEventListener("click", function(){
     console.log("circle clicked: " + (parseInt(index)+1));   
     item.classList.toggle("move-me");
    
 if(item.classList.contains("square")) {
        item.classList.toggle("make-round");
     } else {
        item.classList.toggle("move-me")
     }

    })
})

for(let i = 0; i < circles.length; i++) {
    console.log(i);
    circles[i].style.backgroundColor = "yellow";
}
