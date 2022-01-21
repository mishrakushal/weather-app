let weather = {
    "apiKey": "d821b5a6e6c54dd99c6b0b1a0453f3b1",
    fetchWeather : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city
         + "&units=metric&appid="
         + this.apiKey
        ).then((response) => response.json()
        ).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "" + name + ", " + country;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";   
        document.querySelector(".weather").classList.remove("loading");
        // document.querySelector(".cardLeftOuter").backgroundImage = "https://source.unsplash.com/274x370/?" + name;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

document
.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

weather.fetchWeather("New York City");