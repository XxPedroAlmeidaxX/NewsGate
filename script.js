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
        item.category = category;
        item.uuid = createUUID();
    });
    news[category] = newsToSave;
    localStorage.setItem("news", JSON.stringify(news));
}

function createUUID() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function renderNews(news, list) {
    news.forEach(item => {
        list.innerHTML += `<li><a href='noticia.html?article_id=${item.uuid}&category=${item.category}'>${item.title}</a></li>`;
    });
    list.innerHTML += `<li><a href='#'>Mais notícias...</a></li>`;
}

function setArticle() {
    let params = getUrlParams(window.location.href);
    let news = JSON.parse(localStorage.getItem("news"));

    news = news[params.category];
    let article = news.find(item => {
        //noinspection JSUnresolvedVariable
        if (item.uuid === params.article_id)
            return item;
    });

    renderArticle(article);
}

function renderArticle(article) {
    let articleElement = document.getElementById("articleElement");
    //noinspection JSUnresolvedVariable
    articleElement.innerHTML =
        `<header>
            <h1>${article.title}</h1>
            <p>${article.author || article.source.name}, 
                <time datetime='${article.publishedAt}'>${formatDate(article.publishedAt)}</time>
            </p>
         </header>
         
         <figure>
            <img src='${article.urlToImage || ""}' alt="Imagem da Notícia"/>
         </figure>
         
         <p>${article.description || ""}</p>
         <p>${article.content || ""}</p>
         <p>Source: ${article.url}</p>`;
}

function formatDate(dateToFormat) {
    let date = new Date(dateToFormat);
    return date.toLocaleDateString('pt-br', {timeZone: 'UTC'});
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
