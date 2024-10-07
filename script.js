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

let UsageSelect = "";
let card2 = [];
let num_SVG = [], num_SVG2 = [], SVG = [], SVG2 = [];
let Deck1 = [], Deck2 = [];
let CardList1 = [], CardList2 = [];


// -------------------------------------------- Détection OS --------------------------------------------

const userAgent = navigator.userAgent;
const OSName = /Win/.test(userAgent) ? "Windows" : 
               /Mac/.test(userAgent) ? "Macintosh" : 
               /Linux/.test(userAgent) ? "Linux" : 
               /Android/.test(userAgent) ? "Android" : 
               /like Mac/.test(userAgent) ? "iOS" : "Unknown OS";

console.log("Your OS: " + OSName);


// -------------------------------------------- SETUP --------------------------------------------

function option_choosen() {
    // Masquer les éléments inutiles
    document.getElementById("deck").classList.add("hide");
    document.getElementById("custom_setup").classList.add("hide");
    document.getElementById("select_before_rulesbook").classList.remove("hide");
    document.getElementById('PDF_rules').classList.add('hide');
    document.getElementById("select_before_scoreboard").classList.remove("hide");
    loadAppLink("");
    loadPDF("");

    card2 = [];

    // Récupérer les éléments graphiques
    num_SVG = document.getElementsByClassName("num_SVG");
    num_SVG2 = document.getElementsByClassName("num_SVG2");
    SVG = document.getElementsByClassName("SVG");
    SVG2 = document.getElementsByClassName("SVG2");

    console.log("num_SVG.length = " + num_SVG.length);

    // Sélection de l'option
    UsageSelect = document.getElementById("usage_select").value;



    // Réinitialiser les SVG
    for (let i=0; i<3; i++) {
    num_SVG[i].textContent = "X";
    num_SVG2[i].textContent = "X";
    SVG[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
    SVG2[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
    }
    
    // Chargement selon l'option sélectionnée
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

    const selectedOption = options[UsageSelect];

    if (selectedOption) {
        const PDFpath = selectedOption.PDFrules;
        document.getElementById("deck").classList.remove("hide");
        document.getElementById("select_before_rulesbook").classList.add("hide");
        loadPDF(PDFpath);
        CardList1 = selectedOption.cards.numbers.slice();
        CardList2 = selectedOption.cards.faces.slice();
        refillCards(1);
        refillCards(2);
        loadAppLink(selectedOption);
    } else if (UsageSelect === "custom") {
        document.getElementById("custom_setup").classList.remove("hide");
    }
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


// -------------------------------------------- DRAFT BOTH --------------------------------------------

// Fonction pour mélanger les cartes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawCard() {
    if (UsageSelect == "custom") {
        custom_draw();
    }
    else {
        welcome_draw();
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
    drawSection.classList.remove('hide');
  });

  // Modification des decks
  modifyDecksButton.addEventListener('click', () => {
    deckConfiguration.classList.remove('hide');
    drawSection.classList.add('hide');
  });

  // Tirage des cartes
  document.getElementById('draw_Button').addEventListener('click', () => {
    drawnCardsContainer.innerHTML = ''; // Clear previous drawn cards
    decks.forEach((deck, index) => {
      const deckCardsDiv = document.createElement('div');
      deckCardsDiv.innerHTML = `<strong>Deck ${index + 1} :</strong>`;
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
        for (let i = 0; i < deck.drawCount; i++) {
          if (deck.cards.length > 0) {
            const drawnCard = deck.cards.shift();
            deck.drawn.push(drawnCard);
            
            // Afficher chaque tirage avec un numéro
            const drawMessage = document.createElement('p');
            drawMessage.innerText = `Tirage ${i + 1}: ${drawnCard}`;
            deckCardsDiv.appendChild(drawMessage);
          }
        }
      }
    });
  });
});

/*
 * let initialDecks = {};  // Stocker la configuration initiale des decks

document.addEventListener('DOMContentLoaded', function() {
    // Bouton pour continuer le tirage
    document.getElementById('continueDrawButton').addEventListener('click', function() {
        getCustomDeckData();  // Continuer le tirage
    });
});

// -------------------------------------------- Cacher la Configuration après Validation et Afficher les Résultats --------------------------------------------

function generateDeckInputs() {
    const deckCount = document.getElementById('deckCount').value;
    const deckInputsContainer = document.getElementById('deckInputs');
    deckInputsContainer.innerHTML = '';  // Effacer les anciens inputs

    for (let i = 0; i < deckCount; i++) {
        const deckDiv = document.createElement('div');
        deckDiv.className = 'deck-config';

        // Label et champ pour les cartes
        const deckLabel = document.createElement('label');
        deckLabel.textContent = `Cartes pour Deck ${i + 1} (une par ligne)`;
        
        const deckTextarea = document.createElement('textarea');
        deckTextarea.id = `deck-${i}`;
        deckTextarea.rows = 5;
        deckTextarea.placeholder = 'Entrez les cartes ligne par ligne...';

        // Sélection du nombre de tirages
        const drawLabel = document.createElement('label');
        drawLabel.textContent = `Nombre de tirages pour Deck ${i + 1}`;
        
        const drawInput = document.createElement('input');
        drawInput.type = 'number';
        drawInput.id = `draw-${i}`;
        drawInput.name = `draw-${i}`;
        drawInput.min = 1;
        drawInput.max = 10;
        drawInput.value = 1;

        deckDiv.appendChild(deckLabel);
        deckDiv.appendChild(deckTextarea);
        deckDiv.appendChild(drawLabel);
        deckDiv.appendChild(drawInput);
        deckInputsContainer.appendChild(deckDiv);
    }

    document.getElementById('submitConfig').style.display = 'block';  // Afficher le bouton Valider
}


// -------------------------------------------- Valider et cacher le formulaire --------------------------------------------

function finalizeConfiguration() {
    const deckCount = document.getElementById('deckCount').value;

    // Sauvegarder la configuration initiale
    for (let i = 0; i < deckCount; i++) {
        initialDecks[`deck-${i}`] = document.getElementById(`deck-${i}`).value.split('\n').filter(card => card.trim() !== '');
        initialDecks[`draw-${i}`] = document.getElementById(`draw-${i}`).value;
    }

    document.getElementById('custom-setup').style.display = 'none';  // Cacher tout le formulaire custom-setup
    document.getElementById('modifyConfig').style.display = 'block';  // Afficher le bouton Modifier

    // Lancer le premier tirage
    getCustomDeckData();
}

// -------------------------------------------- Restaurer la configuration initiale --------------------------------------------

function reopenConfiguration() {
    const deckCount = Object.keys(initialDecks).length / 2;  // Compter les decks sauvegardés

    document.getElementById('deckInputs').innerHTML = '';  // Vider les inputs actuels

    for (let i = 0; i < deckCount; i++) {
        const deckDiv = document.createElement('div');
        deckDiv.className = 'deck-config';

        // Label et champ pour les cartes
        const deckLabel = document.createElement('label');
        deckLabel.textContent = `Cartes pour Deck ${i + 1} (une par ligne)`;

        const deckTextarea = document.createElement('textarea');
        deckTextarea.id = `deck-${i}`;
        deckTextarea.rows = 5;
        deckTextarea.value = initialDecks[`deck-${i}`].join('\n');  // Restaurer les cartes initiales

        // Sélection du nombre de tirages
        const drawLabel = document.createElement('label');
        drawLabel.textContent = `Nombre de tirages pour Deck ${i + 1}`;

        const drawInput = document.createElement('input');
        drawInput.type = 'number';
        drawInput.id = `draw-${i}`;
        drawInput.value = initialDecks[`draw-${i}`];  // Restaurer le nombre de tirages initial

        deckDiv.appendChild(deckLabel);
        deckDiv.appendChild(deckTextarea);
        deckDiv.appendChild(drawLabel);
        deckDiv.appendChild(drawInput);
        document.getElementById('deckInputs').appendChild(deckDiv);
    }

    document.getElementById('custom-setup').style.display = 'block';  // Afficher le formulaire
    document.getElementById('modifyConfig').style.display = 'none';  // Cacher le bouton Modifier
}

// -------------------------------------------- Tirage par Deck et Affichage des Résultats --------------------------------------------

function getCustomDeckData() {
    const deckCount = document.getElementById('deckCount').value;
    const tirageResult = document.getElementById('tirageResult');
    tirageResult.innerHTML = '';  // Effacer les anciens résultats

    let allDecksEmpty = true;

    for (let i = 0; i < deckCount; i++) {
        const deckCards = document.getElementById(`deck-${i}`).value.split('\n').filter(card => card.trim() !== '');
        const drawCount = document.getElementById(`draw-${i}`).value;

        // Si le deck est vide, proposer un remélange
        if (deckCards.length === 0) {
            // Ne pas afficher le message de deck vide
            tirageResult.innerHTML += `<p><button onclick="reshuffleDeck(${i})">Remélanger le deck</button></p>`;
        } else {
            allDecksEmpty = false;
            // Appel à performCustomDraw(deckCards, drawCount, i); ici si besoin
        }

        // Remplacer les cartes dans le textarea par celles qui restent
        document.getElementById(`deck-${i}`).value = deckCards.join('\n');
    }

    // Si tous les decks sont vides, cacher le bouton "Continuer le tirage"
    if (allDecksEmpty) {
        document.getElementById('continueDrawButton').style.display = 'none';
    } else {
        document.getElementById('continueDrawButton').style.display = 'block';  // Afficher le bouton pour continuer
    }
}

// Fonction pour remélanger le deck vide et relancer le tirage
function reshuffleDeck(deckIndex) {
    const deckCards = initialDecks[`deck-${deckIndex}`];
    document.getElementById(`deck-${deckIndex}`).value = shuffle(deckCards).join('\n');  // Remélanger et réafficher les cartes

    // Mettre à jour l'affichage pour ne pas pouvoir recliquer sur "Remélanger"
    const tirageResult = document.getElementById('tirageResult');
    tirageResult.innerHTML += `<p>Deck ${deckIndex + 1} a été remélangé. Vous pouvez continuer le tirage.</p>`;
    
    // Cacher le bouton "Remélanger" pour éviter de recliquer
    const remélangerButton = document.querySelector(`#tirageResult button[onclick="reshuffleDeck(${deckIndex})"]`);
    if (remélangerButton) {
        remélangerButton.style.display = 'none';
    }

    // Afficher le bouton "Continuer le tirage"
    document.getElementById('continueDrawButton').style.display = 'block';
}

function performCustomDraw(deck, drawCount, deckIndex) {
    const tirageResult = document.getElementById('tirageResult');
    const shuffledDeck = shuffle(deck);  // Mélanger les cartes
    const resultDiv = document.createElement('div');
    resultDiv.className = 'deck-result';

    resultDiv.innerHTML = `<h4>Résultats pour Deck ${deckIndex + 1}</h4>`;
    for (let i = 0; i < drawCount; i++) {
        if (shuffledDeck[i]) {
            resultDiv.innerHTML += `<p>Tirage ${i + 1}: ${shuffledDeck[i]}</p>`;
            deck.splice(deck.indexOf(shuffledDeck[i]), 1);  // Supprimer la carte du deck après le tirage
        } else {
            resultDiv.innerHTML += `<p>Tirage ${i + 1}: Pas assez de cartes dans le deck.</p>`;
        }
    }
    tirageResult.appendChild(resultDiv);
}
*/

// -------------------------------------------- DRAFT WELCOME TO --------------------------------------------

function welcome_draw() {    

    if (Deck1.length < 3) {
        refillCards(1);
    }

    if (Deck2.length < 6) {
        refillCards(2);
    }

    let card1 = [];

    for (let i = 0; i < 3; i++) {
        card1.push(Deck1.pop());
        card2.push(Deck2.pop());
        card2.push(Deck2.pop());

        num_SVG[i].textContent = card1[0];
        num_SVG2[i].textContent = card1[0];
        SVG[i].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + card2[0] + ".svg");
    }
    
    for (let i2 = 0; i2 < 3; i2++) {
        SVG2[i2].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + card2[i2] + ".svg");
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


// -------------------------------------------- PDF load + scroll --------------------------------------------

// Initialiser le PDF
function loadPDF(url) {
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


// -------------------------------------------- PDF on mobile --------------------------------------------


let scale = window.innerWidth < 600 ? 0.5 : 1.0;  // 0.5 pour mobile, 1.0 pour les écrans plus larges

window.addEventListener('resize', function() {
    scale = window.innerWidth < 600 ? 0.5 : 1.0;
    renderPage(pageNum);  // Redessine la page actuelle avec la nouvelle échelle
});