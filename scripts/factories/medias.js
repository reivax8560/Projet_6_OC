//////////////////////////////// CREATION DU MEDIA ////////////////////////////
function mediaFactory(datas, photographerId, mediasgrid) {
    const medias = datas.filter((data) => data.photographerId == photographerId);
    const mediasContainer = mediasgrid;

    function createAllMediasHTML() {
        let totalLikes = 0;
        medias.forEach(media => {
            const { id, photographerId, title, image, video, likes, date, price } = media;
            totalLikes += likes;
            //////////////////////////////////////////////////// ARTICLE
            const article = document.createElement('article');
            article.className = 'article';
            article.setAttribute('data-popularity', likes);
            article.setAttribute('data-title', title);
            article.setAttribute('data-date', date);
            article.setAttribute('role', 'link');
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
            /////////////////////////////////////////////////// DATE
            // const mediaDate = document.createElement('p');
            // mediaDate.textContent = date;
            // article.appendChild(mediaDate);
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
                vid.setAttribute('aria-label', `${title}, closeup view`);
                vid.className = 'media-content';
                const source = document.createElement('source');
                source.setAttribute("src", `./assets/medias/${video}`);
                source.setAttribute("type", "video/mp4");
                vid.appendChild(source);
                article.appendChild(vid);
                article.appendChild(comments);
                ///////////////////////////////////////////////// MEDIA PHOTO
            } else if (image) {
                const img = document.createElement('img');
                img.setAttribute("src", `./assets/medias/${image}`);
                img.setAttribute("alt", "");
                img.setAttribute("data-type", 'photo');
                img.setAttribute("data-path", image);
                img.setAttribute("data-title", title);
                img.setAttribute('tabindex', '0');
                img.setAttribute('aria-label', `${title}, closeup view`);
                img.className = 'media-content';
                article.appendChild(img);
                article.appendChild(comments);
            }
            mediasContainer.appendChild(article);
        })
        function getTotalLikes() {
            return (totalLikes)
        }
        return { getTotalLikes }
    }
    function sortByPopularity() {
        function byPopularity(a, b) {
            return b.likes - a.likes;
        }
        medias.sort(byPopularity);
        mediasContainer.innerHTML = "";
        createAllMediasHTML();
    }
    function sortByTitle() {
        function byTitle(a, b) {
            return a.title.localeCompare(b.title);
        }
        medias.sort(byTitle);
        mediasContainer.innerHTML = "";
        createAllMediasHTML();
    }
    function sortByDate() {
        function byDate(a, b) {
            return new Date(b.date) - new Date(a.date);
        }
        medias.sort(byDate);
        mediasContainer.innerHTML = "";
        createAllMediasHTML();
    }
    return { createAllMediasHTML, sortByPopularity, sortByTitle, sortByDate }
}