document.addEventListener("DOMContentLoaded", () => {
    const addDiceButton = document.getElementById("addDiceButton");
    const rerollButton = document.getElementById("rerollButton");
    const existingContainer = document.getElementById("existingContainer");
    const diceSelectors = document.getElementById("diceSelectors");

    let diceCount = 0;

    // Fonction pour générer un dé
    function createDice() {
        // Conteneur pour le sélecteur et le bouton de suppression
        const diceDiv = document.createElement("div");
        diceDiv.classList.add("dice");

        // Sélecteur pour le type de dé
        const select = document.createElement("select");
        const types = [4, 6, 8, 10, 12, 20, 100];
        types.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = `${type} faces`;
            select.appendChild(option);
        });

        // Définir le type par défaut à 6 faces
        select.value = 6; // Met à jour la valeur affichée à 6 faces

        // SVG pour le dé
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "dice-svg");
        svg.setAttribute("data-type", 6); // Par défaut à 6 faces
        svg.setAttribute("viewBox", "0 0 100 100");

        // Afficher le dé initial
        updateDiceSVG(svg, 6);

        // Mettre à jour le dé quand le type change
        select.addEventListener("change", (event) => {
            const type = parseInt(event.target.value);
            svg.setAttribute("data-type", type);
            updateDiceSVG(svg, type);
        });

        // Bouton pour supprimer le dé
        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.className = "close-button";
        closeButton.onclick = () => {
            // Supprimer le sélecteur et le dé
            diceSelectors.removeChild(diceDiv); // Supprimer tout le conteneur contenant le sélecteur et le bouton
            existingContainer.removeChild(svg); // Supprimer le dé
        };

        // Ajouter le sélecteur et le bouton de fermeture au conteneur
        diceDiv.appendChild(select);
        diceDiv.appendChild(closeButton);
        diceSelectors.appendChild(diceDiv); // Ajouter le conteneur (avec le sélecteur et le bouton) au diceSelectors
        existingContainer.appendChild(svg); // Ajouter le dé au conteneur de dés
        diceCount++;
    }

    // Met à jour le SVG en fonction du type de dé
    function updateDiceSVG(svg, type) {
        svg.innerHTML = getDiceShape(type);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "50");
        text.setAttribute("y", "55"); // Centrer verticalement
        text.textContent = type; // Afficher le type du dé

        svg.appendChild(text);
    }

    // Fonction pour obtenir la forme du dé
    function getDiceShape(type) {
        switch (type) {
            case 4:
                return `<polygon points="50,5 95,100 5,100" fill="#fff" stroke="#000"/>`;
            case 6:
                return `<rect width="100" height="100" fill="#fff" stroke="#000"/>`;
            case 8:
                return `<polygon points="50,5 90,35 70,95 30,95 10,35" fill="#fff" stroke="#000"/>`;
            case 10:
                return `<polygon points="50,5 95,35 75,95 25,95 5,35" fill="#fff" stroke="#000"/>`;
            case 12:
                return `<polygon points="50,5 85,25 100,50 85,75 50,95 15,75 0,50 15,25" fill="#fff" stroke="#000"/>`;
            case 20:
                return `<polygon points="50,5 95,25 100,50 95,75 50,95 5,75 0,50 5,25" fill="#fff" stroke="#000"/>`;
            case 100:
                return `<circle cx="50" cy="50" r="50" fill="#fff" stroke="#000"/>`;
            default:
                return `<rect width="100" height="100" fill="#fff" stroke="#000"/>`;
        }
    }

    // Fonction pour lancer les dés
    function rerollDice() {
        const dices = existingContainer.querySelectorAll(".dice-svg");
        dices.forEach(dice => {
            const type = parseInt(dice.getAttribute("data-type"));
            const value = Math.floor(Math.random() * type) + 1;
            const textElement = dice.querySelector("text");
            textElement.textContent = value; // Met à jour la valeur
        });
    }

    // Gestion de l'événement pour ajouter un dé
    addDiceButton.addEventListener("click", createDice);

    // Gestion de l'événement pour lancer les dés
    rerollButton.addEventListener("click", rerollDice);
});