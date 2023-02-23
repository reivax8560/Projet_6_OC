//////////////////////////////////////////////////////////////  RECUPERATION DES DONNEES JSON
async function getPhotographers() {
    const jsonDatas = await fetch('../data/photographers.json')
        .then(request => request.json()) // Attend la réception des données puis convertit en json
        .then(datas => {
            return datas; // Attend la conversion json puis retourne les données
        });
    return jsonDatas;
}           // => FAUT IL RENVOYER UN MESSAGE SI LA REQUETE NE FONCTIONNE PAS ??

////////////////////////////////////// AJOUTE LA VIGNETTE DE CHAQUE PHOTOGRAPHE A LA PAGE HTML
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer); // renvoie nom + photo du photographe, puis le modèle html de la vignette
        const userCardDOM = photographerModel.getUserCardDOM(); // retourne le modèle html de la vignette => POURQUOI ?? DEJA FAIT AVANT NON ?!?
        photographersSection.appendChild(userCardDOM); // ajoute la vignette de chaque photographe à la page
    });
};

//////////////////////////////////////////////////////////////    FONCTION D'EXECUTION GLOBALE
async function init() {
    const { photographers } = await getPhotographers(); // récupère les datas JSON pour les mettre dans un objet ???
    displayData(photographers); // exécute displayData sur l'objet photographers
};

init();

