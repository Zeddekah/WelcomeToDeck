let allImages = [];  // Toutes les images chargées
let availableImages = [];  // Images encore disponibles pour l'affichage
let displayedImages = [];  // Images déjà affichées
let removeAfterDisplay = false;  // Option pour ne pas réutiliser les images

const fileInput = document.getElementById('fileInput');
const imageDisplay = document.getElementById('imageDisplay');
const randomImageButton = document.getElementById('randomImageButton');
const toggleRemove = document.getElementById('toggleRemove');
const imageResetButton = document.getElementById('imageResetButton');
const divReset = document.getElementById('divReset');
const buttonContainer = document.getElementById('buttonContainer');

// Fonction pour réinitialiser l'affichage de l'image
function resetImageDisplay() {
    // Image transparente en base64
    const transparentImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    
    imageDisplay.src = transparentImage;  // Remettre une image transparente
    imageDisplay.alt = 'Aucune image sélectionnée';  // Texte alternatif par défaut
}

// Fonction pour afficher une image aléatoire
function displayRandomImage() {
    if (availableImages.length === 0) {
        if (removeAfterDisplay) {
            // Toutes les images ont été affichées, on remplace le bouton
            randomImageButton.classList.add('hide');  // Masquer le bouton aléatoire
            divReset.classList.remove('hide');  // Montrer le bouton de réinitialisation et le message
            return;
        }
        availableImages = [...allImages];  // Réinitialiser la liste d'images disponibles
    }

    // Choisir une image aléatoire parmi celles disponibles
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const imageToDisplay = availableImages[randomIndex];

    // Afficher l'image
    imageDisplay.src = URL.createObjectURL(imageToDisplay);

    // Si l'option "ne pas réutiliser" est cochée, retirer l'image de la liste des disponibles
    if (removeAfterDisplay) {
        displayedImages.push(imageToDisplay);
        availableImages.splice(randomIndex, 1);
    }

    // Si toutes les images ont été affichées et qu'on ne réutilise pas les images, remplacer le bouton
    if (removeAfterDisplay && availableImages.length === 0) {
        randomImageButton.classList.add('hide');  // Masquer le bouton aléatoire
        divReset.classList.remove('hide');  // Montrer le bouton de réinitialisation et le message
    }
}

// Gérer l'événement de sélection des fichiers
fileInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
        allImages = files;  // Stocker les images
        availableImages = [...allImages];  // Initialiser la liste d'images disponibles
        randomImageButton.disabled = false;  // Activer le bouton d'affichage
        randomImageButton.classList.remove('hide');  // Montrer le bouton aléatoire
        divReset.classList.add('hide');  // Masquer le conteneur de réinitialisation
        resetImageDisplay();  // Réinitialiser l'affichage de l'image
    }
});

// Gérer l'affichage aléatoire des images
randomImageButton.addEventListener('click', displayRandomImage);

// Gérer le bouton toggle pour activer/désactiver le retrait après affichage
toggleRemove.addEventListener('change', () => {
    const userConfirmed = confirm("Changer cette option va remélanger toutes les images. Voulez-vous continuer ?");
    if (userConfirmed) {
        removeAfterDisplay = toggleRemove.checked;

        // Remélanger le deck des images
        availableImages = [...allImages];  // Remise à zéro des images disponibles
        displayedImages = [];  // Remise à zéro des images affichées

        randomImageButton.classList.remove('hide');  // Montrer le bouton aléatoire
        divReset.classList.add('hide');  // Masquer le conteneur de réinitialisation
        resetImageDisplay();  // Réinitialiser l'affichage de l'image
    } else {
        // Si l'utilisateur annule, on remet l'option à son état précédent
        toggleRemove.checked = removeAfterDisplay;
    }
});

// Gérer le bouton de réinitialisation du tirage
imageResetButton.addEventListener('click', () => {
    availableImages = [...allImages];  // Réinitialiser les images disponibles
    displayedImages = [];  // Réinitialiser les images déjà affichées
    randomImageButton.classList.remove('hide');  // Montrer le bouton aléatoire
    divReset.classList.add('hide');  // Masquer le conteneur de réinitialisation
    resetImageDisplay();  // Réinitialiser l'affichage de l'image
});