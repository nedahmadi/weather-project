let now = new Date();

let h7 = document.querySelector("h7");

let date = now.getDate();

let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h7.innerHTML = `${day},${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      
           <div class="col-2">
             <div class="weather-forecast-date">${formatDay(
               forecastDay.dt
             )}</div>
            
             <img
             class="weather-sun"
             src="https://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png"
             alt=""
             width="40"
             />
             <div class="weather-forecast-temperature">
               <span class="weather-forecast-temperature-max">
               ${Math.round(forecastDay.temp.max)}°
                 </span>
                 <span class="weather-forecast-temperature-min">
                  ${Math.round(forecastDay.temp.min)}°
                 </span>
             </div>
           </div>`;
    }
  });

  forecast = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d2ced9a51dfc32ccb0ae22ecfcd93888";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#himidi").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();

  let apiKey = "d2ced9a51dfc32ccb0ae22ecfcd93888";
  let city = document.querySelector("#search").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let fahrenheitlink = document.querySelector("#fahrenheitlink");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsiuslink");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
