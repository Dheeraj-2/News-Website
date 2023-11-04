const API_KEY="895871fc9d364d1bbd167c373d111451";
const url="https://newsapi.org/v2/everything?q=";  

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}


function bindData(articles) {
  const cardsContainer = document.getElementById('cards-container');
  const newsCardTemplates = document. getElementById('template-news-card');

  cardsContainer.innerHTML ='';

  articles.forEach((articles )=> {
    if (! articles.urlToImage) return;
    const cardClone = newsCardTemplates.content.cloneNode(true);
    fillDataInCard(cardClone,articles);
    cardsContainer. appendChild(cardClone);
  });

}

function fillDataInCard(cardClone,articles){
  const newsImg = cardClone .querySelector('#news-img');
  const newsTitle = cardClone .querySelector('#news-title');
  const newsSource = cardClone .querySelector('#news-source');
  const newsDesc =    cardClone .querySelector('#news-desc');

  newsImg.src = articles.urlToImage;
  newsTitle.innerHTML = articles.title;
  newsDesc.innerHTML = articles.description;


   /* function method is also work for the DATE*/
      //  function update() {
      //   let now  = new Date();
      //   let newstring = now.toLocaleDateString();
      //   newsSource.textContent = newstring; 
      //  }
      //  update();


  const date = new Date(articles.publishedAt).toLocaleString("en-US",{
    timeZone: "Asia/Jakarta",
  });
 newsSource.innerHTML = `${articles.source.name} · ${date}`;

 cardClone.firstElementChild.addEventListener("click", () => {
  window.open(articles.url, "-blank");
 });

}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav . classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
  
});


