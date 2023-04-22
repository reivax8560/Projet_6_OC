//////////////////////////////// CREATION DU MEDIA ////////////////////////////
function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function getAllMedias() {
        //////////////////////////////////////////////////// ARTICLE
        const article = document.createElement('article');
        article.className = 'article';
        article.setAttribute('data-popularity', likes);
        article.setAttribute('data-title', title);
        article.setAttribute('data-date', date);
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
        heartIcon.setAttribute('data-clicked', false);
        heartIcon.setAttribute('tabindex', '0');

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
            vid.setAttribute("data-type", 'video');
            vid.setAttribute("data-path", video);
            vid.setAttribute("data-title", title);
            vid.setAttribute('tabindex', '0');
            vid.className = 'media-content';
            const source = document.createElement('source');
            source.setAttribute("src", `assets/Sample_photos/${video}`);
            source.setAttribute("type", "video/mp4");
            vid.appendChild(source);
            article.appendChild(vid);
            article.appendChild(comments);
            ///////////////////////////////////////////////// MEDIA PHOTO
        } else if (image) {
            const img = document.createElement('img');
            img.setAttribute("src", `./assets/Sample_photos/${image}`);
            img.setAttribute("alt", "");
            img.setAttribute("data-type", 'photo');
            img.setAttribute("data-path", image);
            img.setAttribute("data-title", title);
            img.setAttribute('tabindex', '0');
            img.className = 'media-content';
            article.appendChild(img);
            article.appendChild(comments);
        }
        return (article)
    }

    return { getAllMedias, id }
}


