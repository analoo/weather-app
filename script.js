
var key = "c7d32a0040576541e78f3e61c878c6d1"
var city = "Boulder";
var cities = [];
var lat;
var long;
var forecastData;
var weatherData;
var ultraViolet;


function startProgram() {
    retrieveStoredCities();
    renderCitiesList();
    fiveDayForecast(city);
    currentWeather(city);
}

function currentWeather(city) {
    var currentWeatherQuery = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

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

function fiveDayForecast(city) {
    var forecastQuery = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
    $.ajax({
        url: forecastQuery,
        method: "GET"
    }).then(function (response) {
        forecastData = response;
        renderForecastData();
        var date = forecastData.list[0].dt_txt.split(" ")[0];
        dateFormat(date);
    })
}

$("#search-button").on("click", function () {
    event.preventDefault();
    if ($("#city-search").val() != "") {
        city = $("#city-search").val();
        cities.push(city);
        $("#location").text(city);
        renderCitiesList();
        currentWeather(city);
        fiveDayForecast(city);
    }
})


function renderCitiesList() {
    $("#cities-list").empty()
    for (let i = 0; i < cities.length; i++) {
        var button = $("<button type='button' class = 'btn btn-outline-secondary cities'>" + cities[i] + "</button>")
        $("#cities-list").prepend(button)
    }
    storeCities();
    $("#current").empty();

}

$("#cities").on("click", function () {
    city = this.val()
    renderWeatherData()
});

function renderCurrentData() {
    var icon = $("<img src=http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+".png />")
    $("#location").text(city + " " + "(Date Formatted)");
    $("#location").append(icon);
    
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
    $("#day-" + i).empty();
    var j = 0;
    for (var i = 0; i < 5; i++) {
        var date = forecastData.list[j].dt_txt.split(" ")[0];
        var dateFormatted = dateFormat(date);
        $("#day-" + i).append("<h6>" + dateFormatted + "</h6>")
        $("#day-" + i).append("<img src=http://openweathermap.org/img/wn/"+forecastData.list[j].weather[0].icon+".png />")
        var kelvinData = forecastData.list[j].main.temp;
        var farenheitData = parseFloat((kelvinData - 273.15) * 9 / 5 + 32).toFixed(1);
        $("#day-" + i).append("<p>Temp: " + farenheitData + "°F</p>")
        $("#day-" + i).append("<p>Humidity: " + forecastData.list[j].main.humidity + "%</p>")
        j+=8
    }
}

function storeCities(){
    localStorage.setItem("wda-cities", JSON.stringify(cities));
}

function retrieveStoredCities(){
    if (localStorage.getItem("wda-cities")=== null || JSON.parse(localStorage.getItem("wda-cities")).length=== 0){
        localStorage.setItem("wda-cities", JSON.stringify(cities))
        city = "San Francisco";
    }
    else{
        cities = JSON.parse(localStorage.getItem("wda-cities"));
        city = cities[cities.length-1];
    }


}


;
function dateFormat(str){
    var dateString = str.split("-");
    return (dateString[1].split("0")[1]+"/"+dateString[2]+"/"+dateString[0])

}

startProgram()