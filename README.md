# Weather Dashboard Read Me

## Summary

This website is a simple weather dashboard that shows current data and a five day forecast. A user can enter a city and new weather data is populated. Previous searches are stored on the left side bar and users can select any of those city elements to see the weather data for that city. This website uses the Open Weather API.


## Site Picture
![Site](./assets/images/weather-dash.png)


## Technologies Used
- JQuery - used to build a responsive website and make API calls
- HTML - used to create elements
- CSS - for styles elements on page
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed in GitHub pages

## Code Snippet

The save activity function is highlighted below because it was an "AHA" moment about how data elements can be used to create references to id's without being forced to give multiple elements the same class value.


```
function saveActivity() {
    // pulls data id value from save button
    var dataID = $(this).data("id");
    // turns value into integer value, matching to desired index
    var index = dataID.split("li")[1];
    // extracts the value of the activity description
    var newDescValue = $("#" + dataID).val();
    // and assigns it back to the planner data
    plannerData[index].activity = newDescValue;
    // this is then stored locally
    localStorage.setItem("pd-AMF", JSON.stringify(plannerData));
    // the rendered HTML is cleared
    $(".container").empty();
    // and the renderPlannerData function is reran
    renderPlannerData();

}
```

## Author Links
- [LinkedIn](https://www.linkedin.com/in/ana-medrano-fernandez/)

- [GitHub](https://github.com/analoo)

## Special Acknoledgements
Search by Vectorstall from the Noun Project