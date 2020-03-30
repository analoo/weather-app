
var key = "c7d32a0040576541e78f3e61c878c6d1"
var city = "Boulder"
var cities = ["Los Angeles", "San Francisco"];
var lat;
var long;
var forecastData;
var weatherData;
var ultraViolet;

var forecastQuery = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
var currentWeatherQuery = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

function startProgram() {
    renderCitiesList();
    fiveDayForecast();
    currentWeather();
}

function currentWeather() {
    $.ajax({
        url: currentWeatherQuery,
        method: "GET"
    }).then(function (response) {
        weatherData = response;
        console.log(weatherData);
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + weatherData.coord.lat + "&lon=" + weatherData.coord.lon,
            method: "GET"
        }).then(function (response) {
            ultraViolet = response.value;
            console.log(ultraViolet);
            renderCurrentData();
        });

    });
}

function fiveDayForecast() {
    $.ajax({
        url: forecastQuery,
        method: "GET"
    }).then(function (response) {
        forecastData = response;
        renderForecastData();
    })
}

$("#search-button").on("click", function () {
    event.preventDefault();
    if ($("#city-search").val() != "") {
        city = $("#city-search").val();
        cities.push(city);
        $("#location").text(city);
        renderCitiesList();
    }
})


function renderCitiesList() {
    $("#cities-list").empty()
    for (let i = 0; i < cities.length; i++) {
        var button = $("<button type='button' class = 'btn btn-outline-secondary cities'>" + cities[i] + "</button>")
        $("#cities-list").prepend(button)
    }

}

$("#cities").on("click", function () {
    city = this.val()
    renderWeatherData()
});

function renderCurrentData() {
    $("#location").text(city + " " + "(Date Formatted)" + " " + weatherData.weather[0].main);
    let kelvinData = weatherData.main.temp;
    let farenheitData = parseFloat((kelvinData - 273.15) * 9 / 5 + 32).toFixed(1);
    $("#current").append("<p>Temperature: " + farenheitData + "°F</p>")
    $("#current").append("<p>Humidity: " + weatherData.main.humidity + "%</p>")
    $("#current").append("<p>Wind Speed: " + weatherData.wind.speed + " MPH</p>");
    $("#current").append("<p id='uv-index'>UV Index:</p>");
    var uvElement = $("<button>" + ultraViolet + "</button>");
    $("#uv-index").append(uvElement);

    if(ultraViolet <=2){
        uvElement.attr("id","low");
    }
    else if(ultraViolet <=5){
        uvElement.attr("id","moderate");
    }
    else if(ultraViolet <=7){
        uvElement.attr("id","high");
    }
    else if(ultraViolet <=8.5){
        uvElement.attr("id","very-high");
    }
    else if(ultraViolet >8.5){
        uvElement.attr("id","Extreme");
    }
    else{
        uvElement.attr("id","null");
    }

}
function renderForecastData() {
    var j = 0;
    for (var i = 0; i < 5; i++) {
        var date = forecastData.list[j].dt_txt.split(" ")[0];
        var dateFormatted = date;
        $("#day-" + i).append("<h4>" + dateFormatted + "</h4>")
        var weatherDesc = forecastData.list[j].weather[0].main;
        $("#day-" + i).append("<p>" + weatherDesc + "</p>")
        var kelvinData = forecastData.list[j].main.temp;
        var farenheitData = parseFloat((kelvinData - 273.15) * 9 / 5 + 32).toFixed(1);
        $("#day-" + i).append("<p>Temperature: " + farenheitData + "°F</p>")
        $("#day-" + i).append("<p>Humidity: " + forecastData.list[j].main.humidity + "%</p>")
        j+=8
    }
}


startProgram()