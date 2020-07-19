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
let time = document.querySelector("#heading-second");
time.innerHTML = `${day} ${hour}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#heading-first").innerHTML = response.data.name;
  document.querySelector("#heading-third").innerHTML = Math.round(
    response.data.main.temp
  );
}
function search(event) {
  event.preventDefault();
  let apiKey = "3346c88ffb76a2a6dc2fd658bc17450a";
  let city = document.querySelector("#input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
  //let searchotherInput = document.querySelector("#input");
  //let searchInput = document.querySelector("#input");
  // let city = document.querySelector("#heading-first");
  // city.innerHTML = `Hello! The weather in ${searchInput.value} is...`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let update = response.data.weather[0].main;
  let currentWind = response.data.wind.speed;
  let currentWindheading = document.querySelector("#wind");
  currentWindheading.innerHTML = `Wind: ${currentWind}km/h`;
  let currentHumidity = response.data.main.humidity;
  let currentHumidityheading = document.querySelector("#humidity");
  currentHumidityheading.innerHTML = `Humidity: ${currentHumidity}%`;
  let currentCountry = response.data.sys.country;
  let countryHeading = document.querySelector("#heading-first");
  countryHeading.innerHTML = `${currentCountry}`;
  let heading = document.querySelector("#heading-third");
  heading.innerHTML = `${update} ${temperature}`;
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
