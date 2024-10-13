document.addEventListener('DOMContentLoaded', () => {
  let customDeckContent = [];
  let previousDrawMode = toggleDrawMode.checked; // Garde une trace de l'état précédent du toggle

  // Regroupe les éléments communs
  const modifyAndDrawElements = [modifyDecksButton, drawSection];

  // Affichage des champs de configuration des decks
  configureDecksButton.addEventListener('click', () => {
    (modifyAndDrawElements).forEach(element => {
      toggleVisibility(element,false);
    });
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
    toggleVisibility(deckConfiguration,true);
  });

  // Génération des decks
  generateDecksButton.addEventListener('click', () => {
    customDeckContent = [];
    const numDecks = parseInt(numDecksInput.value, 10);
    for (let i = 0; i < numDecks; i++) {
      const cards = document.getElementById(`deck${i}`).value.split('\n').filter(card => card.trim() !== '');

      customDeckContent.push({
        originalCards: [...cards], // Sauvegarder une copie complète du deck original
        cards: shuffle(cards), // Utilisation de la fonction shuffle
        drawCount: parseInt(document.getElementById(`drawCount${i}`).value, 10),
        drawn: []
      });
    }
    drawnCardsContainer.innerHTML = ''; // Réinitialisation du conteneur
    toggleVisibility(deckConfiguration,false);
    
    (modifyAndDrawElements).forEach(element => {
        toggleVisibility(element,true);
    });
  });

  // Modification des decks
  modifyDecksButton.addEventListener('click', () => {
    toggleVisibility(deckConfiguration,true);
    (modifyAndDrawElements).forEach(element => {
        toggleVisibility(element,false);
    });
  });

  // Écouteur pour le changement du toggle avec confirmation
  toggleDrawMode.addEventListener('change', () => {
    if (confirm("Changer le mode de tirage remélangera le deck. Voulez-vous continuer ?")) {
      // Si l'utilisateur confirme, remélanger les cartes dans chaque deck
      customDeckContent.forEach(deck => {
        deck.cards = shuffle([...deck.cards, ...deck.drawn]); // Mélanger toutes les cartes (tirées et non tirées)
        deck.drawn = []; // Réinitialiser les cartes tirées
      });
      previousDrawMode = toggleDrawMode.checked; // Mettre à jour l'état précédent
    } else {
      // Si l'utilisateur annule, restaurer l'état précédent du toggle
      toggleDrawMode.checked = previousDrawMode;
    }
  });

  // Tirage des cartes
  customDrawButton.addEventListener('click', () => {
    drawnCardsContainer.innerHTML = ''; // Effacer les cartes précédemment tirées
    customDeckContent.forEach((deck, index) => {
      const deckCardsDiv = document.createElement('div');
      deckCardsDiv.innerHTML = `<strong>Deck ${index + 1}</strong>`;
      drawnCardsContainer.appendChild(deckCardsDiv);

      if (deck.cards.length === 0 && !toggleDrawMode.checked) { // Tirage sans remise, deck vide
        const emptyMessage = document.createElement('p');
        emptyMessage.innerText = `Le deck ${index + 1} est vide. Mélangez-le pour continuer.`;

        // Ajout d'un bouton pour remélanger le deck
        const shuffleButton = document.createElement('button');
        shuffleButton.innerText = `Remélanger le deck ${index + 1}`;
        shuffleButton.addEventListener('click', () => {
          // Remettre toutes les cartes à l'état original et les mélanger
          deck.cards = shuffle([...deck.originalCards]);
          deck.drawn = []; // Réinitialiser les cartes tirées
          emptyMessage.remove(); // Retirer le message de deck vide
          shuffleButton.remove(); // Retirer le bouton de remélange
        });

        drawnCardsContainer.appendChild(emptyMessage);
        drawnCardsContainer.appendChild(shuffleButton);
      } else {
        const drawMessage = document.createElement('p'); // Créer un élément <p> unique pour contenir tous les tirages
        for (let i = 0; i < deck.drawCount; i++) {
          if (toggleDrawMode.checked) {
            // Mode de tirage avec remise, tirer au hasard de originalCards
            const drawnCard = deck.originalCards[Math.floor(Math.random() * deck.originalCards.length)];
            drawMessage.innerHTML += `Tirage ${i + 1} = ${drawnCard}<br />`;
          } else {
            // Mode de tirage sans remise, retirer la carte du deck
            if (deck.cards.length > 0) {
              const drawnCard = deck.cards.shift(); // Retire la première carte du deck
              deck.drawn.push(drawnCard); // Ajoute cette carte à la liste des cartes tirées
              drawMessage.innerHTML += `Tirage ${i + 1} = ${drawnCard}<br />`;
            }
          }
        }

        deckCardsDiv.appendChild(drawMessage); // Ajouter l'élément <p> au div
      }
    });
  });

  // Fonction de mélange
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});