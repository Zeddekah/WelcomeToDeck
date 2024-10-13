// -------------------------------------------- VAR --------------------------------------------

let UsageSelect = "";
let Tirage_Carte_Action = [];
let num_SVG = [], num_SVG2 = [], Image_SVG = [], Image_SVG2 = [];
let Decks = [[], []];
const selectedOption = {};
let CardList = [];


// -------------------------------------------- INITIALISATION --------------------------------------------
    
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

// Parametres versions welcome
const options = {
    "welcome_home": {
        PDFrules: "PDF/welcome-to-your-perfect-home-regle.pdf",
        cards: cardData.home,
        app: {
            android: "https://play.google.com/store/apps/details?id=com.bluecocker.welcome",
            ios: "https://apps.apple.com/app/id1358077007"
        }
    },
    "welcome_vegas": {
        PDFrules: "PDF/welcome-to-new-las-vegas-regle.pdf",
        cards: cardData.vegas,
        app: {
            android: "https://play.google.com/store/apps/details?id=com.bluecocker.welcomevegas",
            ios: "https://apps.apple.com/app/id1507403095"
        }
    },
    "welcome_moon": {
        PDFrules: "PDF/welcome-to-the-moon-regle.pdf",
        cards: cardData.moon
    }
};
    
// Détection OS
const userAgent = navigator.userAgent;
const OSName = /Win/.test(userAgent) ? "Windows" : 
               /Mac/.test(userAgent) ? "Macintosh" : 
               /Linux/.test(userAgent) ? "Linux" : 
               /Android/.test(userAgent) ? "Android" : 
               /like Mac/.test(userAgent) ? "iOS" : "Unknown OS";

console.log("Your OS = " + OSName);


// -------------------------------------------- SETUP --------------------------------------------

// Fonction pour mélanger les cartes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// -------------------------------------------- PDF load + scroll --------------------------------------------

// Initialiser le PDF
function loadPDF(url) {
    
console.log("LOAD PDF url = " + url);
    
    document.getElementById("pdf-container").innerText = "";
    document.getElementById("pdf_download_link").href = url;

    
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        renderAllPages();  // Afficher toutes les pages dans le conteneur

        
        // Retirer la classe hide pour afficher la div PDF_rules
        document.getElementById('PDF_rules').classList.remove('hide');
    }).catch(function(error) {
        console.error("Erreur lors du chargement du PDF:", error);
    });
}

function renderAllPages() {
    for (let num = 1; num <= pdfDoc.numPages; num++) {
        pdfDoc.getPage(num).then(function(page) {
            let viewport = page.getViewport({ scale: 1.5 });
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Ajouter le canevas dans le conteneur
            document.getElementById('pdf-container').appendChild(canvas);

            let renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }
}