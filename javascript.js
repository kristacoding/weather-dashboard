$(function () {

    var currentDate = (moment().format('LLLL'));
    $("#dashboard").append(currentDate);

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

                var weatherIcon = response.weather[0].icon;
                console.log(weatherIcon);

                var weatherLink = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
                console.log(weatherLink);

                var weatherImage = $("<img>");
                weatherImage.attr("src", weatherLink);

                $("#currentCity").text(searchCity);
                $('#currentCity').append(weatherImage);

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
                var dayStart = 0;

                //iterate through the 40 weather data sets
                for (var i = 0; i < response.list.length; i++) {

                    //split function to isolate the time from the time/data aspect of weather data, and only select weather reports for 3pm
                    if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {

                        //if time of report is 3pm, populate text areas accordingly
                        var day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                        console.log(day);
                        var month = response.list[i].dt_txt.split("-")[1];
                        console.log(month);
                        var year = response.list[i].dt_txt.split("-")[0];
                        console.log(year);

                        var fullDateInfo = $("<div>").text(month + "/" + day + "/" + year);
                        console.log(fullDateInfo);
                        $("#forecast").append(fullDateInfo);

                        var fiveDayIcon = response.list[i].weather[0].icon
                        console.log(response.list[i].weather[0].icon);
        
                        var fiveDayIconLink = "http://openweathermap.org/img/w/" + fiveDayIcon + ".png";
                        console.log(fiveDayIconLink);
        
                        var fiveDayWeatherImage = $("<img>");
                        fiveDayWeatherImage.attr("src", fiveDayIconLink);

                        fullDateInfo.append(fiveDayWeatherImage);

                        var fiveDayTemp = $("<p>").text("Temp: " + response.list[i].main.temp + "°F");
                        fullDateInfo.append(fiveDayTemp);
                        
                        var fiveDayHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity);
                        fiveDayTemp.append(fiveDayHumidity); 

                        dayStart++;


                    };

                }

            });
    }
});    