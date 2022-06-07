const input = document.querySelector(".input");
const button = document.querySelector(".search-btn");
const cityName = document.querySelector(".wapp-body__city");
const warning = document.querySelector(".wapp-top__para");
const photo = document.querySelector(".wapp-body__icon");
const weather = document.querySelector(".wapp-body__weather");
const pressure = document.querySelector(".wapp-bot__pressure");
const temperature = document.querySelector(".wapp-bot__temperature");
const humidity = document.querySelector(".wapp-bot__humidity");
const label = document.querySelector("#toggle");
const wappBg = document.querySelector(".wapp");
const wappResults = document.querySelector(".wapp-bot__results");
const wappError = document.querySelector(".wapp-top__para");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=e42e687500228688860fd7ef2cb67f5d";
const LANG = "&lang=pl";
const API_UNITS = "&units=metric";

async function getWeather() {
  const city = input.value;
  const URL = API_LINK + city + API_KEY + API_UNITS + LANG;
  axios
    .get(URL)
    .then((res) => {
      const status = res.data.weather[0].id;

      cityName.textContent = res.data.name;

      temperature.textContent = Math.floor(res.data.main.temp) + " °C";
      weather.textContent = res.data.weather[0].description;
      humidity.textContent = res.data.main.humidity + " %";
      pressure.textContent = res.data.main.pressure + ` hPa`;

      photo.setAttribute("src", "./dist/img/unknown.png");

      warning.textContent = "Szukaj miasta";
      input.value = "";

      // if sprawdzajacy pogodowy status id i definiuje odpowiednią pogode za pomoca obrazka.

      if (status <= 232) {
        photo.setAttribute("src", "./dist/img/thunderstorm.png");
      } else if (status <= 321) {
        photo.setAttribute("src", "./dist/img/drizzle.png");
      } else if (status <= 531) {
        photo.setAttribute("src", "./dist/img/rain.png");
      } else if (status <= 622) {
        photo.setAttribute("src", "./dist/img/ice.png");
      } else if (status <= 781) {
        photo.setAttribute("src", "./dist/img/fog.png");
      } else if (status === 800) {
        photo.setAttribute("src", "./dist/img/sun.png");
      } else if (status <= 804) {
        photo.setAttribute("src", "./dist/img/cloud.png");
      }
    })
    .catch(() => {
      warning.textContent = "Wpisz poprawną nazwę miasta";
    });
}

// szukanie miasta za pomoca klawisza enter

button.addEventListener("click", getWeather);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

//nadawanie klas zwiazanych z dark mode
label.addEventListener("click", () => {
  wappBg.classList.toggle("wapp-toggle");
  input.classList.toggle("wapp-toggle-bg");
  wappResults.classList.toggle("wapp-toggle-text");
  wappError.classList.toggle("wapp-toggle-text");
});
