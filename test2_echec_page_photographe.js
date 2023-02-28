///////////////////////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const ID = urlParams.get('id');


//////////////////////////////////////////////////////////////////////////////////// CREATION HEADER PHOTOGRAPHE TEST
function displayHeader(datas) {
    const photographHeader = document.getElementById('photograph-header');
    const headerDatas = headerFactory(datas);
    const headerDiv = headerDatas[0];
    const headerImg = headerDatas[1];
    photographHeader.prepend(headerDiv);
    photographHeader.append(headerImg);
}

//////////////////////////////////////////////////////////////////////////////////////////////////// INIT HEADER TEST
async function initHeader() {
    const { photographers } = await getPhotographers();
    displayHeader(photographers);
}
initHeader();

/////////////////////////////////////////// CREATION DES MEDIAS PHOTOGRAPHE
function displayMedias(medias) {
    const photographMedias = document.getElementById('photograph-medias');
    medias.forEach((media) => {
        if (media.photographerId == ID) {
            const allMedias = mediaFactory(media);
            photographMedias.appendChild(allMedias);
        }
    });
}

////////////////////////////////////////////////////////////// INIT MEDIAS
async function initMedias() {
    const { medias } = await getPhotographers();
    displayMedias(medias);
}
initMedias();