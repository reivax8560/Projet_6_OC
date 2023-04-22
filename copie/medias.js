//////////////////////////////// CREATION DU MEDIA ////////////////////////////
function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function getMediasGrid() {
        //////////////////////////////////////////////////// LIEN
        const link = document.createElement('a');
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
        heartIcon.setAttribute('data-likes', likes);

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
            link.setAttribute("data-path", video);
            link.setAttribute("data-type", 'video');
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
            link.setAttribute("data-path", image);
            link.setAttribute("data-type", 'photo');
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

    return { getMediasGrid, id }
}


