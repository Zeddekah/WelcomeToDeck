// -------------------------------------------- DRAFT WELCOME TO --------------------------------------------

function welcome_draw() {  

    if (Decks[0].length < 3) {
        refillCards(0);
    }

    if (Decks[1].length < 6) {
        refillCards(1);
    }

    let Tirage_Carte_Num = [];
    
console.log("Nombre de cartes détectées (num haut, num bas, Actions svg, Prochaines actions svg) = " + num_SVG.length + "," + num_SVG2.length + "," + Image_SVG.length + "," + Image_SVG2.length);
console.log("Image_SVG carte 1 = " + Image_SVG[0]);
console.log("Image_SVG carte 2 = " + Image_SVG[1]);
console.log("Image_SVG carte 3 = " + Image_SVG[2]);

    
    for (let i = 0; i < 3; i++) {
        
        Tirage_Carte_Num.push(Decks[0].pop());
        num_SVG[i].textContent = Tirage_Carte_Num[i];
        num_SVG2[i].textContent = Tirage_Carte_Num[i];
        
        if (Tirage_Carte_Action.length < 3) {Tirage_Carte_Action.push(Decks[1].pop());}
        Image_SVG[i].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + Tirage_Carte_Action[i] + ".svg");
console.log(Image_SVG[i]);
    }

console.log ("numeros tirés = " + Tirage_Carte_Num);
console.log ("Actions actuelle = " + Tirage_Carte_Action);

    Tirage_Carte_Action = [];
    
    for (let i2 = 0; i2 < 3; i2++) {
        
        Tirage_Carte_Action.push(Decks[1].pop());
        Image_SVG2[i2].setAttribute("xlink:href", "SVG/" + UsageSelect + "/Actions_" + Tirage_Carte_Action[i2] + ".svg");
        
console.log(Image_SVG2[i2]);
    }

console.log ("Actions prochaines = " + Tirage_Carte_Action);

saveAllState(); // Appelez la fonction de sauvegarde
}

function refillCards(num_deck) {
    
    Decks[num_deck] = (num_deck === 0) ? shuffle(selectedOption.cards.numbers.slice()) : shuffle(selectedOption.cards.faces.slice());

console.log(`INFO: Le deck ${num_deck === 0 ? 'de numéros' : 'd\'actions'} a été re-rempli et mélangé.`);

saveAllState(); // Appelez la fonction de sauvegarde
}