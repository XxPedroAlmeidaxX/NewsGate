function getNews(category, callback) {
    let endpoint = `https://newsapi.org/v2/top-headlines?country=br&category=${category}&apiKey=${apiKey}`

    fetch(endpoint).then(response => {
        return response.json()
    }).then(data => {
        return data
    }).catch(err => {
        console.log(err)
    }).then(data => {
        callback(data)
    })
}

function setNews() {
    let tecList = document.getElementById("technologyList")
    tecList.innerHTML = `
        <li><a href='noticia.html'>Notícia 1</a></li>
        <li><a href='noticia.html'>Notícia 2</a></li>
        <li><a href='noticia.html'>Notícia 3</a></li>
        <li><a href='noticia.html'>Notícia 4</a></li>
        <li><a href='noticia.html'>Notícia 5</a></li>
        <li><a href='#'>Mais notícias...</a></li>`
    getNews("technology", data => {
        for (let i = 0; i < 5; i++) {

        }
    })
}
