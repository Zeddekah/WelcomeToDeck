// -------------------------------------------- VAR --------------------------------------------

let UsageSelect = "";
let Tirage_Carte_Action = [];
let num_SVG = [], num_SVG2 = [], Image_SVG = [], Image_SVG2 = [];
let Decks = [[], []];
const selectedOption = {};
let CardList = [];


// -------------------------------------------- IITIALISATION --------------------------------------------
    
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

function option_choosen() {
    // Tout masquer
    document.getElementById("deck").classList.add("hide");
    document.getElementById("custom_setup").classList.add("hide");
    document.getElementById("select_before_rulesbook").classList.remove("hide");
    document.getElementById('PDF_rules').classList.add('hide');
    document.getElementById("select_before_scoreboard").classList.remove("hide");
    loadAppLink("");
    loadPDF("");

    // Sélection de l'option
    UsageSelect = document.getElementById("usage_select").value;

    
    if (options[UsageSelect]) {
        document.getElementById("deck").classList.remove("hide");
        document.getElementById("select_before_rulesbook").classList.add("hide");
        
        updateSelectedOption(UsageSelect);
console.log("options[UsageSelect] = " + options[UsageSelect]);
console.log("selectedOption = " + selectedOption);
        
        const PDFpath = selectedOption.PDFrules;
console.log("Chemin PDF = " + PDFpath);
        loadPDF(PDFpath);
        
        Tirage_Carte_Action = [];

        // Récupérer les éléments graphiques
        num_SVG = document.getElementsByClassName("num_SVG");
        num_SVG2 = document.getElementsByClassName("num_SVG2");
        Image_SVG = document.getElementsByClassName("Image_SVG");
        Image_SVG2 = document.getElementsByClassName("Image_SVG2");
console.log("Image_SVG carte 1 = " + Image_SVG[0]);
console.log("Image_SVG carte 2 = " + Image_SVG[1]);
console.log("Image_SVG carte 3 = " + Image_SVG[2]);

console.log("Nombre de cartes détectées (num haut, num bas, Actions svg, Prochaines actions svg) = " + num_SVG.length + "," + num_SVG2.length + "," + Image_SVG.length + "," + Image_SVG2.length);

        // Initialision des SVG
        for (let i=0; i<3; i++) {
        num_SVG[i].textContent = "X";
        num_SVG2[i].textContent = "X";
        Image_SVG[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
        Image_SVG2[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
        }
        
        loadAppLink(selectedOption);
    } else if (UsageSelect === "custom") {
        document.getElementById("custom_setup").classList.remove("hide");
        deckConfiguration.classList.add("hide");
        modifyDecksButton.classList.add("hide");
        drawSection.classList.add('hide');
    }
    
console.log("Selection = " + UsageSelect);
if (selectedOption) {console.log(selectedOption);}
}

// Fonction pour mettre à jour selectedOption
function updateSelectedOption(UsageSelect) {
console.log("Selected option: ", UsageSelect); // Ajoutez ceci pour voir l'objet sélectionné
console.log("Selected Option before update: ", selectedOption); // Vérifiez l'objet avant la mise à jour
    // Vider l'objet
    Object.keys(selectedOption).forEach(key => delete selectedOption[key]);
    // Assigner les nouvelles options
    Object.assign(selectedOption, options[UsageSelect]);

    // Réinitialiser les Decks
    Decks[0] = shuffle(selectedOption.cards.numbers.slice());
    Decks[1] = shuffle(selectedOption.cards.faces.slice());

    console.log("Selected Option after update: ", selectedOption); // Vérifiez l'objet après la mise à jour

    console.log("INFO: Les decks ont été réinitialisés pour l'option sélectionnée.");
}

// Fonction pour charger les liens des stores
function loadAppLink(selectedOption) {
    if (selectedOption.app) {
        const appLinks = {
            "iOS": '<a href="' + selectedOption.app.ios + '" target="_blank"><img src="SVG/App_Store.svg" alt="App Store"></a>',
            "Android": '<a href="' + selectedOption.app.android + '" target="_blank"><img src="SVG/Google_Play.svg" alt="Google Play"></a>'
        };

        let appLinkHTML;

        // Si l'OS est iOS, afficher uniquement le lien iOS
        if (OSName === "iOS") {
            appLinkHTML = appLinks.iOS;
        }
        // Si l'OS est Android, afficher uniquement le lien Android
        else if (OSName === "Android") {
            appLinkHTML = appLinks.Android;
        }
        // Sinon, afficher les deux liens
        else {
            appLinkHTML = appLinks.iOS + " " + appLinks.Android;
        }

        document.getElementById("app_link").innerHTML = appLinkHTML;
        
        document.getElementById("select_before_scoreboard").classList.add("hide");
    } else {
        document.getElementById("app_link").innerHTML = "";
        
        document.getElementById("select_before_scoreboard").classList.remove("hide");
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


// -------------------------------------------- DRAFT WELCOME TO --------------------------------------------

function welcome_draw() {  

    if (Decks[0].length < 3) {
        refillCards(0);
    }

    if (Decks[1].length < 6) {
        refillCards(1);
    }

    let Tirage_Carte_Num = [];
    
console.log("Nombre de cartes détectées (num haut, num bas, Actions svg, Prochaines actions svg) = " + num_SVG.length + "," + num_SVG2.length + "," + Image_SVG.length + "," + Image_SVG2.length);
console.log("Image_SVG carte 1 = " + Image_SVG[0]);
console.log("Image_SVG carte 2 = " + Image_SVG[1]);
console.log("Image_SVG carte 3 = " + Image_SVG[2]);

    
    for (let i = 0; i < 3; i++) {
        
        Tirage_Carte_Num.push(Decks[0].pop());
        num_SVG[i].textContent = Tirage_Carte_Num[i];
        num_SVG2[i].textContent = Tirage_Carte_Num[i];
        
        if (Tirage_Carte_Action.length < 3) {Tirage_Carte_Action.push(Decks[1].pop());}
        Image_SVG[i].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + Tirage_Carte_Action[i] + ".svg");
console.log(Image_SVG[i]);
    }

console.log ("numeros tirés = " + Tirage_Carte_Num);
console.log ("Actions actuelle = " + Tirage_Carte_Action);

    Tirage_Carte_Action = [];
    
    for (let i2 = 0; i2 < 3; i2++) {
        
        Tirage_Carte_Action.push(Decks[1].pop());
        Image_SVG2[i2].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + Tirage_Carte_Action[i2] + ".svg");
        
console.log(Image_SVG2[i2]);
    }

console.log ("Actions prochaines = " + Tirage_Carte_Action);
}

function refillCards(num_deck) {
    
    Decks[num_deck] = (num_deck === 0) ? shuffle(selectedOption.cards.numbers.slice()) : shuffle(selectedOption.cards.faces.slice());

console.log(`INFO: Le deck ${num_deck === 0 ? 'de numéros' : 'd\'actions'} a été re-rempli et mélangé.`);
}


// -------------------------------------------- onclick listener + modale closing --------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    
    // Bouton selection liste déroulante
    const optionButton = document.getElementById('option_list_button');
    if (optionButton) {
        optionButton.addEventListener('click', function() {
            event.preventDefault();  // Empêche le rechargement de la page
            option_choosen();
        });
    }
    
    // Bouton draw (Welcome)
    const drawButton = document.getElementById('drawButton');
    if (drawButton) {
        drawButton.addEventListener('click', function() {
            event.preventDefault();  // Empêche le rechargement de la page
            welcome_draw();
        });
    }
    
    // Ouverture des modals
        function addLinkClickListener(linkId, targetId) {
            const link = document.getElementById(linkId);
            if (link) {
                link.addEventListener('click', function() {
                    window.location.href = `#${targetId}`;
                });
            }
        }
        // Listeners pour chaque lien
        addLinkClickListener('rulesbook_link', 'rulesbook');
        addLinkClickListener('scoreboard_link', 'scoreboard');
        addLinkClickListener('credits_link', 'credits');

    // Fermeture des modals
        function addModalClickListener(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('click', function(event) {
                    closeModal(event, modalId);
                });
            }
        }
        function closeModal(event, modalId) {
            const modalContent = document.querySelector(`#${modalId} .content`);
            if (!modalContent.contains(event.target)) {
                window.location.href = '#';  // Closes the modal by resetting the hash
            }
        }
        // Listeners pour chaque modal
        ['rulesbook', 'scoreboard', 'credits'].forEach(addModalClickListener);
});


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


// -------------------------------------------- CUSTOM DECK --------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const numDecksInput = document.getElementById('numDecks');
  const configureDecksButton = document.getElementById('configureDecksButton');
  const generateDecksButton = document.getElementById('generateDecksButton');
  const modifyDecksButton = document.getElementById('modifyDecksButton');
  const deckConfiguration = document.getElementById('deckConfiguration');
  const decksContainer = document.getElementById('decksContainer');
  const drawSection = document.getElementById('drawSection');
  const drawnCardsContainer = document.getElementById('drawnCardsContainer');
  let decks = [];

  // Affichage des champs de configuration des decks
  configureDecksButton.addEventListener('click', () => {
    modifyDecksButton.classList.add("hide");
    drawSection.classList.add('hide');
    const numDecks = parseInt(numDecksInput.value, 10);
    decksContainer.innerHTML = ''; // Reset container
    for (let i = 0; i < numDecks; i++) {
      const deckDiv = document.createElement('div');
      deckDiv.classList.add('deck-config');
      deckDiv.innerHTML = `
        <label for="deck${i}">Cartes du deck ${i + 1} (une par ligne) :</label>
        <textarea id="deck${i}" rows="4"></textarea>
        <label for="drawCount${i}">Nombre de cartes à tirer :</label>
        <input type="number" id="drawCount${i}" min="1" value="1">
      `;
      decksContainer.appendChild(deckDiv);
    }
    deckConfiguration.classList.remove('hide');
  });

  // Génération des decks
  generateDecksButton.addEventListener('click', () => {
    decks = [];
    const numDecks = parseInt(numDecksInput.value, 10);
    for (let i = 0; i < numDecks; i++) {
      const cards = document.getElementById(`deck${i}`).value.split('\n').filter(card => card.trim() !== '');
      decks.push({
        cards: shuffle(cards), // Utilisation de la fonction shuffle
        drawCount: parseInt(document.getElementById(`drawCount${i}`).value, 10),
        drawn: []
      });
    }
    drawnCardsContainer.innerHTML = ''; // Réinitialisation du conteneur
    deckConfiguration.classList.add('hide');
      
    modifyDecksButton.classList.remove('hide');
    drawSection.classList.remove('hide');
  });

  // Modification des decks
  modifyDecksButton.addEventListener('click', () => {
      deckConfiguration.classList.remove('hide');
      modifyDecksButton.classList.add('hide');
      drawSection.classList.add('hide');
  });

  // Tirage des cartes
  document.getElementById('draw_Button').addEventListener('click', () => {
    drawnCardsContainer.innerHTML = ''; // Clear previous drawn cards
    decks.forEach((deck, index) => {
      const deckCardsDiv = document.createElement('div');
      deckCardsDiv.innerHTML = `<strong>Deck ${index + 1}</strong>`;
      drawnCardsContainer.appendChild(deckCardsDiv);
      
      if (deck.cards.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.innerText = `Le deck ${index + 1} est vide. Mélangez-le pour continuer.`;
        
        // Ajout d'un bouton pour remélanger le deck
        const shuffleButton = document.createElement('button');
        shuffleButton.innerText = `Remélanger le deck ${index + 1}`;
        shuffleButton.addEventListener('click', () => {
          deck.cards = shuffle(deck.drawn);
          deck.drawn = [];
          emptyMessage.remove(); // Retire le message de deck vide
          shuffleButton.remove(); // Retire le bouton de remélange
        });

        drawnCardsContainer.appendChild(emptyMessage);
        drawnCardsContainer.appendChild(shuffleButton);
      } else {
        deck.drawn = []; // Réinitialiser les cartes déjà tirées pour ce deck
        const drawMessage = document.createElement('p'); // Créer un élément <p> unique pour contenir tous les tirages
        for (let i = 0; i < deck.drawCount; i++) {
          if (deck.cards.length > 0) {
            const drawnCard = deck.cards.shift();
            deck.drawn.push(drawnCard);
            
            // Afficher chaque tirage avec un numéro
            drawMessage.innerHTML += `Tirage ${i + 1} = ${drawnCard}<br />`;
            deckCardsDiv.appendChild(drawMessage);
          }
        }
          
        deckCardsDiv.appendChild(drawMessage); // Ajouter l'élément <p> au div
      }
    });
  });
});