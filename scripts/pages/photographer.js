///////////////////////////////////////////////////////////// RECUPERATION ID URL
const url = new URL(document.location);
const urlParams = url.searchParams;
const ID = urlParams.get('id');

//////////////////////////////////////////////// CREATION DU HEADER PHOTOGRAPHE
async function displayHeader() {
    const { photographers } = await getPhotographers();
    const photographerDatas = photographers.find(photographer => photographer.id == ID);

    const photographHeader = document.getElementById('photograph-header');

    const div = document.createElement('div');
    div.setAttribute("class", "div-text");
    photographHeader.prepend(div);

    const p2 = document.createElement('p');
    p2.textContent = photographerDatas.tagline;
    div.prepend(p2);

    const p1 = document.createElement('p');
    p1.textContent = photographerDatas.city + ", " + photographerDatas.country;
    div.prepend(p1);

    const h2 = document.createElement('h2');
    h2.textContent = photographerDatas.name;
    div.prepend(h2);

    const img = document.createElement('img');
    const path = `assets/photographers/${photographerDatas.portrait}`;
    img.setAttribute("src", path);
    img.setAttribute("class", "portrait");
    photographHeader.appendChild(img);
}
displayHeader();


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