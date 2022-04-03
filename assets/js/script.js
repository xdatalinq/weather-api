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
  var cityNameEl = document.createElement("h3");
  var currentDateEl = document.createElement("h3");
  var iconEl = document.createElement("img");
  var tempEl = document.createElement("h5");
  var windEl = document.createElement("h5");
  var humidityEl = document.createElement("h5");
  currentDateEl.innerText = moment().format("dddd, MMMM Do");
  cityNameEl.innerText = data.name;
  tempEl.innerText = data.main.temp;
  windEl.innerText = data.wind.speed;
  humidityEl.innerText = data.main.humidity;
  iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'.png');
  apiContainerEl.appendChild(cityNameEl);
  apiContainerEl.appendChild(currentDateEl);
  apiContainerEl.appendChild(iconEl);
  apiContainerEl.appendChild(tempEl);
  apiContainerEl.appendChild(windEl);
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