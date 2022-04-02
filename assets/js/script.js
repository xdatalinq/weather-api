// Variables
var searchFormEl = document.querySelector("#search-form");
var apiContainerEl = document.querySelector("#main-weather");
var cityInputEl = document.querySelector('#city');


// Submit form handler
var formSubmitHandler = function(event) {
  event.preventDefault();
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

// Fetch weather
var getWeather = function(city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=7c31afcd6af2016f309312b62ff32ba8';
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayWeather(data);
          
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    });
};

// Fetch UV index
var fetchUVindex = function(lat, lon) {
  console.log('Fetch UV index start' + lat + lon);
  var apiURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=7c31afcd6af2016f309312b62ff32ba8&lat='+ lat +'&lon='+ lon;
  fetch(apiURL)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          var uvIndex = data.value;
          displayUVindex(uvIndex);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather UV index");
    });   
};

// Dislay weather, api-container
var displayWeather = function(data) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  console.log(lat);
  console.log(lon);
  var cityNameEl = document.createElement("h3");
  cityNameEl.innerText = data.name;
  apiContainerEl.appendChild(cityNameEl);
  var currentDateEl = document.createElement("h3");
  currentDateEl.innerText = moment().format("dddd, MMMM Do");
  apiContainerEl.appendChild(currentDateEl);
  var tempEl = document.createElement("h5");
  tempEl.innerText = data.main.temp;
  apiContainerEl.appendChild(tempEl);
  var windEl = document.createElement("h5");
  windEl.innerText = data.wind.speed;
  apiContainerEl.appendChild(windEl);
  var humidityEl = document.createElement("h5");
  humidityEl.innerText = data.main.humidity;
  apiContainerEl.appendChild(humidityEl);
  fetchUVindex(lat, lon);
};

// Display UV index, api-container
var displayUVindex = function(uvi) {
  console.log('DisplayUVindex:' + uvi);
  var uvIndexEl = document.createElement("h5");
  uvIndexEl.innerText = uvi;
  apiContainerEl.appendChild(uvIndexEl);
};

// Event listeners
searchFormEl.addEventListener("submit", formSubmitHandler);


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