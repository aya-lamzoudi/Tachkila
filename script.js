let players = JSON.parse(localStorage.getItem("players")) || [];
players.forEach(player => {
    addplayer(player);
});

// declaration


const addbtn = document.querySelector(".add-btn");
const popup = document.querySelector(".modal");
const form = document.querySelector("#addplayer")

//affiche && close pop-up

document.querySelector(".add-player-btn").addEventListener("click", togglepopup);
popup.addEventListener("click", function (event) {
    if (event.target.id == "close-btn" || event.target.id == "popup-cancel") {
        togglepopup();
    }
})

//function

// -affichage de popup
function togglepopup() {
    console.log("test");
    document.querySelector("#popup").classList.toggle("hidden");
}

//validate functions

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
        error.innerText = "This field should not be empty";
    } else if (!/^[1-9][0-9]?$/.test(nbr)) {
        error.innerText = "This number is invalid";
    } else if (players.some(player => player.numero == nbr)) {
        error.innerText = "This number already exists";
    } else {
        error.innerText = "";
    }
}

function validatepost() {
    const poste = popup.querySelector(
        'input[name="poste"]:checked'
    );
    const error = document.querySelector("#flied-err");

    if (!poste) {
        error.innerText = "Choisissez un poste";
        return;
    } else {
        error.innerText = "";

    }
}

// add player

function addplayer(player) {
    let newplayer = document.querySelector("#playerlist").cloneNode(true);
    newplayer.querySelector(".player-number").innerText = player.numero;
    newplayer.querySelector(".player-name").innerText = player.nom;
    newplayer.querySelector(".player-poste").innerText = player.post;
    //add color

    if (player.post == "Attaquant") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#d75241]");
        newplayer.querySelector(".player-number").classList.toggle("border-[#d75241]");
        newplayer.querySelector(".player-poste").classList.toggle("text-[#d75241]");
    } else if (player.post == "Milieu") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#20d244]");
        newplayer.querySelector(".player-number").classList.toggle("border-[#20d244]");
        newplayer.querySelector(".player-poste").classList.toggle("text-[#20d244]");
    } else if (player.post == "Defenseur") {
        newplayer.querySelector(".player-card").classList.toggle("border-[#3AC8EF]");
        newplayer.querySelector(".player-number").classList.toggle("border-[#3AC8EF]");
        newplayer.querySelector(".player-poste").classList.toggle("text-[#3AC8EF]");
    } else if (player.post == "Gardien") {
        newplayer.querySelector(".player-card").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-number").classList.toggle("border-orange-400");
        newplayer.querySelector(".player-poste").classList.toggle("text-orange-400");
    }
    /////

    newplayer.classList.toggle("hidden");
    document.querySelector(".side-container").appendChild(newplayer);

    //reset the values
    document.querySelector("#name").value = "";
    document.querySelector("#nbr").value = "";
    document.querySelectorAll('input[name="poste"]').forEach(radio => {
        radio.checked = false;
    });

    // let modbtn = document.querySelectorAll("#modpopup");
    // let cancelbtn = document.querySelectorAll("#updatenon");
    // let annulerbtn = document.querySelectorAll("#updateannuler");
    // modbtn.forEach(mod => {
    //     mod.addEventListener("click", toggleUpdatePopup);
    //     players.forEach(p => {
    //         if (p.id == player.id) {
    //             document.querySelector(".test").value = player.nom;
    //         }

    //     });
    // });
    // cancelbtn.forEach(cancel => {
    //     cancel.addEventListener("click", toggleUpdatePopup);
    // });
    // annulerbtn.forEach(annuler => {
    //     annuler.addEventListener("click", toggleUpdatePopup);
    // });

}



// event lisner submit

form.addEventListener("submit", function (event) {
    event.preventDefault();

    validatename();
    validatenbr();
    validatepost();

    let value = document.querySelector(
        'input[name="poste"]:checked'
    )?.value;

    // check errors

    let errors = document.querySelectorAll(".message");
    let haserror = false;
    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });


    if (!haserror) {

        let player = {
            id: players.length + 1,
            nom: document.querySelector("#name").value,
            post: value,
            numero: document.querySelector("#nbr").value,

        }
        console.log(player)
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));
        console.log(players);
        addplayer(player);
        togglepopup();
    }

})
