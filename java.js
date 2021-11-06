let now = new Date();
let h7 = document.querySelector("h7");
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

h7.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(event) {
  event.preventDefault();

  let apiKey = "d2ced9a51dfc32ccb0ae22ecfcd93888";
  let city = document.querySelector("#search").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let currentYourlocation = document.querySelector("#currentYourlocation");
currentYourlocation.addEventListener("click", getCurrentLocation);

function convertTOf(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = 66;
}

let fahrenheitlink = document.querySelector("#fahrenheitlink");
fahrenheitlink.addEventListener("click", convertTOf);

function convertTOc(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = 19;
}

let celsiuslink = document.querySelector("#celsiuslink");
celsiuslink.addEventListener("click", convertTOc);
