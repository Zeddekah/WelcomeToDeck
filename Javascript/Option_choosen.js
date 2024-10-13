// Ouverture de la fonctionnalité en fonction de l'option choisie

function option_choosen() {
    // Tout masquer
    resetPageState();
    resetHide();
    loadAppLink("");
    loadPDF("");

    // Sélection de l'option
    UsageSelect = document.getElementById("usage_select").value;
    
    console.log("options = " + options);
    console.log("UsageSelect = " + UsageSelect);

    
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
    } else if (UsageSelect === "dices") {
        document.getElementById("dices_option_container").classList.remove("hide");
    } else if (UsageSelect === "images") {
        document.getElementById("images_option_container").classList.remove("hide");
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
            "iOS": '<a href="' + selectedOption.app.ios + '" target="_blank"><img src="SVG/App_Store.svg" alt="App Store" class="width_200"></a>',
            "Android": '<a href="' + selectedOption.app.android + '" target="_blank"><img src="SVG/Google_Play.svg" alt="Google Play" class="width_200"></a>'
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