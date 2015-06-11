var GoogleAPI = {
  endpoint: "https://www.googleapis.com/youtube/v3/search",
  apikey: "AIzaSyC6BWTaMVzermwfUBvlUB-yn0uAZZWyLds"
};
      

function formatTitle(title){
  var container = document.createElement("span");
  container.classList.add("title");
  container.textContent = title;
  return container;
}

function formatChannelName(name){
  var container = document.createElement("span");
  container.classList.add("Channel");
  container.textContent = name;
  return container;
}

function formatArtwork(url){
  var container = document.createElement("img");
  container.classList.add("artwork");
  container.src = url;
  return container;
}

function createLink(videoid){
  var link = document.createElement("a");
  link.href= "https://www.youtube.com/watch?v=" + videoid;
  return link;
}

function formatItem(item){
  var li = document.createElement("li");
  var name = formatTitle(item.snippet.title);
  var artwork = formatArtwork(item.snippet.thumbnails.high.url);
  var channel = formatChannelName(item.snippet.channelTitle);
  var link = createLink(item.id.videoId);
  link.appendChild(artwork);
  link.appendChild(name);
  link.appendChild(channel);
  li.appendChild(link);
  return li;
}

function showSearchResult(data){
  console.log("start formatting search result");
  console.log(data);
  var i = 0;
  var container = document.querySelector("#result");
  var ul = document.createElement("ul");
  while(i < data.items.length){
    ul.appendChild(formatItem(data.items[i]));
    i = i + 1;
  }
  container.appendChild(ul);
}

function sendQuery(params){
  var request=gapi.client.request({
    path:"/youtube/v3/search",
    params: params
  });
  request.execute(showSearchResult);
}

function createParameter(title){
  return {
    part: "snippet",
    q: title,
    type:"video"
  };
}

function search(){
  var input = document.querySelector("#keyword");
  var keyword = input.value;
  if(keyword.length > 0){
    sendQuery(createParameter(keyword));
  }
}

function start(){
  console.log("start app");
  var button = document.querySelector("#start");
  button.addEventListener("click", search);
}

function loadClient(){
  console.log("start loading Youtube client");
  gapi.client.load("youtube", "v3").then(start);
}

function initialize(){
  console.log("initializing with a api key:" + GoogleAPI.apikey);
  gapi.client.setApiKey(GoogleAPI.apikey);
  loadClient();
}

window.addEventListener("load", initialize);
