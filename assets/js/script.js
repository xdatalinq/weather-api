// Variables
var searchFormEl = document.querySelector("#search-form");
var apiContainer = document.getElementById('api-container');
var cityInputEl = document.querySelector('#city');
var apiContainerEl = document.querySelector(".api-container");
var apiKey = "7c31afcd6af2016f309312b62ff32ba8";
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=7c31afcd6af2016f309312b62ff32ba8';


// Handlers
var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log("form submit caught!");
  var city = cityInputEl.value.trim();
  if (city) {
    console.log(city);
    getWeather(city);
    apiContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city name!");
  }
};

// Fetch
var getWeather = function(city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=7c31afcd6af2016f309312b62ff32ba8';
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          //displayWeather(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to GitHub");
    });
};

// Event listeners
searchFormEl.addEventListener("submit", formSubmitHandler);


// Fetch
// function getApi() {
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // Use the console to examine the response
//       console.log(data);
//       Loop through the data and generate your HTML
//       for(counter=0; i < data.length ; i++){
//         //console.log(i);
//         var cityNameEl = document.createElement("h1");
//         cityNameEl.innerText = data[i].CITY;
//         apiContainer.appendChild(cityNameEl);
//         var tempEl = document.createElement("h5");
//         tempEl.innertext = data[i].TEMPERATURE;
//         apiContainer.appendChild(tempEl);
//         var windEl = document.createElement("h5");
//         windEl.innertext = data[i].WIND;
//         apiContainer.appendChild(windEl);
//         var humidityEl = document.createElement("h5");
//         humidityEl.innertext = data[i].HUMIDITY;
//         apiContainer.appendChild(humidityEl);
//         var uvIndexEl = document.createElement("h5");
//         uvIndexEl.innertext = data[i].UVINDEX;
//         apiContainer.appendChild(uvIndexEl);
//       } 
//   });
// }