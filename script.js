// -------------------------------------------- Card setup --------------------------------------------
    
// Tableau des données pour chaque jeu
const cardData = {
  home: { numbers: [], faces: [] },
  vegas: { numbers: [], faces: [] },
  moon: { numbers: [], faces: [] },
};

// Remplissage dynamique des tableaux
for (let i = 0; i < 18; i++) {
    if (i < 2) cardData.moon.numbers.push("1","2","14","15");
    if (i < 3) {
        cardData.home.numbers.push("1","2","14","15");
        cardData.vegas.numbers.push("1","2","14","15");
        cardData.moon.numbers.push("3","13");
    }
    if (i < 4) {
        cardData.home.numbers.push("3","13");
        cardData.vegas.numbers.push("3","13");
        cardData.moon.numbers.push("4","12");
    }
    if (i < 5) {
        cardData.home.numbers.push("14","12");
        cardData.vegas.numbers.push("4","12");
        cardData.moon.numbers.push("5","11");
    }
    if (i < 6) {
        cardData.home.numbers.push("5","11");
        cardData.vegas.numbers.push("5","11");
        cardData.moon.numbers.push("6","7","9","10");
    }
    if (i < 7) {
        cardData.home.numbers.push("6","10");
        cardData.vegas.numbers.push("6","10");
        cardData.moon.numbers.push("8");
        cardData.moon.faces.push("Eau","Astronaute","Planning");
    }
    if (i < 8) {
        cardData.home.numbers.push("7","9");
        cardData.vegas.numbers.push("7","9");
    }
    if (i < 9) {
        cardData.home.numbers.push("8");
        cardData.home.faces.push("Piscine","Agence_interim","N_bis");
        cardData.vegas.numbers.push("8");
    }
    if (i < 14) cardData.moon.faces.push("Robot","Energie","Plante");
    if (i < 16) cardData.vegas.faces.push("Inauguration","Construction","Limousine","Spectacle");
    if (i < 17) cardData.vegas.faces.push("Amelioration");
    if (i < 18) cardData.home.faces.push("Paysagiste","Agence_immobiliere","Geometre");
}

    
// -------------------------------------------- VAR --------------------------------------------

    var UsageSelect = "";

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


// -------------------------------------------- SETUP --------------------------------------------

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

        UsageSelect = document.getElementById("usage_select").value;

        for (let i=0; i<3; i++) {
        num_SVG[i].textContent = "X";
        num_SVG2[i].textContent = "X";
        SVG[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
        SVG2[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
        }

        if (UsageSelect == "welcome_home") {
            document.getElementById("deck").classList.remove("hide");
            document.getElementById("select_before_rulesbook").classList.add("hide");
            document.getElementById("select_before_scoreboard").classList.add("hide");
            
            loadPDF("PDF/welcome-to-your-perfect-home-regle.pdf");

            CardList1 = cardData.home.numbers;
            CardList2 = cardData.home.faces;

            refillCards(1);
            refillCards(2);

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
            
            loadPDF("PDF/welcome-to-new-las-vegas-regle.pdf");

            CardList1 = cardData.vegas.numbers;
            CardList2 = cardData.vegas.faces;

            refillCards(1);
            refillCards(2);

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
            
            loadPDF("PDF/welcome-to-the-moon-regle.pdf");

            CardList1 = cardData.moon.numbers;
            CardList2 = cardData.moon.faces;

            refillCards(1);
            refillCards(2);

        }
        else if (UsageSelect == "custom") {
            document.getElementById("setup").classList.remove("hide");
            loadPDF("");
        }
        else {
            loadPDF("");
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

// -------------------------------------------- DRAFT BOTH --------------------------------------------

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function drawCard() {
        document.getElementById("tirage").classList.remove("hide");

        if (UsageSelect == "custom") {
            custom_draw();
        }

        else {
            welcome_draw();
        }
    }


// -------------------------------------------- DRAFT WELCOME TO --------------------------------------------

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
            SVG[i].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + card2[0] + ".svg");

            tirage = tirage + card1.shift() + " - " + card2.shift() + "<br/>";
        }

        tirage = tirage + "<br/><hr /><h4>Prochaines cartes :</h4><br/>";

        for (let i2 = 0; i2 < 3; i2++) {
            SVG2[i2].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + card2[i2] + ".svg");

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


// -------------------------------------------- DRAFT CUSTOM --------------------------------------------

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


// -------------------------------------------- Modale closing + onclick listener --------------------------------------------

function closeModal(event, modalId) {
    const modalContent = document.querySelector(`#${modalId} .content`);
    if (!modalContent.contains(event.target)) {
        window.location.href = '#';  // Closes the modal by resetting the hash
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const optionButton = document.getElementById('option_list_button');
    if (optionButton) {
        optionButton.addEventListener('click', function() {
            option_choosen(); // Exécute la fonction lorsqu'on clique sur le bouton
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const rulesbookLink = document.getElementById('rulesbook_link');
    if (rulesbookLink) {
        rulesbookLink.addEventListener('click', function() {
            window.location.href = '#rulesbook';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const scoreboardLink = document.getElementById('scoreboard_link');
    if (scoreboardLink) {
        scoreboardLink.addEventListener('click', function() {
            window.location.href = '#scoreboard';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const creditsLink = document.getElementById('credits_link');
    if (creditsLink) {
        creditsLink.addEventListener('click', function() {
            window.location.href = '#credits';
        });
    }
});


// -------------------------------------------- PDF on mobile --------------------------------------------


var scale = window.innerWidth < 600 ? 0.5 : 1.0;  // 0.5 pour mobile, 1.0 pour les écrans plus larges

window.addEventListener('resize', function() {
    scale = window.innerWidth < 600 ? 0.5 : 1.0;
    renderPage(pageNum);  // Redessine la page actuelle avec la nouvelle échelle
});


// -------------------------------------------- PDF scroll + load --------------------------------------------

function renderAllPages() {
    for (let num = 1; num <= pdfDoc.numPages; num++) {
        pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport({ scale: 1.5 });
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Ajouter le canevas dans le conteneur
            document.getElementById('pdf-container').appendChild(canvas);

            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }
}

// Initialiser le PDF
function loadPDF(url) {
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        renderAllPages();  // Afficher toutes les pages dans le conteneur

        
        // Retirer la classe hide pour afficher la div PDF_rules
        document.getElementById('PDF_rules').classList.remove('hide');
    }).catch(function(error) {
        console.error("Erreur lors du chargement du PDF:", error);
    });
}