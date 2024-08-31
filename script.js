let numButtonClicks = 0;
function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    document.getElementById("mainDiv").textContent = "Button Clicked times: " + numButtonClicks;
}

// SETUP

var numbers = ['01', '01', '01', '02', '02', '02', '14', '14', '14', '15', '15', '15', '03', '03', '03', '03', '13', '13', '13', '13', '04', '04', '04', '04', '04', '12', '12', '12', '12', '12', '05', '05', '05', '05', '05', '05', '11', '11', '11', '11', '11', '11', '06', '06', '06', '06', '06', '06', '06', '10', '10', '10', '10', '10', '10', '10', '07', '07', '07', '07', '07', '07', '07', '07', '09', '09', '09', '09', '09', '09', '09', '09', '08', '08', '08', '08', '08', '08', '08', '08', '08'];
var face_home = ['Piscine', 'Piscine', 'Piscine', 'Piscine', 'Piscine', 'Piscine', 'Piscine', 'Piscine', 'Piscine', 'Agence intérim', 'Agence intérim', 'Agence intérim', 'Agence intérim', 'Agence intérim', 'Agence intérim', 'Agence intérim', 'Agence intérim', 'Agence intérim', 'N° Bis', 'N° Bis', 'N° Bis', 'N° Bis', 'N° Bis', 'N° Bis', 'N° Bis', 'N° Bis', 'N° Bis', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Paysagiste', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Géomètre', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier', 'Agent immobilier'];
var face_vegas = [];
var face_moon = [];
var card2 = [];

var Deck1 = [];
var CardList1 = [];
var Deck2 = [];
var CardList2 = [];

function setupToggleHide() {
    document.getElementById("setup").classList.toggle("d-none");
}

function option_choosen() {
    document.getElementById("deck").classList.add("d-none");
    document.getElementById("setup").classList.add("d-none");
    document.getElementById("card-text").innerHTML = "";


    let UsageSelect = document.getElementById("usage_select").value;
    
    if (UsageSelect == "welcome_home") {
        document.getElementById("deck").classList.remove("d-none");
        
        CardList1 = numbers;
        CardList2 = face_home;
        
        refillCards(1);
        refillCards(2);
    }
    else if (UsageSelect == "welcome_vegas") {
        document.getElementById("deck").classList.remove("d-none");
        
        CardList1 = numbers;
        CardList2 = face_vegas;
        
        refillCards(1);
        refillCards(2);
    }
    else if (UsageSelect == "welcome_moon") {
        document.getElementById("deck").classList.remove("d-none");
        
        CardList1 = numbers;
        CardList2 = face_moon;
        
        refillCards(1);
        refillCards(2);
    }
    else if (UsageSelect == "custom") {
        document.getElementById("setup").classList.toggle("d-none");
    }
}

function custom_setup() {
    let setupCardContent1 = document.getElementById("setup-card-content1").value;
    let setupCards1 = setupCardContent1.split("\n");
    let setupCardContent2 = document.getElementById("setup-card-content2").value;
    let setupCards2 = setupCardContent2.split("\n");
    for (let i1 = 0; i1 < setupCards1.length; i1++) {
        if (setupCards1[i1] == "") {
            setupCards1.splice(i1, 1);
            i1--;
        }
    }
    for (let i2 = 0; i2 < setupCards2.length; i2++) {
        if (setupCards2[i2] == "") {
            setupCards2.splice(i2, 1);
            i2--;
        }
    }

    if (setupCards1.length > 3) {
        CardList1 = [];
        CardList1 = setupCards1.slice();
        CardList2 = [];
        CardList2 = setupCards2.slice();

        console.log("INFO: The following cards were parsed.");
        console.log(CardList1);
        console.log(CardList2);

        document.getElementById("setup").classList.add("d-none");
        document.getElementById("deck").classList.remove("d-none");
        
        refillCards(1);
        refillCards(2);
    }
}

function refillCards(Deck) {
    
    if (Deck == 1) {
        Deck1 = [];
        Deck1 = CardList1.slice();
        Deck1 = shuffle(Deck1);
    }
    else {
        Deck2 = [];
        Deck2 = CardList2.slice();
        Deck2 = shuffle(Deck2);
    }
    
    if (card2 != []) {
        for (let i = 0; i < 3; i++) {
            let index_del = Deck2.indexOf(card2[0]);
            Deck2.splice(index_del,1);
        }
    }
    
    console.log("INFO: Deck was refilled and shuffled.");

}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// GAME

function drawCard() {
    
    if (document.getElementById("usage_select").value == "custom") {
        custom_draw();
    }
    
    else {
        welcome_draw();
    }
}

function welcome_draw() {
    if (Deck1.length < 3) {
        refillCards(1);
    }
    
    if (Deck2.length < 6) {
        refillCards(2);
    }
    
    let card1 = [];
    let tirage = "<h4>Tirage :</h4><br/>";
    
    for (let i = 0; i < 3; i++) {
        card1.push(Deck1.pop());
        card2.push(Deck2.pop());
        card2.push(Deck2.pop());
        
        tirage = tirage + card1.shift() + " - " + card2.shift() + "<br/>";
    }
    
    tirage = tirage + "<br/><hr /><h4>Prochaines cartes :</h4><br/>";

    for (let i2 = 0; i2 < 3; i2++) {
        tirage = tirage + "xx - " + card2[i2] + "<br/>";
    }
    
    
    document.getElementById("card-text").innerHTML = tirage;
    console.log(tirage);
}

function custom_draw() {
    if (Deck1.length < 3) {
        refillCards(1);
    }
    
    if (Deck2.length < 3) {
        refillCards(2);
    }
    
    let card1;
    let card2;
    let tirage = "";
    
    for (let i = 0; i < 3; i++) {
        card1 = Deck1.pop();
        card2 = Deck2.pop();
        tirage = tirage + card1 + " - " + card2 + "<br/>";
    }
    
    document.getElementById("card-text").innerHTML = tirage;
    console.log(tirage);
}

refillCards(1);
refillCards(2);
