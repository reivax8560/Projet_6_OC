function photographerFactory(data, header, infoBox) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `../assets/photographers/${portrait}`;
    /////////////////////////////// CREATION VIGNETTE PHOTOGRAPHE (PAGE ACCUEIL)
    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("aria-label", "photographer presentation thumbnail");
        //// LIEN VERS PAGE PHOTOGRAPHE (IMG + H2)
        const link = document.createElement('a');
        link.setAttribute("href", `../photographer.html?id=${id}`);
        link.setAttribute("aria-label", name);
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        const h2 = document.createElement('h2');
        h2.setAttribute("aria-label", "photographer's name");
        h2.textContent = name;
        div.appendChild(img);
        link.appendChild(div);
        link.appendChild(h2);
        //////////////////////////////
        const p1 = document.createElement('p');
        p1.setAttribute("aria-label", "origin of the photographer");
        p1.className = 'ligne-1';
        p1.textContent = city + ", " + country;
        const p2 = document.createElement('p');
        p2.setAttribute("aria-label", "photographer's creed");
        p2.className = 'ligne-2';
        p2.textContent = tagline;
        const p3 = document.createElement('p');
        p3.setAttribute("aria-label", "photographer's fee");
        p3.className = 'ligne-3';
        p3.textContent = price + "€/jour";
        article.appendChild(link);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        return (article);
    }
    ///////////////////////////// CREATION HEADER PHOTOGRAPHE (PAGE PHOTOGRAPHE)
    function createHeader() {
        const divText = document.createElement('div');
        divText.className = 'div-text';
        const p2 = document.createElement('p');
        p2.className = 'tagline';
        p2.textContent = tagline;
        divText.prepend(p2);
        const p1 = document.createElement('p');
        p1.className = 'origins';
        p1.textContent = city + ", " + country;
        divText.prepend(p1);
        const h1 = document.createElement('h1');
        h1.className = 'name';
        h1.setAttribute("aria-label", "photographer's name");
        h1.textContent = name;
        divText.prepend(h1);
        ////////////////////////////////////////
        const divPhoto = document.createElement('div');
        divPhoto.className = 'div-photo';
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.className = 'portrait';
        divPhoto.appendChild(img);
        ///////////////////////////////////////
        header.prepend(divText);
        header.append(divPhoto);
    }
    ////////////////////////////////////////////////// CREATION PRIX PHOTOGRAPHE
    function createInfoBox() {
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `${price}€ / jour`;
        // return priceParagraph;
        infoBox.append(priceParagraph);
    }

    return { name, picture, getUserCardDOM, createHeader, createInfoBox }
}