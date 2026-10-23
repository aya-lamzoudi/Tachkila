
// affichage de popup
const formmsg = document.querySelector("#form-err");

const ajoute = document.querySelector(".add-btn");
const hidepopup = document.querySelector("#popnone");
const annuler = document.querySelector(".annuler")
ajoute.addEventListener("click", togglepopup);
hidepopup.addEventListener("click", togglepopup);
annuler.addEventListener("click", togglepopup);

function togglepopup() {
    console.log("test")
    document.querySelector("#hide").classList.toggle("hidden");
}


//ajouter d'un jouer
const addform = document.querySelector("#addplayer");
//validation de input:

addform.addEventListener("input", function (event) {

    if (event.target.id == "name") {
        validatename;
    } else if (event.target.id == "nbr") {
        validatenbr;
    } else if (event.target.id = "postes") {
        validatepost;
    }

})

function validatename() {
    let name = document.querySelector("#name").value.trim();
    let error = document.querySelector("#name-err");

    if (name === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        error.innerText = "this flied should containe just a letters";
    } else {
        error.innerText = "";
    }
}
function validatenbr() {
    let nbr = document.querySelector("#nbr").value.trim();
    let error = document.querySelector("#nbr-err");

    if (nbr === "") {
        error.innerText = "this champt should not be empty";
    } else if (!/^[1-9][0-9]?$/.test(nbr)) {
        error.innerText = "plese enter a number between 1 & 99";
    } else {
        error.innerText = "";
    }
}
function validatepost() {
    const poste = addform.querySelector(
        'input[name="poste"]:checked'
    );
    const flied = document.querySelector("#flied-err");

    if (!poste) {
        flied.innerText = "Choisissez un poste";
        return;
    } else {
        flied.innerText = "";
    }

}

//tableau pour stocker players
let players = [];


//button de modification

document.querySelector("#modpopup").addEventListener("click", toggleUpdatePopup);
document.querySelector("#updatenon").addEventListener("click", toggleUpdatePopup);
document.querySelector("#updateannuler").addEventListener("click", toggleUpdatePopup);
function toggleUpdatePopup() {
    document.querySelector("#update").classList.toggle("hidden");
}

// event lisner

function addplayer(player) {
    let newplayer = document.querySelector("#playerlist").cloneNode(true);
    newplayer.querySelector("#playername").innerText = player.nom;
    newplayer.querySelector(".player-position").innerText = player.post;
    //add color

    if (player.post == "Attaquant") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#d75241]");
        newplayer.querySelector(".player-card").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-number").classList.toggle("border-[#d75241]");
        newplayer.querySelector(".player-number").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-position").classList.toggle("text-[#d75241]");
        newplayer.querySelector(".player-position").classList.toggle("text-orange-400");
    } else if (player.post == "Milieu") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#20d244]",);
        newplayer.querySelector(".player-card").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-number").classList.toggle("border-[#20d244]");
        newplayer.querySelector(".player-number").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-position").classList.toggle("text-[#20d244]");
        newplayer.querySelector(".player-position").classList.toggle("text-orange-400");
    } else if (player.post == "Defenseur") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#3AC8EF]");
        newplayer.querySelector(".player-card").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-number").classList.toggle("border-[#3AC8EF]");
        newplayer.querySelector(".player-number").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-position").classList.toggle("text-[#3AC8EF]");
        newplayer.querySelector(".player-position").classList.toggle("text-orange-400");
    }
    /////
    newplayer.querySelector(".player-number").innerText = player.numero;
    newplayer.classList.toggle("hidden");
    document.querySelector(".sidecontainer").appendChild(newplayer);
    document.querySelector("#name").value = "";
    document.querySelector("#nbr").value = "";
    let mod = document.querySelectorAll("#modpopup");
    let no = document.querySelectorAll("#updatenon");
    let ann = document.querySelectorAll("#updateannuler");
    mod.forEach(m => {
        m.addEventListener("click", toggleUpdatePopup);
    });
    no.forEach(n => {
        n.addEventListener("click", toggleUpdatePopup);
    });
    ann.forEach(a => {
        a.addEventListener("click", toggleUpdatePopup);
    });


}

addform.addEventListener("submit", function (event) {
    event.preventDefault();

    validatename();
    validatenbr();
    validatepost()
    //get the value of input radio & stock it
    let value = document.querySelector(
        'input[name="poste"]:checked'
    )?.value;

    let errors = document.querySelectorAll(".message");
    let haserror = false;
    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });
    if (!haserror) {
        let player = {
            // id: players.length++,
            nom: document.querySelector("#name").value,
            post: value,
            numero: document.querySelector("#nbr").value,
            // position: function de slect;

        }
        players.push(player);

        addplayer(player);
        togglepopup();
    }

})

function removeplayer() {

}