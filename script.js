let players = JSON.parse(localStorage.getItem("players")) || [];
let id = Number(localStorage.getItem("id")) || 0;

players.forEach(player => {
    addplayer(player);
    pitch(players);
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
const selects = document.querySelectorAll(".player-position-select");
const confirmDelete = document.querySelector("#confirmDelete");
const cancelDelete = document.querySelector("#cancelDelete");
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
        const confirm = document.querySelector("#confirm");
        confirm.classList.toggle("hidden");
        const playerCard = deleteBtn.closest(".player-card");
        let number = playerCard.querySelector(".player-number").innerText;
        let index = players.findIndex(player => player.numero == number);
        if (index !== -1) {
            cancelDelete.addEventListener("click", () => {
                confirm.classList.toggle("hidden");
            })
            confirmDelete.addEventListener("click", () => {

                console.log(players[index])
                console.log("did you see mee")
                players[index].position = "bench";
                console.log(players[index])
                players.splice(index, 1);
                localStorage.setItem("players", JSON.stringify(players));

                playerCard.remove();
                pitch(players);
                document.querySelector("#tachkila-nbr").innerText = players.length;
                confirm.classList.toggle("hidden");
                showsuccess("the player is the player is successfully removed");
            })

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
    newplayer.querySelector("select").value = player.position;

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
    })

    document.querySelector("#tachkila-nbr").innerText = players.length;



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

// error function
function showError(message) {
    const error = document.querySelector("#error-msg");

    error.innerText = message;
    error.classList.remove("hidden");

    setTimeout(() => {
        error.classList.add("hidden");
    }, 4000);
}
// seccess message
function showsuccess(message) {
    const error = document.querySelector("#success-msg");
    console.log("hello")
    error.innerText = message;
    error.classList.remove("hidden");

    setTimeout(() => {
        error.classList.add("hidden");
    }, 4000);
}
// afficher pitch from local storage

function pitch(players) {
    players.forEach(player => {

        if (player.position != "bench") {
            let path = document.querySelector(`.${player.position}`);
            if (path) {
                path.querySelector(".player-name-position").innerText = player.nom
                path.querySelector(".number").innerText = player.numero;
                path.querySelector(".number").classList.remove("hidden");
            }

        }
    });
}


// event lisner submit

//add player

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
            position: "bench",
        }

        localStorage.setItem("id", id);
        console.log(player)
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players));
        console.log(players);
        addplayer(player);
        togglepopup();
        showsuccess("the player is added with sucsses");
    }

})

//edit player

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
                player.position = "bench";
                editplayer(player);
                localStorage.setItem("players", JSON.stringify(players));

                updatepopup();
                showsuccess("the player is updated with success");
            }
        });
    }

});


// add player to the pitch

const check = [
    { value: "GB", poste: "Gardien" },
    { value: "DG", poste: "Defenseur" },
    { value: "DC1", poste: "Defenseur" },
    { value: "DC2", poste: "Defenseur" },
    { value: "DD", poste: "Defenseur" },
    { value: "MG", poste: "Milieu" },
    { value: "MC1", poste: "Milieu" },
    { value: "MC2", poste: "Milieu" },
    { value: "MD", poste: "Milieu" },
    { value: "BU1", poste: "Attaquant" },
    { value: "BU2", poste: "Attaquant" }
]


selects.forEach(select => {
    select.addEventListener("change", function () {

        let value = select.value; //get the select value
        let playerCard = select.closest(".player-card"); //get the player's div
        let poste = playerCard.querySelector(".player-poste").innerText; //get the player post
        let num = playerCard.querySelector(".player-number").innerText; //get the player number
        console.log(num)
        console.log(poste)
        console.log(value)
        let exist = false;
        let checking = document.querySelectorAll(".terrain-position");
        let path = document.querySelector(`.${value}`);

        for (let j = 0; j < check.length; j++) {

            //check if the position can be tooken by the player
            if (check[j].value == value && poste == check[j].poste) {
                exist = true;
                break;
            }

        }
        console.log(exist);

        if (exist) {
            let found = false;
            for (let i = 0; i < checking.length; i++) {
                let checkingnbr = checking[i].querySelector(".number").innerText;
                // let checkingname = checking[i].querySelector(".player-name-position").innerText;

                console.log(checkingnbr);
                console.log("3aaat9ooniii")
                if (checkingnbr == num) {
                    found = true;
                    break;
                }
            }
            if (!found && path.querySelector(".player-name-position").innerText == "libre") {
                players.forEach(player => {

                    if (player.numero == num) {
                        console.log(player)
                        player.position = value;
                        localStorage.setItem("players", JSON.stringify(players));
                        path.querySelector(".player-name-position").innerText = playerCard.querySelector(".player-name").innerText;
                        path.querySelector(".number").innerText = playerCard.querySelector(".player-number").innerText;
                        path.querySelector(".number").classList.remove("hidden");
                        showsuccess("the player is being placed in the pitch with seccess");
                        pitch(player)
                    }

                });
            } else {

                showError("this position is already exist");
            }



        } else {
            if (value == "bench") {
                players.forEach(player => {

                    if (player.numero == num) {
                        console.log(player)
                        console.log(player.position)
                        let path = document.querySelector(`.${player.position}`);
                        console.log(path)
                        player.position = value;
                        localStorage.setItem("players", JSON.stringify(players));
                        path.querySelector(".player-name-position").innerText = "libre"
                        path.querySelector(".number").innerText = ""
                        path.querySelector(".number").classList.add("hidden");
                    }

                });
            } else {
                showError("this position can not be accepted")
            }

        }

    })


})





