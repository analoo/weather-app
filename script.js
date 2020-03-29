
var key = "c7d32a0040576541e78f3e61c878c6d1"
var city = "Boulder"
var cities = ["Los Angeles", "San Francisco"];
var lat;
var long;
var forecastData;
var weatherData;
var ultraViolet;

var forecastQuery = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+key;
var currentWeatherQuery = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key;

function fiveDayForecast() {
    $.ajax({
        url: forecastQuery,
        method: "GET"
    }).then(function (response) {
        forecastData = response;
        console.log(forecastData)
    })
}

function currentWeather(){
    $.ajax({
        url: currentWeatherQuery,
        method: "GET"
    }).then(function (response) {
        weatherData = response;
        console.log(weatherData)

    })
}

fiveDayForecast();
currentWeather();
// pullUVData();

// function pullUVData(){
//     lat = weatherData.city.coord.lat;
//     long = weatherData.city.coord.lon;
//     var query2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + long;

//     $.ajax({
//         url: query2,
//         method: "GET"
//     }).then(function (response) {
       
//         ultraViolet = response.value; 
//         console.log(ultraViolet);           
//     })
// }


// $("#search-button").on("click", function () {
//     event.preventDefault();
//     city = $("#city-search").val();
//     cities.push(city);
//     $("#location").text(city);
//     renderCitiesList();

// })


// function renderCitiesList() {
//     $("#cities-list").empty()
//     for (let i = 0; i < cities.length; i++) {
//         var button = $("<button type='button' class = 'btn btn-outline-secondary cities'>" + cities[i] + "</button>")
//         $("#cities-list").prepend(button)
//     }

// }

// $("#cities").on("click", function () {
//     city = this.val()
//     renderWeatherData()
// });

// function renderWeatherData() {


//     for (var i = 0; i < 40; i++) {
//         var date = weatherData.list[i].dt_txt.split(" ")[0];
//         var dateFormatted = date;
//         console.log(weatherData.list[i].dt_txt);
//         // $("#day-" + i).append("<h3>" + dateFormatted + "</h3>")
//         // var weatherDesc = weatherData.list[i+8].weather[0].main;
//         // console.log(weatherDesc);

//         // $("#day-" + i).append("<p>" + weatherDesc + "</p>")
//         // var kelvinData = weatherData.list[i].main.temp;
//         // var farenheitData = parseFloat((kelvinData - 273.15) * 9 / 5 + 32).toFixed(1);
//         // $("#day-" + i).append("<p>Temperature: " + farenheitData + "°F</p>")
//         // $("#day-" + i).append("<p>Humidity: " + weatherData.list[i].main.humidity + "%</p>")
//     }
//     // $("#location").text(city + " " + dateFormatted + " " + weatherData.list[0].weather[0].main);

//     // console.log("<h2>" + city + " " + dateFormatted + " " + weatherData.list[0].weather[0].main + "</h2>")
//     // $("#day-0").append("<p>Temperature: " + farenheitData + "°F</p>")
//     // $("#day-0").append("<p>Humidity: " + weatherData.list[i].main.humidity + "%</p>")
//     // $("#day-0").append("<p>Wind Speed: " + weatherData.list[0].wind.speed + " MPH</p>");
//     // $("#day-0").append("<p>UV Index: " + ultraViolet + "</p>")
// }
// renderWeatherData();

// renderCitiesList();