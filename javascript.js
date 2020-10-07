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
                $("#currentCity").append(weatherImage);

                var temperature = $("<p>").text("Temperature: " + response.main.temp + "°F");

                $("#currentCity").append(temperature);

                var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");

                $("#currentCity").append(humidity);

                var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH");

                $("#currentCity").append(windSpeed);


                var lat = response.coord.lat;
                console.log(lat);
                var lon = response.coord.lon;
                console.log(lon);

                var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0c7291aca640c07cf04da224af9c3247";
                return $.ajax({
                    url: uvURL,
                    method: "GET"
                })
                    .then(function (response) {

                      
                       var uvId = $("<p>").text("UV ID: " + response.value);
                       $("#currentCity").append(uvId);

                        console.log(uvId);

                        if (uvId < 3) {
                            uvId.addClass("favorable");

                        }
                        else if (uvID > 3 && uvID < 5) {
                            uvID.addClass("moderate");

                        }
                        else if (uvID > 5) {
                            uvID.addClass("severe");

                        }

                        else {};

                        


                    })



            });

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=0c7291aca640c07cf04da224af9c3247&units=imperial";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var dayStart = 0;

                $("#forecast").html("<h4>Five Day Forecast</h4>");
                var newRow = $("<div class='row'>");
                $("#forecast").append(newRow);

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
                        fullDateInfo.addClass("forecast");
                        console.log(fullDateInfo);
                        newRow.append(fullDateInfo);

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

    $(".history").on("click", "button", function () {
        var city = $(this).text().trim();
        searchWeather(city)
    })

    function historyRow(text) {
        var listitem = $("<button>").text(text);
        listitem.addClass("btn btn-outline-danger");
        $(".history").append(listitem);
    }


});

