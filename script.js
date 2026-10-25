let players = JSON.parse(localStorage.getItem("players")) || [];
let id = Number(localStorage.getItem("id")) || 0;

players.forEach(player => {
    addplayer(player);
    document.querySelector("#tachkila-nbr").innerText = players.length;
});

// declaration

const addbtn = document.querySelector(".add-btn");
const popup = document.querySelector(".modal");
const form = document.querySelector("#addplayer");
const editform = document.querySelector("#updateplayer");
let edit = document.querySelectorAll(".edit-btn");
let remove = document.querySelectorAll(".delete-btn");
let oldnumber;



//affiche and close pop-up && editpopup


document.querySelector(".side-container").addEventListener("click", function (event) {
    event.preventDefault();
    const add = event.target.closest(".add-player-btn");
    const editBtn = event.target.closest(".edit-btn");
    const deleteBtn = event.target.closest(".delete-btn");

    if (add) {
        togglepopup()
    }
    if (editBtn) {
        const playerCard = editBtn.closest(".player-card");
        let number = playerCard.querySelector(".player-number").innerText;
        console.log(number);
        players.forEach(player => {
            if (player.numero == number) {
                document.querySelector("#update-name").value = player.nom;
                document.querySelector("#update-nbr").value = player.numero;
                oldnumber = player.numero;
                document.querySelectorAll('#update input[name="poste"]').forEach(input => {
                    input.checked = input.value === player.post;
                });
                updatepopup();
            }
        });

    }

    if (deleteBtn) {
        const playerCard = deleteBtn.closest(".player-card");
        let number = playerCard.querySelector(".player-number").innerText;
        let index = players.findIndex(player => player.numero == number);
        if (index !== -1) {
            players.splice(index, 1);

            localStorage.setItem("players", JSON.stringify(players));

            playerCard.remove();

            document.querySelector("#tachkila-nbr").innerText = players.length;
        }
        console.log(players)
    }
});

popup.addEventListener("click", function (event) {
    if (event.target.id == "close-btn" || event.target.id == "popup-cancel") {
        togglepopup();
    }
})
document.querySelector("#close-popup").addEventListener("click", updatepopup);
document.querySelector("#update-annuler").addEventListener("click", updatepopup);

//function

// -affichage de popup
function togglepopup() {
    console.log("test");
    document.querySelector("#popup").classList.toggle("hidden");
}

// -affichage de editpopup

function updatepopup() {
    console.log("edit test");
    document.querySelector("#update").classList.toggle("hidden");
}

//validate pop up functions

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

//validate edit pop-up functions

function validateeditname() {
    let name = document.querySelector("#update-name").value.trim();
    let error = document.querySelector("#update-name-err");

    if (name === "") {
        error.innerText = "this flied should not be empty";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        error.innerText = "this flied should containe just a letters";
    } else {
        error.innerText = "";
    }
}

function validateeditnbr() {
    let nbr = document.querySelector("#update-nbr").value.trim();
    let error = document.querySelector("#update-nbr-err");

    if (nbr === "") {
        error.innerText = "This field should not be empty";
    } else if (!/^[1-9][0-9]?$/.test(nbr)) {
        error.innerText = "This number is invalid";
    } else if (players.some(player => player.numero == nbr) && nbr !== oldnumber) {
        error.innerText = "This number already exists";
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



}

// edit player


function editplayer(player) {
    let findplayer = document.querySelectorAll(".player-card");
    findplayer.forEach(found => {
        let num = found.querySelector(".player-number").innerText;
        if (num == oldnumber) {
            found.querySelector(".player-number").innerText = player.numero;
            found.querySelector(".player-name").innerText = player.nom;
            found.querySelector(".player-poste").innerText = player.post;


            // remove previous coolors
            const card = found;
            const number = found.querySelector(".player-number");
            const poste = found.querySelector(".player-poste");
            card.classList.remove(
                "border-[#d75241]",
                "border-[#20d244]",
                "border-[#3AC8EF]",
                "border-orange-400"
            );

            number.classList.remove(
                "border-[#d75241]",
                "border-[#20d244]",
                "border-[#3AC8EF]",
                "border-orange-400"
            );

            poste.classList.remove(
                "text-[#d75241]",
                "text-[#20d244]",
                "text-[#3AC8EF]",
                "text-orange-400"
            );

            //add color

            if (player.post == "Attaquant") {
                found.classList.add("border-[#d75241]");
                found.querySelector(".player-number").classList.add("border-[#d75241]");
                found.querySelector(".player-poste").classList.add("text-[#d75241]");

            } else if (player.post == "Milieu") {
                found.classList.toggle("border-[#20d244]");
                found.querySelector(".player-number").classList.toggle("border-[#20d244]");
                found.querySelector(".player-poste").classList.toggle("text-[#20d244]");
            } else if (player.post == "Defenseur") {
                found.classList.toggle("border-[#3AC8EF]");
                found.querySelector(".player-number").classList.toggle("border-[#3AC8EF]");
                found.querySelector(".player-poste").classList.toggle("text-[#3AC8EF]");
            } else if (player.post == "Gardien") {
                found.classList.toggle("border-orange-400");
                found.querySelector(".player-number").classList.toggle("border-orange-400");
                found.querySelector(".player-poste").classList.toggle("text-orange-400");
            }
            /////
        }
    });
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
            id: ++id,
            nom: document.querySelector("#name").value,
            post: value,
            numero: document.querySelector("#nbr").value,

        }
        localStorage.setItem("id", id);
        console.log(player)
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));
        console.log(players);
        addplayer(player);
        togglepopup();
    }

})


editform.addEventListener("submit", function (event) {

    event.preventDefault();

    validateeditname();
    validateeditnbr();

    const value = editform.querySelector('input[name="poste"]:checked')?.value;
    // check errors

    let errors = document.querySelectorAll(".message");
    let haserror = false;


    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });


    if (!haserror) {
        players.forEach(player => {
            if (oldnumber == player.numero) {

                player.nom = document.querySelector("#update-name").value;
                player.post = value;
                player.numero = document.querySelector("#update-nbr").value;
                console.log("here")
                console.log(player)
                console.log(players)
                editplayer(player);
                localStorage.setItem("players", JSON.stringify(players));
                updatepopup();
            }
        });
    }

});
