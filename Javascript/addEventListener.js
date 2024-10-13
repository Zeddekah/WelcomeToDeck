document.addEventListener('DOMContentLoaded', function () {
    
    // Bouton selection liste déroulante
    optionListButton.addEventListener('click', function() {
        event.preventDefault();  // Empêche le rechargement de la page
        option_choosen();
    });

    // Réinitialiser l'état de la page lorsque le bouton de réinitialisation est cliqué
    resetStateButton.addEventListener("click", function() {
        resetPageState(true);
    });
    
    // Bouton draw (Welcome)
    welcomeDrawButton.addEventListener('click', function() {
        event.preventDefault();  // Empêche le rechargement de la page
        welcome_draw();
    });

    
    // Gestion des modals

    // Liste des liens et modals correspondants
    const modalLinks = ['rulesbook', 'scoreboard', 'credits'];

    // Initialisation des listeners pour chaque lien et modal
    modalLinks.forEach(id => {
        const linkElement = document.getElementById(`${id}_link`);
        const modalElement = document.getElementById(`${id}_modal`);

        if (linkElement && modalElement) {
            // Ajout du listener pour ouvrir le modal au clic du lien
            linkElement.addEventListener('click', (event) => {
                event.preventDefault();
                toggleModal(modalElement, true);
            });

            // Ajout du listener pour fermer le modal en cliquant en dehors du contenu
            modalElement.addEventListener('click', (event) => {
                const modalContent = modalElement.querySelector('.content');
                if (!modalContent.contains(event.target)) {
                    toggleModal(modalElement, false);
                }
            });
        }
    });

    // Fonction pour ouvrir ou fermer un modal
    function toggleModal(modalElement, open) {
        modalElement.classList.toggle('show', open); // Ajoute ou retire la classe 'show'
        modalElement.setAttribute('aria-hidden', !open); // Met à jour l'attribut 'aria-hidden'
    }
});