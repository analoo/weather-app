
var key = "c7d32a0040576541e78f3e61c878c6d1"
var city;
var cities = [];

var forecastData;
var weatherData;

var ultraViolet;

var day = new Date().getDate();
var month = new Date().getMonth() +1 ;
var year = new Date().getFullYear();
var todayDate = month + "/" + day + "/" + year

// makes starting conditions for the website
function startProgram() {
    retrieveStoredCities();
    renderCitiesList();
    requestCurrentWeather(city);
    fiveDayForecast(city);
}

// function checks whether localstorage returns null or empty and defaults city value to SF in that case
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


// This function actually does 2 API calls, the first gets weather information and lat/long which is needed for the second API call
function requestCurrentWeather(city) {
    var currentWeatherQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

    $.ajax({
        url: currentWeatherQuery,
        method: "GET"
    }).then(function (response) {
        weatherData = response;
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + weatherData.coord.lat + "&lon=" + weatherData.coord.lon,
            method: "GET"
        }).then(function (response) {
            ultraViolet = response.value;
            renderCurrentData();
        });

    });
}

// This function makes a call to the five Day forecast API
function fiveDayForecast(city) {
    var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
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

// This function stores the value of the search and runs weather requests, stores the data value on a list resets the search bar once a value has been submitted
$("#search-button").on("click", function () {
    event.preventDefault();
    if ($("#city-search").val() != "") {
        city = $("#city-search").val();
        if(cities.indexOf(city)=== -1){
            cities.push(city);
        }
        $("#location").text(city);
        renderCitiesList();
        requestCurrentWeather(city);
        fiveDayForecast(city);
    }
    $("#city-search").val("");

})


// dynamically creates cities list on the page and stores the values to local storage
function renderCitiesList() {
    $("#cities-list").empty()
    for (let i = 0; i < cities.length; i++) {
        var button = $("<button class = 'cities'>" + cities[i] + "</button>")
        $("#cities-list").prepend(button)
    }
    storeCities();
}

// gives click event listener to all elements with the class cities
$(document).on("click", ".cities", function () {
    city = $(this).text();
    requestCurrentWeather(city);
    fiveDayForecast(city);

});

// dynamically creates current and UV data elements based on API query results
function renderCurrentData() {
    $("#current").empty();
    var icon = $("<img src=http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+".png />")
    $("#current").append("<h3 id='temp'>" + city + " (" + todayDate +")</h3>");
    $("#temp").append(icon);
    
    let kelvinData = weatherData.main.temp;
    let farenheitData = parseFloat((kelvinData - 273.15) * 9 / 5 + 32).toFixed(1);
    $("#current").append("<p>Temperature: " + farenheitData + "°F</p>")
    $("#current").append("<p>Humidity: " + weatherData.main.humidity + "%</p>")
    $("#current").append("<p>Wind Speed: " + weatherData.wind.speed + " MPH</p>");
    $("#current").append("<p id='uv-index'>UV Index:</p>");
    var uvElement = $("<button>" + ultraViolet + "</button>");
    $("#uv-index").append(uvElement);

    // ids are added to UV button element based on value so that box color changes based on the value
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
        uvElement.attr("id","extreme");
    }
    else{
        uvElement.attr("id","null");
    }

}

// dynamically creates 5 day forcast data elements based on API query results
function renderForecastData() {
    $("#forecast").empty();
    var j = 0;
    for (var i = 0; i < 5; i++) {
        $("#forecast").append("<div class='days' id='day-"+i+"'></div>")
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

// stores cities list into local storage
function storeCities(){
    localStorage.setItem("wda-cities", JSON.stringify(cities));
};

// formats date data from how it is returned on the API
function dateFormat(str){
    var dateString = str.split("-");
    return (dateString[1].split("0")[1]+"/"+dateString[2]+"/"+dateString[0])

}

startProgram()