// Variables
var searchFormEl = document.querySelector("#search-form");
var apiContainerEl = document.querySelector("#main-weather");
var cityInputEl = document.querySelector('#city');
var historyButtonsEl = document.querySelector('#city-buttons');
var forecastCardsEl = document.querySelector('#weather-card-container');
var cardsArray = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]
var searchHistory = [];

// Submit form handler
var formSubmitHandler = function(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getWeather(city);
    formSubmitHistory(city);
    apiContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city name!");
  }
};

// History button handler
var historySubmitHandler = function(event) {
  var city = event.target.name;
  if (city) {
    getWeather(city);
    formSubmitHistory(city);
    apiContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city name!");
  }
};

// Submit form history, pop/unshift to array
var formSubmitHistory = function(city) {
  arrayLength = searchHistory.length
  if (arrayLength >= 8) {
    searchHistory.pop();
    searchHistory.unshift(city);
    displayHistoryButtons();
    saveHistory();
  } else {
    searchHistory.unshift(city);
    displayHistoryButtons();
    saveHistory();
  }
};

// Fetch weather
var getWeather = function(city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=7c31afcd6af2016f309312b62ff32ba8&units=metric';
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayWeather(data);
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
  var apiURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=7c31afcd6af2016f309312b62ff32ba8&units=metric&lat='+ lat +'&lon='+ lon;
  fetch(apiURL)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
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

// Fetch 5-day forecast
var fetchForecast = function(lat, lon) {
  var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?&units=metric&lat='+ lat +'&lon='+ lon +'&appid=7c31afcd6af2016f309312b62ff32ba8';
  fetch(apiURL)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayForecast(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather 5-day Forecast");
    });   
};

// Display weather, api-container
var displayWeather = function(data) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var cityNameEl = document.createElement("h3");
  var currentDateEl = document.createElement("h3");
  var iconEl = document.createElement("img");
  var tempEl = document.createElement("h5");
  var windEl = document.createElement("h5");
  var humidityEl = document.createElement("h5");
  currentDateEl.innerText = '('+ moment().format("MM/DD/YYYY") +')';
  cityNameEl.innerText = data.name;
  tempEl.innerText = 'Temp: ' + data.main.temp + '°C';
  windEl.innerText = 'Wind: ' + data.wind.speed + 'km/h';
  humidityEl.innerText = 'Humidity: ' + data.main.humidity + '%';
  iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'.png');
  iconEl.className = "icon-main";
  apiContainerEl.appendChild(cityNameEl);
  apiContainerEl.appendChild(currentDateEl);
  apiContainerEl.appendChild(iconEl);
  apiContainerEl.appendChild(tempEl);
  apiContainerEl.appendChild(windEl);
  apiContainerEl.appendChild(humidityEl);
  fetchUVindex(lat, lon);
  fetchForecast(lat, lon);
};

// Display UV index, api-container
var displayUVindex = function(uvi) {
  var uvIndexEl = document.createElement("h5");
  uvIndexEl.innerText = 'UV index: ' + uvi;
  apiContainerEl.appendChild(uvIndexEl);
};

// Display history buttons
var displayHistoryButtons = function() {
  historyButtonsEl.textContent = "";
  for (let i = 0; i < searchHistory.length; i++) {
    var buttonEl = document.createElement("button");
    buttonEl.classList = "search-btn";
    buttonEl.setAttribute("type", "submit");
    buttonEl.setAttribute("name", searchHistory[i]);
    buttonEl.textContent = searchHistory[i];
    historyButtonsEl.appendChild(buttonEl);
  }
};

// Display forecast
var displayForecast = function(data) {
  forecastCardsEl.textContent = "";
  for (let i = 0; i < cardsArray.length; i++) {
    var dateIndex = function(i) {
      switch (i) {
        case 0:
          dateIndex = 6
          break;
        case 1:
          dateIndex = 14
          break;
        case 2:
          dateIndex = 22
          break;
        case 3:
          dateIndex = 30
          break;
        case 4:
          dateIndex = 38
          break;  
        default:
          console.log("Default triggered in switch statement: displayForecast()");
          break;
      }
    };
    dateIndex(i);
    var cardEl = document.createElement("div");
    cardEl.classList = "card";
    var createCard = function(data) {
      console.log(data);
      var dateEl = document.createElement("h5");
      var thumbnailEl = document.createElement("img");
      var tempEl = document.createElement("h5");
      var windEl = document.createElement("h5");
      var humidityEl = document.createElement("h5");
      dateEl.textContent = data.list[dateIndex].dt_txt.split(" ")[0];
      dateEl.className = "card-date";
      thumbnailEl.setAttribute('src', 'http://openweathermap.org/img/wn/'+ data.list[i].weather[0].icon +'.png');
      thumbnailEl.className = "icon-card";
      tempEl.textContent = 'Temp: ' + data.list[dateIndex].main.temp + '°C';
      windEl.textContent = 'Wind: ' + data.list[dateIndex].wind.speed + 'km/h';
      humidityEl.textContent = 'Humidity: ' + data.list[dateIndex].main.humidity+ '%';
      cardEl.appendChild(dateEl);
      cardEl.appendChild(thumbnailEl);
      cardEl.appendChild(tempEl);
      cardEl.appendChild(windEl);
      cardEl.appendChild(humidityEl);
    };
    createCard(data);
    forecastCardsEl.appendChild(cardEl);
  };
};

// Event listeners
searchFormEl.addEventListener("submit", formSubmitHandler);
historyButtonsEl.addEventListener("click", historySubmitHandler);

// Save history
var saveHistory = function() {
  console.log("History saved!");
  localStorage.setItem("searchlog", JSON.stringify(searchHistory));
};

// Load history
var loadHistory = function() {
  console.log("History loaded!");
  var retrieveData = localStorage.getItem("searchlog");
  var storageHistory = JSON.parse(retrieveData) || [];
  for (let i = 0; i < storageHistory.length; i++) {
    var city = storageHistory[i];
    if (city) {
      searchHistory.push(city);
    } else {
      console.log("Nothing loaded from storage");
    } 
  };
  displayHistoryButtons();
}; 
loadHistory();