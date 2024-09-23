// VAR

    const numbers_home = [];
    const face_home = [];
    const numbers_vegas = [];
    const face_vegas = [];
    const numbers_moon = [];
    const face_moon = [];

    for (let a2=0; a2<2; a2++) {numbers_moon.push("1","2","14","15");}
    for (let a3=0; a3<3; a3++) {numbers_home.push("1","2","14","15");numbers_vegas.push("1","2","14","15");numbers_moon.push("3","13");}
    for (let a4=0; a4<4; a4++) {numbers_home.push("3","13");numbers_vegas.push("3","13");numbers_moon.push("4","12");}
    for (let a5=0; a5<5; a5++) {numbers_home.push("14","12");numbers_vegas.push("4","12");numbers_moon.push("5","11");}
    for (let a6=0; a6<6; a6++) {numbers_home.push("5","11");numbers_vegas.push("5","11");numbers_moon.push("6","7","9","10");}
    for (let a7=0; a7<7; a7++) {numbers_home.push("6","10");numbers_vegas.push("6","10");numbers_moon.push("8");face_moon.push("Eau","Astronaute","Planning");}
    for (let a8=0; a8<8; a8++) {numbers_home.push("7","9");numbers_vegas.push("7","9");}
    for (let a9=0; a9<9; a9++) {numbers_home.push("8");face_home.push("Piscine","Agence_interim","N_bis");numbers_vegas.push("8");}
    for (let a14=0; a14<14; a14++) {face_moon.push("Robot","Energie","Plante");}
    for (let a16=0; a16<16; a16++) {face_vegas.push("Inauguration","Construction","Limousine","Spectacle");}
    for (let a17=0; a17<17; a17++) {face_vegas.push("Amelioration");}
    for (let a18=0; a18<18; a18++) {face_home.push("Paysagiste","Agence_immobiliere","Geometre");}

    var card2 = [];

    var num_SVG = [];
    var num_SVG2 = [];
    var SVG = [];
    var SVG2 = [];

    var Deck1 = [];
    var CardList1 = [];
    var Deck2 = [];
    var CardList2 = [];

    var OSName = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Macintosh";
    if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
    if (navigator.userAgent.indexOf("Android") != -1) OSName = "Android";
    if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "iOS";
    console.log("Your OS: " + OSName);

// ----------------------------------------------------------------------


// SETUP

    function option_choosen() {

        document.getElementById("deck").classList.add("hide");
        document.getElementById("setup").classList.add("hide");
        document.getElementById("tirage").classList.add("hide");
        document.getElementById("select_before_rulesbook").classList.remove("hide");
        document.getElementById("select_before_scoreboard").classList.remove("hide");

        document.getElementById("tirage").innerHTML = "";
        card2 = [];

        num_SVG = document.getElementsByClassName("num_SVG");
        num_SVG2 = document.getElementsByClassName("num_SVG2");
        SVG = document.getElementsByClassName("SVG");
        SVG2 = document.getElementsByClassName("SVG2");

        console.log("num_SVG.length = " + num_SVG.length);

        let UsageSelect = document.getElementById("usage_select").value;

        for (let i=0; i<3; i++) {
        num_SVG[i].textContent = "X";
        num_SVG2[i].textContent = "X";
        SVG[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
        SVG2[i].setAttribute("xlink:href", "SVG/Bluecocker.svg");
        }

        if (UsageSelect == "welcome_home") {
            document.getElementById("deck").classList.remove("hide");
            document.getElementById("select_before_rulesbook").classList.add("hide");
            document.getElementById("select_before_scoreboard").classList.add("hide");

            CardList1 = numbers_home;
            CardList2 = face_home;

            refillCards(1);
            refillCards(2);

            if (OSName == "iOS") {
                document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1358077007");
            }
            else if (OSName == "Android") {
                document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcome");
            }
            else {
                document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1358077007");
                document.getElementById("app_link").innerHTML += "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcome");
            }
        }
        else if (UsageSelect == "welcome_vegas") {
            document.getElementById("deck").classList.remove("hide");
            document.getElementById("select_before_rulesbook").classList.add("hide");
            document.getElementById("select_before_scoreboard").classList.add("hide");

            CardList1 = numbers_vegas;
            CardList2 = face_vegas;

            refillCards(1);
            refillCards(2);

            if (OSName == "iOS") {
                document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1507403095");
            }
            else if (OSName == "Android") {
                document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcomevegas");
            }
            else {
                document.getElementById("app_link").innerHTML = "<object type=image/svg+xml data=SVG/App_Store.svg></object>".link("https://apps.apple.com/app/id1507403095");
                document.getElementById("app_link").innerHTML += "<object type=image/svg+xml data=SVG/Google_Play.svg></object>".link("https://play.google.com/store/apps/details?id=com.bluecocker.welcomevegas");
            }
        }
        else if (UsageSelect == "welcome_moon") {
            document.getElementById("deck").classList.remove("hide");
            document.getElementById("select_before_rulesbook").classList.add("hide");

            CardList1 = numbers_moon;
            CardList2 = face_moon;

            refillCards(1);
            refillCards(2);

        }
        else if (UsageSelect == "custom") {
            document.getElementById("setup").classList.remove("hide");
        }
    }

    function custom_setup() {
        let setupCardContent1 = document.getElementById("setup-card-content1").value;
        let setupCards1 = setupCardContent1.split("\n");
        let setupCardContent2 = document.getElementById("setup-card-content2").value;
        let setupCards2 = setupCardContent2.split("\n");
        for (let i1 = 0; i1 < setupCards1.length; i1++) {
            if (setupCards1[i1] == "") {
                setupCards1.splice(i1, 1);
                i1--;
            }
        }
        for (let i2 = 0; i2 < setupCards2.length; i2++) {
            if (setupCards2[i2] == "") {
                setupCards2.splice(i2, 1);
                i2--;
            }
        }

        if (setupCards1.length > 3) {
            CardList1 = [];
            CardList1 = setupCards1.slice();
            CardList2 = [];
            CardList2 = setupCards2.slice();

            console.log("INFO: The following cards were parsed.");
            console.log(CardList1);
            console.log(CardList2);

            document.getElementById("setup").classList.add("hide");
            document.getElementById("deck").classList.remove("hide");

            refillCards(1);
            refillCards(2);
        }
    }

// DRAFT BOTH

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function drawCard() {
        document.getElementById("tirage").classList.remove("hide");

        if (document.getElementById("usage_select").value == "custom") {
            custom_draw();
        }

        else {
            welcome_draw();
        }
    }

// ----------------------------------------------------------------------


// DRAFT WELCOME TO

    function welcome_draw() {    

        if (Deck1.length < 3) {
            refillCards(1);
        }

        if (Deck2.length < 6) {
            refillCards(2);
        }

        let card1 = [];
        let tirage = "<hr /><h4>Tirage :</h4><br/>";

        for (let i = 0; i < 3; i++) {
            card1.push(Deck1.pop());
            card2.push(Deck2.pop());
            card2.push(Deck2.pop());

            num_SVG[i].textContent = card1[0];
            num_SVG2[i].textContent = card1[0];
            SVG[i].setAttribute("xlink:href", "SVG/Perfect_home/Actions_" + card2[0] + ".svg");

            tirage = tirage + card1.shift() + " - " + card2.shift() + "<br/>";
        }

        tirage = tirage + "<br/><hr /><h4>Prochaines cartes :</h4><br/>";

        for (let i2 = 0; i2 < 3; i2++) {
            SVG2[i2].setAttribute("xlink:href", "SVG/Perfect_home/Actions_" + card2[i2] + ".svg");

            tirage = tirage + "xx - " + card2[i2] + "<br/>";
        }

        console.log(tirage);
        //document.getElementById("tirage").innerHTML = tirage;
    }

    function refillCards(Deck) {

        if (Deck == 1) {
            Deck1 = [];
            Deck1 = CardList1.slice();
            Deck1 = shuffle(Deck1);
        }
        else {
            Deck2 = [];
            Deck2 = CardList2.slice();
            Deck2 = shuffle(Deck2);
        }

        if (card2 != []) {
            for (let i = 0; i < 3; i++) {
                let index_del = Deck2.indexOf(card2[0]);
                Deck2.splice(index_del,1);
            }
        }

        console.log("INFO: Deck was refilled and shuffled.");

    }

// ----------------------------------------------------------------------


// DRAFT CUSTOM

    function custom_draw() {
        if (Deck1.length < 3) {
            refillCards(1);
        }

        if (Deck2.length < 3) {
            refillCards(2);
        }

        let card1;
        let card2;
        let tirage = "";

        for (let i = 0; i < 3; i++) {
            card1 = Deck1.pop();
            card2 = Deck2.pop();
            tirage = tirage + card1 + " - " + card2 + "<br/>";
        }

        document.getElementById("tirage").innerHTML = tirage;
        console.log(tirage);
    }

// ----------------------------------------------------------------------