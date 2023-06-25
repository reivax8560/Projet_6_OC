//////////////////////////////// CREATION DU MEDIA ////////////////////////////
function mediaFactory(currentMedias, mediasgrid) {

    function displayMedias() {
        let totalLikes = 0;
        currentMedias.forEach(media => {
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
            mediaLikes.className = 'nb-likes';

            const heartBtn = document.createElement("button");
            heartBtn.className = "heart-btn";
            heartBtn.setAttribute("aria-label", "likes");
            heartBtn.setAttribute('tabindex', '0');

            const heartIcon = document.createElement('i');
            heartIcon.className = 'fa-solid fa-heart fa-lg heart-icon';
            heartIcon.setAttribute('data-likes', likes);
            heartIcon.setAttribute('data-clicked', false);

            const divLikes = document.createElement('div');
            divLikes.className = 'div-likes';
            divLikes.appendChild(mediaLikes);
            divLikes.appendChild(heartBtn);
            heartBtn.appendChild(heartIcon);
            /////////////////////////////////////////////////// TITRE + LIKES
            const comments = document.createElement('div');
            comments.className = 'comments';
            comments.appendChild(mediaName);
            comments.appendChild(divLikes);
            //////////////////////////////////////////////////// MEDIA VIDEO
            if (video) {
                const vid = document.createElement('video');
                vid.setAttribute("controls", "");
                vid.setAttribute("alt", title);
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
                img.setAttribute("alt", title);
                img.setAttribute("data-type", 'photo');
                img.setAttribute("data-path", image);
                img.setAttribute("data-title", title);
                img.setAttribute('tabindex', '0');
                img.setAttribute('aria-label', `${title}, closeup view`);
                img.className = 'media-content';
                article.appendChild(img);
                article.appendChild(comments);
            }
            mediasgrid.appendChild(article);
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
        currentMedias.sort(byPopularity);
        mediasgrid.innerHTML = "";
        displayMedias();
    }
    function sortByTitle() {
        function byTitle(a, b) {
            return a.title.localeCompare(b.title);
        }
        currentMedias.sort(byTitle);
        mediasgrid.innerHTML = "";
        displayMedias();
    }
    function sortByDate() {
        function byDate(a, b) {
            return new Date(b.date) - new Date(a.date);
        }
        currentMedias.sort(byDate);
        mediasgrid.innerHTML = "";
        displayMedias();
    }

    return { displayMedias, sortByPopularity, sortByTitle, sortByDate }
}