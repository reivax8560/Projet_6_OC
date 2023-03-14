//////////////////////////////// CREATION DU MEDIA ////////////////////////////
function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function getMediasGrid() {
        //////////////////////////////////////////////////// LIEN
        const link = document.createElement('a');
        link.setAttribute("data-id", image);
        link.setAttribute("data-title", title);
        link.className = 'media-link';
        //////////////////////////////////////////////////// ARTICLE
        const article = document.createElement('article');
        article.setAttribute("aria-label", "");
        article.className = 'article';
        //////////////////////////////////////////////////// TITRE MEDIA
        const mediaName = document.createElement('p');
        mediaName.textContent = title;
        mediaName.className = 'titre-media';
        //////////////////////////////////////////////////// LIKES MEDIA
        const mediaLikes = document.createElement('p');
        mediaLikes.textContent = likes;
        mediaLikes.className = 'likes-media';
        const heartIcon = document.createElement('i');
        heartIcon.className = 'fa-solid fa-heart fa-lg heart-media';
        heartIcon.setAttribute("aria-label", "likes");
        const divLikes = document.createElement('div');
        divLikes.className = 'div-likes';
        divLikes.appendChild(mediaLikes);
        divLikes.appendChild(heartIcon);
        /////////////////////////////////////////////////// TITRE + LIKES
        const comments = document.createElement('div');
        comments.className = 'comments';
        comments.appendChild(mediaName);
        comments.appendChild(divLikes);
        //////////////////////////////////////////////////// MEDIA VIDEO
        if (video) {
            const vid = document.createElement('video');
            vid.setAttribute("controls", "");
            vid.setAttribute("alt", "");
            vid.className = 'video';
            const source = document.createElement('source');
            source.setAttribute("src", `assets/Sample_photos/${video}`);
            source.setAttribute("type", "video/mp4");
            vid.appendChild(source);
            article.appendChild(vid);
            article.appendChild(comments);
            link.appendChild(article);
            ///////////////////////////////////////////////// MEDIA PHOTO
        } else if (image) {
            const img = document.createElement('img');
            img.setAttribute("src", `./assets/Sample_photos/${image}`);
            img.setAttribute("alt", "");
            img.className = 'photo';
            article.appendChild(img);
            article.appendChild(comments);
            link.appendChild(article);
        }
        return (link)
    }

    function getLightBox(path, name) {

        const item = document.createElement('li');
        item.className = "item";
        const close = document.createElement('i');
        close.className = "fa-solid fa-xmark fa-3x close";
        const previous = document.createElement('i');
        previous.className = "fa-solid fa-chevron-left fa-3x previous";
        const div = document.createElement('div');

        const slide = document.createElement('img');
        slide.setAttribute('src', `./assets/Sample_Photos/${path}`);
        slide.className = "slide";

        const title = document.createElement('h2');
        title.textContent = name;
        const next = document.createElement('i');
        next.className = "fa-solid fa-chevron-right fa-3x next";

        div.appendChild(slide);
        div.appendChild(title);
        item.appendChild(close);
        item.appendChild(previous);
        item.appendChild(div);
        item.appendChild(next);

        return (item)
    }

    // function getLightBox(path, name) {

    //     const item = document.createElement('li');
    //     item.className = "item";
    //     const close = document.createElement('i');
    //     close.className = "fa-solid fa-xmark fa-3x close";
    //     const previous = document.createElement('i');
    //     previous.className = "fa-solid fa-chevron-left fa-3x previous";
    //     const div = document.createElement('div');
    //     const title = document.createElement('h2');
    //     title.textContent = name;
    //     const next = document.createElement('i');
    //     next.className = "fa-solid fa-chevron-right fa-3x next";

    //     if (video) {
    //         const vid = document.createElement('video');
    //         vid.setAttribute("controls", "");
    //         vid.setAttribute("alt", "");
    //         const source = document.createElement('source');
    //         source.setAttribute("src", `./assets/Sample_photos/${path}`);
    //         source.setAttribute("type", "video/mp4");
    //         vid.appendChild(source);
    //         div.appendChild(vid);
    //         div.appendChild(title);
    //         item.appendChild(close);
    //         item.appendChild(previous);
    //         item.appendChild(div);
    //         item.appendChild(next);

    //     } else if (image) {
    //         const slide = document.createElement('img');
    //         slide.setAttribute('src', `./assets/Sample_Photos/${path}`);
    //         slide.className = "slide";
    //         div.appendChild(slide);
    //         div.appendChild(title);
    //         item.appendChild(close);
    //         item.appendChild(previous);
    //         item.appendChild(div);
    //         item.appendChild(next);
    //     }

    //     return (item)
    // }

    return { getMediasGrid, getLightBox, id }
}

