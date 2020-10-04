$(function () {

    //When I click the search button, I am presented with current and future conditions. 
    $("button").on("click", function () {
        var searchCity = $("#searchCity").val();
        $("#searchCity").val("");
        searchWeather(searchCity);
        fiveDayForecast(searchCity);
    });

    function searchWeather(searchCity) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&APPID=0c7291aca640c07cf04da224af9c3247&units=imperial";
        console.log(searchCity);
        console.log(queryURL);
        localStorage.setItem("history", searchCity);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                $("#currentCity").text(searchCity) + " " + response.list.weather.icon;
                
                var temperature = $("<p>").text("Temperature: " + response.main.temp + "°F");

                $('#currentCity').append(temperature);

                var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");

                temperature.append(humidity);

                var windSpeed = $("<p>").text("Wind Speend: " + response.wind.speed + "MPH");

                humidity.append(windSpeed);

            });
    
    }

    function fiveDayForecast(searchCity) {
        console.log(searchCity);

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=0c7291aca640c07cf04da224af9c3247&units=imperial";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var day1 = $("<row>").text(response.list.dt_txt);

                $('forecast').append(day1);
            });
        
    }

});