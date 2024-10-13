// État d'origine "hide" des éléments + réinitialisation
const originalState = [];

// Initialisation : stocke l'état d'origine lors du chargement de la page
document.querySelectorAll('div').forEach((element) => {
    originalState.push({
        element: element,
        isVisible: !element.classList.contains('hide') // true si visible, false sinon
    });
});

// Fonction pour réinitialiser l'état à l'état d'origine
function resetHide() {
    originalState.forEach(({ element, isVisible }) => {
        toggleVisibility(element, isVisible);
    });
}

// IndexedDB - Ouvrir la base de données
let db;

function openDatabase() {
    let request = indexedDB.open("pageDatabase", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("pageState", { keyPath: "id" });
        console.log("Base de données créée");
    };

    request.onsuccess = function (event) {
        db = event.target.result; // Assure que db est correctement assigné
        console.log("Base de données IndexedDB ouverte avec succès");

        // Restaure l'état une fois la base de données ouverte avec succès
        restoreAllState();
    };

    request.onerror = function (event) {
        console.error("Erreur lors de l'ouverture de la base de données IndexedDB :", event.target.error);
    };
}

// IndexedDB - Sauvegarder l'état
function saveAllState() {
    const state = {
        id: "pageState", // Clé pour l'object store
        variables: {
            Decks,
            Tirage_Carte_Action
        },
        elements: {
            actuelles_cartes_svg: currentCardsContainer.innerHTML,
            prochaines_cartes_svg: nextCardsContainer.innerHTML,
            usage_select_value: usageSelect.value
        },
        hides: {}
    };

    // Sauvegarder les états "hide" des éléments
    document.querySelectorAll("*").forEach((element) => {
        if (element.id) {
            state.hides[element.id] = element.classList.contains("hide");
        }
    });

    let transaction = db.transaction(["pageState"], "readwrite");
    let objectStore = transaction.objectStore("pageState");

    let request = objectStore.put(state); // Utilisez 'put' pour insérer ou mettre à jour

    request.onsuccess = function () {
        console.log("État sauvegardé dans IndexedDB");
    };

    request.onerror = function (event) {
        console.error("Erreur lors de la sauvegarde de l'état:", event.target.error);
    };
}

// IndexedDB - Restaurer l'état
function restoreAllState() {
    let transaction = db.transaction(["pageState"], "readonly");
    let objectStore = transaction.objectStore("pageState");

    let request = objectStore.get("pageState"); // Récupère l'objet par sa clé

    request.onsuccess = function (event) {
        const state = event.target.result;

        if (state) {
            // Restauration des variables
            usageSelect.value = state.elements.usage_select_value;

            if (options[state.elements.usage_select_value]) {
                Decks = state.variables.Decks;
                Tirage_Carte_Action = state.variables.Tirage_Carte_Action;
                currentCardsContainer.innerHTML = state.elements.actuelles_cartes_svg;
                nextCardsContainer.innerHTML = state.elements.prochaines_cartes_svg;
            } else if (options === "custom") {
                // Logique personnalisée ici
            } else if (options === "dices") {
                // Logique des dés ici
            } else if (options === "images") {
                // Logique d'images ici
            }

            // Appliquer les classes 'hide' sauvegardées
            for (let id in state.hides) {
                let element = document.getElementById(id);
                if (element) {
                    toggleVisibility(element, !state.hides[id]); // toggleVisibility gère l'état visible/caché
                }
            }
            console.log("État restauré depuis IndexedDB");
        } else {
            console.log("Rien à restaurer depuis IndexedDB");
        }
    };

    request.onerror = function (event) {
        console.error("Erreur lors de la restauration de l'état:", event.target.error);
    };
}

// Fonction pour réinitialiser l'état de la page dans IndexedDB
function resetPageState(refreshPage = false) {
    const transaction = db.transaction(["pageState"], "readwrite");
    const objectStore = transaction.objectStore("pageState");

    objectStore.delete("pageState").onsuccess = function () {
        console.log("État réinitialisé dans IndexedDB");

        // Recharge la page après la réinitialisation
        if (refreshPage) {
            location.reload(); 
        }
    };

    objectStore.delete("pageState").onerror = function (event) {
        console.error("Erreur lors de la réinitialisation:", event.target.error);
    };
}

// Ouvrir la base de données dès que le script est chargé
openDatabase();