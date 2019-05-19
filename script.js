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
    getNews("technology", data => {
        render(data, document.getElementById("technologyList"))
    })

    getNews("entertainment", data => {
        render(data, document.getElementById("entertainmentList"))
    })

    getNews("business", data => {
        render(data, document.getElementById("businessList"))
    })

    getNews("science", data => {
        render(data, document.getElementById("scienceList"))
    })

    getNews("health", data => {
        render(data, document.getElementById("healthList"))
    })

    getNews("sports", data => {
        render(data, document.getElementById("sportsList"))
    })
}

function render(data, list) {
    for (let i = 0; i < 5; i++) {
        //noinspection JSUnresolvedVariable
        list.innerHTML += `<li><a href='noticia.html'>${data.articles[i].title}</a></li>`
    }
    list.innerHTML += `<li><a href='#'>Mais notícias...</a></li>`
}
