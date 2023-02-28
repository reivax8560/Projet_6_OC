//////////////////////////////////////////////////// CREATION DU MEDIA
function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;
    const article = document.createElement('article');
    article.setAttribute("aria-label", "");
    const img = document.createElement('img');
    img.setAttribute("src", `assets/Sample_photos/${image}`);
    img.setAttribute("alt", "");
    img.setAttribute("class", "photo");
    article.appendChild(img);

    return (article);
}

//////////////////////////////////////////////////////////////////////////// CREATION DU HEADER TEST
// function headerFactory(datas) {
//     const { id, tagline, city, country, name, portrait } = datas;
//     const photographerDatas = datas.find(photographer => photographer.id == ID);

//     const div = document.createElement('div');
//     div.setAttribute("class", "div-text");

//     const p2 = document.createElement('p');
//     p2.textContent = photographerDatas.tagline;
//     div.prepend(p2);

//     const p1 = document.createElement('p');
//     p1.textContent = photographerDatas.city + ", " + photographerDatas.country;
//     div.prepend(p1);

//     const h2 = document.createElement('h2');
//     h2.textContent = photographerDatas.name;
//     div.prepend(h2);

//     const img = document.createElement('img');
//     const path = `assets/photographers/${photographerDatas.portrait}`;
//     img.setAttribute("src", path);
//     img.setAttribute("class", "portrait");

//     return { div, img }
// }
