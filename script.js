function getNews(category, callback) {
    let endpoint = `https://newsapi.org/v2/top-headlines?country=br&category=${category}&apiKey=${apiKey}`;

    fetch(endpoint).then(response => {
        return response.json();
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
    }).then(data => {
        //noinspection JSUnresolvedVariable
        let news = data.articles.slice(0, 5);
        saveNews(category, news);
        callback(news);
    });
}

function saveNews(category, newsToSave) {
    let news = JSON.parse(localStorage.getItem("news"));
    newsToSave.forEach(item => {
        item.uuid = createUUID();
    })
    news[category] = newsToSave;
    localStorage.setItem("news", JSON.stringify(news));
}

function createUUID() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function setNews() {
    localStorage.setItem("news", "{}");

    getNews("technology", news => {
        renderNews(news, document.getElementById("technologyList"));
    });

    getNews("entertainment", news => {
        renderNews(news, document.getElementById("entertainmentList"));
    });

    getNews("business", news => {
        renderNews(news, document.getElementById("businessList"));
    });

    getNews("science", news => {
        renderNews(news, document.getElementById("scienceList"));
    });

    getNews("health", news => {
        renderNews(news, document.getElementById("healthList"));
    });

    getNews("sports", news => {
        renderNews(news, document.getElementById("sportsList"));
    });
}

function renderNews(news, list) {
    news.forEach(item => {
        list.innerHTML += `<li><a href='noticia.html?article_id=${item.uuid}'>${item.title}</a></li>`;
    })
    list.innerHTML += `<li><a href='#'>Mais notícias...</a></li>`;
}


function setArticle() {
    let articleId = getUrlParams(window.location.href);
    console.log(articleId)
}

function getUrlParams(url) {
    let params = {};
    let parser = document.createElement('a');
    parser.href = url;
    let query = parser.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
}
