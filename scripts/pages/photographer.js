let totalLikes;
const totalLikesTag = document.getElementById('likesTotal');
////////////////////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const photographerId = urlParams.get('id');
///////////////////////////////////////////////////////////// AFFICHAGE PAGE PHOTOGRAPHE /////////////////////////////////////////////////////////
function displayPhotographerPage(photographers, medias) {
    const currentPhotographer = photographers.find(photographer => photographer.id == photographerId);
    const phoFactory = photographerFactory(currentPhotographer);
    /////////////////////////////////////////////////////////////////////////////// HEADER PHOTOGRAPHE
    const header = document.getElementById('photograph-header');
    phoFactory.createHeader(header);
    /////////////////////////////////////////////////////////////////////////////// MEDIAS PHOTOGRAPHE
    const currentMedias = medias.filter((currentMedias) => currentMedias.photographerId == photographerId);
    const mediasGrid = document.getElementById('medias-grid');
    const medFactory = mediaFactory(currentMedias, mediasGrid);
    const allMedias = medFactory.displayMedias();
    /////////////////////////////////////////////////////////////////////////////// LIKES PHOTOGRAPHE (INFOBOX)
    totalLikes = allMedias.getTotalLikes();
    totalLikesTag.textContent = totalLikes;
    /////////////////////////////////////////////////////////////////////////////// PRIX PHOTOGRAPHE (INFOBOX)
    const infoBox = document.getElementById('infos-box');
    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `${currentPhotographer.price}€ / jour`;
    infoBox.append(priceParagraph);
    ////////////////////////////////////////////////////////////////////////////// FONCTION DE TRI
    const sortButton = document.getElementById('sortButton');
    sortButton.addEventListener('change', () => {
        switch (sortButton.options[sortButton.selectedIndex].value) {
            case 'popularity':
                medFactory.sortByPopularity();
                break;
            case 'date':
                medFactory.sortByDate();
                break;
            case 'title':
                medFactory.sortByTitle();
                break;
        }
        addListenersOnMedias();
    })
}
////////////////////////////////////////////////////// REINITIALISATION DES LISTENERS
function addListenersOnMedias() {
    likesHandler();
    lightboxHandler();
}
///////////////////////////////////////////////////////////////// GESTION DES LIKES ///////////////////////////////////////////////////////////////
function likesHandler() {
    const likesButton = document.querySelectorAll('.heart-btn');
    likesButton.forEach(heart => {
        heart.addEventListener('click', (e) => {
            e.preventDefault();
            const likesIcon = e.currentTarget.querySelector("i");
            if (likesIcon.dataset.clicked == "false") {
                likesIcon.dataset.likes++;
                const likesTag = e.currentTarget.previousSibling;
                likesTag.textContent = likesIcon.dataset.likes;
                totalLikes++;
                totalLikesTag.textContent = totalLikes;
                likesIcon.dataset.clicked = "true";
            }
            else {
                likesIcon.dataset.likes--;
                const likesTag = e.currentTarget.previousSibling;
                likesTag.textContent = likesIcon.dataset.likes;
                totalLikes--;
                totalLikesTag.textContent = totalLikes;
                likesIcon.dataset.clicked = "false";
            }
        });
    })
}
///////////////////////////////////////////////////////////////////////// LIGHTBOX /////////////////////////////////////////////////////////////////
let currentImgIndex, medias;
////////////////////////////////////////////////////////////// AFFICHAGE LIGHTBOX
function lightboxHandler() {
    medias = document.querySelectorAll('.media-content');
    let mediasArray = Array.from(medias);

    medias.forEach(media => media.addEventListener('click', (e) => {
        e.preventDefault();
        displayLightBox(e.currentTarget);
        currentImgIndex = mediasArray.indexOf(e.currentTarget);
    }));

    medias.forEach(media => media.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            displayLightBox(e.currentTarget);
            currentImgIndex = mediasArray.indexOf(e.currentTarget);
        }
    }));
}
////////////////////////////////////////////////////////////// PREVIOUS MEDIA
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("nextBtn");
prevBtn.addEventListener("click", () => {
    medias[currentImgIndex].dataset.onfocus = "";
    currentImgIndex = currentImgIndex < 1 ? medias.length - 1 : currentImgIndex - 1;
    displayLightBox(medias[currentImgIndex]);
});
prevBtn.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        medias[currentImgIndex].dataset.onfocus = "";
        currentImgIndex = currentImgIndex < 1 ? medias.length - 1 : currentImgIndex - 1;
        displayLightBox(medias[currentImgIndex]);
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' && lightbox_bg.getAttribute('aria-hidden') == 'false') {
        medias[currentImgIndex].dataset.onfocus = "";
        currentImgIndex = currentImgIndex < 1 ? medias.length - 1 : currentImgIndex - 1;
        displayLightBox(medias[currentImgIndex]);
    }
});
////////////////////////////////////////////////////////////// NEXT MEDIA
nextBtn.addEventListener("click", () => {
    medias[currentImgIndex].dataset.onfocus = "";
    currentImgIndex = currentImgIndex >= medias.length - 1 ? 0 : currentImgIndex + 1;
    displayLightBox(medias[currentImgIndex]);
});
nextBtn.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        medias[currentImgIndex].dataset.onfocus = "";
        currentImgIndex = currentImgIndex >= medias.length - 1 ? 0 : currentImgIndex + 1;
        displayLightBox(medias[currentImgIndex]);
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' && lightbox_bg.getAttribute('aria-hidden') == 'false') {
        medias[currentImgIndex].dataset.onfocus = "";
        currentImgIndex = currentImgIndex >= medias.length - 1 ? 0 : currentImgIndex + 1;
        displayLightBox(medias[currentImgIndex]);
    }
});
/////////////////////////////////////////////////////////////////// FERMETURE LIGHTBOX
closeLB.addEventListener("click", () => {
    closeLightbox(medias);
});
closeLB.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        closeLightbox(medias);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox_bg.getAttribute('aria-hidden') == 'false') {
        closeLightbox(medias);
    }
});
/////////////////////////////////////////////////////////////////// MODALE //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// AJOUT NOM DU PHOTOGRAPHE
function displayFormTitle(photographers) {
    const modalTitle = document.getElementById('modalTitle');
    const currentPhotographer = photographers.find(photographer => photographer.id == photographerId);
    const photographer = photographerFactory(currentPhotographer);
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
    if (e.key == 'Enter') {
        closeModal();
    }
});
const contactModal = document.getElementById("modalBg");
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.getAttribute('aria-hidden') == 'false') {
        closeModal();
    }
});
////////////////////////////////////////////////////// VALIDATION FORMULAIRE
firstName.addEventListener('input', checkFirstName, false);
lastName.addEventListener('input', checkLastName, false);
email.addEventListener('input', checkEmail, false);
form.addEventListener('submit', checkForm, false);
///////////////////////////////////////////////////////////// EXECUTION GLOBALE ///////////////////////////////////////////////////
async function initPhotographer() {
    const { photographers, medias } = await getPhotographers();
    displayPhotographerPage(photographers, medias);
    displayFormTitle(photographers);
    addListenersOnMedias();
}
initPhotographer();