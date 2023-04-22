//////////////////////////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const ID = urlParams.get('id');

let nbLikes = 0;
/////////////////////////////////////////////////// AFFICHAGE INITIAL PAGE PHOTOGRAPHE ////////////////////////////////////////////////////
function displayInitialPage(photographers, medias) {
    const photographerDatas = photographers.find(photographer => photographer.id == ID);
    const photographerPattern = photographerFactory(photographerDatas);
    ////////////////////////////////////////////////////////////// HEADER PHOTOGRAPHE
    const photographHeader = document.getElementById('photograph-header');
    const headerDOM = photographerPattern.getHeaderDOM();
    photographHeader.prepend(headerDOM.divText);
    photographHeader.append(headerDOM.divPhoto);
    ///////////////////////////////////////////////////////////// MEDIAS PHOTOGRAPHE
    medias.forEach((media) => {
        if (media.photographerId == ID) {
            const mediaModel = mediaFactory(media);
            const mediaGrid = mediaModel.getMediasGrid();
            const mediaSection = document.getElementById('medias-grid');
            mediaSection.appendChild(mediaGrid);
            nbLikes += media.likes;
        }
    });
    ///////////////////////////////////////////////////////////// AFFICHAGE LIGHTBOX
    let links = document.querySelectorAll('.media-link');
    // console.log(links.length)
    links.forEach(link => link.addEventListener('click', (e) => {
        // console.log(link);
        e.preventDefault();
        displayLightBox(e.currentTarget);
    }));
    ////////////////////////////////////////////////////////////// PREV/NEXT LIGHTBOX
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("nextBtn");
    let currentImgIndex = 0;

    prevBtn.addEventListener("click", () => {
        currentImgIndex = currentImgIndex < 1 ? links.length - 1 : currentImgIndex - 1;
        // setLightboxDisplayedImage(links[currentImgIndex]); // fonction bruno
        displayLightBox(links[currentImgIndex]);
    });

    nextBtn.addEventListener("click", () => {
        console.log(currentImgIndex, links.length);
        currentImgIndex = currentImgIndex >= links.length - 1 ? 0 : currentImgIndex + 1;
        // setLightboxDisplayedImage(links[currentImgIndex]); // fonction bruno
        displayLightBox(links[currentImgIndex]);
    });
    ////////////////////////////////////////////////////////// LIKES/PRIX PHOTOGRAPHE
    const likesTotal = document.getElementById('likesTotal');
    likesTotal.prepend(nbLikes);
    const boxInformations = document.getElementById('box-informations');
    const boxInfoDOM = photographerPattern.getBoxInfoDOM();
    boxInformations.append(boxInfoDOM);

    ///////////////////////////////////////////////////////////////////////////// AJOUT LIKES //////////////////////////////////////////////////////////////////
    const mediaHearts = document.querySelectorAll('.heart-media');
    mediaHearts.forEach(heart => heart.addEventListener('click', (e) => {
        e.preventDefault();
        nbLikes = parseInt(e.currentTarget.dataset.likes) + 1;
        const likesParagraph = e.currentTarget.previousSibling; // recup du parag voisin contenant les likes
        likesParagraph.textContent = nbLikes;
    }))
}
/////////////////////////////////////////////////////////////////// FERMETURE LIGHTBOX
closeLB.addEventListener("click", () => {
    closeLightbox();
});
closeLB.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        closeLightbox();
    }
});
/////////////////////////////////////////////////////////////// MODALE ///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////// AJOUT NOM DU PHOTOGRAPHE
function displayFormTitle(photographers) {
    const modalTitle = document.getElementById('modalTitle');
    const photographerDatas = photographers.find(photographer => photographer.id == ID);
    const photographer = photographerFactory(photographerDatas);
    const name = photographer.name;
    const br = document.createElement('br');
    modalTitle.appendChild(br);
    modalTitle.innerHTML += name;
}
////////////////////////////////////////////////////// AFFICHAGE MODALE
openForm.addEventListener("click", () => {
    displayModal();
});
openForm.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        displayModal();
    }
});
////////////////////////////////////////////////////// FERMETURE MODALE
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

///////////////////////////////////////////////////////////// EXECUTION GLOBALE ///////////////////////////////////////////////////
async function initPhotographer() {
    const { photographers, medias } = await getPhotographers();
    displayInitialPage(photographers, medias);
    displayFormTitle(photographers);
}
initPhotographer();



