/*
API call
https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
*/

var apiContainer = document.getElementById('api-container');
var searchButton = document.getElementById('search-btn');
var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat='+"lat"+'&lon='+"lon"+'&appid='+"apiKey"+';'"
var lat = "";
var lon = "";
var part = "";
var apiKey = "7c31afcd6af2016f309312b62ff32ba8";

searchButton.addEventListener('click', getApi);

function getApi() {
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);
      // TODO: Loop through the data and generate your HTML
      for(counter=0; i < data.length ; i++){
        //console.log(i);
        var cityNameEl = document.createElement("h1");
        cityNameEl.innerText = data[i].CITY;
        apiContainer.appendChild(cityNameEl);
        var tempEl = document.createElement("h5");
        tempEl.innertext = data[i].TEMPERATURE;
        apiContainer.appendChild(tempEl);
        var windEl = document.createElement("h5");
        windEl.innertext = data[i].WIND;
        apiContainer.appendChild(windEl);
        var humidityEl = document.createElement("h5");
        humidityEl.innertext = data[i].HUMIDITY;
        apiContainer.appendChild(humidityEl);
        var uvIndexEl = document.createElement("h5");
        uvIndexEl.innertext = data[i].UVINDEX;
        apiContainer.appendChild(uvIndexEl);
      }
    });
}

