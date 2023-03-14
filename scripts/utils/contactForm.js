///////////////////////////////////////////////////////////////////////// DOM
const body = document.querySelector('body');
const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const firstNameDiv = document.getElementById('firstNameDiv');
const lastName = document.getElementById('lastName');
const lastNameDiv = document.getElementById('lastNameDiv');
const email = document.getElementById('email');
const emailDiv = document.getElementById('emailDiv');
const errorFirstName = document.getElementById('errorFirstName');
const errorLastName = document.getElementById('errorLastName');
const errorEmail = document.getElementById('errorEmail');
const message = document.getElementById('message');
const header = document.getElementById('header');
const main = document.getElementById('main');
const modal = document.getElementById("contact_modal");
const closeIcon = document.getElementById("closeIcon");
const contactBtn = document.getElementById('contactBtn');
/////////////////////////////////////////////////////////////////////// REGEX
const regex1 = /^([A-Za-zàâéèëêïîôùüçœ\-\']){2,}$/; // nom prenom
const regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // email

////////////////////////////////////////////////////////////// AFFICHER MODALE
function displayModal() {
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    header.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'true');
    closeIcon.focus();
    body.className = "body-scroll-none";
}
//////////////////////////////////////////////////////////////// FERMER MODALE
function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'false');
    body.className = "";
    contactBtn.focus();
}
///////////////////////////////////////////////////// FONCTIONNE PAS !!! ///////////////////////////////////////
closeIcon.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        closeModal();
    }
})

//////////////////////////////////////////////////// VERIFICATION DU FORMULAIRE

function checkFirstName(e) {
    e.preventDefault();
    if (regex1.test(firstName.value)) {
        errorFirstName.innerHTML = "";
        errorFirstName.className = "error";
    }
};
function checkLastName(e) {
    e.preventDefault();
    if (regex1.test(lastName.value)) {
        errorLastName.innerHTML = "";
        errorLastName.className = "error";
    }
};
function checkEmail(e) {
    e.preventDefault();
    if (regex2.test(email.value)) {
        errorEmail.innerHTML = "";
        errorEmail.className = "error";
    }
};
function checkForm(e) {
    e.preventDefault();
    if (!regex1.test(firstName.value)) {
        errorFirstName.innerHTML = "Veuillez entrer au minimum 2 caractères pour le prénom.";
        errorFirstName.className = "error active";
        // event.preventDefault();
    } else if (!regex1.test(lastName.value)) {
        errorLastName.innerHTML = "Veuillez entrer au minimum 2 caractères pour le nom.";
        errorLastName.className = "error active";
        // event.preventDefault();
    } else if (!regex2.test(email.value)) {
        errorEmail.innerHTML = "Veuillez entrer une adresse Email valide.";
        errorEmail.className = "error active";
        // event.preventDefault();
    } else {
        console.log(`${firstName.value} ${lastName.value} ${email.value} ${message.value}`);
    }
};