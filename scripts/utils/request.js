async function getPhotographers() {
    try {
        const request = await fetch('./data/photographers.json')
        const datas = await request.json()
        return datas;
    } catch (error) {
        alert("Les données n'ont pas été récupérées");
    }
}