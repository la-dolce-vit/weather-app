let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
document.querySelector(
  "#heading-second"
).innerHTML = `${day} ${hour}:${minutes}`;
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hour < 10) {
  hour = `0${hour}`;
}
function displayWeather(response) {
  document.querySelector("#heading-first").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let update = response.data.weather[0].main;
  document.querySelector(
    "#heading-third"
  ).innerHTML = `${update} ${temperature}°C`;
  let wind = Math.round(response.data.wind.speed);
  let windheading = document.querySelector("#wind");
  windheading.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let humidityheading = document.querySelector("#humidity");
  humidityheading.innerHTML = `Humidity: ${humidity}%`;
}
function search(event) {
  event.preventDefault();
  let apiKey = "3346c88ffb76a2a6dc2fd658bc17450a";
  let city = document.querySelector("#input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentUpdate = response.data.weather[0].main;
  let currentWind = Math.round(response.data.wind.speed);
  let currentWindheading = document.querySelector("#wind");
  currentWindheading.innerHTML = `Wind: ${currentWind} km/h`;
  let currentHumidity = response.data.main.humidity;
  let currentHumidityheading = document.querySelector("#humidity");
  currentHumidityheading.innerHTML = `Humidity: ${currentHumidity}%`;
  let currentCountry = response.data.sys.country;
  let countryHeading = document.querySelector("#heading-first");
  countryHeading.innerHTML = `${currentCountry}`;
  let heading = document.querySelector("#heading-third");
  heading.innerHTML = `${currentUpdate} ${currentTemperature}°C`;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "3346c88ffb76a2a6dc2fd658bc17450a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);
