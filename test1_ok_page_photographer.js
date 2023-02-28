/////////////////////////////////////  récupération des données du photographe
const url = new URL(document.location);
const searchParams = url.searchParams;
const ID = searchParams.get('id');

async function getPhotographerDatas() {
    const { photographers } = await getPhotographers();
    const photographerDatas = photographers.find(photographer => photographer.id == ID);

    const photographHeader = document.getElementById('photograph-header');

    const div = document.createElement('div');
    div.setAttribute("class", "div-text");
    photographHeader.prepend(div);
    //////////////////
    const p2 = document.createElement('p');
    p2.textContent = photographerDatas.tagline;
    div.prepend(p2);

    const p1 = document.createElement('p');
    p1.textContent = photographerDatas.city + ", " + photographerDatas.country;
    div.prepend(p1);

    const h2 = document.createElement('h2');
    h2.textContent = photographerDatas.name;
    div.prepend(h2);
    /////////////////////
    const img = document.createElement('img');
    const path = `assets/photographers/${photographerDatas.portrait}`;
    img.setAttribute("src", path);
    img.setAttribute("class", "portrait");
    photographHeader.appendChild(img);

};
getPhotographerDatas();


// async function getMediaDatas() {
//     const { medias } = await getPhotographers();

//     [...medias].forEach(media => {
//         if (media.photographerId == ID) {
//             const photographMedias = document.getElementById('photograph-medias');
//             const img = document.createElement('img');
//             const path = media.image;
//             const imgPath = `assets/Sample_photos/${path}`;
//             img.setAttribute("src", imgPath);
//             img.setAttribute("class", "photo");
//             photographMedias.appendChild(img);
//         }
//     });
// }
// getMediaDatas();
