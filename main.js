import clearUrl from './images/clear.png';
import rainUrl from './images/rain.png';
import snowUrl from './images/snow.png';
import cloudsUrl from './images/clouds.png';
import hazeUrl from './images/haze.png';

const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		performSearch();
	}
});

function performSearch() {
	const APIKey = "a808bfd0f9ca79c3c7b50b46777916da";
	const city = searchInput.value;

	if (city === "") {
		return;
	}

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
	)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === "404") {
				container.style.height = "400px";
				weatherBox.style.display = "none";
				weatherDetails.style.display = "none";
				error404.style.display = "block";
				error404.classList.add("fadeIn");
				return;
			}

			error404.style.display = "none";
			error404.classList.remove("fadeIn");

			const image = document.querySelector(".weather-box img");
			const temperature = document.querySelector(".weather-box .temperature");
			const description = document.querySelector(".weather-box .description");
			const humidity = document.querySelector(
				".weather-details .humidity span"
			);
			const wind = document.querySelector(".weather-details .wind span");


			switch (json.weather[0].main) {
				case "Clear":
					image.src = clearUrl;
					break;
				case "Rain":
					image.src = rainUrl;
					break;
				case "Snow":
					image.src = snowUrl;
					break;
				case "Clouds":
					image.src = cloudsUrl;
					break;
				case "Haze":
					image.src = hazeUrl;
					break;
				default:
					image.src = "";
			}

			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

			weatherBox.style.display = "";
			weatherDetails.style.display = "";
			weatherBox.classList.add("fadeIn");
			weatherDetails.classList.add("fadeIn");
			container.style.height = "590px";
		});
}
