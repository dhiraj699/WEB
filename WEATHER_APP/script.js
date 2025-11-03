const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const weatherInfoContainer = document.querySelector(".weather-info");

//initially variables needed
let oldTab = userTab;
const API_KEY = "81d0432e6c1c51dbae0d0edc56ffbf11";
oldTab.classList.add("current-tab");

//ek kaam pending hai .. ?

function switchTab(newTab) {
    //if clicked tab is already current tab, then do nothing
    if(newTab !== oldTab){
    //remove current tab class from the previous tab
    oldTab.classList.remove("current-tab");

    //update current tab to the clicked tab
    oldTab = newTab;

    //add current tab class to the clicked tab
    oldTab.classList.add("current-tab");

    //if user clicks on user weather tab, then show user weather container and hide search form
    if(!searchForm.classList.contains("active")) {
        userContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        // main pehle search wale tab pr tha, ab your weather tab visible karna hai
        searchForm.classList.remove("active");
        userContainer.classList.add("active");
        getfromSessionStorage();
    }
}
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});

// check if codinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (localCoordinates) {
        //agar local codinates nahi mile
        grantAccessContainer.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
         fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    //make grant access container invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API call
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        weatherInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        loadingScreen.classList.remove("active");
        alert("Error fetching weather data. Please try again later.");
    }
}

function renderWeatherInfo(weatherInfo) {
    //update city name and flag
    const cityName = document.querySelector("[data-cityName]");
    const countryFlag = document.querySelector("[data-countryFlag]");
    cityName.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;
    countryFlag.src = `https://flagcdn.com/w320/${weatherInfo.sys.country.toLowerCase()}.png`;

    //update temperature
    const temperature = document.querySelector("[data-temperature]");
    temperature.innerText = `${Math.round(weatherInfo.main.temp)}°C`;

    //update weather description
    const weatherDescription = document.querySelector("[data-weatherDescription]");
    weatherDescription.innerText = weatherInfo.weather[0].description;

    //update humidity
    const humidity = document.querySelector("[data-humidity]");
    humidity.innerText = `${weatherInfo.main.humidity}%`;

    //update wind speed
    const windSpeed = document.querySelector("[data-windSpeed]");
    windSpeed.innerText = `${Math.round(weatherInfo.wind.speed)} m/s`;

    //update clouds
    const clouds = document.querySelector("[data-clouds]");
    clouds.innerText = `${weatherInfo.clouds.all}%`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector(".grant-location-button");
grantAccessButton.addEventListener("click",getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === "")
        return;
    else fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!data.sys) {
      throw new Error("Invalid city name");
    }

    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);

  } catch (err) {
    loadingScreen.classList.remove("active");
    apiErrorContainer.classList.add("active");
    apiErrorMessage.innerText = `Error: ${err.message}`;
  }
}
