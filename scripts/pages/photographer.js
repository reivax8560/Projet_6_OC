//////////////////////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const ID = urlParams.get('id');

//////////////////////////////////////////////////// CREATION HEADER PHOTOGRAPHE
function displayHeader(photographers) {
    const photographHeader = document.getElementById('photograph-header');
    const photographerDatas = photographers.find(photographer => photographer.id == ID);
    const photographerPattern = photographerFactory(photographerDatas);
    const headerDOM = photographerPattern.getHeaderDOM();
    photographHeader.prepend(headerDOM.divText);
    photographHeader.append(headerDOM.divPhoto);
    // console.log(photographerPattern.name);
}
//////////////////////////////////////////////// CREATION DES MEDIAS PHOTOGRAPHE
function displayMedias(medias) {
    const mediaSection = document.getElementById('medias-grid');
    medias.forEach((media) => {
        if (media.photographerId == ID) {
            const mediaModel = mediaFactory(media);
            const mediaGrid = mediaModel.getMediasGrid();
            mediaSection.appendChild(mediaGrid);
        }
    });
}
///////////////////////////////////////////////////// CREATION BOX LIKES/TARIF
function displayBoxInfo(photographers) {
    const boxInformations = document.getElementById('box-informations');
    const photographerDatas = photographers.find(photographer => photographer.id == ID);
    const photographerPattern = photographerFactory(photographerDatas);
    const boxInfoDOM = photographerPattern.getBoxInfoDOM();
    boxInformations.append(boxInfoDOM);
}
/////////////////////////////////////////////////////////////// MODALE /////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////// AFFICHAGE/FERMETURE
contactBtn.addEventListener("click", () => {
    displayModal();
});
closeIcon.addEventListener("click", () => {
    closeModal();
});
////////////////////////////////////////////////// AJOUT NOM PHOTOGRAPHE
function displayName(photographers) {
    const modalTitle = document.getElementById('modalTitle');
    const photographerDatas = photographers.find(photographer => photographer.id == ID);
    const photographer = photographerFactory(photographerDatas);
    const name = photographer.name;
    const br = document.createElement('br');
    modalTitle.appendChild(br);
    modalTitle.innerHTML += name;
}
///////////////////////////////////////////////////////// VALIDATION FORMULAIRE
firstName.addEventListener('input', checkFirstName, false);
lastName.addEventListener('input', checkLastName, false);
email.addEventListener('input', checkEmail, false);
form.addEventListener('submit', checkForm, false);

/////////////////////////////////////////////////////////////// LIGHTBOX /////////////////////////////////////////////////////////////////////////

function displayLightBox() {
    const mediaLink = document.querySelectorAll('.media-link');
    mediaLink.forEach(link => link.addEventListener('click', e => {
        e.preventDefault();
        const lightbox_bg = document.getElementById('lightbox_bg');
        lightbox_bg.style.display = "block";
        const model = mediaFactory(link);
        const path = e.currentTarget.getAttribute('data-id');
        const name = e.currentTarget.getAttribute('data-title');
        const lightBox = model.getLightBox(path, name);
        const carrousel = document.getElementById('carrousel');
        carrousel.appendChild(lightBox);
    })
    )
}

///////////////////////////////////////////////////////////// EXECUTION GLOBALE
async function initPhotographer() {
    const { photographers, medias } = await getPhotographers();
    displayHeader(photographers);
    displayMedias(medias);
    displayBoxInfo(photographers);
    displayName(photographers);
    displayLightBox();
}
initPhotographer();
