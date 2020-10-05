$(function () {

    var currentDate = (moment().format('LLLL'));
    $("#dashboard").append(currentDate);

    //When I click the search button, I am presented with current and future conditions. 
    $("button").on("click", function () {
        var searchCity = $("#searchCity").val();
        $("#searchCity").val("");
        searchWeather(searchCity);
        
    });

    
    

    function searchWeather(searchCity) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&APPID=0c7291aca640c07cf04da224af9c3247&units=imperial";
        console.log(searchCity);
        console.log(queryURL);


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                
                // Setting history to local 
                if (!(history.includes(searchCity))) {
                    history.push(searchCity);
                    localStorage.setItem("history", JSON.stringify(history));
                    historyRow(searchCity);
                }

                var weatherIcon = response.weather[0].icon;
                console.log(weatherIcon);

                var weatherLink = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
                console.log(weatherLink);

                var weatherImage = $("<img>");
                weatherImage.attr("src", weatherLink);

                $("#currentCity").text(searchCity);
                $('#currentCity').append(weatherImage);

                var temperature = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + "°F");

                $('#currentCity').append(temperature);

                var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");

                temperature.append(humidity);

                var windSpeed = $("<p>").text("Wind Speend: " + response.wind.speed + "MPH");

                humidity.append(windSpeed);

                fiveDayForecast(searchCity);

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
                
                $("#forecast").html("<h4>Five Day Forecast</h4>").append("<div class='row'>")

                for (var i = 0; i < response.list.length; i++) {

                    //select weather reports for 3pm
                    if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                        
                        var day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                        console.log(day);
                        var month = response.list[i].dt_txt.split("-")[1];
                        console.log(month);
                        var year = response.list[i].dt_txt.split("-")[0];
                        console.log(year);

                        var fullDateInfo = $("<div>").text(month + "/" + day + "/" + year);
                        fullDateInfo.addClass("card-title");
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

                        var fiveDayHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
                        fiveDayTemp.append(fiveDayHumidity);

                        dayStart++;
                    }

                }
            });
    }

    var history = JSON.parse(localStorage.getItem("history")) || [];
    console.log(history);

    if (history.length >= 0) {
        searchWeather(history[history.length - 1]);
    }

    for (var i = 0; i < history.length; i++) {
        historyRow(history[i]);

    }

    $(".history").on("click", "li", function () {
        var city = $(this).text().trim();
        searchWeather(city)
    })

    function historyRow(text) {
        var listitem = $("<li>").text(text);
        $(".history").append(listitem);
    }


});

