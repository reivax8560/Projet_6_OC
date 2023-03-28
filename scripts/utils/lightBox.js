const closeLB = document.getElementById('closeLB');
const lightbox_bg = document.getElementById("lightbox_bg");


function displayLightBox(link) {
    ///////////////////////////////////////////// AFFICHAGE LIGHTBOX
    const lightbox_bg = document.getElementById('lightbox_bg');
    lightbox_bg.style.display = "block";
    lightbox_bg.ariaHidden = 'false';
    header.ariaHidden = 'true';
    main.ariaHidden = 'true';
    body.className = "body-scroll-none";
    ///////////////////////////////////////////// CREATION IMAGE + TITRE
    const slide = document.createElement('img');
    slide.setAttribute('src', `./assets/Sample_Photos/${link.dataset.path}`);
    slide.className = "slide";
    const title = document.createElement('h2');
    title.textContent = link.dataset.title;
    ///////////////////////////////////////////// AFFICHAGE DU MEDIA DANS LA LIGHTBOX
    const mediaContainer = document.getElementById('mediaContainer');
    while (mediaContainer.firstChild) {
        mediaContainer.removeChild(mediaContainer.firstChild);
    }
    mediaContainer.appendChild(slide);
    mediaContainer.appendChild(title);
}

function closeLightbox() {
    lightbox_bg.style.display = "none";
    lightbox_bg.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'false');
    body.className = "";
    // faut il faire un removeEventListener pour l'accès au clavier ???
}

function nextPhoto() {

}






