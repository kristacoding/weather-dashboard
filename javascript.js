$(function(){

    var currentDate = (moment().format('LLLL'));
    $("#dashboard").append(currentDate);




    //When I click the search button, I am presented with current and future conditions. 
    $("button").on("click", function () {
        var searchCity = $("#searchCity").val();
        $("#searchCity").val("");
        searchWeather(searchCity);
    });

    function searchWeather(searchCity) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&APPID=0c7291aca640c07cf04da224af9c3247&units=imperial";
    console.log(queryURL);
    console.log(searchCity);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            $("#currentCity").text(searchCity);

            var temperature = $("<p>").text("Temperature: " + response.main.temp + "°F");

            $('#currentCity').append(temperature);

            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");

            temperature.append(humidity);

            var windSpeed = $("<p>").text("Wind Speend: " + response.wind.speed + "MPH");

            humidity.append(temperature);

        });
        
    
    }

    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    if (history.length > 0) {
        searchWeather(history[history.length - 1]);
    }

    for ( var i = 0; i > history.length; i++){
        historyRow(history[i]); 
    }
        
    }
});