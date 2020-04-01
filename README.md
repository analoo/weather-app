# Weather Dashboard Read Me

## Summary

This website is a simple weather dashboard that shows current data and a five day forecast. A user can enter a city and new weather data is populated. Previous searches are stored on the left side bar and users can select any of those city elements to see the weather data for that city. This website uses the Open Weather API.


## Site Picture
![Site](./assets/images/weather-dash.png)


## Technologies Used
- JQuery - used to build a responsive website, create elements and make API calls
- HTML - used to create elements
- CSS - for styles elements on page
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed in GitHub pages

## Code Snippet

The render forecast data function proved to be challenging because of how Open Weather sends forecast data. Rather than showing complete days, the API call retrieves data from 24 hours from now and then every 3 hours after that. I ended up using a for loop to create 5 elements with all of the needed information and then using an index j to retrieve data from the API call. Index j started at 0 but then incremented by 8, meaning that the forecast shows 24 hours, 48 hours, 72 hours and so on.


```
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
```

## Author Links
- [LinkedIn](https://www.linkedin.com/in/ana-medrano-fernandez/)

- [GitHub](https://github.com/analoo)

## Special Acknoledgements
Search by Vectorstall from the Noun Project