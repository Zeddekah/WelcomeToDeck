// IndexedDB - Ouvrir la base de données
let db;

function openDatabase() {
    let request = indexedDB.open('pageDatabase', 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        db.createObjectStore('pageState', { keyPath: 'id' });
        console.log("Base de données créée");
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Base de données ouverte avec succès");

        // Restaure l'état une fois la base de données ouverte avec succès
        restoreAllState();
    };

    request.onerror = function(event) {
        console.error("Erreur lors de l'ouverture de la base de données:", event.target.error);
    };
}

// IndexedDB - Sauvegarder l'état
function saveAllState() {
    const state = {
        id: 'pageState', // Clé pour l'object store
        variables: {
            Decks,
            Tirage_Carte_Action
        },
        elements: {
            actuelles_cartes_svg: document.getElementById('actuelles_cartes_svg_container').innerHTML,
            prochaines_cartes_svg: document.getElementById('prochaines_cartes_svg_container').innerHTML,
            usage_select_value: document.getElementById("usage_select").value
        },
        hides: {}
    };

    // Sauvegarder les états "hide" des éléments
    document.querySelectorAll('*').forEach(element => {
        if (element.id) {
            state.hides[element.id] = element.classList.contains('hide');
        }
    });

    let transaction = db.transaction(['pageState'], 'readwrite');
    let objectStore = transaction.objectStore('pageState');
    
    let request = objectStore.put(state); // Utilisez 'put' pour insérer ou mettre à jour

    request.onsuccess = function() {
        console.log("État sauvegardé dans IndexedDB");
    };

    request.onerror = function(event) {
        console.error("Erreur lors de la sauvegarde de l'état:", event.target.error);
    };
}

// IndexedDB - Restaurer l'état
function restoreAllState() {
    let transaction = db.transaction(['pageState'], 'readonly');
    let objectStore = transaction.objectStore('pageState');

    let request = objectStore.get('pageState'); // Récupère l'objet par sa clé

    request.onsuccess = function(event) {
        const state = event.target.result;
        
        if (state) {
            // Restauration des variables
            document.getElementById("usage_select").value = state.elements.usage_select_value;
            option_choosen();

            if (options[state.elements.usage_select_value]) {
                Decks = state.variables.Decks;
                Tirage_Carte_Action = state.variables.Tirage_Carte_Action;

                document.getElementById('actuelles_cartes_svg_container').innerHTML = state.elements.actuelles_cartes_svg;
                document.getElementById('prochaines_cartes_svg_container').innerHTML = state.elements.prochaines_cartes_svg;
            }

            // Appliquer les classes 'hide' sauvegardées
            for (let id in state.hides) {
                let element = document.getElementById(id);
                if (element) {
                    if (state.hides[id]) {
                        element.classList.add('hide');
                    } else {
                        element.classList.remove('hide');
                    }
                }
            }
        }
        console.log("État restauré depuis IndexedDB");
    };

    request.onerror = function(event) {
        console.error("Erreur lors de la restauration de l'état:", event.target.error);
    };
}

// Fonction pour réinitialiser l'état de la page dans IndexedDB
function resetPageState() {
    let transaction = db.transaction(['pageState'], 'readwrite');
    let objectStore = transaction.objectStore('pageState');
    
    let request = objectStore.delete('pageState'); // Supprime l'état sauvegardé

    request.onsuccess = function() {
        console.log("État réinitialisé dans IndexedDB");
        location.reload(); // Recharge la page après la réinitialisation
    };

    request.onerror = function(event) {
        console.error("Erreur lors de la réinitialisation:", event.target.error);
    };
}

// Ouvrir la base de données dès que le script est chargé
openDatabase();

// Sauvegarder l'état de la page avant de quitter
window.addEventListener('beforeunload', function(event) {
    saveAllState(); // Sauvegarde l'état dans IndexedDB avant de quitter
    event.preventDefault(); // Annule l'événement
    event.returnValue = ''; // Affiche une boîte de dialogue de confirmation (selon les navigateurs)
});

// Réinitialiser l'état de la page lorsque le bouton de réinitialisation est cliqué
document.getElementById('resetButton').addEventListener('click', resetPageState);