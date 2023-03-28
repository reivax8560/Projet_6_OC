///////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const ID = urlParams.get('id');
/////////////////////////////////////////////////// AFFICHAGE INITIAL PAGE PHOTOGRAPHE ////////////////////////////////////////////////////
function displayInitialPage(photographers, medias) {
    const photographerDatas = photographers.find(photographer => photographer.id == ID);
    const photographerPattern = photographerFactory(photographerDatas);
    ///////////////////////////////////////////////////////// HEADER PHOTOGRAPHE
    const photographHeader = document.getElementById('photograph-header');
    const headerDOM = photographerPattern.getHeaderDOM();
    photographHeader.prepend(headerDOM.divText);
    photographHeader.append(headerDOM.divPhoto);
    ////////////////////////////////////////////////////// LIKES/PRIX PHOTOGRAPHE
    const boxInformations = document.getElementById('box-informations');
    const boxInfoDOM = photographerPattern.getBoxInfoDOM();
    boxInformations.append(boxInfoDOM);
    ///////////////////////////////////////////////////////// MEDIAS PHOTOGRAPHE
    medias.forEach((media) => {
        if (media.photographerId == ID) {

            console.log(media);
            // const allMedias = Array.from(media);            // => FONCTIONNE PAS !!!!
            // console.log(allMedias);

            const mediaModel = mediaFactory(media);
            const mediaGrid = mediaModel.getMediasGrid();
            const mediaSection = document.getElementById('medias-grid');
            mediaSection.appendChild(mediaGrid);

            /////////////////////////////////////////////// AFFICHAGE LIGHTBOX
            const links = document.querySelectorAll('.media-link'); // renvoie des objets NodeList
            links.forEach(link => link.addEventListener('click', (e) => {
                e.preventDefault();
                displayLightBox(e.currentTarget);
            }));
        }
    });
}
/////////////////////////////////////////////////////////////// MODALE ///////////////////////////////////////////////////////////////////

//////////////////////////////////////// AJOUT NOM DU PHOTOGRAPHE
function displayFormTitle(photographers) {
    const modalTitle = document.getElementById('modalTitle');
    const photographerDatas = photographers.find(photographer => photographer.id == ID);
    const photographer = photographerFactory(photographerDatas);
    const name = photographer.name;
    const br = document.createElement('br');
    modalTitle.appendChild(br);
    modalTitle.innerHTML += name;
}
/////////////////////////////////////////////////// AFFICHAGE MODALE
openForm.addEventListener("click", () => {
    displayModal();
});
openForm.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        displayModal();
    }
});
/////////////////////////////////////////////////// FERMETURE MODALE
closeForm.addEventListener("click", () => {
    closeModal();
});
closeForm.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        closeModal();
    }
});
///////////////////////////////////////////////////////// VALIDATION FORMULAIRE
firstName.addEventListener('input', checkFirstName, false);
lastName.addEventListener('input', checkLastName, false);
email.addEventListener('input', checkEmail, false);
form.addEventListener('submit', checkForm, false);

/////////////////////////////////////////////////////////////// LIGHTBOX /////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// FERMETURE LIGHTBOX
closeLB.addEventListener("click", () => {
    closeLightbox();
});
closeLB.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        closeLightbox();
    }
});

///////////////////////////////////////////////////////////// EXECUTION GLOBALE ///////////////////////////////////////////////////
async function initPhotographer() {
    const { photographers, medias } = await getPhotographers();
    displayInitialPage(photographers, medias);
    displayFormTitle(photographers);
}
initPhotographer();



