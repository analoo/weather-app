
var key = "fd3b75547b078732fabd7603060db190"
var city = "Boston"
var cities = [];
var query1 = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+key
var lat;
var long;
var query2 = "http://api.openweathermap.org/data/2.5/uvi?appid="+key+"&lat="+lat+"&lon="+long;

var temp;

var weatherData = []

$.ajax({
    url: query1,
    method: "GET"
}).then(function(response){
    console.log(response)

    for (let i = 0; i < 6; i++){

    }
    var weather = response.list[0].main.temp;
    var humidity = response.list[0].main.humidity;
    var windSpeed = response.list[0].wind.speed;
    var date = response.list[0].main.dt_text
    var description = response.list[0].weather.description;


    console.log(weather)
})


$("#search-button").on("click", function(){
    event.preventDefault();
    city = $("#city-search").val();
    cities.push(city);
    console.log(city);

})
