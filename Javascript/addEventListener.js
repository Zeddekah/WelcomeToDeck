document.addEventListener('DOMContentLoaded', function () {
    
    // Bouton selection liste déroulante
    const optionButton = document.getElementById('option_list_button');
    if (optionButton) {
        optionButton.addEventListener('click', function() {
            event.preventDefault();  // Empêche le rechargement de la page
            option_choosen();
        });
    }

    // Réinitialiser l'état de la page lorsque le bouton de réinitialisation est cliqué
    const resetStateButton = document.getElementById("resetStateButton");
    resetStateButton.addEventListener("click", function() {
        resetPageState("Y");
    });
    
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
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Empêche le comportement par défaut du lien
                openModal(targetId);
            });
        }
    }

    // Fonction pour ouvrir un modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show'); // Utilise la classe pour afficher le modal
            modal.setAttribute('aria-hidden', 'false'); // Accessibilité : indique que le modal est visible
        }
    }

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
            const modal = document.getElementById(modalId);
            modal.classList.remove('show'); // Utilise la classe pour masquer le modal
            modal.setAttribute('aria-hidden', 'true'); // Accessibilité : indique que le modal est masqué
        }
    }

    // Listeners pour chaque lien
    ['rulesbook_link', 'scoreboard_link', 'credits_link'].forEach(linkId => {
        const targetId = linkId.replace('_link', ''); // Remplace "_link" par "" pour obtenir l'ID de modal
        addLinkClickListener(linkId, targetId);
    });

    // Listeners pour chaque modal
    ['rulesbook', 'scoreboard', 'credits'].forEach(addModalClickListener);
});