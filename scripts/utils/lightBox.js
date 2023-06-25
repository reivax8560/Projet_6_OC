const closeLB = document.getElementById('closeLB');
const lightbox_bg = document.getElementById("lightbox_bg");
const lightBox = document.getElementById("lightBox");
let slide;
let title;

function displayLightBox(media) {
    ///////////////////////////////////////////// AFFICHAGE LIGHTBOX
    lightbox_bg.style.display = "block";
    lightbox_bg.ariaHidden = 'false';
    header.ariaHidden = 'true';
    main.ariaHidden = 'true';
    body.className = "body-scroll-none";
    lightBox.focus();
    ////////////////////////////////////////////// CREATION DU MEDIA
    if (media.dataset.type === 'photo') {
        slide = document.createElement('img');
        slide.className = "slide";
        slide.setAttribute("alt", media.dataset.title);
        slide.setAttribute('src', `./assets/medias/${media.dataset.path}`);
        title = document.createElement('h2');
        title.textContent = media.dataset.title;
    }
    else if (media.dataset.type === 'video') {
        slide = document.createElement('video');
        slide.setAttribute("controls", "");
        slide.setAttribute("alt", media.dataset.title);
        slide.className = "slide";
        const source = document.createElement('source');
        source.setAttribute("src", `./assets/medias/${media.dataset.path}`);
        source.setAttribute("type", "video/mp4");
        slide.appendChild(source);
        title = document.createElement('h2');
        title.textContent = media.dataset.title;
    }
    lightBox.setAttribute('aria-label', media.dataset.title);
    media.setAttribute("data-onfocus", "true");
    ///////////////////////////// AFFICHAGE DU MEDIA DANS LA LIGHTBOX
    const mediaContainer = document.getElementById('mediaContainer');
    while (mediaContainer.firstChild) {
        mediaContainer.removeChild(mediaContainer.firstChild);
    }
    mediaContainer.appendChild(slide);
    mediaContainer.appendChild(title);
}

function closeLightbox(medias) {
    lightbox_bg.style.display = "none";
    lightbox_bg.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'false');
    body.className = "";

    medias.forEach(media => {
        if (media.dataset.onfocus == "true") {
            media.focus();
        }
        media.dataset.onfocus = "";
    });
}
