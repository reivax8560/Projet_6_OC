////////////////////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const photographerId = urlParams.get('id');
///////////////////////////////////////////////////////////// AFFICHAGE PAGE PHOTOGRAPHE /////////////////////////////////////////////////////////
function displayPhotographerPage(photographers, medias) {
    const currentPhotographer = photographers.find(photographer => photographer.id == photographerId);
    const header = document.getElementById('photograph-header');
    const infoBox = document.getElementById('infos-box');
    const phoFactory = photographerFactory(currentPhotographer, header, infoBox);
    ////////////////////////////////////////////////////////////// HEADER PHOTOGRAPHE
    const createHeader = phoFactory.createHeader();
    ///////////////////////////////////////////////////////////// MEDIAS PHOTOGRAPHE
    const mediasGrid = document.getElementById('medias-grid');
    const medFactory = mediaFactory(medias, photographerId, mediasGrid);
    const allMedias = medFactory.createAllMediasHTML();
    ////////////////////////////////////////////////////////////// BOX-INFO (LIKES + PRIX) ////////////////////////////////////////////////////////////
    let totalLikes = allMedias.getTotalLikes();
    const totalLikeBox = document.getElementById('likesTotal'); // recup du paragraphe "likes" dans la box (aside > div > p+i)
    totalLikeBox.textContent = totalLikes;
    const createInfoBox = phoFactory.createInfoBox(); // creation du paragraphe "prix" uniquement
    ///////////////////////////////////////////////////////////////// GESTION DES LIKES ///////////////////////////////////////////////////////////////
    const mediaHearts = document.querySelectorAll('.heart-media');
    mediaHearts.forEach(heart => heart.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.currentTarget.dataset.clicked == "false") {
            e.currentTarget.dataset.likes++;
            const likesParagraph = e.currentTarget.previousSibling;
            likesParagraph.textContent = e.currentTarget.dataset.likes;
            totalLikes++;
            totalLikeBox.textContent = totalLikes;
            e.currentTarget.dataset.clicked = "true";
        }
        else {
            e.currentTarget.dataset.likes--;
            const likesParagraph = e.currentTarget.previousSibling;
            likesParagraph.textContent = e.currentTarget.dataset.likes;
            totalLikes--;
            totalLikeBox.textContent = totalLikes;
            e.currentTarget.dataset.clicked = "false";
        }
    }))
    //////////////////////////////////////////////////////////////// FONCTION DE TRI  //////////////////////////////////////////////////////////////////
    const mediasSelect = document.getElementById('mediasSelect');
    mediasSelect.addEventListener('change', () => {
        if (mediasSelect.options[mediasSelect.selectedIndex].value == 'popularity') {
            medFactory.sortByPopularity();
        }
        else if (mediasSelect.options[mediasSelect.selectedIndex].value == 'date') {
            medFactory.sortByDate();
        }
        else if (mediasSelect.options[mediasSelect.selectedIndex].value == 'title') {
            medFactory.sortByTitle();
        }
    })
    ///////////////////////////////////////////////////////////////////////// LIGHTBOX /////////////////////////////////////////////////////////////////
    let links = document.querySelectorAll('.media-content');
    let linksArray = Array.from(links);
    let currentImgIndex;

    links.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        displayLightBox(e.currentTarget);
        currentImgIndex = linksArray.indexOf(e.currentTarget);
    }));
    links.forEach(link => link.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            displayLightBox(e.currentTarget);
            currentImgIndex = linksArray.indexOf(e.currentTarget);
        }
    }));
    ////////////////////////////////////////////////////////////// BOUTONS PREVIOUS MEDIA
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("nextBtn");
    prevBtn.addEventListener("click", () => {
        currentImgIndex = currentImgIndex < 1 ? links.length - 1 : currentImgIndex - 1;
        displayLightBox(links[currentImgIndex]);
    });
    prevBtn.addEventListener("keyup", (e) => {
        if (e.key === 'Enter') {
            currentImgIndex = currentImgIndex < 1 ? links.length - 1 : currentImgIndex - 1;
            displayLightBox(links[currentImgIndex]);
        }
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' && lightbox_bg.getAttribute('aria-hidden') == 'false') {
            currentImgIndex = currentImgIndex < 1 ? links.length - 1 : currentImgIndex - 1;
            displayLightBox(links[currentImgIndex]);
        }
    });
    ////////////////////////////////////////////////////////////// BOUTONS NEXT MEDIA
    nextBtn.addEventListener("click", () => {
        currentImgIndex = currentImgIndex >= links.length - 1 ? 0 : currentImgIndex + 1;
        displayLightBox(links[currentImgIndex]);
    });
    nextBtn.addEventListener("keyup", (e) => {
        if (e.key === 'Enter') {
            currentImgIndex = currentImgIndex >= links.length - 1 ? 0 : currentImgIndex + 1;
            displayLightBox(links[currentImgIndex]);
        }
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight' && lightbox_bg.getAttribute('aria-hidden') == 'false') {
            currentImgIndex = currentImgIndex >= links.length - 1 ? 0 : currentImgIndex + 1;
            displayLightBox(links[currentImgIndex]);
        }
    });
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
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox_bg.getAttribute('aria-hidden') == 'false') {
        closeLightbox();
    }
});
/////////////////////////////////////////////////////////////////// MODALE //////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////// AJOUT NOM DU PHOTOGRAPHE
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
////////////////// FERMETURE AU CLAVIER 
closeForm.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        closeModal();
    }
});
////////////////// FERMETURE AVEC ECHAP
const contactModal = document.getElementById("modalBg");
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.getAttribute('aria-hidden') == 'false') {
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
    displayPhotographerPage(photographers, medias);
    displayFormTitle(photographers);
}
initPhotographer();