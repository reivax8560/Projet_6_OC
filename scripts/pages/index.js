//////////////////////////////////////////////////////////////  RECUPERATION DES DONNEES JSON
async function getPhotographers() {
    try {
        const request = await fetch('../data/photographers.json')
        const datas = await request.json()
        return datas;
    } catch (error) {
        alert("Les données n'ont pas été récupérées");
    }
}

////////////////////////////////////// AJOUTE LA VIGNETTE DE CHAQUE PHOTOGRAPHE A LA PAGE HTML
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer); // renvoie nom + photo du photographe + méthode getUserCardDOM
        const userCardDOM = photographerModel.getUserCardDOM(); // retourne le modèle html de la vignette => POURQUOI ?? DEJA FAIT AVANT NON ?!? => même utilisation que this
        photographersSection.appendChild(userCardDOM); // ajoute la vignette de chaque photographe à la page
    });
}

//////////////////////////////////////////////////////////////    FONCTION D'EXECUTION GLOBALE
async function init() {
    const { photographers } = await getPhotographers(); // récupère les datas JSON pour les mettre dans un objet ??? => appelle la prop photgr de l'objet (destructuration JS)
    displayData(photographers); // exécute displayData sur l'objet photographers
}

init();

