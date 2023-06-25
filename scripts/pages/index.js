////////////////////////////////////// AJOUTE LA VIGNETTE DE CHAQUE PHOTOGRAPHE A LA PAGE HTML
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}
//////////////////////////////////////////////////////////////    FONCTION D'EXECUTION GLOBALE
async function initIndex() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

initIndex();

