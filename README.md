# Welcome To Deck

"Welcome To Deck" est une application web permettant de jouer à des jeux de société comme *Welcome To* sans avoir besoin de cartes physiques, avec des options supplémentaires comme l'utilisation de dés ou d'images.

## Fonctionnalités

- **Jeu sans cartes** : Permet de jouer à différents jeux de la série *Welcome To* en tirant des cartes virtuelles.
- **Options personnalisées** : Possibilité de personnaliser les cartes tirées ou d'ajouter de nouveaux éléments comme des dés ou des images.
- **Affichage de PDF** : Intégration d'un visualiseur de PDF pour afficher les livrets de règles.
- **Gestion de plusieurs decks** : Vous pouvez configurer et gérer plusieurs decks pour personnaliser encore plus votre expérience de jeu.
- **Sauvegarde de l'état de la page** : L'état de la page est sauvegardé automatiquement dans une base de donnée IndexedDB. Un bouton "Réinitialiser les configurations" est présent pour reinitialiser l'état de la page.

## Prérequis

- Un navigateur moderne (Chrome, Firefox, Edge) supportant ES6 et `IndexedDB`.

## Installation

Vous avez deux options pour utiliser l'application : soit en ligne via l'URL publique, soit en local en clonant le dépôt.

### 1. Utilisation en ligne

Vous pouvez accéder à l'application directement via l'URL suivante :  
https://zeddekah.github.io/WelcomeToDeck/

### 2. Installation locale

1. Clonez ce dépôt sur votre machine locale :

    ```bash
    git clone https://github.com/zeddekah/WelcomeToDeck.git
    cd WelcomeToDeck
    ```

2. Ouvrez le fichier `index.html` dans votre navigateur.

## Utilisation

1. Sélectionnez une option dans le formulaire de choix (par exemple : *Welcome to your perfect home*, *Welcome to Vegas*, *Custom*, etc.).
2. Cliquez sur "Sélectionner" pour confirmer l'option.
3. Pour les options spécifiques :
   - **Welcome** : Cliquez sur "Draw a card" pour tirer une carte virtuelle.
   - **Custom** : Créez des decks avec un contenu texte personnalisé, puis cliquez sur "Draw a card" pour tirer une carte virtuelle.
   - **Dés** : Ajoutez des dés et cliquez sur "Générer un nouveau tirage".
   - **Images** : Importez des images et cliquez sur "Afficher une image aléatoire".

## Structure du Projet

- **HTML** : Le fichier principal est `index.html`, qui structure la page web.
- **CSS** : Le fichier `styles.css` gère la mise en page et le style visuel.
- **JavaScript** : Les fichiers JavaScript gèrent la logique de l'application :
  - `main.js` : Contrôle la logique principale.
  - `Option_choosen.js`, `Welcome.js`, `Custom.js` : Scripts spécifiques aux options de jeu.
  - `Dices.js` : Gère les tirages de dés.
  - `Images.js` : Gère l'affichage aléatoire d'images.
  - `IndexedDB.js` : Gère le stockage dans la base de données locale `IndexedDB`.
  - `PDF_Viewer.js` : Permet de charger et visualiser des fichiers PDF via [Mozilla PDF.js](https://mozilla.github.io/pdf.js/).

## Crédits

- **Virtudeck** : Inspiré par le projet [Virtudeck de pwlinkas](https://github.com/pwlinkas/virtudeck).
- **Design des cartes** : Basé sur des vecteurs libres de [Freepik](https://fr.freepik.com).

## Licence

Ce projet est sous licence MIT. Veuillez consulter le fichier `LICENSE` pour plus de détails.

## Remerciements

Ce fichier README et certaines parties de code ont été créées avec l'aide de [ChatGPT](https://openai.com/chatgpt).
