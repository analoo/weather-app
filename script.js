
var key = "fd3b75547b078732fabd7603060db190";
var city = "Boston";
var cities = ["Los Angeles", "San Francisco"];
var query1 = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+key
var lat;
var long;
var query2 = "http://api.openweathermap.org/data/2.5/uvi?appid="+key+"&lat="+lat+"&lon="+long;
var temp;
var weatherData;

$.ajax({
    url: query1,
    method: "GET"
}).then(function(response){
    weatherData = response;
    renderWeatherData();
})

$("#search-button").on("click", function(){
    event.preventDefault();
    city = $("#city-search").val();
    cities.push(city);
    $("#location").text(city);
    console.log(city);
    renderCitiesList();

})


function renderCitiesList(){
    $("#cities-list").empty()
    for (let i=0; i < cities.length; i++){
        var button = $("<button type='button' class = 'btn btn-outline-secondary cities'>"+cities[i]+"</button>")
        $("#cities-list").prepend(button)
    }

}

$("#cities").on("click", function(){
    city = this.val()
    renderWeatherData()
});

function renderWeatherData(){
    for (var i = '0'; i < 6; i++){
        var kelvinData = weatherData.list[i].main.temp;
        console.log(kelvinData);
        var farenheitData =  parseFloat((kelvinData - 273.15) * 9/5 + 32).toFixed(1);
        // weatherData.list[i].main.humidity;
        // weatherData.list[i].wind.speed;
        // weatherData.list[i].main.dt_text
        // weatherData.list[i].weather.description;
        $("#day-"+i).append("<p>Temperature: "+farenheitData+"°F</p>")
        console.log("#day-"+i+"'");

    //     <p>Temperature: <span id=temp-val> 90.9F</span></p>
    //                 <p>humidity</p>
    //                 <p>wind speed</p>
    //                 <p>uv index</p>
    }
    
}


renderCitiesList();