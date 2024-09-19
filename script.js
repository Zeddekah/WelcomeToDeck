// VAR

const numbers_home = ["1","1","1","2","2","2","14","14","14","15","15","15","3","3","3","3","13","13","13","13","4","4","4","4","4","12","12","12","12","12","5","5","5","5","5","5","11","11","11","11","11","11","6","6","6","6","6","6","6","10","10","10","10","10","10","10","7","7","7","7","7","7","7","7","9","9","9","9","9","9","9","9","8","8","8","8","8","8","8","8","8"];
const face_home = ["Piscine","Piscine","Piscine","Piscine","Piscine","Piscine","Piscine","Piscine","Piscine","Agence_interim","Agence_interim","Agence_interim","Agence_interim","Agence_interim","Agence_interim","Agence_interim","Agence_interim","Agence_interim","N_bis","N_bis","N_bis","N_bis","N_bis","N_bis","N_bis","N_bis","N_bis","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Paysagiste","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Geometre","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere","Agence_immobiliere"];
const numbers_vegas = ["1","2","14","15","1","2","14","15","1","2","14","15","1","2","14","15","3","13","3","13","3","13","3","13","4","12","4","12","4","12","4","12","4","12","5","11","5","11","5","11","5","11","5","11","5","11","6","10","6","10","6","10","6","10","6","10","6","10","6","10","7","9","7","9","7","9","7","9","7","9","7","9","7","9","7","9","8","8","8","8","8","8","8","8","8"];
const face_vegas = ["Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Inauguration","Construction","Limousine","Spectacle","Amélioration","Amélioration"];
const numbers_moon = ["1","2","14","15","1","2","14","15","3","13","3","13","3","13","4","12","4","12","4","12","4","12","5","11","5","11","5","11","5","11","5","11","6","10","6","10","6","10","6","10","6","10","6","10","7","9","7","9","7","9","7","9","7","9","7","9","8","8","8","8","8","8","8"];
const face_moon = ["Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Eau","Astronaute","Planning","Robot","Energie","Plante","Robot","Energie","Plante","Robot","Energie","Plante","Robot","Energie","Plante","Robot","Energie","Plante","Robot","Energie","Plante","Robot","Energie","Plante","Robot","Energie","Plante"];
var card2 = [];

var num_SVG = [];
var num_SVG2 = [];
var SVG = [];
var SVG2 = [];

var Deck1 = [];
var CardList1 = [];
var Deck2 = [];
var CardList2 = [];

var OSName = "Unknown OS";
if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Macintosh";
if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
if (navigator.userAgent.indexOf("Android") != -1) OSName = "Android";
if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "iOS";
console.log("Your OS: " + OSName);

function myFunction(x) {
    window.open('https://javascript.info/');
  let popup = document.getElementById("popup" + x);
  popup.classList.toggle("show");
}

document.addEventListener("adobe_dc_view_sdk.ready", function(){
    var adobeDCView = new AdobeDC.View({clientId: "8982beb1316e45708c86a92422c253fb", divId: "adobe-dc-view"});
    adobeDCView.previewFile({
        content:{location: {url: ""}},
        metaData:{fileName: ""}
    }, {embedMode: "SIZED_CONTAINER"});
}); 

// SETUP

function option_choosen() {
    
    document.getElementById("deck").classList.add("hide");
    document.getElementById("setup").classList.add("hide");
    document.getElementById("tirage").classList.add("hide");
    document.getElementById("select_before_rulesbook").classList.remove("hide");
    document.getElementById("select_before_scoreboard").classList.remove("hide");
    
    document.getElementById("tirage").innerHTML = "";
    card2 = [];
    
    num_SVG = document.getElementsByClassName("num_SVG");
    num_SVG2 = document.getElementsByClassName("num_SVG2");
    SVG = document.getElementsByClassName("SVG");
    SVG2 = document.getElementsByClassName("SVG2");

    console.log("num_SVG.length = " + num_SVG.length);
    
    for (let i = 0; i < 3;i++) {
    num_SVG[i].textContent = "X";
    num_SVG2[i].textContent = "X";
    SVG[i].setAttribute("xlink:href", "");
    SVG2[i].setAttribute("xlink:href", "");
    }
    

    let UsageSelect = document.getElementById("usage_select").value;
    
    if (UsageSelect == "welcome_home") {
        document.getElementById("deck").classList.remove("hide");
        document.getElementById("select_before_rulesbook").classList.add("hide");
        document.getElementById("select_before_scoreboard").classList.add("hide");
        
        CardList1 = numbers_home;
        CardList2 = face_home;
        
        refillCards(1);
        refillCards(2);
        
        adobeDCView = new AdobeDC.View({clientId: "8982beb1316e45708c86a92422c253fb", divId: "adobe-dc-view"});
            adobeDCView.previewFile({
                content:{location: {url: "/PDF/welcome-to-your-perfect-home-regle.pdf"}},
                metaData:{fileName: "welcome-to-your-perfect-home-regle.pdf"}
            }, {embedMode: "SIZED_CONTAINER"});
        
        if (OSName == "iOS") {
            document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1358077007");
        }
        else if (OSName == "Android") {
            document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcome");
        }
        else {
            document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1358077007");
            document.getElementById("app_link").innerHTML += "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcome");
        }
    }
    else if (UsageSelect == "welcome_vegas") {
        document.getElementById("deck").classList.remove("hide");
        document.getElementById("select_before_rulesbook").classList.add("hide");
        document.getElementById("select_before_scoreboard").classList.add("hide");
        
        CardList1 = numbers_vegas;
        CardList2 = face_vegas;
        
        refillCards(1);
        refillCards(2);
        
        adobeDCView = new AdobeDC.View({clientId: "8982beb1316e45708c86a92422c253fb", divId: "adobe-dc-view"});
            adobeDCView.previewFile({
                content:{location: {url: "/PDF/welcome-to-new-las-vegas-regle.pdf"}},
                metaData:{fileName: "welcome-to-new-las-vegas-regle.pdf"}
            }, {embedMode: "SIZED_CONTAINER"});
        
        if (OSName == "iOS") {
            document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1507403095");
        }
        else if (OSName == "Android") {
            document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcomevegas");
        }
        else {
            document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1507403095");
            document.getElementById("app_link").innerHTML += "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcomevegas");
        }
    }
    else if (UsageSelect == "welcome_moon") {
        document.getElementById("deck").classList.remove("hide");
        document.getElementById("select_before_rulesbook").classList.add("hide");
        
        CardList1 = numbers_moon;
        CardList2 = face_moon;
        
        adobeDCView = new AdobeDC.View({clientId: "8982beb1316e45708c86a92422c253fb", divId: "adobe-dc-view"});
            adobeDCView.previewFile({
                content:{location: {url: "/PDF/welcome-to-the-moon-regle.pdf"}},
                metaData:{fileName: "welcome-to-the-moon-regle.pdf"}
            }, {embedMode: "SIZED_CONTAINER"});
        
        refillCards(1);
        refillCards(2);
    
    }
    else if (UsageSelect == "custom") {
        document.getElementById("setup").classList.remove("hide");
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

        document.getElementById("setup").classList.add("hide");
        document.getElementById("deck").classList.remove("hide");
        
        refillCards(1);
        refillCards(2);
    }
}

// DRAFT BOTH

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function drawCard() {
    document.getElementById("tirage").classList.remove("hide");
    
    if (document.getElementById("usage_select").value == "custom") {
        custom_draw();
    }
    
    else {
        welcome_draw();
    }
}

// DRAFT WELCOME TO

function welcome_draw() {    
    
    if (Deck1.length < 3) {
        refillCards(1);
    }
    
    if (Deck2.length < 6) {
        refillCards(2);
    }
    
    let card1 = [];
    let tirage = "<hr /><h4>Tirage :</h4><br/>";
    
    for (let i = 0; i < 3; i++) {
        card1.push(Deck1.pop());
        card2.push(Deck2.pop());
        card2.push(Deck2.pop());
        
        num_SVG[i].textContent = card1[0];
        num_SVG2[i].textContent = card1[0];
        SVG[i].setAttribute("xlink:href", "SVG/Perfect_home/Actions_" + card2[0] + ".svg");
        
        tirage = tirage + card1.shift() + " - " + card2.shift() + "<br/>";
    }
    
    tirage = tirage + "<br/><hr /><h4>Prochaines cartes :</h4><br/>";

    for (let i2 = 0; i2 < 3; i2++) {
        SVG2[i2].setAttribute("xlink:href", "SVG/Perfect_home/Actions_" + card2[i2] + ".svg");
        
        tirage = tirage + "xx - " + card2[i2] + "<br/>";
    }
    
    console.log(tirage);
    //document.getElementById("tirage").innerHTML = tirage;
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

// DRAFT CUSTOM

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
    
    document.getElementById("tirage").innerHTML = tirage;
    console.log(tirage);
}
