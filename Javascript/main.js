// -------------------------------------------- VAR --------------------------------------------

let usageSelectValue = "";
let Tirage_Carte_Action = [];
let num_SVG = [], num_SVG2 = [], Image_SVG = [], Image_SVG2 = [];
let Decks = [[], []];
const selectedOption = {};
let CardList = [];

// Constantes pour les éléments ayant un ID
const resetStateButton = document.getElementById('resetStateButton');
// const chooseOptionForm = document.getElementById('choose_option');
const usageSelect = document.getElementById('usage_select');
const optionListButton = document.getElementById('option_list_button');
const welcome_option_container = document.getElementById('welcome_option_container');
const currentCardsContainer = document.getElementById('actuelles_cartes_svg_container');
const nextCardsContainer = document.getElementById('prochaines_cartes_svg_container');
const welcomeDrawButton = document.getElementById('welcomeDrawButton');
const customOptionContainer = document.getElementById('custom_option_container');
const numDecksInput = document.getElementById('numDecks');
const configureDecksButton = document.getElementById('configureDecksButton');
const generateDecksButton = document.getElementById('generateDecksButton');
const modifyDecksButton = document.getElementById('modifyDecksButton');
const deckConfiguration = document.getElementById('deckConfiguration');
const decksContainer = document.getElementById('decksContainer');
const drawSection = document.getElementById('drawSection');
const drawnCardsContainer = document.getElementById('drawnCardsContainer');
const toggleDrawMode = document.getElementById('toggleDrawMode'); // Toggle pour le mode de tirage
const customDrawButton = document.getElementById('customDrawButton');
const dicesOptionContainer = document.getElementById('dices_option_container');
// const diceSelectors = document.getElementById('diceSelectors');
// const addDiceButton = document.getElementById('addDiceButton');
// const rerollButton = document.getElementById('rerollButton');
// const existingContainer = document.getElementById('existingContainer');
const imagesOptionContainer = document.getElementById('images_option_container');
// const fileInput = document.getElementById('fileInput');
// const toggleRemove = document.getElementById('toggleRemove');
// const randomImageButton = document.getElementById('randomImageButton');
// const divReset = document.getElementById('divReset');
// const resetMessage = document.getElementById('resetMessage');
// const imageResetButton = document.getElementById('imageResetButton');
// const imageDisplay = document.getElementById('imageDisplay');
// const rulesbookLink = document.getElementById('rulesbook_link');
// const rulesbookModal = document.getElementById('rulesbook_modal');
const selectBeforeRulesbook = document.getElementById('select_before_rulesbook');
const pdfRules = document.getElementById('PDF_rules');
const pdfDownloadLink = document.getElementById('pdf_download_link');
const pdfContainer = document.getElementById('pdf-container');
// const pdfCanvas = document.getElementById('the-canvas');
// const scoreboardLink = document.getElementById('scoreboard_link');
// const scoreboardModal = document.getElementById('scoreboard_modal');
const appLinkContainer = document.getElementById('app_link_container');
const selectBeforeScoreboard = document.getElementById('select_before_scoreboard');
// const creditsLink = document.getElementById('credits_link');
// const creditsModal = document.getElementById('credits_modal');


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

// Fonction pour gérer la classe 'hide'
function toggleVisibility(element, shouldBeVisible) {
    if (shouldBeVisible) {
        element.classList.remove('hide'); // Rendre visible
    } else {
        element.classList.add('hide'); // Cacher
    }
}

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
    
    pdfContainer.innerText = "";
    pdfDownloadLink.href = url;

    
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        renderAllPages();  // Afficher toutes les pages dans le conteneur

        
        // Retirer la classe hide pour afficher la div PDF_rules
        toggleVisibility(pdfRules,true);
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
            pdfContainer.appendChild(canvas);

            let renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }
}