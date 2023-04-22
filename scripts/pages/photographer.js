////////////////////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const URL_id = urlParams.get('id');
///////////////////////////////////////////////////////////// AFFICHAGE PAGE PHOTOGRAPHE /////////////////////////////////////////////////////////
function displayPhotographerPage(photographers, medias) {
    const currentPhotographer = photographers.find(photographer => photographer.id == URL_id);
    const phoFactory = photographerFactory(currentPhotographer);
    ////////////////////////////////////////////////////////////// HEADER PHOTOGRAPHE
    const header = document.getElementById('photograph-header');
    const headerDOM = phoFactory.getHeaderDOM();
    header.prepend(headerDOM.divText);
    header.append(headerDOM.divPhoto);
    ///////////////////////////////////////////////////////////// MEDIAS PHOTOGRAPHE
    let totalLikes = 0;
    medias.forEach((media) => {
        if (media.photographerId == URL_id) {
            const medFactory = mediaFactory(media);
            const allMedias = medFactory.getAllMedias();
            const mediasGrid = document.getElementById('medias-grid');
            mediasGrid.appendChild(allMedias);
            totalLikes += media.likes;
        }
    });
    ////////////////////////////////////////////////////////////// BOX-INFO (LIKES + PRIX) ////////////////////////////////////////////////////////////
    const boxTotalLikes = document.getElementById('likesTotal');
    boxTotalLikes.textContent = totalLikes;
    const infoBox = document.getElementById('infos-box');
    const boxInfoDOM = phoFactory.getBoxInfoDOM();
    infoBox.append(boxInfoDOM);
    ///////////////////////////////////////////////////////////////// GESTION DES LIKES ///////////////////////////////////////////////////////////////
    const mediaHearts = document.querySelectorAll('.heart-media');
    mediaHearts.forEach(heart => heart.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.currentTarget.dataset.clicked == "false") {
            e.currentTarget.dataset.likes++;
            const likesParagraph = e.currentTarget.previousSibling;
            likesParagraph.textContent = e.currentTarget.dataset.likes;
            totalLikes++;
            boxTotalLikes.textContent = totalLikes;
            e.currentTarget.dataset.clicked = "true";
        }
        else {
            e.currentTarget.dataset.likes--;
            const likesParagraph = e.currentTarget.previousSibling;
            likesParagraph.textContent = e.currentTarget.dataset.likes;
            totalLikes--;
            boxTotalLikes.textContent = totalLikes;
            e.currentTarget.dataset.clicked = "false";
        }
    }))
    /////////////////////////////////////////////////////// FONCTION DE TRI (POPULARITE, TITRE & DATE) ///////////////////////////////////////////////////////////
    const articles = document.querySelectorAll('.article'); // nodeList
    const articlesArray = Array.from(articles); // array

    // console.log(articlesArray[2].dataset.title);

    // articlesArray.sort(byPopularity);
    // function byPopularity(a, b) {
    //     return a.dataset.popularity - b.dataset.popularity;
    // }

    // articlesArray.sort(byTitle);         // NE FONCTIONNE PAS (chiffres qui posent problème ???)
    // function byTitle(a, b) {
    //     return a.dataset.title - b.dataset.title;
    // }

    // articlesArray.sort(byDate);          // FONCTIONNE SUR L'ANNEE UNIQUEMENT (RHODE DUBOIS)
    // function byDate(a, b) {
    //     return a.dataset.date - b.dataset.date;
    //     // sortie => (2013-02-30   2018-07-17  2019-08-12  2019-01-02  2019-05-20  2019-07-18)
    // }

    // console.log(articlesArray);

    // NOUVELLE FONCTION DANS LA MEDIAFACTORY POUR RECREER LES MEDIAS SELON LE NOUVEL ORDRE ???

    ///////////////////////////////////////////////////////////////////////// LIGHTBOX /////////////////////////////////////////////////////////////////
    let links = document.querySelectorAll('.media-content');
    let linksArray = Array.from(links);
    let currentImgIndex;

    links.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        displayLightBox(e.currentTarget);
        currentImgIndex = linksArray.indexOf(e.currentTarget);
    }));
    ////////////////////////////////////////////////////////////// BOUTONS PREV / NEXT 
    const prevBtn = document.getElementById("previous");
    const nextBtn = document.getElementById("nextBtn");
    // let currentImgIndex = 0;
    prevBtn.addEventListener("click", () => {
        currentImgIndex = currentImgIndex < 1 ? links.length - 1 : currentImgIndex - 1;
        displayLightBox(links[currentImgIndex]);
    });
    nextBtn.addEventListener("click", () => {
        currentImgIndex = currentImgIndex >= links.length - 1 ? 0 : currentImgIndex + 1;
        displayLightBox(links[currentImgIndex]);
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
/////////////////////////////////////////////////////////////////// MODALE //////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////// AJOUT NOM DU PHOTOGRAPHE
function displayFormTitle(photographers) {
    const modalTitle = document.getElementById('modalTitle');
    const currentPhotographer = photographers.find(photographer => photographer.id == URL_id);
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
    displayPhotographerPage(photographers, medias);
    displayFormTitle(photographers);
}
initPhotographer();