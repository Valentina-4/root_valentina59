 // Create the canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    document.querySelector("#gameBox").appendChild(canvas);

 //Charger les sprites
    // Image d'arrière-plan
    var bgReady = false;
    var bgImage = new Image();
    bgImage.src = "images/pixel.png";
    bgImage.onload = function () {
        bgReady = true; 
    };

    // Estampe gagnant
    var winReady = false;
    var winImage = new Image(); 
    winImage.src = "images/winners.png"; 
    winImage.onload = function () {
        winReady = true; 
    };

    // Estampe GameOver
    var looseReady = false;
    var looseImage = new Image(); 
    looseImage.src = "images/looser.png"; 
    looseImage.onload = function () {
        looseReady = true; 
    };


    // Image du joueur
    var playerReady = false;
    var playerImage = new Image(); 
    playerImage.src = "images/pumpkin.png"; 
    playerImage.onload = function () {
        playerReady = true; 
    };

    // Image des goodies
    var goodyReady = false;
    var goodyImage = new Image(); 
    goodyImage.src = "images/smallcandy.png"; 
    goodyImage.onload = function () {
        goodyReady = true; 
    };

    // Image des baddie
    var baddieReady = false;
    var baddieImage = new Image(); 
    baddieImage.src = "images/poison.png"; 
    baddieImage.onload = function () {
        baddieReady = true; 
    };


   var candyCollected = 0;
   var endCondition = 0;

// Créer des objets de jeu globaux 
    var player = {
        speed : 5, // mouvement en pixels par tick 
        width: 100,
        height: 100
    };

    var goodies = [ // ceci est un tableau (array)
        { width: 20, height: 20 }, // un goody
       
    ];
    
    var baddies = [ // ceci est un tableau (array)
        { width: 100, height: 100 }, // un baddy
       
       
    ];

    var imageArray = [
        spawngoodies
    ];

    var imageArray2 = [
        spawnbaddies
    ];

// Variables de vitesse
    var vX = 0;
    var vY = 0;

    var timer = 30; 
    var setInterval;
    var gameOver = false;

// Gérer les commandes du clavier
    addEventListener("keydown", function (e) {
    //Touches
    // if (e.keyCode == 38) { // HAUT
    //     vX = 0;
    //     vY = -player.speed;
    // }
    // if (e.keyCode == 40) { // BAS
    //     vX = 0;
    //     vY = player.speed;
    // }
    if (e.keyCode == 37) { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    if (e.keyCode == 39) { // DROITE
        vX = player.speed;
        vY = 0;
    }
    if (e.keyCode == 32) { // ARRÊT barre d’espace
        vX = 0;
        vY = 0;
    }
}, false);

// Gérer les commandes tactiles
    addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // BAS
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //DROIT
        vX = player.speed;
        vY = 0;
    }
    else { // ARRÊT S’arrête si vous touchez ailleurs
        vX = 0;
        vY = 0;
    }
});

 //Définir l'état initial
    var init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2; 
    player.y = canvas.height - player.height -50;

    //Placez des goodies à des endroits aléatoires 
    for (var i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = 0 ;
    }
    for (var i in baddies) {
        baddies[i].x = (Math.random() * (canvas.width - baddies[i].width));
        baddies[i].y = 0 ;
    }

    //timer
    timerInterval = setInterval(function(){
        if (timer > 0){
            timer--;
        }    
    }, 1000);

    };

    

// La boucle de jeu principale
var main = function () {
    if (checkLoose()) {
        //GAGNANT Afficher le cadre
        if (looseReady) {
            ctx.drawImage(looseImage, (canvas.width - looseImage.width)/2, 
                (canvas.height - looseImage.height)/2);
        }
    }

    
    else if (checkTimeUp()) {
        render();
        if (looseReady) {
            ctx.drawImage(winImage, (canvas.width - winImage.width)/2,
            (canvas.height - winImage.height)/2);
        }
    }


    else {
        //Pas encore gagné, jouer le jeu
        //déplacer le joueur
        if (player.x > 0 && player.x < canvas.width - player.width) {
            player.x += vX;
        }
        else {
            player.x -= vX;
            vX = -vX; //bounce
        }
        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
        }
        else {
            player.y -= vY;
            vY = -vY; //bounce
        }

        //this is the fuction that spawns the goodies randomly. the number is how many come at once, closer to one is less
        if (Math.random() > 0.99) {
            spawngoodies(); //the function that generates a new goodie
        }
        if (Math.random() > 0.99) {
            spawnbaddies(); //the function that generates a new goodie
        }

        //vérifier les collisions
        for (var i in goodies) {
            goodies[i].y = goodies[i].y + 3;
            if (checkCollision(player,goodies[i])) {
                   goodies.splice(i,1);
                   candyCollected = candyCollected + 1;
            }
        }

        for (var i in baddies) {
            baddies[i].y =  baddies[i].y + 3;
            if (checkCollision(player,baddies[i])) {
                   baddies.splice(i,1);
                   candyCollected = candyCollected - 1;
            }
        }

        render();
        window.requestAnimationFrame(main);
    }
};

// Dessinez le tout
    var render = function () {
        if (bgReady) {
            // ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
            ctx.drawImage(bgImage, 0,0,canvas.width,canvas.height);
        }
        if (playerReady) {
        ctx.drawImage(playerImage, player.x, player.y);
    }
        if (goodyReady) {
        for (var i in goodies) {
        ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
        }
    }

        if (baddieReady){
        for (var i in baddies) {
            ctx.drawImage(baddieImage, baddies[i].x, baddies[i].y);
        }
    }

        //Label
        ctx.fillStyle = "rgba(44, 13, 77, 1)";
        ctx.font = "bold 30px serif";
        ctx.drawImage (goodyImage, -5, 5, 40, 40);
        ctx.fillText("Bonbons : "+candyCollected, 32, 32);

         //timer
        ctx.fillStyle = "rgba(44, 13, 77, 1)";
        ctx.font = "bold 30px serif";
        ctx.fillText( + timer + " sec", canvas.width-150, 30)
    };

//Fonction générique pour vérifier les collisions 
    var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            return true;
    }
    };

//Vérifiez si nous avons gagné
    var checkLoose = function () {
    if (candyCollected > -1) { 
        return false;
    } else { 
        return true;
    }
    };

    var checkTimeUp = function () {
    if (timer > 0){
        return false;
    } else {
        return true;
    }
};

    
    var spawngoodies = function (){
        goodies.push({
            width: 32,
            height:32,
            x: (Math.random() * (canvas.width - 32)),
            y: 0,
            img: Math.floor(Math.random() * 3)

        });
    }

    var spawnbaddies = function (){
        baddies.push({
            width: 32,
            height:32,
            x: (Math.random() * (canvas.width - 32)),
            y: 0,
            img: Math.floor(Math.random() * 3)

        });
    }

//Démarrer le jeu
    init();
    window.requestAnimationFrame(main);
