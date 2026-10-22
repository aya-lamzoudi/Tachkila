// affichage de popup

const ajoute = document.querySelector(".add-btn");
const hidepopup = document.querySelector("#popnone");
const annuler = document.querySelector(".annuler")
ajoute.addEventListener("click", togglepopup);
hidepopup.addEventListener("click", togglepopup);
annuler.addEventListener("click", togglepopup)

function togglepopup() {
    document.querySelector("#hide").classList.toggle("popupcantainer");
}


//ajouter d'un jouer
const addform = document.querySelector("#addplayer");
//validation de input:

addform.addEventListener("input", function (event) {

    if (event.target.id == "name") {
        validatename;
    } else if (event.target.id == "nbr") {
        validatenbr;
    }

})

function validatename() {
    let name = document.querySelector("#name").value.trim();
    let error = document.querySelector("#name-err");

    if (name === "") {
        error.innerText = "this champt should not be empty";
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

addform.addEventListener("submit", function (event) {
    event.preventDefault();

    validatename();
    validatenbr();
    
    let  errors = document.querySelectorAll(".message"); 
    let haserror = false;
    errors.forEach(error => {
        if (error.innerText !== "") {
            haserror = true;
        }
    });
    if (!haserror) {
        msgform.innerText = "the player is added";
        // document.querySelector("#email").value = "";
        // document.querySelector("#telephone").value = "";
        // document.querySelector("#motdepasse").value = "";
    }
})


let players = [];

