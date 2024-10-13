// PDF VIEWER

// Déclaration de l'URL par défaut
const default_url = ""; // Remplacez par l'URL de votre fichier PDF par défaut si nécessaire

// Importation de pdfjsLib depuis le fichier pdf.mjs
import * as pdfjsLib from 'https://mozilla.github.io/pdf.js/build/pdf.mjs';

// Configuration du worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs';

// Variables globales pour le document PDF et la page
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
const scale = 0.8;
const canvas = document.getElementById('the-canvas');
let ctx;

// Vérifier si l'élément canvas est présent
if (canvas) {
    ctx = canvas.getContext('2d');
} else {
    console.error('Canvas element with id "the-canvas" not found.');
}

// Fonction pour rendre une page
const renderPage = async (num) => {
    pageRendering = true;
    try {
        const page = await pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = { canvasContext: ctx, viewport: viewport };
        await page.render(renderContext).promise;

        pageRendering = false;
        if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
        }
    } catch (error) {
        console.error('Error rendering page: ', error);
    }
    document.getElementById('page_num').textContent = num;
};

// Fonction pour mettre en file d'attente le rendu d'une page
const queueRenderPage = (num) => {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
};

// Fonction pour afficher la page précédente
const onPrevPage = () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
};

// Fonction pour afficher la page suivante
const onNextPage = () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
};

// Fonction pour charger ou supprimer le PDF
const Charge_PDF = async (url) => {
    // Réinitialiser le PDF
    if (!url) {
        pdfDoc = null; // Réinitialise le document PDF
        pageNum = 1; // Réinitialise le numéro de page
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
        document.getElementById('page_count').textContent = '0'; // Mettre à jour le compteur de pages
        document.getElementById('page_num').textContent = '0'; // Mettre à jour le numéro de page
        document.getElementById('pdf-container').style.display = 'none'; // Cache le conteneur
        return; // Sortir si aucune URL n'est fournie
    }

    try {
        pdfDoc = await pdfjsLib.getDocument(url).promise;
        document.getElementById('page_count').textContent = pdfDoc.numPages;
        renderPage(1);
        document.getElementById('pdf-container').style.display = 'block'; // Affiche le conteneur
    } catch (error) {
        console.error('Error loading PDF: ', error);
    }
};

// Fonction pour charger un nouveau PDF en fonction de la sélection
const newPDF = () => {
    const usageSelect = document.getElementById("usage_select").value;
    switch (usageSelect) {
        case "welcome_home":
            Charge_PDF("PDF/welcome-to-your-perfect-home-regle.pdf");
            break;
        case "welcome_vegas":
            Charge_PDF("PDF/welcome-to-new-las-vegas-regle.pdf");
            break;
        case "welcome_moon":
            Charge_PDF("PDF/welcome-to-the-moon-regle.pdf");
            break;
        default:
            Charge_PDF(""); // Supprime le PDF si aucune option valide n'est sélectionnée
            console.error('No valid PDF selected, clearing the PDF.');
    }
};

// Charger le PDF par défaut si spécifié
if (default_url) {
    Charge_PDF(default_url);
}

// Événements pour les boutons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("option_list_button").addEventListener("click", newPDF);
});